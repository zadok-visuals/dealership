import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-12 font-car-both">
              REDEFINING THE <span className="text-accent">AUTOMOTIVE EXPERIENCE</span>
            </h1>
            
            <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=2000" 
                alt="Luxury Showroom" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-accent">OUR VISION</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  At khalifa AUTO, we believe that buying a premium vehicle should be as exhilarating as driving one. We've stripped away the traditional dealership friction to create a seamless, digital-first experience that prioritizes your time and taste.
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  Our collection is more than just inventory; it's a curated gallery of engineering masterpieces, hand-selected for those who demand nothing less than perfection.
                </p>
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-4xl font-bold text-white mb-2">15+</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">Years of Excellence</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-4xl font-bold text-white mb-2">2,500+</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">Delivered Dreams</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 text-center mb-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <span className="text-[200px] font-black italic">AUTO</span>
              </div>
              <h2 className="text-3xl font-bold mb-8 relative z-10">THE KHALIFA GUARANTEE</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
                <div>
                  <h4 className="font-bold text-accent mb-2">AUTHENTICITY</h4>
                  <p className="text-sm text-white/50">Full history and verified documentation for every vehicle.</p>
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-2">PRECISION</h4>
                  <p className="text-sm text-white/50">Comprehensive multi-point inspection by certified technicians.</p>
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-2">SUPPORT</h4>
                  <p className="text-sm text-white/50">Dedicated concierge service for all your automotive needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold text-white font-car-both">
            khalifa<span className="text-accent italic">AUTO</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookies</a>
          </div>
          <div className="text-sm text-white/20">
            © 2026 khalifa AUTO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
