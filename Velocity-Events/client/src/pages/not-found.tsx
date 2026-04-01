import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/contact/BookingForm";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-lg border-none shadow-2xl rounded-none bg-slate-50 overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <CardContent className="pt-12 pb-16 px-10 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <AlertCircle size={40} />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground">404</h1>
              <p className="text-xl font-serif text-muted-foreground uppercase tracking-widest">Pagina Non Trovata</p>
              <div className="w-12 h-[1px] bg-border my-2" />
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                La pagina che stai cercando potrebbe essere stata rimossa o non essere più disponibile. 
                Utilizza il menu principale o torna alla Home.
              </p>
              <Link href="/">
                <Button className="bg-slate-900 hover:bg-primary text-white uppercase tracking-widest text-xs font-bold px-10 py-7 transition-all rounded-none group shadow-lg">
                  <Home size={16} className="mr-2 group-hover:-translate-y-0.5 transition-transform" /> Torna alla Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <BookingForm />
      <Footer />
    </div>
  );
}
