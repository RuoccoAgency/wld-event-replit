import { useRoute } from "wouter";
import { cars } from "@/data/cars";
import { CarDetail } from "@/components/cars/CarDetail";
import { Navbar } from "@/components/layout/Navbar";
import NotFound from "@/pages/not-found";

export default function CarDetailPage() {
  const [, params] = useRoute("/cars/:id");
  const carId = params?.id;
  const car = cars.find((c) => c.id === carId);

  if (!car) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar />
      <CarDetail car={car} />
    </>
  );
}
