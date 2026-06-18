import { motion } from "motion/react";

export function FloatingDashboard() {
  return (
    <div className="relative w-full aspect-[5/6] md:aspect-[6/7]">
      {/* soft halo */}
      <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-[color:var(--primary-soft)]/15 via-transparent to-[color:var(--primary)]/10 blur-3xl" />

      {/* main dashboard card */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute inset-0 card-surface overflow-hidden"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        {/* topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--border-soft)]">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#F5C26B]/70" />
            <span className="size-2.5 rounded-full bg-[#E7E7E7]" />
            <span className="size-2.5 rounded-full bg-[#E7E7E7]" />
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[color:var(--body)]">Portfolio · Q4</div>
          <div className="size-7 rounded-full bg-[color:var(--surface)] hairline" />
        </div>

        {/* body */}
        <div className="p-6 grid grid-cols-3 gap-4 h-[calc(100%-58px)]">
          {/* big stat */}
          <div className="col-span-2 rounded-2xl bg-[color:var(--surface)] p-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Net worth</div>
              <div className="font-display text-5xl mt-2 text-[color:var(--foreground)]">$248,914</div>
              <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-[color:var(--primary)]">
                <span className="size-1.5 rounded-full bg-[color:var(--primary)]" />
                +2.4% this week
              </div>
            </div>
            {/* chart */}
            <svg viewBox="0 0 320 90" className="w-full h-20 mt-4">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3F7F73" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3F7F73" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C30,55 50,40 80,42 C110,44 130,68 160,55 C190,42 210,18 240,22 C270,26 290,42 320,30 L320,90 L0,90 Z"
                fill="url(#g1)"
              />
              <path
                d="M0,60 C30,55 50,40 80,42 C110,44 130,68 160,55 C190,42 210,18 240,22 C270,26 290,42 320,30"
                fill="none"
                stroke="#3F7F73"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* allocation ring */}
          <div className="rounded-2xl bg-white hairline p-4 flex flex-col items-center justify-center text-center">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Allocation</div>
            <svg viewBox="0 0 100 100" className="w-24 h-24 mt-2 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EFEFEF" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3F7F73" strokeWidth="10" strokeDasharray="180 251" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6AAE9F" strokeWidth="10" strokeDasharray="50 251" strokeDashoffset="-180" strokeLinecap="round" />
            </svg>
            <div className="text-xs text-[color:var(--body)] mt-2">8 assets</div>
          </div>

          {/* rows */}
          <div className="col-span-3 grid grid-cols-2 gap-4 mt-1">
            {[
              { name: "Stable yield", val: "+0.42%", w: "82%" },
              { name: "AI strategy", val: "+1.8%", w: "64%" },
            ].map((r) => (
              <div key={r.name} className="rounded-xl hairline p-3.5">
                <div className="flex justify-between text-xs text-[color:var(--body)]">
                  <span>{r.name}</span>
                  <span className="text-[color:var(--primary)]">{r.val}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[color:var(--surface)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: r.w }}
                    transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-[color:var(--primary)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* floating AI card */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 md:-right-10 top-[18%] w-56 card-surface p-4 animate-float-y"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-[color:var(--accent)] grid place-items-center">
            <span className="size-2 rounded-full bg-[color:var(--primary)] animate-pulse-soft" />
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--body)]">Lumen AI</span>
        </div>
        <p className="text-[13px] mt-3 leading-relaxed text-[color:var(--foreground)]">
          Reduced exposure on volatile pairs. Suggested rebalance toward yield assets.
        </p>
      </motion.div>

      {/* floating notification */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 md:-left-10 bottom-[12%] w-60 card-surface p-4 animate-float-x"
      >
        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Insight</div>
        <div className="font-display text-2xl mt-1.5">+18.4%</div>
        <div className="text-xs text-[color:var(--body)] mt-1">YTD performance vs benchmark</div>
      </motion.div>
    </div>
  );
}
