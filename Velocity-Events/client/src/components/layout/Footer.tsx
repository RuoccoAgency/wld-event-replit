import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/20 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-4 max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Wedding Luxury Drive" className="h-14 w-auto" />
              <h3 className="text-xs font-serif font-medium text-foreground uppercase tracking-[0.2em] leading-tight flex flex-col">
                <span>Wedding</span>
                <span>Luxury Drive</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-8">
              Rendiamo indimenticabile il giorno più bello della tua vita con auto esclusive e un servizio impeccabile. Eleganza, stile e passione al tuo servizio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Our Locations */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Le Nostre Sedi</h4>
            <div className="flex flex-col sm:flex-row gap-x-8 gap-y-6">
              <div className="flex-1">
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground mb-3 opacity-50">Italia</h5>
                <ul className="space-y-3 text-[10px] leading-tight text-muted-foreground uppercase tracking-widest font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span>Bolzano / Qualiano / Napoli / Quarto</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground mb-3 opacity-50">Spagna</h5>
                <ul className="space-y-3 text-[10px] leading-tight text-muted-foreground uppercase tracking-widest font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span>Barcelona / Adeje / Madrid</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/10 space-y-3">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>081 1878 9724</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="lowercase">info@luxuryweddingcars.it</span>
              </div>
            </div>
          </div>

          {/* Column 3: Esplora */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Esplora</h4>
            <ul className="space-y-4 text-[11px] text-muted-foreground uppercase tracking-widest">
              <li><a href="/collection" className="hover:text-primary transition-colors">Collezione</a></li>
              <li><a href="/events" className="hover:text-primary transition-colors">Eventi</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">Chi Siamo</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contatti</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Details or Empty for Spacing */}
          <div className="md:col-span-2 flex flex-col justify-between h-full py-2">
            <div className="hidden lg:block">
              {/* Optional secondary brand mark or tiny map icon */}
              <div className="w-8 h-[1px] bg-primary/30 mb-4" />
              <p className="text-[9px] text-muted-foreground/40 leading-relaxed uppercase tracking-[0.2em]">
                Premium Rental<br />Solutions
              </p>
            </div>
          </div>
        </div>

        
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>© 2026 Luxury Wedding Cars. Tutti i diritti riservati.</p>
          <p>P.IVA 00000000000</p>
        </div>
      </div>
    </footer>
  );
}
