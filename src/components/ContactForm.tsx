import { useState } from "react";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country_name: "cy", // default to cyprus based on example, or could be empty
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await createLead(formData);

    if (success) {
      toast.success("Enquiry sent successfully. We'll be in touch!");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country_name: "cy",
        description: "",
      });
    } else {
      toast.error("Failed to send enquiry. Please try again later.");
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 border border-[color:var(--border)] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Get in touch</h3>
        <p className="text-[color:var(--body)] text-sm">Have a question or want to learn more about our trading platform? Drop us a line.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="John"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
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
            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="country_name" className="text-sm font-medium">Country Code</label>
          <input
            type="text"
            id="country_name"
            name="country_name"
            required
            value={formData.country_name}
            onChange={handleChange}
            className="w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="cy"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium">Enquiry</label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border border-[color:var(--border)] bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}
