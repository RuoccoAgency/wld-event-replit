import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Car, CarImage } from "@shared/schema";

type CarWithImages = Car & { images: CarImage[] };

function formatPrice(car: CarWithImages) {
  if (car.priceText) return car.priceText;
  if (car.priceEur) return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(car.priceEur);
  return "";
}

function getCoverImage(car: CarWithImages) {
  const cover = car.images?.find((img) => img.isCover);
  return cover?.url || car.images?.[0]?.url || "";
}

function getTags(car: CarWithImages): string[] {
  if (!car.tags) return [];
  return car.tags.split(",").map((t) => t.trim()).filter(Boolean);
}

export default function CarsCollectionPage() {
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars?status=available")
      .then((res) => res.json())
      .then((data) => setCars(data.cars || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
              La Nostra Collezione
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">
              L'eccellenza su quattro ruote
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Caricamento...</div>
          ) : cars.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Nessuna auto disponibile al momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {cars.map((car, index) => (
                <Link
                  key={car.id}
                  href={`/cars/${car.slug}`}
                  className="block group relative bg-card overflow-hidden cursor-pointer border border-border/20 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(140,191,175,0.3)] hover:-translate-y-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {getCoverImage(car) ? (
                        <img
                          src={getCoverImage(car)}
                          alt={car.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                          Nessuna foto
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                        <span className="px-6 py-3 border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                          Visualizza Dettagli
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between relative z-20 bg-card group-hover:bg-secondary/30 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-primary text-xs uppercase tracking-widest mb-1 font-bold">
                            {car.brand}
                          </p>
                          {car.powerCv && (
                            <span className="text-[10px] text-muted-foreground border border-border/20 px-2 py-1 rounded">
                              {car.powerCv} CV
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {car.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-3 mb-6">
                          {getTags(car).slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-3 py-1 bg-secondary text-muted-foreground border border-border/20 rounded-full group-hover:border-primary/20 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-border/10 group-hover:border-primary/20 transition-colors">
                        <p className="text-muted-foreground text-xs font-mono">
                          {formatPrice(car)}
                        </p>
                        <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                          Scopri <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
