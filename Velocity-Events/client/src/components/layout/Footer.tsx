import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/20 py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1: Brand & Info */}
          <div className="md:col-span-3">
            <div className="flex flex-col items-start gap-4 mb-6">
              <img src="/logo.png" alt="Wedding Luxury Drive" className="h-12 w-auto" />
              <h3 className="text-[10px] font-serif font-bold text-foreground uppercase tracking-[0.2em] leading-tight">
                Wedding<br />Luxury Drive
              </h3>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-8 max-w-[260px]">
              Eleganza, stile e passione al tuo servizio per rendere indimenticabile il tuo giorno speciale.
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
          
          {/* Column 2: Our Locations (Fully visible addresses) */}
          <div className="md:col-span-7">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Le Nostre Sedi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground mb-4 border-b border-border/10 pb-2">Italia</h5>
                <ul className="space-y-4 text-[10px] leading-snug text-muted-foreground uppercase tracking-widest font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Via Innsbruck, 27/C<br />39100 BOLZANO (BZ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>P.zza J.F. Kennedy, 25<br />80019 Qualiano (NA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Via Orazio, 20/22<br />80122 NAPOLI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Via campana 2/A<br />Quarto (NA) 80010</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground mb-4 border-b border-border/10 pb-2">Spagna</h5>
                <ul className="space-y-4 text-[10px] leading-snug text-muted-foreground uppercase tracking-widest font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Carrer de Mallorca, 414<br />08013 Barcelona</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Puerto Colon n 59, P.B.<br />Adeje, TENERIFE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <span>Paseo de la Castellana n 114<br />28046 MADRID</span>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-border/10 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground leading-none">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>081 1878 9724</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground leading-none">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="lowercase">info@luxuryweddingcars.it</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Esplora (Aligned Top Row) */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Esplora</h4>
            <ul className="space-y-4 text-[11px] text-muted-foreground uppercase tracking-widest">
              <li><a href="/collection" className="hover:text-primary transition-colors">Collezione</a></li>
              <li><a href="/events" className="hover:text-primary transition-colors">Eventi</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">Chi Siamo</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Contatti</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-muted-foreground uppercase tracking-widest text-center md:text-left">
          <p>© 2026 Luxury Wedding Cars. Tutti i diritti riservati.</p>
          <p>P.IVA 00000000000</p>
        </div>
      </div>
    </footer>
  );
}
