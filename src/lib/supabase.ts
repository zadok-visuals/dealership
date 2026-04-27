import { createClient } from "@supabase/supabase-js";
import { Database, Car as CarType } from "@/integrations/supabase/types";

export type Car = CarType;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isValidUrl = supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://");
export const isDemoMode = !supabaseUrl || !supabaseAnonKey || !isValidUrl;

// Initialize with dummy values if missing to prevent runtime crash during build/dev
// The app will fallback to SAMPLE_CARS in components if Supabase fails
export const supabase = createClient<Database>(
  isValidUrl ? supabaseUrl : "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn("Supabase credentials missing. UI is running in demo mode with sample data.");
  }
}
