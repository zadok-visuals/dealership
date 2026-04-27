import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import CarCard from "./CarCard";

type Car = Database["public"]["Tables"]["cars"]["Row"];

// Sample data for demonstration if Supabase is not configured
const SAMPLE_CARS: Car[] = [
  {
    id: "1",
    make: "Mercedes-Benz",
    model: "AMG GT",
    year: 2023,
    price: 155000,
    mileage: 1200,
    transmission: "Automatic",
    fuel_type: "Petrol",
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2070"],
    description: "The Mercedes-AMG GT is a car that will make you feel like a pro driver.",
    features: ["Heated Seats", "Sunroof", "Parking Sensors"],
    status: "Available",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    make: "Porsche",
    model: "911 Carrera",
    year: 2022,
    price: 125000,
    mileage: 5400,
    transmission: "Automatic",
    fuel_type: "Petrol",
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"],
    description: "The Porsche 911 is a timeless classic.",
    features: ["Leather Seats", "Bose Sound System", "Adaptive Cruise Control"],
    status: "Available",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 140000,
    mileage: 0,
    transmission: "Automatic",
    fuel_type: "Electric",
    images: ["https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2070"],
    description: "The Audi RS e-tron GT is the future of performance.",
    features: ["Virtual Cockpit", "360 Camera", "Matrix LED"],
    status: "Available",
    created_at: new Date().toISOString(),
  },
];

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
        if (data && data.length > 0) {
          setCars(data);
        } else {
          setCars(SAMPLE_CARS);
        }
      } catch (err) {
        // Fallback to sample cars if Supabase isn't configured
        setCars(SAMPLE_CARS);
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
