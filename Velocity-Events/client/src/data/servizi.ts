export interface Package {
  name: string;
  description: string;
  features: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  presentation: string;
  packages: {
    base: Package;
    premium: Package;
    exclusive: Package;
  };
}

export const SERVIZI_DATA: Record<string, ServiceData> = {
  "nascita": {
    slug: "nascita",
    title: "Nascita",
    subtitle: "Diamo il benvenuto al tuo piccolo tesoro con stile.",
    description: "La nascita di un bambino è un momento magico. Celebriamo questo nuovo inizio con allestimenti delicati e raffinati.",
    presentation: "Garantiamo un servizio curato per accogliere amici e parenti in un'atmosfera calda e festosa, celebrando la nuova vita con eleganza.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Essenziale e curato per un'accoglienza intima.",
        features: ["Allestimento tavolo principale", "Decorazioni standard a tema", "Segnaposti semplici", "Assistenza base"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Maggiore dettaglio e personalizzazione per un evento speciale.",
        features: ["Arco di palloncini personalizzato", "Confettata tematica", "Gadget ricordo per gli ospiti", "Allestimento completo sala"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Il massimo del lusso e dell'attenzione per un benvenuto indimenticabile.",
        features: ["Video e foto professionali", "Torta monumentale a tema", "Regali personalizzati premium", "Servizio limousine per la famiglia"]
      }
    }
  },
  "battesimo": {
    slug: "battesimo",
    title: "Battesimo",
    subtitle: "Un passo importante celebrato con sacralità ed eleganza.",
    description: "Il primo sacramento merita una cornice di purezza e bellezza. Creiamo l'ambiente perfetto per questa giornata spirituale.",
    presentation: "Dalle cerimonie classiche a quelle più moderne, curiamo ogni dettaglio stilistico per riflettere l'importanza del rito.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Allestimento sobrio e raffinato per la cerimonia.",
        features: ["Decorazione fonte battesimale", "Libretti messa coordinati", "Segnaposti in carta pregio", "Consulenza stile"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Un tocco di classe in più per il ricevimento.",
        features: ["Tableau de mariage tematico", "Angolo dolci personalizzato", "Centrotavola floreali", "Bomboniere artigianali"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Eccellenza assoluta per una giornata memorabile.",
        features: ["Location esclusiva", "Catering gourmet", "Intrattenimento musicale live", "Servizio fotografico d'arte"]
      }
    }
  },
  "primo-compleanno": {
    slug: "primo-compleanno",
    title: "Primo Compleanno",
    subtitle: "Un anno di gioia da festeggiare in grande.",
    description: "Il primo traguardo è il più emozionante. Creiamo un mondo incantato per il tuo bambino e i suoi piccoli ospiti.",
    presentation: "Colori, giochi e dolcezze in una scenografia da sogno per rendere indimenticabile la prima candelina.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Festa colorata e divertente.",
        features: ["Allestimento area torta", "Palloncini numero 1", "Snack e bibite base", "Area gioco sicura"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Animazione e dettagli tematici.",
        features: ["Animatore dedicato", "Candy bar a tema", "Inviti digitali personalizzati", "Backdrop fotografico"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un evento spettacolare per tutta la famiglia.",
        features: ["Spettacolo bolle di sapone", "Regali personalizzati", "Buffet catering completo", "Video ricordo dell'anno"]
      }
    }
  },
  "compleanni": {
    slug: "compleanni",
    title: "Compleanni",
    subtitle: "Feste su misura per ogni età e desiderio.",
    description: "Ogni anno in più è un motivo per sorridere. Organizziamo feste dinamiche, originali e piene di vita.",
    presentation: "Dalle feste per bambini ai ragazzi, interpretiamo i gusti del festeggiato per una giornata di puro divertimento.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Divertimento garantito con semplicità.",
        features: ["Decorazione sala", "Musica e luci base", "Torta classica", "Bibite analcoliche"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Tema personalizzato e intrattenimento.",
        features: ["Festa a tema", "Dj set o animatore", "Buffet finger food", "Area selfie accessoriata"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un compleanno da star.",
        features: ["Effetti speciali (fumo/spark)","Open bar analcolico","Catering personalizzato","Trasporto in limousine"]
      }
    }
  },
  "compleanni-per-adulti": {
    slug: "compleanni-per-adulti",
    title: "Compleanni per Adulti",
    subtitle: "Eleganza e divertimento per i tuoi traguardi.",
    description: "Non si smette mai di festeggiare. Offriamo soluzioni sofisticate per compleanni che lasciano il segno.",
    presentation: "Cocktail party, cene di gala o serate clubbing: trasformiamo la tua idea in un evento di alto livello.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Serata elegante per amici stretti.",
        features: ["Aperitivo di benvenuto", "Musica lounge di sottofondo", "Torta pasticceria fine", "Area riservata"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Party dinamico e completo.",
        features: ["Catering a buffet", "Dj set professionista", "Allestimento luci architetturali", "Servizio Barman"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Il massimo dell'esclusività.",
        features: ["Private Chef", "Open Bar Premium", "Cantante o band live", "Security e accoglienza VIP"]
      }
    }
  },
  "comunione": {
    slug: "comunione",
    title: "Comunione",
    subtitle: "La purezza del bianco in un evento indimenticabile.",
    description: "Un momento di crescita spirituale circondato dall'affetto della famiglia in un ambiente solenne e gioioso.",
    presentation: "Curiamo ogni aspetto, dai fiori ai dettagli del tavolo, per riflettere l'innocenza e l'importanza della giornata.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Tradizione e sobrietà.",
        features: ["Bomboniere classiche", "Allestimento fiori freschi", "Menù per bambini", "Segnaposti sacri"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Ricordo indelebile e divertimento.",
        features: ["Servizio fotografico", "Animazione bambini", "Confettata d'onore", "Video della giornata"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "L'apice dell'eleganza.",
        features: ["Location panoramica", "Auto d'epoca per gli spostamenti", "Torta artistica multi-piano", "Regali ospiti di design"]
      }
    }
  },
  "cresima": {
    slug: "cresima",
    title: "Cresima",
    subtitle: "Confermare il cammino con forza e stile.",
    description: "Un traguardo consapevole che merita una celebrazione moderna ma rispettosa delle tradizioni.",
    presentation: "Progettiamo eventi che parlano del ragazzo o della ragazza che cresce, con un'estetica fresca e di classe.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Servizio essenziale per la famiglia.",
        features: ["Pranzo o cena tradizionale", "Allestimento sobrio", "Souvenir per gli ospiti", "Assistenza evento"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Dettagli moderni e vivaci.",
        features: ["Angolo foto/social", "Dj set", "Menu personalizzato per ragazzi", "Segnatavolo di design"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un evento prestigioso.",
        features: ["Viaggio premio (consulenza)", "Party privato esclusivo", "Specialità gastronomiche regionali", "Allestimento luxury completo"]
      }
    }
  },
  "diciottesimo": {
    slug: "diciottesimo",
    title: "Diciottesimo",
    subtitle: "L'ingresso nell'età adulta merita un party leggendario.",
    description: "I 18 anni sono unici. Organizziamo la festa che hai sempre sognato, tra musica, luci e divertimento sfrenato.",
    presentation: "Dall'ingresso trionfale al brindisi di mezzanotte, coordiniamo registicamente il tuo evento più atteso.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Festa club per te e i tuoi amici.",
        features: ["Ingresso prioritario", "Tavolo VIP riservato", "Torta 18 anni scenografica", "Consumazione inclusa"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Evento completo e tecnologico.",
        features: ["Dj set + Vocalist", "Effetti speciali LED", "Servizio foto e video pro", "Buffet cena di qualità"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "La festa dell'anno.",
        features: ["Trasporto in Limousine Hummer", "Location in esclusiva", "Open bar illimitato", "Gadget tecnologici per tutti"]
      }
    }
  },
  "laurea": {
    slug: "laurea",
    title: "Laurea",
    subtitle: "Il rosso del successo in una cornice impeccabile.",
    description: "Anni di studio meritano un finale glorioso. Festeggia il tuo titolo accademico con chi ti ha sostenuto.",
    presentation: "Aperitivi chic, cene eleganti o party scatenati: celebriamo il tuo futuro con il giusto prestigio.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Brindisi accademico raffinato.",
        features: ["Aperitivo rinforzato", "Allestimento in rosso", "Torta a forma di tocco", "Confettata rossa"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Cena e party per amici e parenti.",
        features: ["Cena servita", "Dj set celebrativo", "Bomboniere a tema laurea", "Backdrop laureato"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Trionfo totale.",
        features: ["Private Lounge", "Catering gourmet stellato", "Hostess di accoglienza", "Video celebrativo del percorso"]
      }
    }
  },
  "fidanzamento": {
    slug: "fidanzamento",
    title: "Fidanzamento",
    subtitle: "La promessa di una vita insieme, celebrata con amore.",
    description: "Il preludio al grande sì. Creiamo un'atmosfera romantica e intima per ufficializzare la vostra unione.",
    presentation: "Dalle proposte a sorpresa alle cene con le famiglie, curiamo lo stile e l'emozione di ogni istante.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Cena romantica privata.",
        features: ["Tavolo imperiale riservato", "Fiori coordinati", "Menu degustazione", "Musica d'atmosfera"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Festa con parenti e amici intimi.",
        features: ["Allestimento floreale completo", "Foto della proposta", "Torta celebrativa", "Live music (Arpa o Violino)"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un annuncio regale.",
        features: ["Location castello o villa", "Anello (consulenza orafa)", "Viaggio prepagata (voucher)", "Servizio video cinematografico"]
      }
    }
  },
  "anniversario": {
    slug: "anniversario",
    title: "Anniversario",
    subtitle: "Celebrare il tempo che passa e l'amore che cresce.",
    description: "10, 25 o 50 anni: ogni anniversario è un traguardo prezioso che merita di essere onorato come il primo giorno.",
    presentation: "Rinnoviamo le promesse con eventi che raccontano la vostra storia, con stile e maturità.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Serata per rinnovare l'amore.",
        features: ["Cena gourmet a lume di candela", "Bouquet di rose", "Musica dei vostri ricordi", "Pasticceria fine"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Festa per le grandi tappe.",
        features: ["Rinnovo voti (officiante)", "Foto professionali", "Allestimento oro o argento", "Inviti personalizzati"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un omaggio alla vostra storia.",
        features: ["Viaggio di nozze (bis)", "Documentario biografico", "Private party di lusso", "Gioielli commemorativi"]
      }
    }
  },
  "matrimonio": {
    slug: "matrimonio",
    title: "Matrimonio",
    subtitle: "Il tuo sogno, la nostra regia impeccabile.",
    description: "Il giorno più bello deve essere perfetto. Portiamo l'eccellenza in ogni fase della vostra unione.",
    presentation: "Dal trasporto di lusso con autista privato agli allestimenti scenografici, garantiamo un matrimonio da favola.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Eleganza essenziale per il sì.",
        features: ["Auto di lusso con conducente", "Decorazioni floreali auto", "Transfer sposo/sposa", "Servizio 4 ore"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Servizio completo e dettagli curati.",
        features: ["Limousine o auto d'epoca", "Allestimento location", "Tableau de mariage luxury", "Assistente coordinamento"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Regalità senza compromessi.",
        features: ["Flotta auto per ospiti VIP", "Jet o Elicottero (opzioni)", "Luxury Wedding Planner", "Servizio h24 dedicato"]
      }
    }
  },
  "baby-shower": {
    slug: "baby-shower",
    title: "Baby Shower",
    subtitle: "Una pioggia di coccole per la futura mamma.",
    description: "Festeggiamo l'arrivo imminente con dolcezza e creatività. Un party gioioso tra amici e parenti.",
    presentation: "Atmosfere pastello, giochi tematici e un buffet delizioso per una giornata di puro affetto.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Tea party raffinato.",
        features: ["Tè e dolcetti decorati", "Allestimento rosa o azzurro", "Giochi baby shower", "Inviti digitali"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Party pomeridiano completo.",
        features: ["Torta di pannolini artistica", "Catering a tema", "Gadget per le amiche", "Arco di palloncini soft"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un evento indimenticabile.",
        features: ["Soggiorno SPA per la mamma", "Fotografo di maternità", "Party gourmet privato", "Regali neonato premium"]
      }
    }
  },
  "gender-reveal": {
    slug: "gender-reveal",
    title: "Gender Reveal",
    subtitle: "L'emozione della scoperta condivisa con chi ami.",
    description: "Sarà lui o sarà lei? Creiamo il momento della sorpresa con effetti speciali e grande scenografia.",
    presentation: "Dall'esplosione di coriandoli ai fumi colorati, rendiamo il reveal il punto centrale di una festa splendida.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "La sorpresa del colore.",
        features: ["Pallone reveal 'Pop me'", "Decorazione binaria (M/F)", "Brindisi augurale", "Area torta"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Reveal scenografico e party.",
        features: ["Fumogeni colorati (pro)", "Catering tematico", "Servizio video reazione", "Allestimento luci"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Uno spettacolo mozzafiato.",
        features: ["Reveal con fuochi d'artificio", "Drone light show (area)", "Event manager dedicato", "Luxury buffet"]
      }
    }
  },
  "eventi-aziendali": {
    slug: "eventi-aziendali",
    title: "Eventi Aziendali",
    subtitle: "Il prestigio del tuo brand in ogni dettaglio.",
    description: "Meeting, cene di gala o lanci di prodotto: rappresentiamo la tua azienda con massima professionalità.",
    presentation: "Gestiamo la logistica e lo stile per garantire che il tuo business sia percepito come leader del settore.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Supporto logistico qualificato.",
        features: ["Transfer dirigenti e ospiti", "Accoglienza professionale", "Auto executive scure", "Wi-fi a bordo"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Immagine e coordinamento.",
        features: ["Personalizzazioni auto (brand)", "Catering per meeting", "Hostess e Steward", "Sistema audio-video"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Eccellenza corporate.",
        features: ["Security e Private Driver", "Charter aereo privato", "Location di altissimo profilo", "Regali aziendali di lusso"]
      }
    }
  },
  "inaugurazioni": {
    slug: "inaugurazioni",
    title: "Inaugurazioni",
    subtitle: "Aprire con successo, farsi notare con classe.",
    description: "Il primo giorno è fondamentale. Creiamo l'impatto visivo ideale per il lancio della tua nuova attività.",
    presentation: "Red carpet, luci e una folla entusiasta: trasformiamo la tua apertura in un evento mediatico e sociale.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Taglio del nastro professionale.",
        features: ["Nastro rosso e forbici oro", "Aperitivo di benvenuto", "Musica di sottofondo", "Allestimento ingresso"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Impatto visivo e marketing.",
        features: ["Fasci di luce laser", "Dj set energico", "Servizio barman acrobatico", "Pubbliche relazioni locale"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Inaugurazione stellare.",
        features: ["Testimonial o Influencer", "Copertura stampa dedicata", "Party celebrativo di lusso", "Allestimento scenografico premium"]
      }
    }
  },
  "feste-a-tema": {
    slug: "feste-a-tema",
    title: "Feste a Tema",
    subtitle: "Viaggiare nell'immaginazione senza limiti.",
    description: "Anni '20, Hollywood, Masquerade o Casinò: portiamo i tuoi ospiti in una dimensione diversa.",
    presentation: "Progettiamo scenografie immersive e curiamo i costumi affinché il tema sia vissuto in ogni singolo dettaglio.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Ambiente tematico divertente.",
        features: ["Allestimento decorativo base", "Musica a tema", "Accessori per gli ospiti", "Torta coerente al tema"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Immersione scenografica.",
        features: ["Attori e figuranti tematici", "Catering scenografico", "Photobooth attrezzato", "Illuminazione tematica"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un mondo a tua scelta.",
        features: ["Costumi sartoriali privati", "Scenografie cinematografiche", "Artisti circensi o pro", "Luxury menu tematico"]
      }
    }
  },
  "allestimenti-stagionali": {
    slug: "allestimenti-stagionali",
    title: "Allestimenti Stagionali",
    subtitle: "La bellezza della natura e delle feste in ogni ambiente.",
    description: "Natale, Pasqua, Autunno o Primavera: vestiamo i tuoi spazi con l'atmosfera perfetta del periodo.",
    presentation: "Curiamo vetrine, hotel, ville e uffici con decorazioni che esaltano il fascino della stagione corrente.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Decorazione stagionale sobria.",
        features: ["Addobbi coordinati", "Elementi naturali stagionali", "Consulenza cromatica", "Noleggio decorazioni"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Restyle completo dell'ambiente.",
        features: ["Illuminazioni artistiche", "Albero o centrotavola pro", "Sostituzione periodica", "Montaggio e smontaggio inclusi"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Design d'eccellenza stagionale.",
        features: ["Progettazione architetto d'interni", "Materiali luxury e rari", "Installazioni artistiche", "Manutenzione quotidiana"]
      }
    }
  },
  "pensionamento": {
    slug: "pensionamento",
    title: "Pensionamento",
    subtitle: "Onorare una carriera, iniziare una nuova libertà.",
    description: "L'ultimo giorno di lavoro merita un ringraziamento speciale. Celebriamo anni di impegno con gioia.",
    presentation: "Dalle cerimonie aziendali alle cene private, sottolineiamo l'importanza del percorso lavorativo concluso.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Saluto cordiale e affettuoso.",
        features: ["Rinfresco aziendale", "Targa o regalo simbolico", "Discorso commemorativo", "Libro delle firme"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Festa per l'inizio del tempo libero.",
        features: ["Cena con colleghi e familiari", "Video 'Story of my career'", "Musica e intrattenimento", "Torta celebrativa"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Un addio memorabile.",
        features: ["Voucher vacanza lusso", "Auto con conducente per h-fine", "Private event VIP", "Gadget personalizzati hitech"]
      }
    }
  },
  "addio-al-nubilato": {
    slug: "addio-al-nubilato",
    title: "Addio al Nubilato",
    subtitle: "L'ultima notte da single, la prima di un divertimento unico.",
    description: "Divertimento, amiche e stile. Organizziamo weekend o serate pazze e sicure per la futura sposa.",
    presentation: "Dalle esperienze relax in SPA ai tour in limousine con cocktail, creiamo ricordi che dureranno per sempre.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Serata in città con stile.",
        features: ["Tavolo riservato in club", "Bottiglia di prosecco", "Gadget 'Team Bride'", "Trasporto base"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Luxury City Tour.",
        features: ["2 ore in Limousine Rosa", "Open bar a bordo", "Servizio foto professionale", "Ingresso VIP cena spettacolo"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Weekend da sogno.",
        features: ["Volo privato per mete beach", "Luxury Villa con piscina", "Private Chef per brunch", "Programma attività segreto"]
      }
    }
  },
  "addio-al-celibato": {
    slug: "addio-al-celibato",
    title: "Addio al Celibato",
    subtitle: "Un'avventura maschia e leggendaria per lo sposo.",
    description: "Motori, adrenalina o puro relax tra amici. Progettiamo l'addio che ogni uomo vorrebbe vivere.",
    presentation: "Dalle giornate in pista con supercars alle notti nei club più esclusivi, gestiamo ogni dettaglio logistico.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Serata tra uomini epica.",
        features: ["Cena tradizionale o steakhouse", "Tavolo club central", "Bottiglia premium", "Magliette tema sposo"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Adrenalina e lusso.",
        features: ["Noleggio supercar 1 ora", "Tour in Limousine SUV", "Ingresso VIP discoteca", "Hotel centro città"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "L'ultima missione libera.",
        features: ["Charter per Las Vegas o Ibiza", "Esperienza Yacht privata", "Consulente vita notturna", "Security privata dedicata"]
      }
    }
  },
  "funerale": {
    slug: "funerale",
    title: "Funerale",
    subtitle: "Un ultimo saluto dignitoso e solenne.",
    description: "In un momento di dolore, offriamo supporto e professionalità per un addio composto e di alto profilo.",
    presentation: "Garantiamo discrezione e decoro, occupandoci della logistica e del cerimoniale con il massimo rispetto.",
    packages: {
      base: {
        name: "Pacchetto Base",
        description: "Servizio decoroso e essenziale.",
        features: ["Trasporto funebre standard", "Allestimento camera ardente", "Pratiche amministrative", "Libro condoglianze"]
      },
      premium: {
        name: "Pacchetto Premium",
        description: "Commemorazione solenne.",
        features: ["Carro funebre di lusso (Mercedes/Maserati)", "Allestimento floreale premium", "Supporto psicologico", "Necrologi stampa"]
      },
      exclusive: {
        name: "Pacchetto Exclusive",
        description: "Eccellenza nel ricordo.",
        features: ["Accoglienza autorità", "Streaming cerimonia", "Archivio digitale commemorativo", "Allestimenti monumentali"]
      }
    }
  }
};
