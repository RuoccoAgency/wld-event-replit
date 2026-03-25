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

import EventsPage from "@/pages/events";
import AboutPage from "@/pages/about";
import LuxuryAssetRental from "@/pages/luxury-asset-rental";
import BecomePartner from "@/pages/become-partner";
import LimousineRental from "@/pages/limousine-rental";

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
        <Route path="/about" component={AboutPage} />
        <Route path="/luxury-rental" component={LuxuryAssetRental} />
        <Route path="/become-partner" component={BecomePartner} />
        <Route path="/limousine-rental" component={LimousineRental} />
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
