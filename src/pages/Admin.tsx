import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";
import { useCurrency } from "@/components/CurrencyProvider";

type Car = Database["public"]["Tables"]["cars"]["Row"];

export default function Admin() {
  const { formatPrice } = useCurrency();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    transmission: "Automatic" as "Automatic" | "Manual",
    fuel_type: "Petrol" as "Petrol" | "Diesel" | "Electric" | "Hybrid",
    description: "",
    features: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCars(data);
    }
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      
      // Cleanup old previews
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      
      // Generate new previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviews);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
      
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviews);
    }
  };

  async function uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `car-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cars')
        .upload(filePath, file);

      if (uploadError) {
        console.warn("Storage upload failed (Bucket might not exist):", uploadError);
        // In demo mode, we use a placeholder if real upload fails
        urls.push(`https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000`);
      } else {
        const { data } = supabase.storage.from('cars').getPublicUrl(filePath);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    try {
      const imageUrls = selectedFiles.length > 0 
        ? await uploadImages(selectedFiles)
        : ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000"];

      const carData = {
        ...formData,
        images: imageUrls,
        features: formData.features.split(",").map(f => f.trim()),
        status: "Available",
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("cars").insert([carData]);

      if (error) {
        alert("Error adding car: " + error.message);
      } else {
        alert("Car added successfully!");
        setShowForm(false);
        setFormData({
          make: "",
          model: "",
          year: new Date().getFullYear(),
          price: 0,
          mileage: 0,
          transmission: "Automatic",
          fuel_type: "Petrol",
          description: "",
          features: "",
        });
        setSelectedFiles([]);
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setPreviewUrls([]);
        fetchCars();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold font-car-both">INVENTORY <span className="text-accent">MANAGEMENT</span></h1>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-accent text-black px-6 py-2 rounded-full font-bold hover:bg-white transition-colors"
            >
              {showForm ? "Cancel" : "+ Add Car"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm text-white/40">Make</label>
                <input 
                  type="text" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40">Model</label>
                <input 
                  type="text" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40">Year</label>
                <input 
                  type="number" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40">Price ($)</label>
                <input 
                  type="number" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                />
              </div>

              {/* Drag and Drop Area */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-white/40">Car Images</label>
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full min-h-[160px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-accent hover:bg-white/5 transition-all"
                >
                  <input 
                    type="file" multiple accept="image/*" 
                    ref={fileInputRef} className="hidden" 
                    onChange={handleFileChange}
                  />
                  {previewUrls.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                          <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl mb-2">📸</span>
                      <p className="text-sm text-white/60">Drag & Drop images or click to upload</p>
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-white/40">Features (Comma separated)</label>
                <input 
                  type="text" required
                  placeholder="Sunroof, Leather Seats, GPS"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})}
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-white/40">Description</label>
                <textarea 
                  required rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={uploading}
                className={`md:col-span-2 bg-accent text-black py-4 rounded-xl font-bold text-lg hover:bg-white transition-all ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {uploading ? "Uploading..." : "Publish Listing"}
              </button>
            </form>
          )}

          <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-sm font-bold text-white/40">Vehicle</th>
                  <th className="p-6 text-sm font-bold text-white/40">Price</th>
                  <th className="p-6 text-sm font-bold text-white/40">Status</th>
                  <th className="p-6 text-sm font-bold text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-white/20 italic">No inventory found in Supabase.</td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-bold">{car.year} {car.make} {car.model}</td>
                      <td className="p-6 text-accent font-bold">{formatPrice(car.price)}</td>
                      <td className="p-6">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{car.status}</span>
                      </td>
                      <td className="p-6">
                        <button className="text-white/40 hover:text-red-500 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
