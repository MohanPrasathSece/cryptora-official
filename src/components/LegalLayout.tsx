import { useEffect, useState } from "react";
import { Nav } from "./landing/Nav";
import { Footer } from "./landing/Sections";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  sections: { id: string; title: string }[];
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, sections, children }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Account for fixed header
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Nav />
      
      <main className="pt-32 pb-24 md:pt-40">
        <div className="container-1180">
          <div className="mb-12 md:mb-20">
            <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-4">{title}</h1>
            <p className="text-[color:var(--body)]">Last Updated: {lastUpdated}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 shrink-0 sticky top-32">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)] mb-6">Table of Contents</div>
              <nav className="flex flex-col gap-3 border-l border-[color:var(--border-soft)]">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left pl-4 py-1 text-[14px] transition-all border-l-2 -ml-[1px] ${
                      activeSection === section.id
                        ? "border-[color:var(--primary)] text-[color:var(--primary)] font-medium"
                        : "border-transparent text-[color:var(--body)] hover:text-[color:var(--foreground)]"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Mobile TOC Dropdown */}
            <div className="md:hidden w-full bg-[color:var(--surface)] border border-[color:var(--border-soft)] rounded-xl p-4 mb-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)] mb-3">Table of Contents</div>
              <select
                className="w-full bg-transparent text-[14px] text-[color:var(--foreground)] outline-none border border-[color:var(--border)] rounded-lg p-2"
                onChange={(e) => scrollToSection(e.target.value)}
                value={activeSection}
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Area */}
            <article className="legal-content flex-1 max-w-[800px]">
              {children}
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
