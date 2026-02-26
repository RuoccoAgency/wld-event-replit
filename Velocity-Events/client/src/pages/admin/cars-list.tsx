import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { adminFetch, isAdminLoggedIn, clearAdminToken } from "@/lib/adminAuth";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import type { Car, CarImage } from "@/types/schema";

type CarWithImages = Car & { images: CarImage[] };

export default function AdminCarsList() {
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      setLocation("/admin");
      return;
    }
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setCars(data.cars || []);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id: number) => {
    if (!confirm("Sei sicuro di voler eliminare questa auto?")) return;
    try {
      await adminFetch(`/api/admin/cars/${id}`, { method: "DELETE" });
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete car:", err);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setLocation("/admin");
  };

  const getCoverImage = (car: CarWithImages) => {
    const cover = car.images?.find((img) => img.isCover);
    return cover?.url || car.images?.[0]?.url || "";
  };

  const formatPrice = (car: CarWithImages) => {
    if (car.priceText) return car.priceText;
    if (car.priceEur) return `€${car.priceEur.toLocaleString("it-IT")}`;
    return "N/A";
  };

  const statusColors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400",
    reserved: "bg-yellow-500/20 text-yellow-400",
    sold: "bg-red-500/20 text-red-400",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white/50">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-serif">Gestione Auto</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/cars/new"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Nuova Auto
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-zinc-400 text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Esci
            </button>
          </div>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p>Nessuna auto presente. Crea la prima!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="w-24 h-16 bg-zinc-800 overflow-hidden flex-shrink-0">
                  {getCoverImage(car) ? (
                    <img
                      src={getCoverImage(car)}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                      No img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{car.title}</h3>
                  <p className="text-sm text-zinc-400">
                    {car.brand} &middot; {formatPrice(car)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusColors[car.status] || "bg-zinc-700 text-zinc-300"}`}
                >
                  {car.status}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/cars/${car.id}`}
                    className="p-2 hover:bg-zinc-800 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4 text-zinc-400" />
                  </Link>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="p-2 hover:bg-red-900/30 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
