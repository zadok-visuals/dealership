import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";
import { useCurrency } from "@/components/CurrencyProvider";

type Car = Database["public"]["Tables"]["cars"]["Row"];

// Sample data for fallback
const SAMPLE_CARS: Record<string, Car> = {
  "1": {
    id: "1",
    make: "Mercedes-Benz",
    model: "AMG GT",
    year: 2023,
    price: 155000,
    mileage: 1200,
    transmission: "Automatic",
    fuel_type: "Petrol",
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070"],
    description: "The Mercedes-AMG GT combines the fascination of an authentic sports car with segment-specific technology leadership and high practicality. With a top speed of 312 km/h and an acceleration from 0 to 100 km/h in 3.6 seconds, the Mercedes-AMG GT guarantees an adrenaline kick.",
    features: ["Heated Seats", "Sunroof", "Parking Sensors", "Burmester Surround Sound", "AMG Performance Seats", "Active Aerodynamics"],
    status: "Available",
    created_at: new Date().toISOString(),
  },
};

export default function CarDetail() {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setCar(data);
        } else if (id && SAMPLE_CARS[id]) {
          setCar(SAMPLE_CARS[id]);
        }
      } catch (err) {
        console.error("Error fetching car:", err);
        if (id && SAMPLE_CARS[id]) {
          setCar(SAMPLE_CARS[id]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <Link to="/" className="text-accent hover:underline">Back to Home</Link>
      </div>
    );
  }

  const whatsappMessage = `Hi, I am interested in the ${car.year} ${car.make} ${car.model} listed for ${formatPrice(car.price)}. Is it still available?`;
  const whatsappUrl = `https://wa.me/2348146664096?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl border border-white/10 cursor-pointer hover:border-accent transition-colors">
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full border border-accent/30">
                    {car.year}
                  </span>
                  <span className="text-white/40 text-sm">{car.status}</span>
                </div>
                <h1 className="text-5xl font-bold mb-2 font-car-both">
                  {car.make} <span className="text-accent">{car.model}</span>
                </h1>
                <p className="text-3xl font-bold text-white/90">
                  {formatPrice(car.price)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Mileage</p>
                  <p className="text-lg font-bold">{car.mileage.toLocaleString()} km</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Fuel Type</p>
                  <p className="text-lg font-bold">{car.fuel_type}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Transmission</p>
                  <p className="text-lg font-bold">{car.transmission}</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-white/60 leading-relaxed">
                  {car.description}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, i) => (
                    <span key={i} className="bg-white/5 px-4 py-2 rounded-full text-sm border border-white/10 text-white/80">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-accent text-black text-center py-5 rounded-2xl font-black text-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-accent/20"
              >
                INQUIRE ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
