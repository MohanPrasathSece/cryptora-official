import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Generate random fake candlestick data
const generateCandles = (count: number) => {
  let prevClose = 100;
  return Array.from({ length: count }).map((_, i) => {
    const change = (Math.random() - 0.5) * 10;
    const open = prevClose;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    prevClose = close;
    return { id: i, open, close, high, low };
  });
};

export function MacbookCandlestick() {
  const [candles, setCandles] = useState(() => generateCandles(30));

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        const newCandles = [...prev];
        const lastCandle = newCandles[newCandles.length - 1];
        
        // Either update the last candle or add a new one
        if (Math.random() > 0.8) {
          // Add new candle
          const change = (Math.random() - 0.5) * 8;
          const open = lastCandle.close;
          const close = open + change;
          const high = Math.max(open, close) + Math.random() * 4;
          const low = Math.min(open, close) - Math.random() * 4;
          
          newCandles.shift();
          newCandles.push({ id: Date.now(), open, close, high, low });
        } else {
          // Update existing
          const change = (Math.random() - 0.5) * 4;
          lastCandle.close += change;
          lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
          lastCandle.low = Math.min(lastCandle.low, lastCandle.close);
        }
        
        return newCandles;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate scaling
  const minLow = Math.min(...candles.map((c) => c.low));
  const maxHigh = Math.max(...candles.map((c) => c.high));
  const range = maxHigh - minLow || 1;

  return (
    <div className="relative mx-auto max-w-4xl w-full">
      {/* Macbook Frame */}
      <div className="relative pt-[60%] bg-[#222] rounded-t-3xl border-4 border-[#333] shadow-2xl overflow-hidden shadow-black/50">
        <div className="absolute top-0 inset-x-0 h-6 bg-[#333] flex items-center px-4 gap-2 border-b border-[#444]">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 flex gap-1">
            <div className="px-3 py-1 bg-[#222] text-[10px] text-white rounded-t border border-[#444] border-b-0">
              BTC/USD
            </div>
            <div className="px-3 py-1 text-[10px] text-gray-400">
              ETH/USD
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="absolute inset-0 top-6 bg-[#0a0a0a] p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-mono text-white font-bold">Bitcoin</div>
              <div className="text-sm text-green-400 font-mono">+2.45% Today</div>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-[#222] text-white rounded border border-[#333]">1H</span>
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">4H</span>
              <span className="px-2 py-1 text-xs bg-[#222] text-white rounded border border-[#333]">1D</span>
            </div>
          </div>
          
          <div className="flex-1 relative flex items-end gap-1 overflow-hidden pl-8 pb-4">
            {/* Y-axis grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-l border-b border-white/20">
              <div className="border-t border-white/20 w-full" />
              <div className="border-t border-white/20 w-full" />
              <div className="border-t border-white/20 w-full" />
              <div className="border-t border-white/20 w-full" />
              <div className="border-t border-white/20 w-full" />
            </div>

            {/* Candlesticks */}
            {candles.map((candle) => {
              const isUp = candle.close >= candle.open;
              const colorClass = isUp ? "bg-green-500" : "bg-red-500";
              
              // Normalize positions (0 to 1)
              const topY = (maxHigh - candle.high) / range;
              const bottomY = (maxHigh - candle.low) / range;
              const openY = (maxHigh - candle.open) / range;
              const closeY = (maxHigh - candle.close) / range;
              
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(openY - closeY), 0.01); // min height for body

              return (
                <div key={candle.id} className="relative flex-1 flex justify-center h-full">
                  <motion.div 
                    layout
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="absolute w-px bg-white/50"
                    style={{
                      top: `${topY * 100}%`,
                      height: `${(bottomY - topY) * 100}%`,
                    }}
                  />
                  <motion.div
                    layout
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className={`absolute w-full max-w-[12px] rounded-sm ${colorClass}`}
                    style={{
                      top: `${bodyTop * 100}%`,
                      height: `${bodyHeight * 100}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Macbook Base */}
      <div className="h-6 w-[110%] -ml-[5%] bg-gradient-to-b from-[#444] to-[#111] rounded-b-xl shadow-2xl relative z-10 flex justify-center items-start">
        <div className="w-24 h-1.5 mt-1 bg-[#111] rounded-b-lg"></div>
      </div>
    </div>
  );
}
