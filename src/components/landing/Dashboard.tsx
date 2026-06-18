import { motion } from "motion/react";
import { CandlestickChart, OrderBook, LivePrice } from "./Trading";

export function FloatingDashboard() {
  return (
    <div className="relative w-full aspect-[5/6] md:aspect-[6/7]">
      <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-[color:var(--primary-soft)]/15 via-transparent to-[color:var(--primary)]/10 blur-3xl" />

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
          <div className="text-[11px] tracking-wider uppercase text-[color:var(--body)] inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[color:var(--primary)] animate-pulse-soft" />
            Live · Markets
          </div>
          <div className="size-7 rounded-full bg-[color:var(--surface)] hairline" />
        </div>

        {/* body */}
        <div className="p-5 grid grid-cols-3 gap-3 h-[calc(100%-58px)]">
          {/* big chart card */}
          <div className="col-span-2 rounded-2xl bg-[color:var(--surface)] p-5 flex flex-col">
            <div className="flex items-start justify-between">
              <LivePrice />
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-[color:var(--body)]">
                {["1H", "1D", "1W", "1M", "ALL"].map((t, i) => (
                  <span
                    key={t}
                    className={`px-2 py-1 rounded-md ${i === 1 ? "bg-white hairline text-[color:var(--foreground)]" : ""}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 flex-1 flex items-end">
              <CandlestickChart height={130} />
            </div>
            <div className="flex justify-between text-[10px] text-[color:var(--body)] mt-1 tabular-nums">
              <span>09:30</span>
              <span>12:00</span>
              <span>14:30</span>
              <span>16:00</span>
            </div>
          </div>

          {/* order book */}
          <div className="rounded-2xl bg-white hairline p-3.5 flex flex-col overflow-hidden">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)] flex items-center justify-between">
              <span>Order book</span>
              <span className="size-1.5 rounded-full bg-[color:var(--primary)] animate-pulse-soft" />
            </div>
            <div className="mt-3 flex-1 overflow-hidden">
              <OrderBook />
            </div>
          </div>

          {/* allocation */}
          <div className="rounded-2xl bg-white hairline p-4 flex items-center gap-4">
            <svg viewBox="0 0 100 100" className="w-16 h-16 -rotate-90 shrink-0">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EFEFEF" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3F7F73" strokeWidth="10" strokeDasharray="180 251" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6AAE9F" strokeWidth="10" strokeDasharray="50 251" strokeDashoffset="-180" strokeLinecap="round" />
            </svg>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--body)]">Allocation</div>
              <div className="font-display text-xl mt-0.5">8 assets</div>
              <div className="text-[11px] text-[color:var(--primary)]">Balanced</div>
            </div>
          </div>

          {/* strategies */}
          <div className="col-span-2 rounded-2xl hairline bg-white p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">Active strategies</div>
            <div className="mt-3 space-y-2.5">
              {[
                { name: "Stable yield", val: "+0.42%", w: "82%" },
                { name: "AI momentum", val: "+1.84%", w: "64%" },
              ].map((r) => (
                <div key={r.name}>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[color:var(--foreground)]">{r.name}</span>
                    <span className="text-[color:var(--primary)] tabular-nums">{r.val}</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-[color:var(--surface)] overflow-hidden">
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
        </div>
      </motion.div>

      {/* floating AI card */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 md:-right-10 top-[14%] w-60 card-surface p-4 animate-float-y"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-[color:var(--accent)] grid place-items-center">
            <span className="size-2 rounded-full bg-[color:var(--primary)] animate-pulse-soft" />
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--body)]">Crypto AI AI</span>
        </div>
        <p className="text-[13px] mt-3 leading-relaxed text-[color:var(--foreground)]">
          Volatility easing. Suggested rebalance toward yield assets.
        </p>
      </motion.div>

      {/* floating trade ticker */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 md:-left-10 bottom-[14%] w-64 card-surface p-4 animate-float-x"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--body)]">Filled</span>
          <span className="text-[10px] text-[color:var(--primary)] tabular-nums">+18.4%</span>
        </div>
        <div className="font-display text-xl mt-1 tabular-nums">0.482 ETH</div>
        <div className="text-[11px] text-[color:var(--body)] mt-1 tabular-nums">@ $3,741.20 · 2s ago</div>
      </motion.div>
    </div>
  );
}
