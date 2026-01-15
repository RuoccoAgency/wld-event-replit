import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CarDetailPage from "@/pages/car-detail";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Simple events page component
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

function CollectionPage() {
  // Reusing Home components but starting from collection
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
         {/* Imported dynamically to avoid circular deps if complex, but here it's fine */}
         <div className="bg-zinc-950 py-20">
            <div className="container mx-auto px-6 mb-12 text-center">
               <h1 className="text-4xl font-serif text-white">La Nostra Flotta</h1>
            </div>
            {/* We can reuse the grid from CarCollection or specific page content */}
            {/* For now, let's redirect to Home or show a simple list. 
                Actually, let's just render the Home component but scroll to collection? 
                Or better, let's just make a simple wrapper. 
            */}
             <div className="text-center text-white/50 py-20">
               <p>Vedi la nostra collezione completa nella <a href="/" className="text-primary underline">Home</a></p>
             </div>
         </div>
      </div>
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
        <Route path="/collection" component={Home} /> {/* Reuse home for now as it has everything */}
        <Route path="/events" component={EventsPage} />
        <Route path="/cars/:id" component={CarDetailPage} />
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
