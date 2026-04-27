import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black" />
      
      {/* Background Image Placeholder - In a real app, this would be a high-quality car video or image */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-60 animate-fade-in" />
      </div>

      <div className="container relative z-20 mx-auto px-6 text-center">
        <h1 className="animate-slide-up text-5xl md:text-8xl font-bold tracking- text-white font-car-both mb-6">
          DRIVE THE <span className="text-gradient">FUTURE</span>
        </h1>
        <p className="animate-slide-up [animation-delay:200ms] max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
          Experience the pinnacle of automotive excellence. Our curated collection of premium vehicles is designed for those who demand more.
        </p>
        <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/inventory" className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-accent transition-all transform hover:scale-105 active:scale-95 inline-block text-center">
            Browse Inventory
          </Link>
          <a href="https://wa.me/2348146664096?text=I%20would%20like%20to%20book%20a%20test%20drive" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto glass-effect text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95 inline-block text-center">
            Book a Test Drive
          </a>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
