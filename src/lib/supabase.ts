import { createClient } from "@supabase/supabase-js";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuel_type: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  images: string[];
  description: string;
  features: string[];
  status: "Available" | "Sold" | "Reserved";
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isValidUrl = supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://");
export const isDemoMode = !supabaseUrl || !supabaseAnonKey || !isValidUrl;

// Initialize with dummy values if missing to prevent runtime crash during build/dev
// The app will fallback to SAMPLE_CARS in components if Supabase fails
export const supabase = createClient(
  isValidUrl ? supabaseUrl : "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn("Supabase credentials missing. UI is running in demo mode with sample data.");
  }
}
