import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Sections";
import { ContactForm } from "@/components/ContactForm";
import { MacbookCandlestick } from "@/components/MacbookCandlestick";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, Shield, Zap, BrainCircuit, Bell, Clock } from "lucide-react";

export function TradingView() {
  return (
    <div className="bg-[color:var(--background)] text-[color:var(--foreground)] min-h-screen pt-24">
      <Nav />
      
      {/* Header Section */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="container-1400 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            Live Crypto Intelligence
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--body)] max-w-2xl mx-auto">
            Advanced real-time market data, algorithmic sentiment analysis, and high-frequency trading indicators-all inside a calm, focused environment.
          </p>
        </div>
      </section>

      {/* Macbook Candlestick Animation Section */}
      <section className="py-12 px-6">
        <div className="container-1400">
          <MacbookCandlestick />
        </div>
      </section>

      {/* Crypto Details Section */}
      <section className="py-24 px-6 bg-white/5 border-y border-[color:var(--border)] mt-12">
        <div className="container-1400 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why trade with Cryptora?</h2>
              <p className="text-[color:var(--body)] mb-8 leading-relaxed">
                We abstract away the noise of traditional exchanges, providing a clean interface that highlights what actually matters: trends, momentum, and risk.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Algorithmic Trends</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Our AI predicts micro-trends before they appear on standard charts.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Real-time Sentiment</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Live data streams from global news and social platforms analyzed instantly.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Risk Management</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Automated stop-losses based on volatility indexes.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)] relative overflow-hidden group hover:border-[color:var(--primary)] transition-colors">
                <div className="text-sm text-[color:var(--body)] mb-2">BTC/USD</div>
                <div className="text-3xl font-mono font-bold">$64,230.00</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +2.4%
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="text-[color:var(--primary)] size-5 opacity-50" />
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)] relative overflow-hidden group hover:border-[color:var(--primary)] transition-colors">
                <div className="text-sm text-[color:var(--body)] mb-2">ETH/USD</div>
                <div className="text-3xl font-mono font-bold">$3,420.50</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +1.2%
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="text-[color:var(--primary)] size-5 opacity-50" />
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)] relative overflow-hidden group hover:border-red-500/50 transition-colors">
                <div className="text-sm text-[color:var(--body)] mb-2">SOL/USD</div>
                <div className="text-3xl font-mono font-bold">$138.10</div>
                <div className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowDownRight size={16} /> -1.8%
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Activity className="text-red-500 size-5 opacity-50" />
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)] relative overflow-hidden group hover:border-[color:var(--primary)] transition-colors">
                <div className="text-sm text-[color:var(--body)] mb-2">Market Cap</div>
                <div className="text-3xl font-mono font-bold">$2.4T</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +1.1%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Market Signals Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="container-1400 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <BrainCircuit className="text-[color:var(--primary)]" />
                AI Market Signals
              </h2>
              <p className="text-[color:var(--body)] mt-2">Real-time alerts generated by our neural network</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[color:var(--primary)] hover:text-white transition-colors">
              <Bell size={16} /> Configure Alerts
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Whale Accumulation",
                asset: "Bitcoin (BTC)",
                time: "2 mins ago",
                desc: "Large wallet entities have accumulated 4,500 BTC in the last 24 hours.",
                sentiment: "Bullish",
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
              },
              {
                title: "Liquidity Drain",
                asset: "Ethereum (ETH)",
                time: "14 mins ago",
                desc: "Exchange reserves for ETH have dropped to a 4-month low.",
                sentiment: "High Impact",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                title: "Volatility Spike",
                asset: "Global Market",
                time: "1 hour ago",
                desc: "Options market pricing in a 10% move within the next 48 hours.",
                sentiment: "Caution",
                color: "text-yellow-500",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/20"
              }
            ].map((signal, i) => (
              <div key={i} className="card-surface rounded-[24px] p-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${signal.color} ${signal.bg} ${signal.border} border`}>
                    {signal.sentiment}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[color:var(--body)]">
                    <Clock size={12} /> {signal.time}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{signal.title}</h3>
                <div className="text-[13px] font-medium text-[color:var(--foreground)] mb-3 opacity-75">{signal.asset}</div>
                <p className="text-[14px] text-[color:var(--body)] leading-relaxed">
                  {signal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 relative z-10">
        <div className="container-1400">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
