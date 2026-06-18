import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Sections";
import { ContactForm } from "@/components/ContactForm";
import { MacbookCandlestick } from "@/components/MacbookCandlestick";
import { ArrowUpRight, TrendingUp, Activity, Shield, Zap } from "lucide-react";

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
              <h2 className="text-3xl font-bold mb-6">Why trade with Crypto AI?</h2>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)]">
                <div className="text-sm text-[color:var(--body)] mb-2">BTC/USD</div>
                <div className="text-3xl font-mono font-bold">$64,230.00</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +2.4%
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)]">
                <div className="text-sm text-[color:var(--body)] mb-2">ETH/USD</div>
                <div className="text-3xl font-mono font-bold">$3,420.50</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +1.2%
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)]">
                <div className="text-sm text-[color:var(--body)] mb-2">SOL/USD</div>
                <div className="text-3xl font-mono font-bold">$142.10</div>
                <div className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <ArrowUpRight size={16} /> +5.8%
                </div>
              </div>
              <div className="bg-background rounded-2xl p-6 border border-[color:var(--border)]">
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
