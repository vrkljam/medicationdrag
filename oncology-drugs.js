/*
 * ============================================================
 * ONCOLOGY MEDICATION DATABASE
 * ============================================================
 *
 * This is intentionally a separate database from the original
 * general medication database.
 *
 * Format:
 *
 * {
 *   generic: "generic name",
 *   brand: "Brand Name"
 * }
 *
 * ============================================================
 */

// const oncologyMedicationData = [

window.oncologyMedicationData = [
  // ==========================================================
  // ALKYLATING / PLATINUM AGENTS
  // ==========================================================

  { generic: "bendamustine", brand: "Bendeka" },
  { generic: "busulfan", brand: "Busulfex" },
  { generic: "carboplatin", brand: "Paraplatin" },
  { generic: "chlorambucil", brand: "Leukeran" },
  { generic: "cisplatin", brand: "Platinol" },
  { generic: "cyclophosphamide", brand: "Cytoxan" },
  { generic: "dacarbazine", brand: "DTIC-Dome" },
  { generic: "ifosfamide", brand: "Ifex" },
  { generic: "lomustine", brand: "Gleostine" },
  { generic: "melphalan", brand: "Alkeran" },
  { generic: "oxaliplatin", brand: "Eloxatin" },
  { generic: "procarbazine", brand: "Matulane" },
  { generic: "temozolomide", brand: "Temodar" },
  { generic: "thiotepa", brand: "Tepadina" },
  { generic: "trabectedin", brand: "Yondelis" },

  // ==========================================================
  // ANTIMETABOLITES
  // ==========================================================

  { generic: "azacitidine", brand: "Vidaza" },
  { generic: "capecitabine", brand: "Xeloda" },
  { generic: "cladribine", brand: "Leustat" },
  { generic: "clofarabine", brand: "Clolar" },
  { generic: "cytarabine", brand: "Cytosar-U" },
  { generic: "decitabine", brand: "Dacogen" },
  { generic: "fluorouracil", brand: "Adrucil" },
  { generic: "fludarabine", brand: "Fludara" },
  { generic: "gemcitabine", brand: "Gemzar" },
  { generic: "hydroxyurea", brand: "Hydrea" },
  { generic: "mercaptopurine", brand: "Purinethol" },
  { generic: "methotrexate", brand: "Trexall" },
  { generic: "nelarabine", brand: "Arranon" },
  { generic: "pemetrexed", brand: "Alimta" },
  { generic: "pralatrexate", brand: "Folotyn" },
  { generic: "thioguanine", brand: "Tabloid" },

  // ==========================================================
  // ANTHRACYCLINES / ANTITUMOR ANTIBIOTICS
  // ==========================================================

  { generic: "bleomycin", brand: "Blenoxane" },
  { generic: "dactinomycin", brand: "Cosmegen" },
  { generic: "daunorubicin", brand: "Cerubidine" },
  { generic: "doxorubicin", brand: "Adriamycin" },
  { generic: "doxorubicin liposomal", brand: "Doxil" },
  { generic: "epirubicin", brand: "Ellence" },
  { generic: "idarubicin", brand: "Idamycin PFS" },
  { generic: "mitomycin", brand: "Mutamycin" },
  { generic: "mitoxantrone", brand: "Novantrone" },

  // ==========================================================
  // TAXANES / MITOTIC AGENTS
  // ==========================================================

  { generic: "cabazitaxel", brand: "Jevtana" },
  { generic: "docetaxel", brand: "Taxotere" },
  { generic: "eribulin", brand: "Halaven" },
  { generic: "ixabepilone", brand: "Ixempra" },
  { generic: "paclitaxel", brand: "Taxol" },
  { generic: "vinblastine", brand: "Velban" },
  { generic: "vincristine", brand: "Oncovin" },
  { generic: "vinorelbine", brand: "Navelbine" },

  // ==========================================================
  // TOPOISOMERASE INHIBITORS
  // ==========================================================

  { generic: "etoposide", brand: "VePesid" },
  { generic: "irinotecan", brand: "Camptosar" },
  { generic: "topotecan", brand: "Hycamtin" },

  // ==========================================================
  // PROTEASOME / MYELOMA
  // ==========================================================

  { generic: "bortezomib", brand: "Velcade" },
  { generic: "carfilzomib", brand: "Kyprolis" },
  { generic: "ixazomib", brand: "Ninlaro" },

  // ==========================================================
  // IMiD AGENTS
  // ==========================================================

  { generic: "lenalidomide", brand: "Revlimid" },
  { generic: "pomalidomide", brand: "Pomalyst" },
  { generic: "thalidomide", brand: "Thalomid" },

  // ==========================================================
  // HORMONAL / ENDOCRINE THERAPY
  // ==========================================================

  { generic: "abiraterone", brand: "Zytiga" },
  { generic: "anastrozole", brand: "Arimidex" },
  { generic: "apalutamide", brand: "Erleada" },
  { generic: "bicalutamide", brand: "Casodex" },
  { generic: "darolutamide", brand: "Nubeqa" },
  { generic: "degarelix", brand: "Firmagon" },
  { generic: "elacestrant", brand: "Orserdu" },
  { generic: "enzalutamide", brand: "Xtandi" },
  { generic: "exemestane", brand: "Aromasin" },
  { generic: "fulvestrant", brand: "Faslodex" },
  { generic: "goserelin", brand: "Zoladex" },
  { generic: "leuprolide", brand: "Lupron Depot" },
  { generic: "megestrol", brand: "Megace" },
  { generic: "tamoxifen", brand: "Nolvadex" },
  { generic: "toremifene", brand: "Fareston" },

  // ==========================================================
  // CDK4/6 INHIBITORS
  // ==========================================================

  { generic: "abemaciclib", brand: "Verzenio" },
  { generic: "palbociclib", brand: "Ibrance" },
  { generic: "ribociclib", brand: "Kisqali" },

  // ==========================================================
  // EGFR
  // ==========================================================

  { generic: "afatinib", brand: "Gilotrif" },
  { generic: "cetuximab", brand: "Erbitux" },
  { generic: "dacomitinib", brand: "Vizimpro" },
  { generic: "erlotinib", brand: "Tarceva" },
  { generic: "gefitinib", brand: "Iressa" },
  { generic: "necitumumab", brand: "Portrazza" },
  { generic: "osimertinib", brand: "Tagrisso" },
  { generic: "panitumumab", brand: "Vectibix" },

  // ==========================================================
  // HER2
  // ==========================================================

  { generic: "trastuzumab", brand: "Herceptin" },
  { generic: "pertuzumab", brand: "Perjeta" },
  { generic: "ado-trastuzumab emtansine", brand: "Kadcyla" },
  { generic: "fam-trastuzumab deruxtecan", brand: "Enhertu" },
  { generic: "margetuximab", brand: "Margenza" },

  // ==========================================================
  // VEGF / ANGIOGENESIS
  // ==========================================================

  { generic: "bevacizumab", brand: "Avastin" },
  { generic: "ramucirumab", brand: "Cyramza" },
  { generic: "ziv-aflibercept", brand: "Zaltrap" },

  // ==========================================================
  // VEGFR / MULTI-KINASE
  // ==========================================================

  { generic: "axitinib", brand: "Inlyta" },
  { generic: "cabozantinib", brand: "Cabometyx" },
  { generic: "lenvatinib", brand: "Lenvima" },
  { generic: "pazopanib", brand: "Votrient" },
  { generic: "regorafenib", brand: "Stivarga" },
  { generic: "sorafenib", brand: "Nexavar" },
  { generic: "sunitinib", brand: "Sutent" },
  { generic: "tivozanib", brand: "Fotivda" },

  // ==========================================================
  // BRAF / MEK
  // ==========================================================

  { generic: "binimetinib", brand: "Mektovi" },
  { generic: "cobimetinib", brand: "Cotellic" },
  { generic: "dabrafenib", brand: "Tafinlar" },
  { generic: "encorafenib", brand: "Braftovi" },
  { generic: "trametinib", brand: "Mekinist" },
  { generic: "vemurafenib", brand: "Zelboraf" },

  // ==========================================================
  // ALK / ROS1 / MET
  // ==========================================================

  { generic: "alectinib", brand: "Alecensa" },
  { generic: "brigatinib", brand: "Alunbrig" },
  { generic: "ceritinib", brand: "Zykadia" },
  { generic: "crizotinib", brand: "Xalkori" },
  { generic: "lorlatinib", brand: "Lorbrena" },
  { generic: "capmatinib", brand: "Tabrecta" },
  { generic: "tepotinib", brand: "Tepmetko" },

  // ==========================================================
  // RET / NTRK / FGFR
  // ==========================================================

  { generic: "entrectinib", brand: "Rozlytrek" },
  { generic: "larotrectinib", brand: "Vitrakvi" },
  { generic: "pralsetinib", brand: "Gavreto" },
  { generic: "repotrectinib", brand: "Augtyro" },
  { generic: "selpercatinib", brand: "Retevmo" },
  { generic: "erdafitinib", brand: "Balversa" },
  { generic: "futibatinib", brand: "Lytgobi" },
  { generic: "pemigatinib", brand: "Pemazyre" },

  // ==========================================================
  // BTK INHIBITORS
  // ==========================================================

  { generic: "acalabrutinib", brand: "Calquence" },
  { generic: "ibrutinib", brand: "Imbruvica" },
  { generic: "pirtobrutinib", brand: "Jaypirca" },
  { generic: "zanubrutinib", brand: "Brukinsa" },

  // ==========================================================
  // PI3K / mTOR / AKT
  // ==========================================================

  { generic: "alpelisib", brand: "Vijoice" },
  { generic: "copanlisib", brand: "Aliqopa" },
  { generic: "duvelisib", brand: "Copiktra" },
  { generic: "everolimus", brand: "Afinitor" },
  { generic: "temsirolimus", brand: "Torisel" },
  { generic: "capivasertib", brand: "Truqap" },

  // ==========================================================
  // JAK / MYELOPROLIFERATIVE
  // ==========================================================

  { generic: "fedratinib", brand: "Inrebic" },
  { generic: "momelotinib", brand: "Ojjaara" },
  { generic: "pacritinib", brand: "Vonjo" },
  { generic: "ruxolitinib", brand: "Jakafi" },

  // ==========================================================
  // HDAC INHIBITORS
  // ==========================================================

  { generic: "belinostat", brand: "Beleodaq" },
  { generic: "panobinostat", brand: "Farydak" },
  { generic: "romidepsin", brand: "Istodax" },
  { generic: "vorinostat", brand: "Zolinza" },

  // ==========================================================
  // IMMUNOTHERAPY
  // ==========================================================

  { generic: "atezolizumab", brand: "Tecentriq" },
  { generic: "avelumab", brand: "Bavencio" },
  { generic: "cemiplimab", brand: "Libtayo" },
  { generic: "dostarlimab", brand: "Jemperli" },
  { generic: "durvalumab", brand: "Imfinzi" },
  { generic: "nivolumab", brand: "Opdivo" },
  { generic: "pembrolizumab", brand: "Keytruda" },

  // ==========================================================
  // CTLA-4
  // ==========================================================

  { generic: "ipilimumab", brand: "Yervoy" },
  { generic: "tremelimumab", brand: "Imjudo" },

  // ==========================================================
  // CD20 / B-CELL
  // ==========================================================

  { generic: "rituximab", brand: "Rituxan" },
  { generic: "obinutuzumab", brand: "Gazyva" },
  { generic: "ofatumumab", brand: "Arzerra" },
  { generic: "mosunetuzumab", brand: "Lunsumio" },
  { generic: "glofitamab", brand: "Columvi" },
  { generic: "epcoritamab", brand: "Epkinly" },

  // ==========================================================
  // MYELOMA ANTIBODIES
  // ==========================================================

  { generic: "daratumumab", brand: "Darzalex" },
  { generic: "elotuzumab", brand: "Empliciti" },
  { generic: "isatuximab", brand: "Sarclisa" },

  // ==========================================================
  // ANTIBODY-DRUG CONJUGATES
  // ==========================================================

  { generic: "brentuximab vedotin", brand: "Adcetris" },
  { generic: "enfortumab vedotin", brand: "Padcev" },
  { generic: "gemtuzumab ozogamicin", brand: "Mylotarg" },
  { generic: "inotuzumab ozogamicin", brand: "Besponsa" },
  { generic: "loncastuximab tesirine", brand: "Zynlonta" },
  { generic: "mirvetuximab soravtansine", brand: "Elahere" },
  { generic: "polatuzumab vedotin", brand: "Polivy" },
  { generic: "sacituzumab govitecan", brand: "Trodelvy" },

  // ==========================================================
  // LEUKEMIA
  // ==========================================================

  { generic: "arsenic trioxide", brand: "Trisenox" },
  { generic: "enasidenib", brand: "Idhifa" },
  { generic: "gilteritinib", brand: "Xospata" },
  { generic: "glasdegib", brand: "Daurismo" },
  { generic: "ivosidenib", brand: "Tibsovo" },
  { generic: "midostaurin", brand: "Rydapt" },
  { generic: "venetoclax", brand: "Venclexta" },

  // ==========================================================
  // ALL
  // ==========================================================

  { generic: "asparaginase erwinia chrysanthemi", brand: "Erwinaze" },
  { generic: "calaspargase pegol", brand: "Asparlas" },
  { generic: "pegaspargase", brand: "Oncaspar" },
  { generic: "blinatumomab", brand: "Blincyto" },

  // ==========================================================
  // CML / BCR-ABL
  // ==========================================================

  { generic: "asciminib", brand: "Scemblix" },
  { generic: "bosutinib", brand: "Bosulif" },
  { generic: "dasatinib", brand: "Sprycel" },
  { generic: "imatinib", brand: "Gleevec" },
  { generic: "nilotinib", brand: "Tasigna" },
  { generic: "ponatinib", brand: "Iclusig" },

  // ==========================================================
  // PARP INHIBITORS
  // ==========================================================

  { generic: "niraparib", brand: "Zejula" },
  { generic: "olaparib", brand: "Lynparza" },
  { generic: "rucaparib", brand: "Rubraca" },
  { generic: "talazoparib", brand: "Talzenna" },

  // ==========================================================
  // PROSTATE CANCER
  // ==========================================================

  { generic: "belzutifan", brand: "Welireg" },

  // ==========================================================
  // NEUROENDOCRINE / RADIOLIGAND
  // ==========================================================

  { generic: "lanreotide", brand: "Somatuline Depot" },
  { generic: "octreotide", brand: "Sandostatin" },
  { generic: "lutetium Lu 177 dotatate", brand: "Lutathera" },
  { generic: "lutetium Lu 177 vipivotide tetraxetan", brand: "Pluvicto" },
  { generic: "radium Ra 223 dichloride", brand: "Xofigo" },

  // ==========================================================
  // OTHER MOLECULARLY TARGETED DRUGS
  // ==========================================================

  { generic: "adagrasib", brand: "Krazati" },
  { generic: "amivantamab", brand: "Rybrevant" },
  { generic: "sotorasib", brand: "Lumakras" },
  { generic: "tovorafenib", brand: "Ojemda" },
  { generic: "vorasidenib", brand: "Voranigo" },
];
