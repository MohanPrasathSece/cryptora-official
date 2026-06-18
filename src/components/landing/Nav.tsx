import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";

export function Nav({ onAuthOpen }: { onAuthOpen?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let loggedIn = false;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.startsWith("user_")) {
        loggedIn = true;
        break;
      }
    }
    // Also consider them logged in if they are on /trading just in case
    setIsLoggedIn(loggedIn || location.pathname === "/trading");
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Plateforme", id: "platform" },
    { label: "Technologie", id: "technology" },
    { label: "IA", id: "ai" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const isHome = location.pathname === "/";

    if (isHome) {
      // Already on home page — just scroll
      setMobileMenuOpen(false);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On a different page — navigate home then scroll
      setMobileMenuOpen(false);
      navigate("/");
      // Wait for navigation + render, then scroll
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (location.pathname === "/trading") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/trading");
      }
    } else {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 ${
        scrolled
          ? "bg-[color:var(--background)]/75 backdrop-blur-xl border-b border-[color:var(--border-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-1400 flex h-16 md:h-20 items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer">
          <img src="/logo.png" alt="Cryptora Logo" className="h-9 w-auto object-contain" />
        </a>

        {!isLoggedIn ? (
          <>
            <nav className="hidden md:flex items-center gap-9">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className="text-[13px] text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => { if (onAuthOpen) onAuthOpen(); }}
                className="inline-flex items-center h-10 px-4 text-[13px] text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors cursor-pointer"
              >
                Se connecter
              </button>
              <button
                onClick={() => { if (onAuthOpen) onAuthOpen(); }}
                className="inline-flex items-center h-10 px-5 rounded-full bg-[color:var(--foreground)] text-white text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(17,17,17,0.4)] cursor-pointer"
              >
                Commencer
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-[color:var(--foreground)]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </>
        ) : (
          <div className="flex items-center">
            <button
              onClick={() => {
                // simple logout
                for (let i = localStorage.length - 1; i >= 0; i--) {
                  const key = localStorage.key(i);
                  if (key?.startsWith("user_")) {
                    localStorage.removeItem(key);
                  }
                }
                setIsLoggedIn(false);
                setMobileMenuOpen(false);
                navigate("/");
              }}
              className="inline-flex items-center h-10 px-5 rounded-full bg-[color:var(--surface)] text-[color:var(--foreground)] text-[13px] font-medium transition-all hover:bg-[color:var(--border-soft)] cursor-pointer"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && !isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[color:var(--background)] flex flex-col px-6 py-8"
          >
            <div className="flex items-center justify-between mb-12">
              <a href="/" onClick={(e) => { setMobileMenuOpen(false); handleLogoClick(e); }} className="flex items-center gap-2.5 cursor-pointer">
                <img src="/logo.png" alt="Cryptora Logo" className="h-9 w-auto object-contain" />
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[color:var(--foreground)]">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-medium mb-12">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className="text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-auto">
              <button
                onClick={() => { setMobileMenuOpen(false); if (onAuthOpen) onAuthOpen(); }}
                className="w-full inline-flex items-center justify-center h-12 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] font-medium"
              >
                Se connecter
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); if (onAuthOpen) onAuthOpen(); }}
                className="w-full inline-flex items-center justify-center h-12 rounded-full bg-[color:var(--foreground)] text-white font-medium shadow-[0_10px_30px_-10px_rgba(17,17,17,0.4)]"
              >
                Commencer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
