import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-end md:items-center justify-start overflow-hidden bg-black px-4 pb-20 md:px-12">
      {/* Background Layer with modern vignette */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-[url('https://i.pinimg.com/1200x/b3/de/a2/b3dea2b088725eb894d9166bb9af91a6.jpg')] bg-cover bg-[center_20%] md:bg-center scale-110 animate-subtle-zoom opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent hidden md:block" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-white/80 uppercase">New Arrivals 2024</span>
          </div>

          <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] italic uppercase">
            Drive the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
              Future
            </span>
          </h1>
          
          <p className="animate-slide-up [animation-delay:200ms] max-w-lg text-base md:text-lg text-white/60 leading-relaxed font-light">
            Experience the pinnacle of automotive excellence. Our curated collection is designed for those who demand more than just a drive.
          </p>
          
          <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link 
              to="/inventory" 
              className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white transition-all text-center"
            >
              <span className="relative z-10">Browse Inventory</span>
              <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <a 
              href="https://wa.me/+2348146664096" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center"
            >
              Book a Test Drive
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Modern UI detail: Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex flex-col items-center gap-2 opacity-30">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
