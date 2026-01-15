import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled ? "bg-white/95 backdrop-blur-md border-border/20 py-4 shadow-xl" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className={cn("text-xl md:text-2xl font-serif font-bold tracking-widest transition-colors uppercase", scrolled ? "text-foreground" : "text-white")}>
          Wedding Luxury Drive
        </Link>

        {/* Menu Items */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/collection" className={cn("text-xs font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors", location === "/collection" ? "text-primary" : (scrolled ? "text-foreground/70" : "text-white/70"))}>
            Collezione
          </Link>
          <a 
            href="/#services" 
            onClick={(e) => {
              if (location === "/") {
                e.preventDefault();
                scrollToSection("services");
              }
            }}
            className={cn("text-xs font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors cursor-pointer", scrolled ? "text-foreground/70" : "text-white/70")}
          >
            Servizi
          </a>
          <Link href="/events" className={cn("text-xs font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors", location === "/events" ? "text-primary" : (scrolled ? "text-foreground/70" : "text-white/70"))}>
            Matrimoni & Eventi
          </Link>
          <a 
            href="/#contact" 
            onClick={(e) => {
              if (location === "/") {
                e.preventDefault();
                scrollToSection("contact");
              }
            }}
            className={cn("text-xs font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors cursor-pointer", scrolled ? "text-foreground/70" : "text-white/70")}
          >
            Contatti
          </a>
        </div>

        {/* CTA Button */}
        <a href="/#contact" className="hidden md:block px-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(140,191,175,0.3)] hover:shadow-[0_0_30px_rgba(140,191,175,0.5)]">
          Richiedi Preventivo
        </a>
      </div>
    </nav>
  );
}
