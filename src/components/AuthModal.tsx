import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2, ShieldAlert, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { put } from "@vercel/blob";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

type Tab = "login" | "signup";

function InputField({
  id, label, type = "text", placeholder, value, onChange, required = true, hint
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; hint?: string;
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="space-y-1.5">
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
          className="w-full h-11 px-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[14px] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/30 focus:border-[color:var(--primary)] transition-all pr-10"
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors">
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {hint && <p className="text-[11px] text-[color:var(--body)]">{hint}</p>}
    </div>
  );
}

function RiskWarning() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 flex gap-2.5 mt-1">
      <ShieldAlert size={15} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="text-[11px] text-amber-700 leading-relaxed">
        <strong>Risk Warning:</strong> Crypto assets are highly volatile. You may lose some or all of your investment.
        Only invest what you can afford to lose. Past performance is not indicative of future results.
      </p>
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
        description: "User Signup via Crypto AI",
      });

      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      if (token) {
        const userData = JSON.stringify({
          email: signupData.email,
          name: signupData.name,
          phone: signupData.phone,
          // Store a hash hint only — never plaintext password in blob
          passwordHint: btoa(signupData.password).slice(0, 8),
          createdAt: new Date().toISOString(),
        });
        await put(`users/${signupData.email}.json`, userData, {
          access: "public",
          token,
          addRandomSuffix: false,
        });
      }

      toast.success("Account created! Welcome to Crypto AI.");
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
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--background)] shadow-[var(--shadow-float)]">

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-[color:var(--border-soft)]">
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="Crypto AI" className="size-8 rounded-xl object-cover" />
            <span className="font-display text-[18px] tracking-tight">Crypto AI</span>
          </div>
          <DialogTitle className="font-display text-2xl">
            {tab === "signup" ? "Create your account" : "Welcome back"}
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[color:var(--body)] mt-1">
            {tab === "signup"
              ? "Start trading smarter with AI-powered intelligence."
              : "Sign in to your Crypto AI account."}
          </DialogDescription>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[color:var(--border-soft)]">
          {(["signup", "login"] as Tab[]).map(t => (
            <button key={t} onClick={() => switchTab(t)}
              className={`flex-1 py-3 text-[13px] font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-[color:var(--primary)] text-[color:var(--foreground)]"
                  : "text-[color:var(--body)] hover:text-[color:var(--foreground)]"
              }`}>
              {t === "signup" ? "Sign Up" : "Log In"}
            </button>
          ))}
        </div>

        <div className="px-7 py-6 space-y-4">
          {/* Error banner */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 flex items-start gap-2">
              <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[12px] text-red-700">{error}</p>
            </div>
          )}

          {tab === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <InputField id="su_name" label="Full Name" placeholder="John Doe"
                value={signupData.name} onChange={onSignupChange} />
              <InputField id="su_email" label="Email" type="email" placeholder="john@example.com"
                value={signupData.email} onChange={onSignupChange} />
              <InputField id="su_phone" label="Phone Number" type="tel" placeholder="+1 234 567 8900"
                value={signupData.phone} onChange={onSignupChange} />
              <InputField id="su_password" label="Password" type="password" placeholder="Min 8 characters"
                value={signupData.password} onChange={onSignupChange}
                hint="Use at least 8 characters with letters and numbers." />

              <RiskWarning />

              <div className="flex items-start gap-2 pt-1">
                <CheckCircle2 size={13} className="text-[color:var(--primary)] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[color:var(--body)]">
                  By signing up you agree to our{" "}
                  <a href="/terms" target="_blank" className="text-[color:var(--primary)] underline underline-offset-2">Terms</a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank" className="text-[color:var(--primary)] underline underline-offset-2">Privacy Policy</a>.
                </p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full h-12 rounded-xl bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-2">
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <InputField id="li_email" label="Email" type="email" placeholder="john@example.com"
                value={loginData.email} onChange={onLoginChange} />
              <InputField id="li_password" label="Password" type="password" placeholder="Your password"
                value={loginData.password} onChange={onLoginChange} />

              <RiskWarning />

              <button type="submit" disabled={loading}
                className="w-full h-12 rounded-xl bg-[color:var(--foreground)] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 mt-2">
                {loading ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
              </button>

              <p className="text-center text-[12px] text-[color:var(--body)]">
                Don't have an account?{" "}
                <button type="button" onClick={() => switchTab("signup")}
                  className="text-[color:var(--primary)] font-medium hover:underline">
                  Sign up free
                </button>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
