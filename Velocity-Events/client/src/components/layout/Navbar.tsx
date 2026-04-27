import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const SERVIZI_LIST = [
  { label: "Nascita", slug: "nascita" },
  { label: "Battesimo", slug: "battesimo" },
  { label: "Primo compleanno", slug: "primo-compleanno" },
  { label: "Compleanni", slug: "compleanni" },
  { label: "Compleanni per adulti", slug: "compleanni-per-adulti" },
  { label: "Comunione", slug: "comunione" },
  { label: "Cresima", slug: "cresima" },
  { label: "Diciottesimo", slug: "diciottesimo" },
  { label: "Laurea", slug: "laurea" },
  { label: "Fidanzamento", slug: "fidanzamento" },
  { label: "Anniversario", slug: "anniversario" },
  { label: "Matrimonio", slug: "matrimonio" },
  { label: "Baby shower", slug: "baby-shower" },
  { label: "Gender reveal", slug: "gender-reveal" },
  { label: "Eventi aziendali", slug: "eventi-aziendali" },
  { label: "Inaugurazioni", slug: "inaugurazioni" },
  { label: "Feste a tema", slug: "feste-a-tema" },
  { label: "Allestimenti stagionali", slug: "allestimenti-stagionali" },
  { label: "Pool Party", slug: "pool-party" },
  { label: "Funeral Party", slug: "funeral-party" },
  { label: "Feste Private", slug: "feste-private" },
  { label: "Party su imbarcazioni", slug: "party-su-imbarcazioni" },

  { label: "Addio al nubilato", slug: "addio-al-nubilato" },
  { label: "Addio al celibato", slug: "addio-al-celibato" },
  { label: "Funerale", slug: "funerale" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServiziOpen, setIsDesktopServiziOpen] = useState(false);
  const [isMobileServiziOpen, setIsMobileServiziOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const showGlass = scrolled || !isHome;

  // Close menus on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopServiziOpen(false);
    setIsMobileServiziOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServiziOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        showGlass ? "glass py-4 shadow-xl" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between relative">
        {/* LEFT: Logo / Brand */}
        <div className="flex-1 flex justify-start items-center">
          <Link href="/" className="flex items-center gap-3 z-50 group/logo">
            <motion.img 
              src="/logo.png" 
              alt="Wedding Luxury Drive" 
              className="h-9 sm:h-10 md:h-12 lg:h-14 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className={cn("hidden xl:inline-block text-xs font-serif font-medium tracking-[0.2em] transition-colors uppercase whitespace-nowrap", showGlass ? "text-foreground" : "text-white")}>
              Wedding Luxury Drive
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Menu Items */}
        <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 flex-none">
          {/* SERVIZI DROPDOWN */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsDesktopServiziOpen(true)}
            onMouseLeave={() => setIsDesktopServiziOpen(false)}
          >
            <button className={cn(
              "flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary py-4",
              showGlass ? "text-foreground/80" : "text-white/80"
            )}>
              Servizi <ChevronDown size={14} className={cn("transition-transform duration-300", isDesktopServiziOpen ? "rotate-180" : "")} />
            </button>
            
            <AnimatePresence>
              {isDesktopServiziOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-slate-100 p-8 w-[650px] z-50 rounded-sm"
                >
                  <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                    {SERVIZI_LIST.map((servizio, idx) => (
                      <motion.div
                        key={servizio.slug}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                      >
                        <Link 
                          href={`/servizi/${servizio.slug}`}
                          className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-primary transition-colors py-1 flex items-center group/link"
                          onClick={() => setIsDesktopServiziOpen(false)}
                        >
                          <span className="w-0 group-hover/link:w-2 h-[1px] bg-primary mr-0 group-hover/link:mr-2 transition-all"></span>
                          {servizio.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/collection" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/collection" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
            Collezione
          </Link>
          <Link href="/events" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/events" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
            Eventi
          </Link>
          <Link href="/luxury-rental" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/luxury-rental" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
            Noleggio Lusso
          </Link>
          <Link href="/limousine-rental" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/limousine-rental" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
             Limousine
          </Link>          
          <Link href="/become-partner" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/become-partner" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
            Partners
          </Link>
          <Link href="/about" className={cn("text-[10px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-all", location === "/about" ? "text-primary border-b border-primary/30" : (showGlass ? "text-foreground/80" : "text-white/80"))}>
            Chi Siamo
          </Link>
        </div>

        {/* RIGHT: Action Items */}
        <div className="flex-1 flex justify-end items-center gap-4 z-50">
          <a href="/#contact" className="hidden xl:block px-6 py-2.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-lg">
            Preventivo
          </a>
          
          {/* MOBILE TOGGLE */}
          <button 
            className={cn("lg:hidden p-2 rounded-full transition-colors", showGlass ? "text-foreground" : "text-white")}
            onClick={() => {
              if (isMobileMenuOpen) {
                closeMobileMenu();
                return;
              }
              setIsMobileMenuOpen(true);
            }}
            aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && typeof document !== "undefined" && createPortal(
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-[120] pt-24 pb-8 px-5 sm:px-8 flex flex-col items-start overflow-y-auto"
            >
              <button
                onClick={closeMobileMenu}
                aria-label="Chiudi menu mobile"
                className="absolute top-6 right-5 sm:right-8 p-2 rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full space-y-6">
                {/* MOBILE DROPDOWN (SERVIZI) */}
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsMobileServiziOpen(!isMobileServiziOpen)}
                    className="flex items-center justify-between w-full text-lg font-serif text-slate-900 border-b border-slate-100 pb-3"
                  >
                    <span>Servizi</span>
                    <ChevronDown size={18} className={cn("transition-transform", isMobileServiziOpen ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                    {isMobileServiziOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50 p-4 space-y-2 rounded-sm"
                      >
                         <div className="grid grid-cols-1 gap-y-1">
                          {SERVIZI_LIST.map((servizio) => (
                            <Link 
                              key={servizio.slug}
                              href={`/servizi/${servizio.slug}`}
                              className="text-xs font-light text-slate-600 hover:text-primary block py-1"
                              onClick={closeMobileMenu}
                            >
                              {servizio.label}
                            </Link>
                          ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/collection" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">Collezione</Link>
                <Link href="/events" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">I Nostri Eventi</Link>
                <Link href="/luxury-rental" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">Noleggio Lusso</Link>
                <Link href="/limousine-rental" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">Limousine</Link>
                <Link href="/become-partner" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">Diventa Partner</Link>
                <Link href="/about" onClick={closeMobileMenu} className="block text-lg font-serif text-slate-900 border-b border-slate-100 pb-3">Chi Siamo</Link>
                
                <a href="/#contact" onClick={closeMobileMenu} className="block w-full text-center py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs mt-6 shadow-md">
                  Richiedi Preventivo
                </a>
              </div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
