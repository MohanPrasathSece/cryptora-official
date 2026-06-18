import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { TradingView } from "./pages/TradingView";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trading" element={<TradingView />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
