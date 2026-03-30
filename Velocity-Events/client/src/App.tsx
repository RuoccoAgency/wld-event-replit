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

import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";

import EventsPage from "@/pages/events";
import AboutPage from "@/pages/about";
import LuxuryAssetRental from "@/pages/luxury-asset-rental";
import BecomePartner from "@/pages/become-partner";
import LimousineRental from "@/pages/limousine-rental";
import ServiceDetail from "@/pages/service-detail";

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { CustomCursor } from "@/components/ui/CustomCursor";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CustomCursor />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Router() {
  const [location] = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/">
            <PageTransition><Home /></PageTransition>
          </Route>
          <Route path="/collection">
            <PageTransition><CarsCollectionPage /></PageTransition>
          </Route>
          <Route path="/events">
            <PageTransition><EventsPage /></PageTransition>
          </Route>
          <Route path="/about">
            <PageTransition><AboutPage /></PageTransition>
          </Route>
          <Route path="/luxury-rental">
            <PageTransition><LuxuryAssetRental /></PageTransition>
          </Route>
          <Route path="/become-partner">
            <PageTransition><BecomePartner /></PageTransition>
          </Route>
          <Route path="/limousine-rental">
            <PageTransition><LimousineRental /></PageTransition>
          </Route>
          <Route path="/servizi/:slug">
            {(params: any) => (
              <PageTransition>
                <ServiceDetail params={params} />
              </PageTransition>
            )}
          </Route>
          <Route path="/cars/:slug">
            {(params: any) => (
              <PageTransition>
                <CarDetailPage params={params} />
              </PageTransition>
            )}
          </Route>
          <Route path="/admin">
            <PageTransition><AdminLogin /></PageTransition>
          </Route>
          <Route path="/admin/cars">
            <PageTransition><AdminCarsList /></PageTransition>
          </Route>
          <Route path="/admin/cars/:id">
            {(params: any) => (
              <PageTransition>
                <CarEditor params={params} />
              </PageTransition>
            )}
          </Route>
          <Route>
            <PageTransition><NotFound /></PageTransition>
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
