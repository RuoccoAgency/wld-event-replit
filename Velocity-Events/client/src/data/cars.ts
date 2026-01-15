// Import existing BMW images
import bmwFront from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.43_f65fb732_1764955998345.jpg';
import bmwSide from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.44_9eaca376_1764956008205.jpg';
import bmwProfile from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.44_08695d66_1764956017518.jpg';
import bmwSeats from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.44_9fbd12a9_1764956028891.jpg';
import bmwDash from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.45_3bcec7b6_1764956034988.jpg';
import bmwInterior from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.45_4e8813e3_1764956042942.jpg';
import bmwDoor from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.47_e58ab153_1764956056235.jpg';
import bmwRearSeats from '@assets/Immagine_WhatsApp_2025-12-05_ore_11.41.48_9d294d02_1764956072791.jpg';

// Import new Ferrari Portofino M images
import ferrariRear from '@assets/image_1764958549924.png';
import ferrariSideOpen from '@assets/image_1764958560641.png';
import ferrariLogo from '@assets/image_1764958573170.png';
import ferrariDashDetail from '@assets/image_1764958583458.png';
import ferrariRearDetail from '@assets/image_1764958592653.png';
import ferrariInterior from '@assets/image_1764958613283.png';
import ferrariSteering from '@assets/image_1764958635022.png';

export interface Car {
  id: string;
  name: string;
  brand: string;
  price: string;
  year: string;
  engine: string;
  seats: string;
  color: string;
  mainImage: string;
  images360: string[]; // Keeping for type compatibility
  immagini: string[]; // Gallery array
  description: string;
  idealFor: string[];
  specifiche?: {
    motore: string;
    cavalli: string;
    accelerazione: string;
    velocitaMax: string;
    posti: string;
  };
  specs: {
    label: string;
    detail: string;
    x: number; 
    y: number;
  }[];
}

export const cars: Car[] = [
  {
    id: "bmw-x6-m",
    brand: "BMW",
    name: "X6 M Competition",
    price: "1.000,00€",
    year: "2024",
    engine: "V8 Twin-Turbo",
    seats: "5 Posti",
    color: "Brooklyn Grey",
    mainImage: bmwFront,
    images360: [bmwFront, bmwSide, bmwProfile, bmwSeats],
    immagini: [
      bmwFront,
      bmwSide,
      bmwProfile,
      bmwSeats,
      bmwDash,
      bmwInterior,
      bmwDoor,
      bmwRearSeats
    ],
    description: "La BMW X6 M Competition unisce la presenza imponente di un SUV coupé con le prestazioni di una supercar. Interni in pelle Merino, dettagli in carbonio e un sistema audio Bowers & Wilkins rendono ogni viaggio un'esperienza di lusso assoluto. Perfetta per chi vuole distinguersi con potenza ed eleganza.",
    idealFor: ["Eventi Aziendali", "Transfer VIP", "Matrimoni Moderni", "Shooting"],
    specifiche: {
      motore: "4395 cc - V8",
      cavalli: "625 CV",
      accelerazione: '3,8" 0-100 km/h',
      velocitaMax: "290 km/h",
      posti: "5"
    },
    specs: [
      { label: "Cerchi 21''/22''", detail: "Cerchi in lega leggera M Star-spoke.", x: 20, y: 65 },
      { label: "Interni M", detail: "Sedili multifunzione M in pelle.", x: 50, y: 45 },
      { label: "Iconic Glow", detail: "Griglia a rene illuminata.", x: 50, y: 35 },
    ]
  },
  {
    id: "ferrari-portofino-m",
    brand: "Ferrari",
    name: "Ferrari Portofino M",
    price: "1.800,00€",
    year: "2023",
    engine: "3900 cc - V8",
    seats: "4 Posti",
    color: "Rosso Corsa",
    mainImage: ferrariSideOpen, // Using the open roof side shot as main
    images360: [ferrariSideOpen, ferrariRear, ferrariInterior, ferrariSteering], // Placeholder
    immagini: [
      ferrariSideOpen,
      ferrariRear,
      ferrariInterior,
      ferrariSteering,
      ferrariDashDetail,
      ferrariRearDetail,
      ferrariLogo
    ],
    description: "La M sta a significare modificata, l'evoluzione della Portofino ricca di novità tecniche e design. Te ne accorgi quando premi il pulsante dell'accensione sul volante: è in quel momento che il lavoro svolto sull'impianto di scarico diventa lampante. Alla guida della Ferrari Portofino M ti immergi in un mondo di comfort e potenza contemporaneamente.",
    idealFor: ["Matrimoni di lusso", "Eventi aziendali", "Eventi esclusivi"],
    specifiche: {
      motore: "3900 cc - V8",
      cavalli: "620 CV",
      accelerazione: '3,4" 0-100 km/h',
      velocitaMax: "320 km/h",
      posti: "4"
    },
    specs: [
      { label: "Manettino", detail: "5 posizioni per ogni stile di guida.", x: 45, y: 60 },
      { label: "Tetto RHT", detail: "Hard top retrattile in 14 secondi.", x: 50, y: 20 },
      { label: "Cockpit", detail: "Display passeggero dedicato.", x: 60, y: 45 },
    ]
  }
];
