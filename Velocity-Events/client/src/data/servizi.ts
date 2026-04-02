export interface Package {
  name: string;
  description: string;
  features: string[];
  price?: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  presentation: string;
  packages: {
    base?: Package;
    premium?: Package;
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  },
  "diciottesimo": {
    slug: "diciottesimo",
    title: "Diciottesimo",
    subtitle: "L'ingresso nell'età adulta merita un party leggendario.",
    description: "I 18 anni sono unici. Organizziamo la festa che hai sempre sognato, tra musica, luci e divertimento sfrenato. Dalla location alla supercar, pensiamo a tutto noi.",
    presentation: "Dall'ingresso trionfale al brindisi di mezzanotte, coordiniamo registicamente il tuo evento più atteso con pacchetti chiavi in mano esclusivi.",
    packages: {
      premium: {
        name: "Pacchetto Completo 18°",
        description: "Tutto quello che serve per una festa indimenticabile, senza pensieri.",
        price: "1.999,00 €",
        features: [
          "Location Esclusiva",
          "Animazione & DJ Set",
          "Servizio Fotografico Professionale",
          "Auto di Lusso con chauffeur",
          "Bomboniere per gli ospiti",
          "Gadget Personalizzati",
          "Viaggio (Bonus Speciale)"
        ]
      },
      exclusive: {
        name: "Pacchetto Personalizzato",
        description: "Disegna la tua festa su misura in base ai tuoi desideri e budget.",
        features: [
          "Scelta libera dei servizi",
          "Consulenza dedicata 1-to-1",
          "Flessibilità totale",
          "Preventivo personalizzato"
        ]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  },
  "pool-party": {
    slug: "pool-party",
    title: "Pool Party",
    subtitle: "Divertimento e freschezza a bordo vasca.",
    description: "L'essenza dell'estate in un party esclusivo. Musica, cocktail e un'atmosfera vibrante per i tuoi momenti migliori.",
    presentation: "Trasformiamo ogni piscina in una location da sogno, con DJ set, allestimenti galleggianti e servizio bar d'eccellenza.",
    packages: {
      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  },
  "funeral-party": {
    slug: "funeral-party",
    title: "Funeral Party",
    subtitle: "Onorare la vita con un sorriso e tanti ricordi.",
    description: "Una celebrazione della vita per ricordare con gioia chi ha lasciato un segno indelebile nel nostro cuore.",
    presentation: "Organizziamo eventi commemorativi che celebrano la storia e le passioni della persona cara in un clima di serena condivisione.",
    packages: {

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  },
  "feste-private": {
    slug: "feste-private",
    title: "Feste Private",
    subtitle: "L'esclusività di un evento pensato solo per te.",
    description: "Qualunque sia l'occasione, rendiamo la tua festa privata un evento unico, riservato e curato in ogni dettaglio.",
    presentation: "Dalle cene intime ai grandi party a sorpresa, mettiamo a disposizione la nostra esperienza per creare l'atmosfera perfetta.",
    packages: {

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  },
  "party-su-imbarcazioni": {
    slug: "party-su-imbarcazioni",
    title: "Party su Imbarcazioni",
    subtitle: "L'eleganza del mare per i tuoi eventi più chic.",
    description: "Festeggia in mezzo alle onde. Un'esperienza indimenticabile tra charter di lusso e panorami mozzafiato.",
    presentation: "Coordiniamo party su yacht o imbarcazioni d'epoca, garantendo sicurezza, stile e un servizio di bordo impeccabile.",
    packages: {

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
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

      exclusive: {
        name: "Pacchetto su Misura",
        description: "Questo pacchetto è da personalizzare in base all'esigenza del cliente.",
        features: ["Personalizzazione totale", "Consulenza dedicata", "Flessibilità di budget", "Ogni dettaglio è concordato"]
      }
    }
  }
};
