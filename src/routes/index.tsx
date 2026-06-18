import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Nav } from "@/components/landing/Nav";
import { FloatingDashboard } from "@/components/landing/Dashboard";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Intelligent Digital Finance" },
      {
        name: "description",
        content:
          "A calm, AI-powered platform for understanding and growing your digital assets — designed for clarity, built for confidence.",
      },
      { property: "og:title", content: "Lumen — Intelligent Digital Finance" },
      {
        property: "og:description",
        content:
          "Build smarter financial strategies using AI-powered insights, automation, and real-time analytics in a beautifully designed platform.",
      },
    ],
  }),
  component: Index,
});

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

function Hero() {
  const line1 = ["Trade", "smarter."];
  const line2 = ["Think", "longer."];
  const line3 = ["Build", "wealth", "intelligently."];

  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-24 noise grain-bg overflow-hidden">
      {/* subtle dot grid */}
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
            <span className="text-[color:var(--body)]">Now live · Lumen AI 2.0</span>
          </motion.div>

          <h1 className="font-display text-[64px] sm:text-[84px] md:text-[92px] leading-[0.98] tracking-[-0.04em] mt-8">
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
            className="mt-10 flex items-center gap-3 flex-wrap"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-[color:var(--foreground)] text-white text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(17,17,17,0.5)]"
            >
              Start free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white hairline text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              Explore platform
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-10 text-[12px] uppercase tracking-[0.22em] text-[color:var(--body)]"
          >
            Trusted by investors, analysts and innovators worldwide
          </motion.div>
        </div>

        <div className="md:col-span-6">
          <FloatingDashboard />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Nav />
      <div className="fixed top-16 md:top-20 inset-x-0 z-40">
        <TickerTape />
      </div>
      <Hero />
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
      <Footer />
    </main>
  );
}
