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
            Intelligence Crypto en Direct
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--body)] max-w-2xl mx-auto">
            Données de marché avancées en temps réel, analyse de sentiment algorithmique et indicateurs de trading haute fréquence - le tout dans un environnement calme et concentré.
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
              <h2 className="text-3xl font-bold mb-6">Pourquoi trader avec Cryptora ?</h2>
              <p className="text-[color:var(--body)] mb-8 leading-relaxed">
                Nous faisons abstraction du bruit des échanges traditionnels, en fournissant une interface épurée qui met en évidence ce qui compte vraiment : les tendances, le momentum et le risque.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Tendances algorithmiques</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Notre IA prédit les micro-tendances avant qu'elles n'apparaissent sur les graphiques standards.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Sentiment en temps réel</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Flux de données en direct provenant des actualités mondiales et des réseaux sociaux analysés instantanément.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="text-primary size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Gestion des risques</h4>
                    <p className="text-[color:var(--body)] text-sm mt-1">Stop-loss automatisés basés sur les indices de volatilité.</p>
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
                <div className="text-sm text-[color:var(--body)] mb-2">Capitalisation</div>
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
                Signaux de marché IA
              </h2>
              <p className="text-[color:var(--body)] mt-2">Alertes en temps réel générées par notre réseau neuronal</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[color:var(--primary)] hover:text-white transition-colors">
              <Bell size={16} /> Configurer les alertes
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Accumulation de baleines",
                asset: "Bitcoin (BTC)",
                time: "Il y a 2 min",
                desc: "De grandes entités ont accumulé 4 500 BTC au cours des 24 dernières heures.",
                sentiment: "Haussier",
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
              },
              {
                title: "Drain de liquidité",
                asset: "Ethereum (ETH)",
                time: "Il y a 14 min",
                desc: "Les réserves des échanges pour l'ETH ont chuté à leur plus bas niveau en 4 mois.",
                sentiment: "Fort impact",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
              },
              {
                title: "Pic de volatilité",
                asset: "Marché mondial",
                time: "Il y a 1 heure",
                desc: "Le marché des options prévoit un mouvement de 10 % dans les prochaines 48 heures.",
                sentiment: "Prudence",
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
