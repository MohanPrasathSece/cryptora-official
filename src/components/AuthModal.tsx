import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLead } from "@/lib/crm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { put } from "@vercel/blob";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const parts = signupData.name.trim().split(" ");
      const first_name = parts[0] || "User";
      const last_name = parts.slice(1).join(" ") || "Unknown";

      // 1. Create lead in CRM
      const crmSuccess = await createLead({
        first_name,
        last_name,
        email: signupData.email,
        phone: signupData.phone,
        country_name: "cy",
        description: "User Signup",
      });

      if (!crmSuccess) {
        throw new Error("CRM registration failed.");
      }

      // 2. Upload user to Vercel Blob
      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      if (!token) {
        console.warn("No VITE_BLOB_READ_WRITE_TOKEN provided, skipping blob storage.");
      } else {
        const userData = JSON.stringify({
          email: signupData.email,
          name: signupData.name,
        });
        
        await put(`users/${signupData.email}.json`, userData, {
          access: "public",
          token: token,
          addRandomSuffix: false, // Override existing user if any
        });
      }

      toast.success("Account created successfully!");
      onOpenChange(false);
      navigate("/trading");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
      if (!token) {
        console.warn("No VITE_BLOB_READ_WRITE_TOKEN provided, allowing mock login.");
        setTimeout(() => {
          setLoading(false);
          toast.success("Welcome back!");
          onOpenChange(false);
          navigate("/trading");
        }, 1000);
        return;
      }

      const res = await fetch(`https://blob.vercel-storage.com?prefix=users/${loginData.email}.json`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (!data.blobs || data.blobs.length === 0) {
        throw new Error("Account not found");
      }

      toast.success("Welcome back!");
      onOpenChange(false);
      navigate("/trading");
    } catch (error) {
      console.error(error);
      toast.error("Account not found. Please sign up first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-background border-border">
        <div className="p-6">
          <DialogTitle className="text-2xl font-semibold mb-1">Welcome to Crypto AI</DialogTitle>
          <DialogDescription className="text-muted-foreground mb-6">
            Intelligent digital finance starts here.
          </DialogDescription>
          
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <label htmlFor="login_email" className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="login_email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
                </button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <label htmlFor="su_name" className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    id="su_name"
                    name="name"
                    required
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="John Doe"
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="su_email" className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="su_email"
                    name="email"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="john@example.com"
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="su_phone" className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    id="su_phone"
                    name="phone"
                    required
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    placeholder="+1 234 567 8900"
                    className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-50 mt-6"
                >
                  {loading ? <Loader2 className="size-5 animate-spin" /> : "Create Account"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
