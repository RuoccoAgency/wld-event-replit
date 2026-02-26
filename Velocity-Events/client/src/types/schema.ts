export type Car = {
  id: number;
  slug: string;
  brand: string;
  model: string;
  title: string;
  priceEur: number | null;
  priceText: string | null;
  powerCv: number | null;
  year: number | null;
  engine: string | null;
  color: string | null;
  seats: number | null;
  tags: string | null;
  description: string | null;
  status: "available" | "reserved" | "sold";
  createdAt: Date;
  updatedAt: Date;
};

export type CarImage = {
  id: number;
  carId: number;
  url: string;
  alt: string | null;
  sortOrder: number;
  isCover: boolean;
};
