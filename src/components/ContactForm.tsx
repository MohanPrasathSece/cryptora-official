import { useState } from "react";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Swiss phone regex: accepts +41, 0041, or local 0/no-prefix formats
const SWISS_PHONE_REGEX = /^(\+41|0041|0)?[1-9]\d{8}$/;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear phone error as the user edits the field
    if (name === "phone") setPhoneError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strip all whitespace the user may have typed
    const cleanPhone = formData.phone.replace(/\s+/g, "");

    // Real-time Swiss phone validation
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

    const success = await createLead({
      name: formData.name,
      email: formData.email,
      number: cleanPhone,
      description: "Cryptora",
    });

    if (success) {
      try {
        const url = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Cryptora", type: "contact", name: formData.name, email: formData.email})
        }).catch(() => {});
      } catch (e: any) {
      const rawMsg = (e?.message || e?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
        toast.success("Vous nous avez déjà contactés. Veuillez patienter.");
        setLoading(false);
        return;
      }
}
      toast.success("Demande envoyée avec succès. Nous vous contacterons !");
      setFormData({ name: "", email: "", phone: "", countryCode: typeof formData !== 'undefined' ? formData.get('countryCode') : 'CH', description: "" });
      setPhoneError(null);
    } else {
      toast.error("Échec de l'envoi de la demande. Veuillez réessayer plus tard.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 border border-[color:var(--border)] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Entrer en contact</h3>
        <p className="text-[color:var(--body)] text-sm">
          Vous avez une question ou vous voulez en savoir plus sur notre
          plateforme de trading ? Laissez-nous un message.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Téléphone
            </label>
            
<div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    <select name="countryCode" style={{ width: '110px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', padding: '0.8rem', fontFamily: 'inherit' }}>
        <option value="CH">🇨🇭 +41</option>
        <option value="GB">🇬🇧 +44</option>
        <option value="CA">🇨🇦 +1</option>
        <option value="AU">🇦🇺 +61</option>
    </select>
<input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={`w-full h-11 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 transition-colors ${
                phoneError
                  ? "border-red-400 focus:ring-red-200"
                  : "border-[color:var(--border)] focus:ring-primary/20"
              }`}
              placeholder="0791234567"
             style={{ flex: 1 }} />
</div>
            {phoneError && (
              <p className="text-[11.5px] text-red-600 leading-tight mt-1">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            Message{" "}
            <span className="text-[color:var(--body)] font-normal">
              (Optionnel)
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Comment pouvons-nous vous aider ?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            "Envoyer la demande"
          )}
        </button>
      </form>
    </div>
  );
}
