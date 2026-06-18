import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { put } from "@vercel/blob";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Tab = "login" | "signup";

function InputField({
  id, label, type = "text", placeholder, value, onChange, required = true
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={id} className="text-[13px] font-medium text-[color:var(--foreground)]">
        {label}{!required && <span className="text-[color:var(--body)] ml-1">(optional)</span>}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPw ? "text" : type}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full h-11 px-3.5 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-[14px] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/30 focus:border-[color:var(--primary)] transition-all pr-10"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPw(p => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({ name: "", email: "", phone: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const onSignupChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignupData(p => ({ ...p, [e.target.id.replace("su_", "")]: e.target.value }));

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData(p => ({ ...p, [e.target.id.replace("li_", "")]: e.target.value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const parts = signupData.name.trim().split(" ");
      await createLead({
        first_name: parts[0] || "User",
        last_name: parts.slice(1).join(" ") || "Unknown",
        email: signupData.email,
        phone: signupData.phone,
        country_name: "cy",
        description: "User Signup via Cryptora",
      });

      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      if (token) {
        const userData = JSON.stringify({
          email: signupData.email,
          name: signupData.name,
          phone: signupData.phone,
          passwordHint: btoa(signupData.password).slice(0, 8),
          createdAt: new Date().toISOString(),
        });
        await put(`users/${signupData.email}.json`, userData, {
          access: "public",
          token,
          addRandomSuffix: false,
        });
      }

      toast.success("Account created! Welcome to Cryptora.");
      onOpenChange(false);
      navigate("/trading");
    } catch (err) {
      console.error(err);
      setError("Failed to create account. Please try again.");
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
      if (!token) {
        toast.success("Welcome back!");
        onOpenChange(false);
        navigate("/trading");
        return;
      }

      const res = await fetch(
        `https://blob.vercel-storage.com?prefix=users/${encodeURIComponent(loginData.email)}.json`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      if (!data.blobs || data.blobs.length === 0) {
        throw new Error("No account found with that email.");
      }

      toast.success("Welcome back!");
      onOpenChange(false);
      navigate("/trading");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed.";
      setError(message === "No account found with that email."
        ? "No account found. Please sign up first."
        : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: Tab) => { setTab(t); setError(null); };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] sm:h-[480px] p-0 overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--background)] shadow-xl text-center flex flex-col">

        {/* Header */}
        <div className="pt-8 pb-2 px-8 flex flex-col items-center">
          <img src="/logo.png" alt="Cryptora" className="size-12 rounded-xl object-cover mb-4" />
          <DialogTitle className="font-display text-2xl tracking-tight">
            {tab === "signup" ? "Create an account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-[14px] text-[color:var(--body)] mt-1.5">
            {tab === "signup"
              ? "Start trading smarter today."
              : "Sign in to your account."}
          </DialogDescription>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-8 mb-0 mt-2 bg-[color:var(--surface)] p-1 rounded-lg shrink-0">
          {(["signup", "login"] as Tab[]).map(t => (
            <button key={t} onClick={() => switchTab(t)}
              className={`flex-1 py-2 text-[13px] font-medium rounded-md transition-all ${
                tab === t
                  ? "bg-white text-[color:var(--foreground)] shadow-sm"
                  : "text-[color:var(--body)] hover:text-[color:var(--foreground)]"
              }`}>
              {t === "signup" ? "Sign Up" : "Log In"}
            </button>
          ))}
        </div>

        <div className="px-8 pb-8 flex-1 flex flex-col justify-center">
          {/* Error banner */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 flex items-start gap-2 text-left">
              <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-red-700 leading-tight">{error}</p>
            </div>
          )}

          {tab === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4 w-full">
              <div className="grid grid-cols-2 gap-3">
                <InputField id="su_name" label="Full Name" placeholder="John Doe"
                  value={signupData.name} onChange={onSignupChange} />
                <InputField id="su_phone" label="Phone" type="tel" placeholder="+1 234 567"
                  value={signupData.phone} onChange={onSignupChange} />
              </div>
              <InputField id="su_email" label="Email" type="email" placeholder="john@example.com"
                value={signupData.email} onChange={onSignupChange} />
              <InputField id="su_password" label="Password" type="password" placeholder="Min 8 characters"
                value={signupData.password} onChange={onSignupChange} />

              <button type="submit" disabled={loading}
                className="w-full h-11 rounded-lg bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-5">
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 w-full">
              <InputField id="li_email" label="Email" type="email" placeholder="john@example.com"
                value={loginData.email} onChange={onLoginChange} />
              <InputField id="li_password" label="Password" type="password" placeholder="Your password"
                value={loginData.password} onChange={onLoginChange} />

              <button type="submit" disabled={loading}
                className="w-full h-11 rounded-lg bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-5">
                {loading ? <Loader2 className="size-4 animate-spin" /> : "Sign In"}
              </button>
            </form>
          )}

          <div className="mt-auto pt-4">
            <p className="text-[11px] text-[color:var(--body)] leading-tight px-2">
              By continuing, you agree to our <a href="/terms" className="underline hover:text-[color:var(--foreground)]">Terms</a> and <a href="/privacy" className="underline hover:text-[color:var(--foreground)]">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
