/*
 * ============================================================
 * PSYCHIATRY MEDICATIONS
 * ============================================================
 *
 * Brand vs Generic Quiz
 *
 * Format:
 * {
 *   generic: "generic name",
 *   brand: "Brand Name"
 * }
 *
 * Some medications intentionally overlap with the
 * General Medications list.
 */

// const psychiatryMedicationData = [
window.psychiatryMedicationData = [
  /*
   * ============================================================
   * ANTIDEPRESSANTS — SSRIs
   * ============================================================
   */

  { generic: "sertraline", brand: "Zoloft" },
  { generic: "fluoxetine", brand: "Prozac" },
  { generic: "escitalopram", brand: "Lexapro" },
  { generic: "citalopram", brand: "Celexa" },
  { generic: "paroxetine", brand: "Paxil" },
  { generic: "fluvoxamine", brand: "Luvox" },

  /*
   * ============================================================
   * ANTIDEPRESSANTS — SNRIs
   * ============================================================
   */

  { generic: "venlafaxine", brand: "Effexor" },
  { generic: "desvenlafaxine", brand: "Pristiq" },
  { generic: "duloxetine", brand: "Cymbalta" },
  { generic: "levomilnacipran", brand: "Fetzima" },

  /*
   * ============================================================
   * ANTIDEPRESSANTS — OTHER
   * ============================================================
   */

  { generic: "bupropion", brand: "Wellbutrin" },
  { generic: "mirtazapine", brand: "Remeron" },
  { generic: "trazodone", brand: "Desyrel" },
  { generic: "vortioxetine", brand: "Trintellix" },
  { generic: "vilazodone", brand: "Viibryd" },
  { generic: "nefazodone", brand: "Serzone" },

  /*
   * ============================================================
   * TRICYCLIC ANTIDEPRESSANTS
   * ============================================================
   */

  { generic: "amitriptyline", brand: "Elavil" },
  { generic: "nortriptyline", brand: "Pamelor" },
  { generic: "imipramine", brand: "Tofranil" },
  { generic: "desipramine", brand: "Norpramin" },
  { generic: "clomipramine", brand: "Anafranil" },
  { generic: "doxepin", brand: "Sinequan" },

  /*
   * ============================================================
   * ANXIETY MEDICATIONS — BENZODIAZEPINES
   * ============================================================
   */

  { generic: "alprazolam", brand: "Xanax" },
  { generic: "lorazepam", brand: "Ativan" },
  { generic: "diazepam", brand: "Valium" },
  { generic: "clonazepam", brand: "Klonopin" },
  { generic: "oxazepam", brand: "Serax" },
  { generic: "chlordiazepoxide", brand: "Librium" },
  { generic: "temazepam", brand: "Restoril" },
  { generic: "triazolam", brand: "Halcion" },
  { generic: "midazolam", brand: "Versed" },

  /*
   * ============================================================
   * ANXIETY MEDICATIONS — OTHER
   * ============================================================
   */

  { generic: "buspirone", brand: "Buspar" },
  { generic: "hydroxyzine", brand: "Vistaril" },

  /*
   * ============================================================
   * ANTIPSYCHOTICS — ATYPICAL
   * ============================================================
   */

  { generic: "aripiprazole", brand: "Abilify" },
  { generic: "quetiapine", brand: "Seroquel" },
  { generic: "risperidone", brand: "Risperdal" },
  { generic: "olanzapine", brand: "Zyprexa" },
  { generic: "ziprasidone", brand: "Geodon" },
  { generic: "lurasidone", brand: "Latuda" },
  { generic: "asenapine", brand: "Saphris" },
  { generic: "brexpiprazole", brand: "Rexulti" },
  { generic: "cariprazine", brand: "Vraylar" },
  { generic: "iloperidone", brand: "Fanapt" },
  { generic: "paliperidone", brand: "Invega" },
  { generic: "lumateperone", brand: "Caplyta" },

  /*
   * ============================================================
   * ANTIPSYCHOTICS — TYPICAL
   * ============================================================
   */

  { generic: "haloperidol", brand: "Haldol" },
  { generic: "chlorpromazine", brand: "Thorazine" },
  { generic: "fluphenazine", brand: "Prolixin" },
  { generic: "perphenazine", brand: "Trilafon" },
  { generic: "trifluoperazine", brand: "Stelazine" },
  { generic: "thioridazine", brand: "Mellaril" },

  /*
   * ============================================================
   * MOOD STABILIZERS
   * ============================================================
   */

  { generic: "lithium", brand: "Lithobid" },
  { generic: "lamotrigine", brand: "Lamictal" },
  { generic: "valproic acid", brand: "Depakene" },
  { generic: "divalproex", brand: "Depakote" },
  { generic: "carbamazepine", brand: "Tegretol" },
  { generic: "oxcarbazepine", brand: "Trileptal" },

  /*
   * ============================================================
   * ADHD MEDICATIONS — STIMULANTS
   * ============================================================
   */

  { generic: "methylphenidate", brand: "Ritalin" },
  { generic: "dexmethylphenidate", brand: "Focalin" },
  { generic: "dextroamphetamine", brand: "Dexedrine" },
  { generic: "dextroamphetamine/amphetamine", brand: "Adderall" },
  { generic: "lisdexamfetamine", brand: "Vyvanse" },

  /*
   * ============================================================
   * ADHD MEDICATIONS — NON-STIMULANTS
   * ============================================================
   */

  { generic: "atomoxetine", brand: "Strattera" },
  { generic: "guanfacine", brand: "Intuniv" },
  { generic: "clonidine", brand: "Kapvay" },

  /*
   * ============================================================
   * SLEEP MEDICATIONS
   * ============================================================
   */

  { generic: "zolpidem", brand: "Ambien" },
  { generic: "eszopiclone", brand: "Lunesta" },
  { generic: "zaleplon", brand: "Sonata" },
  { generic: "ramelteon", brand: "Rozerem" },
  { generic: "suvorexant", brand: "Belsomra" },
  { generic: "lemborexant", brand: "Dayvigo" },
  { generic: "daridorexant", brand: "Quviviq" },
  { generic: "doxepin", brand: "Silenor" },

  /*
   * ============================================================
   * OTHER MEDICATIONS COMMONLY ENCOUNTERED IN PSYCHIATRY
   * ============================================================
   */

  { generic: "modafinil", brand: "Provigil" },
  { generic: "armodafinil", brand: "Nuvigil" },
  { generic: "gabapentin", brand: "Neurontin" },
  { generic: "pregabalin", brand: "Lyrica" },
];
