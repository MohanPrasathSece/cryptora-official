import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Brain,
  LineChart,
  Workflow,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  Layers,
  CircleDot,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

/* --------------------------------- Reveal --------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Eyebrow -------------------------------- */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--body)]">
      <span className="h-px w-8 bg-[color:var(--border)]" />
      {children}
    </div>
  );
}

/* --------------------------------- Trust ---------------------------------- */
export function TrustBar() {
  const items = [
    "Infrastructure sécurisée",
    "Analyses avancées",
    "Surveillance 24/7",
    "Sécurité d'entreprise",
    "Aperçus en temps réel",
    "ISO 27001",
    "SOC 2 Type II",
  ];
  const row = [...items, ...items];
  return (
    <section className="py-16 md:py-20 border-y border-[color:var(--border-soft)] overflow-hidden">
      <div className="container-1400">
        <div className="text-center text-[11px] uppercase tracking-[0.24em] text-[color:var(--body)] mb-10">
          Approuvé par des investisseurs, analystes et innovateurs modernes du monde entier
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[color:var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-16 animate-marquee whitespace-nowrap will-change-transform">
          {row.map((it, i) => (
            <div key={i} className="flex items-center gap-3 text-[color:var(--body)]">
              <CircleDot size={14} className="opacity-50" />
              <span className="text-[15px] tracking-tight">{it}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Overview ------------------------------- */
export function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 60, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  return (
    <section id="platform" ref={sectionRef} className="py-24 md:py-40">
      <div className="container-1400 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>La Plateforme</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-6 text-balance">
              Construite autour de la <em className="italic text-[color:var(--primary)]">simplicité</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-[color:var(--body)] mt-8 max-w-md">
              Des tableaux de bord épurés. Assistance par IA. L'automatisation là où ça compte. Un espace de travail pour
              la finance moderne, conçu pour supprimer les frictions et révéler ce qui fait vraiment bouger
              votre portefeuille.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#technology"
              className="inline-flex items-center gap-2 mt-10 text-[14px] text-[color:var(--foreground)] group"
            >
              En savoir plus
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-[color:var(--border)] transition-all group-hover:bg-[color:var(--foreground)] group-hover:text-white group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-7 relative">
          <motion.div style={{ y, scale }}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-[color:var(--accent)]/60 to-transparent blur-2xl" />
              <div className="card-surface relative overflow-hidden p-2 mt-12 md:mt-0">
                <div className="rounded-[22px] bg-[color:var(--surface)] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 min-h-[420px]">
                  <div className="col-span-1 sm:col-span-2 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Espace de travail</div>
                      <div className="font-display text-3xl mt-1">Vue d'aujourd'hui</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-[color:var(--body)]">
                      <Search size={14} /> Recherche
                    </div>
                  </div>
                  {[
                    { label: "Positions", v: "12", note: "équilibré" },
                    { label: "Signaux", v: "4", note: "aujourd'hui" },
                    { label: "Baisse", v: "-1.2%", note: "30j" },
                    { label: "Rendement", v: "5.8%", note: "stable" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white hairline p-5">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">{s.label}</div>
                      <div className="font-display text-4xl mt-2">{s.v}</div>
                      <div className="text-xs text-[color:var(--body)] mt-1">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Bento features ---------------------------- */
export function FeatureGrid() {
  return (
    <section id="technology" className="py-32 md:py-40 bg-[color:var(--surface)]">
      <div className="container-1400">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Capacités</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-6 text-balance">
              Une couche d'intelligence complète pour vos actifs.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-16">
          <Reveal className="md:col-span-4 md:row-span-2">
            <FeatureCard
              big
              icon={<Brain size={18} />}
              title="Aperçus de l'IA"
              body="Des modèles formés sur des données macro, on-chain et de sentiment font ressortir ce qui compte avant que le marché ne bouge."
            >
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Macro", "On-chain", "Sentiment"].map((t) => (
                  <div key={t} className="rounded-xl bg-[color:var(--surface)] px-3 py-2 text-xs text-[color:var(--body)]">
                    {t}
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-2">
            <FeatureCard icon={<Workflow size={18} />} title="Automatisation" body="Définissez des règles en langage clair. Cryptora exécute les parties ennuyeuses." />
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <FeatureCard icon={<LineChart size={18} />} title="Suivi de portefeuille" body="Une vue tranquille de chaque position, solde et exposition." />
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <FeatureCard icon={<Layers size={18} />} title="Analyses avancées" body="Backtestez, comparez et étudiez chaque décision que vous prenez." />
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2">
            <FeatureCard icon={<ShieldCheck size={18} />} title="Sécurité d'entreprise" body="Chiffrement matériel, audité de bout en bout." />
          </Reveal>

          <Reveal delay={0.25} className="md:col-span-2">
            <FeatureCard icon={<Search size={18} />} title="Recherche de marché" body="Une bibliothèque de recherche qui se met à jour, chaque matin." />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  big,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  big?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`group h-full card-surface p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-[color:var(--primary)]/30`}
    >
      <div className="inline-flex size-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--primary)]">
        {icon}
      </div>
      <h3 className={`mt-6 ${big ? "font-display text-3xl" : "text-xl font-semibold"} tracking-tight`}>{title}</h3>
      <p className="mt-3 text-[15px] text-[color:var(--body)] max-w-sm">{body}</p>
      {children}
    </div>
  );
}

/* --------------------------------- AI ------------------------------------ */
export function AISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="ai" ref={sectionRef} className="py-32 md:py-40">
      <div className="container-1400 grid md:grid-cols-12 gap-16 items-center">
        <Reveal className="md:col-span-6 order-2 md:order-1">
          <motion.div style={{ y }} className="relative mx-auto max-w-[320px]">
            <div className="absolute -inset-10 bg-[color:var(--accent)]/50 blur-3xl rounded-full" />
            <div className="relative rounded-[44px] bg-[color:var(--foreground)] p-2 shadow-[var(--shadow-float)]">
              <div className="rounded-[36px] bg-[color:var(--background)] aspect-[9/19] overflow-hidden p-5">
                <div className="flex items-center justify-between text-[10px] text-[color:var(--body)]">
                  <span>9:41</span>
                  <span>•••</span>
                </div>
                <div className="mt-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Cryptora AI</div>
                  <div className="font-display text-3xl mt-2">Bonjour, Sara.</div>
                  <div className="text-xs text-[color:var(--body)] mt-2">
                    Trois aperçus prêts à être examinés.
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    "Baisse de la volatilité sur les majeures",
                    "La stratégie de rendement surperforme",
                    "Rééquilibrage suggéré",
                  ].map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.7 }}
                      className="rounded-2xl bg-white hairline p-3 text-[13px]"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-[color:var(--primary)]" />
                        {t}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        <div className="md:col-span-6 order-1 md:order-2">
          <Reveal>
            <Eyebrow>Intelligence</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-6 text-balance">
              Un assistant qui <em className="italic text-[color:var(--primary)]">anticipe</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-[color:var(--body)] mt-6 max-w-md">
              Cryptora AI lit le marché pour que vous n'ayez pas à le faire. Il étudie, résume et
              suggère discrètement - laissant chaque décision exactement là où elle doit être : avec vous.
            </p>
          </Reveal>
          <div className="mt-10 divide-y divide-[color:var(--border-soft)]">
            {[
              { t: "Recherche de marché IA", d: "Mémos quotidiens à partir d'une douzaine de sources." },
              { t: "Reconnaissance de tendances", d: "Détection de modèles sur différentes périodes." },
              { t: "Notifications intelligentes", d: "Calme par défaut. Bruyant quand ça compte." },
              { t: "Suggestions de portefeuille", d: "Rééquilibrages formulés en langage clair." },
              { t: "Surveillance des risques", d: "Un œil vigilant, toujours ouvert." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <div className="py-5 flex items-start gap-6 group">
                  <span className="text-[11px] tracking-[0.2em] text-[color:var(--body)] mt-1.5 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="text-lg font-medium">{f.t}</div>
                    <div className="text-[14px] text-[color:var(--body)] mt-0.5">{f.d}</div>
                  </div>
                  <ArrowRight size={16} className="mt-2 text-[color:var(--body)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Process -------------------------------- */
export function Process() {
  const steps = [
    { n: "01", t: "Créer un compte", d: "Commencez en moins d'une minute." },
    { n: "02", t: "Connecter le portefeuille", d: "Liez vos actifs en toute sécurité." },
    { n: "03", t: "Recevoir les aperçus IA", d: "Intelligence quotidienne, sur mesure." },
    { n: "04", t: "Suivre la performance", d: "Clarté tranquille, chaque jour." },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.3"] });

  return (
    <section className="py-32 md:py-40 bg-[color:var(--surface)]">
      <div className="container-1400">
        <Reveal>
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-6 max-w-xl">
            Configuration en quelques minutes. Perfectionné pendant des années.
          </h2>
        </Reveal>
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-16 relative">
          {/* Animated progress line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-[color:var(--border)]">
            <motion.div
              className="h-full bg-[color:var(--primary)] origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          {steps.map((s, i) => {
            const start = i / steps.length;
            const end = (i + 1) / steps.length;
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end], [0.4, 1, 1]);
            const y = useTransform(scrollYProgress, [start, start + 0.15], [30, 0]);
            const scale = useTransform(scrollYProgress, [start, start + 0.15], [0.96, 1]);
            return (
              <motion.div key={s.n} style={{ opacity, y, scale }}>
                <div className="relative card-surface p-8 h-full">
                  <div className="size-9 grid place-items-center rounded-full bg-[color:var(--background)] hairline text-[11px] tracking-[0.18em]">
                    {s.n}
                  </div>
                  <div className="font-display text-2xl mt-6">{s.t}</div>
                  <div className="text-[14px] text-[color:var(--body)] mt-2">{s.d}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ---------------------------- Why choose us ------------------------------- */
export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const items = [
    { t: "Interface minimale", d: "Une surface calme qui ne vous encombre pas." },
    { t: "Intelligence Artificielle", d: "Intelligent, transparent, toujours explicable." },
    { t: "Sécurité d'entreprise", d: "Audité indépendamment et testé en continu." },
    { t: "Innovation continue", d: "Une plateforme qui s'améliore discrètement, chaque semaine." },
  ];
  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative overflow-hidden">
      {/* Parallax background blob */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[color:var(--accent)] to-transparent blur-3xl opacity-60 pointer-events-none"
      />
      <div className="container-1400 grid md:grid-cols-12 gap-16 relative">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>Pourquoi Cryptora</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-6 text-balance">
              Une technologie conçue autour des décisions <em className="italic text-[color:var(--primary)]">humaines</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-[color:var(--body)] mt-8 max-w-md">
              Nous pensons que la finance devrait moins ressembler à un cockpit et plus à un studio silencieux. Cryptora met les outils en avant seulement quand vous en avez besoin.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="card-surface p-7 h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <TrendingUp size={18} className="text-[color:var(--primary)]" />
                <div className="font-display text-2xl mt-5">{it.t}</div>
                <div className="text-[14px] text-[color:var(--body)] mt-2">{it.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Showcase ------------------------------- */
export function Showcase() {
  return (
    <section className="py-32 md:py-40 bg-[color:var(--surface)] overflow-hidden">
      <div className="container-1400">
        <Reveal className="text-center max-w-2xl mx-auto">
          <Eyebrow>Conçu pour la clarté</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-6 text-balance">
            Une surface pour tout ce qui compte.
          </h2>
          <p className="text-[17px] text-[color:var(--body)] mt-6">
            Un espace de travail unique et magnifiquement composé - pour la recherche, l'automatisation et la réflexion.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-20 mx-auto max-w-5xl">
            <div className="absolute -inset-10 rounded-[80px] bg-gradient-to-br from-[color:var(--primary-soft)]/20 to-transparent blur-3xl" />
            {/* laptop */}
            <div className="relative rounded-t-[28px] bg-[color:var(--foreground)] p-3 shadow-[var(--shadow-float)]">
              <div className="rounded-[20px] overflow-hidden bg-[color:var(--background)] aspect-[16/10] grid grid-cols-12">
                <aside className="col-span-3 bg-[color:var(--surface)] p-5 border-r border-[color:var(--border-soft)] hidden sm:block">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Espace de travail</div>
                  <div className="mt-4 space-y-2 text-[13px]">
                    {["Aperçu", "Recherche", "Stratégies", "Automatisation", "Rapports"].map((t, i) => (
                      <div
                        key={t}
                        className={`px-3 py-2 rounded-lg ${i === 0 ? "bg-white hairline" : "text-[color:var(--body)]"}`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </aside>
                <div className="col-span-12 sm:col-span-9 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Aperçu</div>
                      <div className="font-display text-3xl mt-1">Portefeuille</div>
                    </div>
                    <div className="text-xs text-[color:var(--body)]">30 derniers jours</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {[
                      { l: "Valeur", v: "$248.9k", c: "+2.4%" },
                      { l: "Volatilité", v: "Faible", c: "stable" },
                      { l: "Rendement", v: "5.8%", c: "+0.4%" },
                    ].map((s) => (
                      <div key={s.l} className="rounded-xl hairline p-4 bg-white">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">{s.l}</div>
                        <div className="font-display text-2xl mt-1.5">{s.v}</div>
                        <div className="text-xs text-[color:var(--primary)] mt-0.5">{s.c}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl hairline bg-white p-4">
                    <svg viewBox="0 0 400 100" className="w-full h-24">
                      <defs>
                        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#3F7F73" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3F7F73" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,70 C40,60 70,40 110,45 C150,50 180,80 220,60 C260,40 290,15 340,25 C380,33 390,50 400,40 L400,100 L0,100 Z"
                        fill="url(#g2)"
                      />
                      <path
                        d="M0,70 C40,60 70,40 110,45 C150,50 180,80 220,60 C260,40 290,15 340,25 C380,33 390,50 400,40"
                        fill="none"
                        stroke="#3F7F73"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-3 bg-[color:var(--foreground)] rounded-b-3xl mx-12" />
            <div className="h-1 bg-[color:var(--foreground)]/60 rounded-b-full mx-32" />

            {/* floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="hidden md:block absolute -left-8 top-1/3 card-surface p-4 w-56 animate-float-y"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Notification</div>
              <div className="text-[13px] mt-2">La stratégie de rendement dépasse l'indice de référence de +1.8%</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="hidden md:block absolute -right-6 bottom-16 card-surface p-4 w-60 animate-float-x"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">
                <Bell size={12} /> Aperçu
              </div>
              <div className="text-[13px] mt-2">Baisse de la volatilité - envisagez des horizons plus longs.</div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------------------------------- FAQ ----------------------------------- */
export function FAQ() {
  const items = [
    { q: "Comment l'IA aide-t-elle à l'analyse ?", a: "Cryptora mélange les données de marché, on-chain et macro pour produire des signaux explicables. Vous voyez toujours le raisonnement derrière une suggestion - et gardez le contrôle de chaque action." },
    { q: "La plateforme est-elle adaptée aux débutants ?", a: "Oui. L'interface est conçue pour ne faire ressortir que ce dont vous avez besoin. Des explications en langage clair accompagnent chaque graphique, signal et métrique." },
    { q: "Comment la sécurité est-elle gérée ?", a: "Audits indépendants, gestion des clés au niveau matériel et accès au moindre privilège par défaut. Vous pouvez révoquer n'importe quelle session en un clic." },
    { q: "Puis-je accéder aux rapports sur mobile ?", a: "L'expérience mobile reflète celle du bureau - même clarté, même rapidité, même calme." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32 md:py-40 bg-[color:var(--surface)]">
      <div className="container-1400 grid md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-6">Foire aux questions.</h2>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <div className="card-surface divide-y divide-[color:var(--border-soft)]">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={it.q}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left p-7 md:p-8 group"
                >
                  <div className="flex items-center justify-between gap-6">
                    <span className="font-display text-2xl">{it.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-[color:var(--primary)]" : "text-[color:var(--body)]"}`}
                    />
                  </div>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[16px] text-[color:var(--body)] pt-4 max-w-2xl">{it.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Final CTA ------------------------------ */
export function FinalCTA({ onAuthOpen }: { onAuthOpen?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="py-36 md:py-48 overflow-hidden relative">
      <motion.div style={{ scale, y }} className="container-1180 text-center relative z-10">
        <div className="absolute inset-0 -z-10 grain-bg blur-2xl opacity-80" />
        <Reveal>
          <Eyebrow>Commencer</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-8 text-balance leading-[1.02]">
            L'intelligence qui <em className="italic text-[color:var(--primary)]">avance</em> avec vous.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[18px] text-[color:var(--body)] mt-8 max-w-xl mx-auto">
            Découvrez une approche plus calme et plus intelligente pour comprendre la finance numérique - grâce à
            une technologie élégante conçue pour durer.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onAuthOpen}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-[color:var(--foreground)] text-white text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(17,17,17,0.5)]"
            >
              Commencer aujourd'hui <ArrowRight size={16} />
            </button>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-white hairline text-[15px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              Réserver une démo
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 text-[12px] uppercase tracking-[0.22em] text-[color:var(--body)]">
            Aucune carte requise · Annulez à tout moment · SOC 2 Type II
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */
export function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-[color:var(--border-soft)] bg-[color:var(--background)]">
      <div className="container-1400">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Cryptora Logo" className="size-9 rounded-xl object-cover" />
              <span className="font-display text-[22px] tracking-tight">Cryptora</span>
            </div>
            <p className="text-[14px] text-[color:var(--body)] mt-5 max-w-xs leading-relaxed">
              Intelligence de trading crypto propulsée par l'IA. Tradez plus intelligemment, pensez à long terme, construisez la richesse intelligemment.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--body)] mb-4">Navigation</div>
            <ul className="space-y-2.5">
              {[
                { label: "Plateforme", id: "platform" },
                { label: "Technologie", id: "technology" },
                { label: "IA", id: "ai" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      const target = document.getElementById(item.id);
                      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
                    }}
                    className="text-[14px] text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--body)] mb-4">Legal</div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-[14px] text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[14px] text-[color:var(--foreground)] hover:text-[color:var(--primary)] transition-colors">
                  Termes et conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[color:var(--border-soft)] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-[13px] text-[color:var(--body)]">&copy; {new Date().getFullYear()} Cryptora. Tous droits réservés.</div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.open('https://twitter.com', '_blank')} className="size-9 rounded-full grid place-items-center hairline hover:bg-[color:var(--hover)] transition-colors">
              <Twitter size={14} />
            </button>
            <button onClick={() => window.open('https://linkedin.com', '_blank')} className="size-9 rounded-full grid place-items-center hairline hover:bg-[color:var(--hover)] transition-colors">
              <Linkedin size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
