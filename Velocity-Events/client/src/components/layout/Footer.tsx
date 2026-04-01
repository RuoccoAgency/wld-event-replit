import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/20 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Wedding Luxury Drive" className="h-16 w-auto" />
              <h3 className="text-sm font-serif font-medium text-foreground uppercase tracking-[0.15em]">Wedding Luxury Drive</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-8">
              Rendiamo indimenticabile il giorno più bello della tua vita con auto esclusive e un servizio impeccabile. Eleganza, stile e passione al tuo servizio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Le Nostre Sedi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4 border-b border-border/10 pb-2">Italia</h5>
                <ul className="space-y-4 text-[11px] leading-relaxed text-muted-foreground uppercase tracking-wider font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Via Innsbruck, 27/C<br />39100 BOLZANO (BZ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>P.zza J.F. Kennedy, 25<br />80019 Qualiano (NA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Via Orazio, 20/22<br />80122 NAPOLI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Via campana 2/A<br />Quarto (NA) 80010</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4 border-b border-border/10 pb-2">Spagna</h5>
                <ul className="space-y-4 text-[11px] leading-relaxed text-muted-foreground uppercase tracking-wider font-light">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Carrer de Mallorca, 414<br />08013 Barcelona, Spain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Puerto Colon n 59, Planta Baja<br />Adeje, TENERIFE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Paseo de la Castellana n 114<br />28046 MADRID, Spain</span>
                  </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-border/10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>081 1878 9724</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="lowercase">info@luxuryweddingcars.it</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Esplora</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="/collection" className="hover:text-primary transition-colors">La Nostra Collezione</a></li>
              <li><a href="/events" className="hover:text-primary transition-colors">I Nostri Eventi</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">Chi Siamo</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Richiedi Preventivo</a></li>
            </ul>
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
