import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CarDetailPage from "@/pages/car-detail";
import CarsCollectionPage from "@/pages/cars-collection";
import AdminLogin from "@/pages/admin/login";
import AdminCarsList from "@/pages/admin/cars-list";
import CarEditor from "@/pages/admin/car-editor";
import { useEffect } from "react";
import { useLocation } from "wouter";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";

function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">Matrimoni ed Eventi</h1>
        <p className="text-white/60 max-w-2xl mx-auto mb-12">
          Dal trasporto della sposa all'organizzazione di transfer per gli ospiti VIP.
          Offriamo soluzioni personalizzate per rendere ogni evento unico.
        </p>
      </div>
      <BookingForm />
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collection" component={CarsCollectionPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/cars/:slug" component={CarDetailPage} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/cars" component={AdminCarsList} />
        <Route path="/admin/cars/:id" component={CarEditor} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
