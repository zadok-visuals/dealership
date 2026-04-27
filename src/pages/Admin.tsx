import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Car, CarInsert } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";
import { useCurrency } from "@/components/CurrencyProvider";

export default function Admin() {
  const { formatPrice } = useCurrency();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
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
        alert("Upload failed: " + uploadError.message + "\nMake sure you have created a PUBLIC bucket named 'cars' in Supabase Storage.");
        throw uploadError;
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
        : []; // Store empty array if no images

      const carData: CarInsert = {
        ...formData,
        images: imageUrls,
        features: formData.features.split(",").map(f => f.trim()),
        status: "Available",
        created_at: editingId ? undefined : new Date().toISOString(),
      };

      if (editingId) {
        // Remove created_at from updates to avoid type errors
        const { created_at, ...updateData } = carData;
        const { error } = await supabase
          .from("cars")
          .update(updateData)
          .eq("id", editingId);
        
        if (error) throw error;
        alert("Car updated successfully!");
      } else {
        const { error } = await supabase.from("cars").insert(carData);
        if (error) throw error;
        alert("Car added successfully!");
      }

      setShowForm(false);
      setEditingId(null);
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
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  }

  function handleEdit(car: Car) {
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      transmission: car.transmission as any,
      fuel_type: car.fuel_type as any,
      description: car.description,
      features: car.features.join(", "),
    });
    setEditingId(car.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    const { error } = await supabase
      .from("cars")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting car: " + error.message);
    } else {
      fetchCars();
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-6">
        <Navbar />
        <div className="w-full max-w-md bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter password"
            className="w-full bg-black border border-white/10 rounded-xl p-4 mb-4 focus:border-accent outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && password === 'khalifa2026' && setIsAuthenticated(true)}
          />
          <button 
            onClick={() => {
              if (password === 'khalifa2026') {
                setIsAuthenticated(true);
              } else {
                alert("Incorrect password");
              }
            }}
            className="w-full bg-accent text-black py-4 rounded-xl font-bold hover:bg-white transition-all"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold font-car-both">INVENTORY <span className="text-accent">MANAGEMENT</span></h1>
            <button 
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) setEditingId(null);
              }}
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
              <div className="space-y-2">
                <label className="text-sm text-white/40">Mileage (km)</label>
                <input 
                  type="number" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.mileage} onChange={e => setFormData({...formData, mileage: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40">Transmission</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value as any})}
                >
                  <option value="Automatic" className="bg-zinc-900">Automatic</option>
                  <option value="Manual" className="bg-zinc-900">Manual</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40">Fuel Type</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-accent outline-none text-white"
                  value={formData.fuel_type} onChange={e => setFormData({...formData, fuel_type: e.target.value as any})}
                >
                  <option value="Petrol" className="bg-zinc-900">Petrol</option>
                  <option value="Diesel" className="bg-zinc-900">Diesel</option>
                  <option value="Electric" className="bg-zinc-900">Electric</option>
                  <option value="Hybrid" className="bg-zinc-900">Hybrid</option>
                </select>
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
                {uploading ? "Uploading..." : editingId ? "Update Listing" : "Publish Listing"}
              </button>
            </form>
          )}

          <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-sm font-bold text-white/40">Vehicle</th>
                  <th className="p-6 text-sm font-bold text-white/40">Image</th>
                  <th className="p-6 text-sm font-bold text-white/40">Price</th>
                  <th className="p-6 text-sm font-bold text-white/40">Status</th>
                  <th className="p-6 text-sm font-bold text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-white/20 italic">No inventory found in Supabase.</td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-bold">{car.year} {car.make} {car.model}</td>
                      <td className="p-6">
                        <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10">
                          <img 
                            src={car.images[0] || ""} 
                            alt="Thumbnail" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-6 text-accent font-bold">{formatPrice(car.price)}</td>
                      <td className="p-6">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">{car.status}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleEdit(car)}
                            className="text-accent hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(car.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
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
