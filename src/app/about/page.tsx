"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-black text-white font-car-both leading-[0.9]">
                REDEFINING <br />
                <span className="text-accent">LUXURY</span>
              </h1>

              <div className="w-20 h-1 bg-accent"></div>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
                At khalifa Auto, we don't just sell cars; we deliver automotive excellence. Founded with a passion for high-performance and luxury vehicles, our dealership has become the premier destination for enthusiasts and collectors alike.
              </p>

              <p className="text-white/50 text-base leading-relaxed max-w-xl">
                Every vehicle in our showroom is meticulously curated, inspected, and maintained to the highest standards. We believe that buying a luxury car should be as exceptional as driving one. From your first inquiry to the moment you take the keys, our dedicated team ensures a seamless, transparent, and unforgettable experience.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h3 className="text-4xl font-bold text-accent mb-2">10+</h3>
                  <p className="text-sm text-white/50 uppercase tracking-widest">Years of Excellence</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-accent mb-2">5k+</h3>
                  <p className="text-sm text-white/50 uppercase tracking-widest">Satisfied Clients</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
              <Image
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=2071"
                alt="Luxury Car Dealership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white/90 text-xl font-medium italic">
                  "Excellence is not an act, but a habit."
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5 mt-auto">
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
