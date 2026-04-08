# Velocity Events - Wedding Luxury Drive

## Overview
A luxury wedding car rental website built with React/Vite frontend and Express backend, backed by PostgreSQL. Features a public-facing website for showcasing luxury cars and an admin panel for managing car inventory with image uploads.

## Recent Changes
- 2026-04-08: Added HR Module backend: hr_users, hr_attendance, hr_vacations tables; JWT auth (24h token, localStorage); full REST API under /api/hr/*; bootstrap seed for first admin (admin@hr.local / hrAdmin2025); bcryptjs password hashing; complete isolation from car admin system
- 2026-02-26: Made project Vercel-compatible: decoupled client from server build, created standalone client/package.json, moved shared types into client/src/types/schema.ts
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
├── client/             # Standalone frontend (Vercel-deployable)
│   ├── package.json    # Client-only deps & scripts
│   ├── vite.config.ts  # Standalone Vite config for Vercel
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   │   ├── cars/   # CarDetail, CarDetailView
│   │   │   ├── layout/ # Navbar, Footer
│   │   │   └── ui/     # shadcn components
│   │   ├── types/      # Standalone TS types (Car, CarImage)
│   │   ├── data/       # Static car data (fallback)
│   │   ├── pages/      # Route pages
│   │   │   ├── admin/  # Admin panel (login, cars-list, car-editor)
│   │   │   ├── home.tsx
│   │   │   ├── about.tsx
│   │   │   ├── events.tsx
│   │   │   ├── car-detail.tsx
│   │   │   └── cars-collection.tsx
│   │   └── App.tsx
│   └── dist/           # Build output (gitignored)
├── server/
│   ├── index.ts        # Express server entry
│   ├── routes.ts       # API routes (cars CRUD + auth)
│   ├── storage.ts      # Database access layer
│   └── replit_integrations/  # Object storage integration
├── shared/
│   └── schema.ts       # Drizzle schema (cars + car_images tables)
└── script/
    ├── build.ts        # Production build (Replit deploy)
    └── seed.ts         # Database seeder
```

### Vercel Deployment
- **Root directory**: `Velocity-Events/client`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- Client has its own `package.json` with all frontend deps
- Types are self-contained in `client/src/types/schema.ts` (no server deps)

### Key Features
- Public pages: Home, Collection, Car Detail with image gallery/lightbox
- Admin panel at /admin with password authentication
- Car CRUD with image upload, drag-drop reorder, cover selection
- Static data fallback when API is unavailable
- Italian language UI

### Database Schema
- `cars`: id, slug, brand, model, title, priceEur, priceText, powerCv, year, engine, color, seats, tags, description, status
- `car_images`: id, carId, url, alt, sortOrder, isCover
- `hr_users`: id, email, passwordHash, name, role (admin|employee), status (active|inactive), createdAt
- `hr_attendance`: id, userId→hr_users, date, checkIn, checkOut
- `hr_vacations`: id, userId→hr_users, startDate, endDate, reason, status (pending|approved|rejected), decidedBy→hr_users, decidedAt

### Authentication
- **Car admin**: Simple token-based (password stored in ADMIN_PASSWORD env var, default: "admin2025"); routes at /admin, /api/admin/*
- **HR module**: JWT-based (24h token, stored in localStorage); routes at /hr/*, /api/hr/*; bootstrap seed creates first admin on startup

### HR Module
- Private internal system, fully isolated from public website and car admin
- Routes: /hr/login, /hr/dashboard (employee), /hr/admin (admin)
- API: /api/hr/login, /api/hr/me, /api/hr/attendance/*, /api/hr/vacations/*, /api/hr/employees/*
- Server files: server/hr-auth.ts, server/hr-routes.ts, server/hr-seed.ts

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (auto-set)
- `ADMIN_PASSWORD`: Car admin panel password (default: "admin2025")
- `HR_JWT_SECRET`: JWT signing secret for HR module (default: "hr-jwt-secret-dev")
- `HR_ADMIN_EMAIL`: First HR admin email (default: "admin@hr.local")
- `HR_ADMIN_PASSWORD`: First HR admin password (default: "hrAdmin2025")
- Object storage secrets managed via Replit integrations

## User Preferences
- Italian language for all UI text
- Luxury/elegant design aesthetic with serif fonts
- Green accent color (#8CBFAF)
