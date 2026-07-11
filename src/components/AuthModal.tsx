import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Swiss phone regex: accepts +41, 0041, or local 0/no-prefix formats
const SWISS_PHONE_REGEX = /^(\+41|0041|0)?[1-9]\d{8}$/;

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Tab = "login" | "signup";

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | null;
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="space-y-1.5 text-left">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-[color:var(--foreground)]"
      >
        {label}
        {!required && (
          <span className="text-[color:var(--body)] ml-1">(optional)</span>
        )}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPw ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full h-11 px-3.5 rounded-lg border bg-[color:var(--surface)] text-[14px] focus:outline-none focus:ring-2 transition-all pr-10 ${
            error
              ? "border-red-400 focus:ring-red-200"
              : "border-[color:var(--border)] focus:ring-[color:var(--primary)]/30 focus:border-[color:var(--primary)]"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[11.5px] text-red-600 leading-tight">{error}</p>
      )}
    </div>
  );
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loginData, setLoginData] = useState({ email: "" });

  const onSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id.replace("su_", "");
    setSignupData((p) => ({ ...p, [key]: e.target.value }));
    // Clear phone error while user is typing
    if (key === "phone") setPhoneError(null);
  };

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData((p) => ({ ...p, [e.target.id.replace("li_", "")]: e.target.value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPhoneError(null);

    // Strip all whitespace from phone before validation
    const cleanPhone = signupData.phone.replace(/\s+/g, "");

    // Swiss phone validation
    if (!cleanPhone) {
      setPhoneError("Veuillez entrer un numéro de téléphone");
      return;
    }
    if (!SWISS_PHONE_REGEX.test(cleanPhone)) {
      setPhoneError(
        "Veuillez entrer un numéro suisse valide (ex: 079 123 45 67)"
      );
      return;
    }

    setLoading(true);
    try {
      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      const emailKey = signupData.email.trim().toLowerCase();

      // 1. Check if user already exists (localStorage + Blob)
      let exists = !!localStorage.getItem(`user_${emailKey}`);
      if (!exists && token) {
        try {
          const res = await fetch(
            `/api/blob-list?prefix=users/${encodeURIComponent(emailKey)}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.blobs && data.blobs.length > 0) exists = true;
          }
        } catch {
          // Ignore fetch error and proceed
        }
      }

      if (exists) throw new Error("Account exists");

      // 2. Send lead to CRM (phone already validated, formatter runs inside createLead)
      const crmSuccess = await createLead({
        name: signupData.name,
        email: signupData.email,
        number: cleanPhone,
        description: "Cryptora",
      });

      if (!crmSuccess) {
        console.warn("Failed to create lead in CRM during signup.");
      } else {
        try {
          const url = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ website: "Cryptora", type: "signup", name: signupData.name, email: signupData.email})
          }).catch(() => {});
        } catch(e){
      const rawMsg = (e?.message || e?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        toast.error("Account already exists");
        if (typeof setError === 'function') setError("Account already exists");
        setLoading(false);
        return;
      }
}
      }

      // 3. Persist user locally (phone stored as-is for display; CRM gets normalised version)
      const userData = JSON.stringify({
        email: emailKey,
        name: signupData.name,
        phone: cleanPhone,          // store clean phone (no spaces)
        createdAt: new Date().toISOString(),
      });

      // Always save locally so auth works even if Blob fails
      localStorage.setItem(`user_${emailKey}`, userData);

      if (token) {
        try {
          await fetch(
            `/api/blob-put?pathname=users/${encodeURIComponent(emailKey)}.json`,
            { method: "PUT", body: userData }
          );
        } catch {
          console.warn(
            "Vercel Blob local proxy upload failed, using local storage fallback."
          );
        }
      }

      toast.success("Compte créé ! Bienvenue sur Cryptora.");
      onOpenChange(false);
      navigate("/trading");
    } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        toast.error("Account already exists");
        if (typeof setError === 'function') setError("Account already exists");
        setLoading(false);
        return;
      }

      console.error(err);
      if (err.message === "Account exists") {
        setError(
          "Un compte avec cet email existe déjà. Veuillez vous connecter."
        );
      } else {
        setError("Échec de la création du compte. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      const emailKey = loginData.email.trim().toLowerCase();
      let found = !!localStorage.getItem(`user_${emailKey}`);

      if (!found && token) {
        try {
          const res = await fetch(
            `/api/blob-list?prefix=users/${encodeURIComponent(emailKey)}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.blobs && data.blobs.length > 0) found = true;
          }
        } catch {
          console.warn("Vercel Blob fetch failed. Checking local storage.");
        }
      }

      if (!found) throw new Error("No account found with that email.");

      toast.success("Bon retour !");
      onOpenChange(false);
      navigate("/trading");
    } catch (err: unknown) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        toast.error("Account already exists");
        if (typeof setError === 'function') setError("Account already exists");
        setLoading(false);
        return;
      }

      const message = err instanceof Error ? err.message : "Login failed.";
      setError(
        message === "No account found with that email."
          ? "Aucun compte trouvé. Veuillez d'abord vous inscrire."
          : "Échec de la connexion. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setError(null);
    setPhoneError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--background)] shadow-xl text-center">
        {/* Header */}
        <div className="pt-8 pb-2 px-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Cryptora"
            className="h-10 w-auto object-contain mb-4"
          />
          <DialogTitle className="font-display text-2xl tracking-tight">
            {tab === "signup" ? "Créer un compte" : "Bon retour"}
          </DialogTitle>
          <DialogDescription className="text-[14px] text-[color:var(--body)] mt-1.5">
            {tab === "signup"
              ? "Commencez à trader plus intelligemment aujourd'hui."
              : "Connectez-vous à votre compte."}
          </DialogDescription>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-8 mb-2 mt-5 bg-[color:var(--surface)] p-1 rounded-lg">
          {(["signup", "login"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-2 text-[13px] font-medium rounded-md transition-all ${
                tab === t
                  ? "bg-white text-[color:var(--foreground)] shadow-sm"
                  : "text-[color:var(--body)] hover:text-[color:var(--foreground)]"
              }`}
            >
              {t === "signup" ? "S'inscrire" : "Se connecter"}
            </button>
          ))}
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* General error banner */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 flex items-start gap-2 text-left">
              <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-red-700 leading-tight">
                {error}
              </p>
            </div>
          )}

          {tab === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  id="su_name"
                  label="Nom complet"
                  placeholder="John Doe"
                  value={signupData.name}
                  onChange={onSignupChange}
                />
                
<div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    <select name="countryCode" style={{ width: '110px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', padding: '0.8rem', fontFamily: 'inherit' }}>
        <option value="CH">🇨🇭 +41</option>
        <option value="GB">🇬🇧 +44</option>
        <option value="CA">🇨🇦 +1</option>
        <option value="AU">🇦🇺 +61</option>
    </select>
<InputField
                  id="su_phone"
                  label="Téléphone"
                  type="tel"
                  placeholder="0791234567"
                  value={signupData.phone}
                  onChange={onSignupChange}
                  error={phoneError}
                 style={{ flex: 1 }} />
</div>
              </div>
              <InputField
                id="su_email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={signupData.email}
                onChange={onSignupChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-5"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Créer un compte"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <InputField
                id="li_email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={loginData.email}
                onChange={onLoginChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-5"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>
          )}

          <div className="pt-2">
            <p className="text-[11px] text-[color:var(--body)] leading-tight px-2">
              En continuant, vous acceptez nos{" "}
              <a
                href="/terms"
                className="underline hover:text-[color:var(--foreground)]"
              >
                Termes
              </a>{" "}
              et notre{" "}
              <a
                href="/privacy"
                className="underline hover:text-[color:var(--foreground)]"
              >
                Politique de confidentialité
              </a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
