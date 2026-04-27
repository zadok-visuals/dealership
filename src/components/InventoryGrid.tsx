import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import CarCard from "./CarCard";

type Car = Database["public"]["Tables"]["cars"]["Row"];


export default function InventoryGrid() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setCars(data);
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
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
              Explore our hand-picked selection of the world&apos;s most exceptional vehicles. Each car is inspected to ensure peak performance.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors">
              Filter
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white/10 transition-colors">
              Sort
            </button>
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
