import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CarDetailView } from "@/components/cars/CarDetailView";
import NotFound from "@/pages/not-found";
import type { Car, CarImage } from "@shared/schema";

type CarWithImages = Car & { images: CarImage[] };

export default function CarDetailPage() {
  const [, params] = useRoute("/cars/:slug");
  const slug = params?.slug;
  const [car, setCar] = useState<CarWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/cars/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setCar(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Caricamento...</p>
      </div>
    );
  }

  if (notFound || !car) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <CarDetailView car={car} />
      <Footer />
    </>
  );
}
