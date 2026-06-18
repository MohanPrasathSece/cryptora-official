import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Platform", "Technology", "AI", "Security", "Pricing", "Company"];

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
        <a href="#" className="flex items-center gap-2.5">
          <span className="relative grid place-items-center size-8 rounded-full bg-[color:var(--foreground)]">
            <span className="size-2.5 rounded-full bg-[color:var(--primary-soft)]" />
          </span>
          <span className="font-display text-[22px] tracking-tight">Lumen</span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[13px] text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:inline-flex items-center h-10 px-4 text-[13px] text-[color:var(--body)] hover:text-[color:var(--foreground)] transition-colors"
          >
            Sign in
          </a>
          <a
            href="#"
            className="inline-flex items-center h-10 px-5 rounded-full bg-[color:var(--foreground)] text-white text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(17,17,17,0.4)]"
          >
            Get started
          </a>
        </div>
      </div>
    </motion.header>
  );
}
