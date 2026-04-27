import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-effect py-4" : "bg-transparent/300 py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking- text-white font-car-both">
            khalifa<span className="text-accent italic">AUTO</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/inventory" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            Inventory
          </Link>
          <Link to="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleCurrency}
            className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors border border-white/10"
          >
            {currency}
          </button>
          <a href="https://wa.me/2348146664096" target="_blank" rel="noopener noreferrer" className="bg-accent text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
