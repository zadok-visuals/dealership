import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import CarCard from "./CarCard";
import carsData from "@/data/cars.json";

type Car = Database["public"]["Tables"]["cars"]["Row"];

export default function InventoryGrid() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using local JSON data as the source of truth for the static site
    setCars(carsData as Car[]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight font-car-both">
              FEATURED <span className="text-accent">INVENTORY</span>
            </h2>
            <p className="text-white/50 max-w-lg">
              Explore our hand-picked selection of the world&apos;s most exceptional vehicles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
