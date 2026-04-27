import Navbar from "@/components/Navbar";
import InventoryGrid from "@/components/InventoryGrid";

export default function Inventory() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <InventoryGrid />
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5 mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold text-white font-car-both">
            khalifa<span className="text-accent italic">Auto</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookies</a>
          </div>
          <div className="text-sm text-white/20">
            © 2026 khalifa Auto. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
