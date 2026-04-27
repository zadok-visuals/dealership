import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InventoryGrid from "@/components/InventoryGrid";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Why Choose Us Section */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                  <span className="text-accent text-xl">★</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Curated Selection</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Every vehicle in our showroom undergoes a rigorous 150-point inspection to meet our premium standards.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                  <span className="text-accent text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Express Delivery</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  We handle all documentation and logistics, ensuring your new vehicle is delivered to your doorstep within 48 hours.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                  <span className="text-accent text-xl">🛡</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Secure Payments</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Multiple payment options and flexible financing plans tailored to your financial needs and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InventoryGrid />

        {/* Call to Action Section */}
        <section className="py-24 bg-black border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-car-both">
              READY TO FIND YOUR <span className="text-gradient">DREAM CAR?</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
              Contact our sales experts today and let us help you find the perfect vehicle that matches your lifestyle.
            </p>
            <a href="https://wa.me/2348146664096" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent text-black px-12 py-5 rounded-full font-black text-lg hover:bg-white transition-all transform hover:scale-110 active:scale-95 shadow-xl shadow-accent/20">
              Contact Us
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
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
