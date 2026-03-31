import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { CarDetailView } from "@/components/cars/CarDetailView";
import NotFound from "@/pages/not-found";
import { cars as staticCars } from "@/data/cars";
import type { Car, CarImage } from "@/types/schema";

type CarWithImages = Car & { images: CarImage[] };

function staticToApi(c: typeof staticCars[number]): CarWithImages {
  const raw = c as any;
  return {
    id: parseInt(c.id) || 0,
    slug: c.id,
    brand: c.brand,
    model: c.name.replace(c.brand + " ", ""),
    title: c.name.toUpperCase(),
    priceEur: parseInt(c.price.replace(/[^\d]/g, "")) || 0,
    priceText: c.price,
    powerCv: raw.powerCv || (c.specifiche?.cavalli ? parseInt(c.specifiche.cavalli) : null),
    year: parseInt(c.year) || null,
    engine: c.engine || null,
    color: c.color || null,
    seats: parseInt(c.seats) || null,
    tags: c.idealFor?.join(", ") || null,
    description: c.description || null,
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date(),
    images: c.immagini?.map((url, i) => ({
      id: i,
      carId: parseInt(c.id) || 0,
      url,
      alt: null,
      isCover: i === 0,
      sortOrder: i,
      createdAt: new Date(),
    })) || [],
  } as CarWithImages;
}

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
      .catch(() => {
        const fallback = staticCars.find((c) => c.id === slug);
        if (fallback) {
          setCar(staticToApi(fallback));
        } else {
          setNotFound(true);
        }
      })
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
      <BookingForm />
      <Footer />
    </>
  );
}
