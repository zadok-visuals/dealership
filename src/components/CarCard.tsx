import { Link } from "react-router-dom";
import { Car } from "@/integrations/supabase/types";
import { useCurrency } from "@/components/CurrencyProvider";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-dark border border-white/5 transition-all hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.images[0] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000"}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
            {car.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
              {car.make} {car.model}
            </h3>
            <p className="text-white/50 text-sm font-medium">
              {car.mileage.toLocaleString()} km • {car.transmission}
            </p>
          </div>
          <div className="text-right">
            <p className="text-accent text-xl font-bold">
              {formatPrice(car.price)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Fuel</p>
            <p className="text-xs font-bold text-white/80">{car.fuel_type}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
            <p className="text-xs font-bold text-accent">{car.status}</p>
          </div>
        </div>

        <Link to={`/cars/${car.id}`} className="block w-full bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold text-sm transition-all text-center group-hover:bg-accent group-hover:text-black group-hover:border-accent">
          View Details
        </Link>
      </div>
    </div>
  );
}
