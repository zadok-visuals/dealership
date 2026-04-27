import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCurrency } from "@/components/CurrencyProvider";
import { Menu, X } from "lucide-react"; // Install lucide-react if you haven't

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled || isOpen ? "glass-effect py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="text-2xl font-bold text-white font-car-both">
            khalifa<span className="text-accent italic">Auto</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
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
          
          <a href="https://wa.me/2348146664096" target="_blank" rel="noopener noreferrer" className="hidden md:block bg-accent text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all">
            Contact
          </a>

          {/* Hamburger Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-white/10 flex flex-col p-6 gap-6 animate-in slide-in-from-top duration-300">
          <Link to="/inventory" className="text-lg text-white" onClick={() => setIsOpen(false)}>
            Inventory
          </Link>
          <Link to="/about" className="text-lg text-white" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <a href="https://wa.me/2348146664096" className="bg-accent text-black text-center py-3 rounded-full font-bold">
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
