import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Nav } from "@/components/landing/Nav";
import { MacbookCandlestick } from "@/components/MacbookCandlestick";
import { TickerTape } from "@/components/landing/Trading";
import {
  TrustBar,
  Overview,
  FeatureGrid,
  AISection,
  Process,
  Metrics,
  WhyUs,
  Showcase,
  Testimonials,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing/Sections";
import { ContactForm } from "@/components/ContactForm";
import { AuthModal } from "@/components/AuthModal";

function HeadlineWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom pr-[0.18em] last:pr-0">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Hero({ onAuthOpen }: { onAuthOpen: () => void }) {
  const line1 = ["Trade", "smarter."];
  const line2 = ["Think", "longer."];
  const line3 = ["Build", "wealth", "intelligently."];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-24 noise grain-bg overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      <div className="container-1400 relative grid md:grid-cols-12 gap-12 md:gap-8 items-center">
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white hairline px-3 py-1.5 text-[12px]"
          >
            <span className="size-1.5 rounded-full bg-[color:var(--primary)] animate-pulse-soft" />
            <span className="text-[color:var(--body)]">Now live · Crypto AI AI 2.0</span>
          </motion.div>

          <h1 className="font-display text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] tracking-[-0.04em] mt-8">
            <div>
              {line1.map((w, i) => (
                <HeadlineWord key={i} delay={0.4 + i * 0.07}>
                  {w}
                </HeadlineWord>
              ))}
            </div>
            <div>
              {line2.map((w, i) => (
                <HeadlineWord key={i} delay={0.6 + i * 0.07}>
                  {w}
                </HeadlineWord>
              ))}
            </div>
            <div className="text-[color:var(--primary)] italic">
              {line3.map((w, i) => (
                <HeadlineWord key={i} delay={0.85 + i * 0.07}>
                  {w}
                </HeadlineWord>
              ))}
            </div>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            className="origin-left h-px bg-[color:var(--border)] mt-12 max-w-md"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="text-[17px] md:text-[18px] text-[color:var(--body)] mt-8 max-w-lg leading-[1.7]"
          >
            Experience a beautifully designed platform combining artificial intelligence,
            automation, and real-time market intelligence to help you understand digital finance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.45 }}
            className="mt-10 flex items-center gap-3 flex-wrap relative z-20"
          >
            <button
              onClick={onAuthOpen}
              className="group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-[color:var(--foreground)] text-white text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(17,17,17,0.5)]"
            >
              Sign Up
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onAuthOpen}
              className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white hairline text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              Log In
            </button>
          </motion.div>
        </div>

        <div className="md:col-span-6">
          <MacbookCandlestick />
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <main className="bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Nav onAuthOpen={() => setAuthOpen(true)} />
      <div className="fixed top-16 md:top-20 inset-x-0 z-40 pointer-events-none">
        <TickerTape />
      </div>
      <Hero onAuthOpen={() => setAuthOpen(true)} />
      <TrustBar />
      <Overview />
      <FeatureGrid />
      <AISection />
      <Process />
      <Metrics />
      <WhyUs />
      <Showcase />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      
      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-white/5 relative z-10">
        <div className="container-1400">
          <ContactForm />
        </div>
      </section>

      <Footer />
      <AuthModal isOpen={authOpen} onOpenChange={setAuthOpen} />
    </main>
  );
}
