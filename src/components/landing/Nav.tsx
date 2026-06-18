import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

export function Nav({ onAuthOpen }: { onAuthOpen?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Platform", id: "platform" },
    { label: "Technology", id: "technology" },
    { label: "AI", id: "ai" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const isHome = location.pathname === "/";

    if (isHome) {
      // Already on home page — just scroll
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On a different page — navigate home then scroll
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
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
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
          <img src="/logo.png" alt="Crypto AI Logo" className="size-9 rounded-xl object-cover" />
          <span className="font-display text-[22px] tracking-tight">Crypto AI</span>
        </a>

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (onAuthOpen) onAuthOpen(); }}
            className="hidden sm:inline-flex items-center h-10 px-4 text-[13px] text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => { if (onAuthOpen) onAuthOpen(); }}
            className="inline-flex items-center h-10 px-5 rounded-full bg-[color:var(--foreground)] text-white text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(17,17,17,0.4)] cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </motion.header>
  );
}
