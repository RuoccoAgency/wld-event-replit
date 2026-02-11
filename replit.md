# Velocity Events - Wedding Luxury Drive

## Overview
A luxury wedding car rental website built with React/Vite frontend and Express backend, backed by PostgreSQL. Features a public-facing website for showcasing luxury cars and an admin panel for managing car inventory with image uploads.

## Recent Changes
- 2026-02-11: Added "Chi Siamo" (About Us) page with company story, values, stats, and reasons sections
- 2026-02-11: Added logo to navbar and footer, resized brand text
- 2026-02-11: Added "Matrimoni & Eventi" page with 37-photo gallery and lightbox
- 2026-02-06: Implemented full car management system with admin panel, database integration, image upload via Object Storage, and static data fallback
- 2026-02-06: Fixed HTML nesting bug (Link wrapping anchor tags) in CarDetail component
- 2026-02-06: Added gallery navigation guard for empty image arrays in CarDetailView
- 2026-02-06: Added @google-cloud/storage to build allowlist

## Project Architecture

### Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Image Storage**: Replit Object Storage (Google Cloud Storage)
- **Routing**: wouter (client-side)

### Directory Structure
```
Velocity-Events/
├── client/src/
│   ├── components/     # Reusable UI components
│   │   ├── cars/       # CarDetail, CarDetailView
│   │   ├── layout/     # Navbar, Footer
│   │   └── ui/         # shadcn components
│   ├── data/           # Static car data (fallback)
│   ├── pages/          # Route pages
│   │   ├── admin/      # Admin panel (login, cars-list, car-editor)
│   │   ├── home.tsx
│   │   ├── car-detail.tsx
│   │   └── cars-collection.tsx
│   └── App.tsx
├── server/
│   ├── index.ts        # Express server entry
│   ├── routes.ts       # API routes (cars CRUD + auth)
│   ├── storage.ts      # Database access layer
│   └── replit_integrations/  # Object storage integration
├── shared/
│   └── schema.ts       # Drizzle schema (cars + car_images tables)
└── script/
    ├── build.ts        # Production build
    └── seed.ts         # Database seeder
```

### Key Features
- Public pages: Home, Collection, Car Detail with image gallery/lightbox
- Admin panel at /admin with password authentication
- Car CRUD with image upload, drag-drop reorder, cover selection
- Static data fallback when API is unavailable
- Italian language UI

### Database Schema
- `cars`: id, slug, brand, model, title, priceEur, priceText, powerCv, year, engine, color, seats, tags, description, status
- `car_images`: id, carId, url, alt, sortOrder, isCover

### Authentication
- Simple token-based admin auth (password stored in ADMIN_PASSWORD env var, default: "admin2025")
- No user registration system - single admin password

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (auto-set)
- `ADMIN_PASSWORD`: Admin panel password (default: "admin2025")
- Object storage secrets managed via Replit integrations

## User Preferences
- Italian language for all UI text
- Luxury/elegant design aesthetic with serif fonts
- Green accent color (#8CBFAF)
