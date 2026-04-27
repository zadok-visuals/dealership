import { Link } from "react-router-dom";

export default function Hero() {
  return (
    // Changed "items-center" to "items-end" and added "pb-24" to anchor content to the bottom
    <section className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-black pb-24 md:pb-32">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black" />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('https://i.pinimg.com/1200x/e0/39/7b/e0397be083c5b6b01082389b2604d0c9.jpg')] bg-cover bg-center opacity-60 animate-fade-in" />
      </div>

      {/* Content Container */}
      <div className="container relative z-[100] mx-auto px-6 text-center">
        <h1 className="animate-slide-up text-5xl md:text-8xl font-bold tracking-tight text-white font-car-both mb-6">
          DRIVE THE <span className="text-gradient">FUTURE</span>
        </h1>
        
        <p className="animate-slide-up [animation-delay:200ms] max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
          Experience the pinnacle of automotive excellence. Our curated collection of premium vehicles is designed for those who demand more.
        </p>
        
        <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/inventory" 
            className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-accent transition-all transform hover:scale-105 active:scale-95 inline-block text-center"
          >
            Browse Inventory
          </Link>
          
          <a 
            href="https://wa.me/+2348146664096" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto glass-effect text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95 inline-block text-center"
          >
            Book a Test Drive
          </a>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
