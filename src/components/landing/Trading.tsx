import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react";

/* ---------------- Live price hook ---------------- */
function useDriftingPrice(start: number, volatility = 0.0008) {
  const [v, setV] = useState(start);
  useEffect(() => {
    const id = setInterval(() => {
      setV((p) => Math.max(0.0001, p * (1 + (Math.random() - 0.48) * volatility * 8)));
    }, 900);
    return () => clearInterval(id);
  }, [volatility]);
  return v;
}

/* ---------------- Ticker tape ---------------- */
export function TickerTape() {
  const symbols = [
    { s: "BTC", p: 68420.12 },
    { s: "ETH", p: 3742.55 },
    { s: "SOL", p: 168.32 },
    { s: "LUM", p: 12.84 },
    { s: "AVAX", p: 41.27 },
    { s: "LINK", p: 19.06 },
    { s: "MATIC", p: 0.92 },
    { s: "ARB", p: 1.18 },
    { s: "OP", p: 2.46 },
    { s: "DOGE", p: 0.164 },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const row = [...symbols, ...symbols].map((x, i) => {
    const delta = ((Math.sin(tick * 0.7 + i) + 1) / 2) * 2.4 - 1.2;
    const up = delta >= 0;
    return { ...x, delta, up };
  });

  return (
    <div className="border-y border-[color:var(--border-soft)] bg-[color:var(--background)]/80 backdrop-blur overflow-hidden">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-10 py-3.5 animate-marquee whitespace-nowrap will-change-transform text-[12px]">
          {row.map((x, i) => (
            <div key={i} className="inline-flex items-center gap-2.5">
              <span className="font-medium tracking-wider">{x.s}</span>
              <span className="text-[color:var(--body)] tabular-nums">
                ${x.p < 1 ? x.p.toFixed(4) : x.p.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 tabular-nums ${x.up ? "text-[color:var(--primary)]" : "text-[#C75D4A]"}`}
              >
                {x.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {x.up ? "+" : ""}
                {x.delta.toFixed(2)}%
              </span>
              <span className="text-[color:var(--border)]">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Animated candlestick chart ---------------- */
export function CandlestickChart({ height = 110 }: { height?: number }) {
  const [bars, setBars] = useState(() => seedBars(28));
  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const last = prev[prev.length - 1];
        const next = {
          o: last.c,
          c: last.c * (1 + (Math.random() - 0.48) * 0.025),
          h: 0,
          l: 0,
        };
        next.h = Math.max(next.o, next.c) * (1 + Math.random() * 0.012);
        next.l = Math.min(next.o, next.c) * (1 - Math.random() * 0.012);
        return [...prev.slice(1), next];
      });
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const all = bars.flatMap((b) => [b.h, b.l]);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = max - min || 1;
  const w = 320;
  const pad = 4;
  const bw = (w - pad * 2) / bars.length;
  const y = (v: number) => pad + ((max - v) / range) * (height - pad * 2);

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }}>
      {bars.map((b, i) => {
        const up = b.c >= b.o;
        const x = pad + i * bw + bw / 2;
        const color = up ? "#3F7F73" : "#C75D4A";
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(b.h)} y2={y(b.l)} stroke={color} strokeWidth="1" opacity="0.6" />
            <rect
              x={x - bw * 0.32}
              y={y(Math.max(b.o, b.c))}
              width={bw * 0.64}
              height={Math.max(1.5, Math.abs(y(b.o) - y(b.c)))}
              fill={color}
              rx="0.8"
            >
              {i === bars.length - 1 && (
                <animate attributeName="opacity" values="0.4;1;1" dur="0.6s" />
              )}
            </rect>
          </g>
        );
      })}
    </svg>
  );
}

function seedBars(n: number) {
  let c = 100;
  return Array.from({ length: n }, () => {
    const o = c;
    c = o * (1 + (Math.random() - 0.5) * 0.04);
    const h = Math.max(o, c) * (1 + Math.random() * 0.015);
    const l = Math.min(o, c) * (1 - Math.random() * 0.015);
    return { o, c, h, l };
  });
}

/* ---------------- Order book ---------------- */
export function OrderBook() {
  const [rows, setRows] = useState(() => seedBook());
  useEffect(() => {
    const id = setInterval(() => setRows(seedBook()), 1300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-[11px] tabular-nums font-mono">
      <div className="grid grid-cols-3 text-[10px] uppercase tracking-[0.15em] text-[color:var(--body)] pb-1.5 border-b border-[color:var(--border-soft)]">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>
      <div className="mt-1.5 space-y-[3px]">
        {rows.asks.map((r, i) => (
          <BookRow key={`a${i}`} {...r} side="ask" />
        ))}
        <div className="flex items-center justify-between py-1 my-1 border-y border-[color:var(--border-soft)] text-[color:var(--foreground)]">
          <span className="text-[color:var(--primary)]">{rows.mid.toFixed(2)}</span>
          <span className="text-[10px] text-[color:var(--body)]">mid · USD</span>
        </div>
        {rows.bids.map((r, i) => (
          <BookRow key={`b${i}`} {...r} side="bid" />
        ))}
      </div>
    </div>
  );
}

function BookRow({ price, size, depth, side }: { price: number; size: number; depth: number; side: "bid" | "ask" }) {
  const c = side === "bid" ? "rgba(63,127,115,0.10)" : "rgba(199,93,74,0.10)";
  const t = side === "bid" ? "text-[color:var(--primary)]" : "text-[#C75D4A]";
  return (
    <div className="relative grid grid-cols-3 px-1.5 py-[3px] rounded overflow-hidden">
      <div className="absolute inset-y-0 right-0" style={{ width: `${depth}%`, background: c }} />
      <span className={`relative ${t}`}>{price.toFixed(2)}</span>
      <span className="relative text-right text-[color:var(--foreground)]">{size.toFixed(3)}</span>
      <span className="relative text-right text-[color:var(--body)]">{(price * size).toFixed(0)}</span>
    </div>
  );
}
function seedBook() {
  const mid = 3742 + (Math.random() - 0.5) * 6;
  const asks = Array.from({ length: 5 }, (_, i) => ({
    price: mid + (i + 1) * (0.4 + Math.random() * 0.3),
    size: +(Math.random() * 2 + 0.3).toFixed(3),
    depth: 20 + Math.random() * 70,
  })).reverse();
  const bids = Array.from({ length: 5 }, (_, i) => ({
    price: mid - (i + 1) * (0.4 + Math.random() * 0.3),
    size: +(Math.random() * 2 + 0.3).toFixed(3),
    depth: 20 + Math.random() * 70,
  }));
  return { asks, bids, mid };
}

/* ---------------- Live price pill ---------------- */
export function LivePrice({ start = 68420.12, label = "BTC / USD" }: { start?: number; label?: string }) {
  const p = useDriftingPrice(start, 0.0008);
  const [prev, setPrev] = useState(start);
  useEffect(() => {
    const id = setTimeout(() => setPrev(p), 800);
    return () => clearTimeout(id);
  }, [p]);
  const up = p >= prev;
  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--body)]">{label}</span>
      <motion.span
        key={Math.round(p * 100)}
        initial={{ opacity: 0, y: up ? 6 : -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="font-display text-2xl tabular-nums"
      >
        ${p.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </motion.span>
      <span
        className={`inline-flex items-center gap-1 text-[11px] tabular-nums ${up ? "text-[color:var(--primary)]" : "text-[#C75D4A]"}`}
      >
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {(((p - prev) / prev) * 100).toFixed(2)}%
      </span>
    </div>
  );
}
