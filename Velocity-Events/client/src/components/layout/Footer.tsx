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
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Contatti</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>Piazza J. Kennedy, 25<br />80019 Qualiano (NA)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>081 1878 9724</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@luxuryweddingcars.it</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Esplora</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="/collection" className="hover:text-primary transition-colors">La Nostra Collezione</a></li>
              <li><a href="/events" className="hover:text-primary transition-colors">Servizi per Matrimoni</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">Chi Siamo</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">Richiedi Preventivo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>© 2025 Luxury Wedding Cars. Tutti i diritti riservati.</p>
          <p>P.IVA 00000000000</p>
        </div>
      </div>
    </footer>
  );
}
