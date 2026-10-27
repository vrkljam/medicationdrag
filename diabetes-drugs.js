/*
 * ============================================================
 * DIABETES MEDICATION DATABASE
 * ============================================================
 *
 * Format:
 *
 * { generic: "generic name", brand: "Brand Name" }
 *
 * ============================================================
 */

// const diabetesMedicationData = [
window.diabetesMedicationData = [
  // ==========================================================
  // BIGUANIDES
  // ==========================================================

  { generic: "metformin", brand: "Glucophage" },
  { generic: "metformin extended-release", brand: "Glucophage XR" },

  // ==========================================================
  // SULFONYLUREAS
  // ==========================================================

  { generic: "glipizide", brand: "Glucotrol" },
  { generic: "glipizide extended-release", brand: "Glucotrol XL" },
  { generic: "glyburide", brand: "Diabeta" },
  { generic: "glimepiride", brand: "Amaryl" },
  { generic: "tolbutamide", brand: "Orinase" },
  { generic: "chlorpropamide", brand: "Diabinese" },

  // ==========================================================
  // MEGLITINIDES
  // ==========================================================

  { generic: "repaglinide", brand: "Prandin" },
  { generic: "nateglinide", brand: "Starlix" },

  // ==========================================================
  // THIAZOLIDINEDIONES
  // ==========================================================

  { generic: "pioglitazone", brand: "Actos" },
  { generic: "rosiglitazone", brand: "Avandia" },

  // ==========================================================
  // DPP-4 INHIBITORS
  // ==========================================================

  { generic: "sitagliptin", brand: "Januvia" },
  { generic: "saxagliptin", brand: "Onglyza" },
  { generic: "linagliptin", brand: "Tradjenta" },
  { generic: "alogliptin", brand: "Nesina" },

  // ==========================================================
  // SGLT2 INHIBITORS
  // ==========================================================

  { generic: "empagliflozin", brand: "Jardiance" },
  { generic: "dapagliflozin", brand: "Farxiga" },
  { generic: "canagliflozin", brand: "Invokana" },
  { generic: "ertugliflozin", brand: "Steglatro" },

  // ==========================================================
  // GLP-1 RECEPTOR AGONISTS
  // ==========================================================

  { generic: "exenatide", brand: "Byetta" },
  { generic: "exenatide extended-release", brand: "Bydureon" },
  { generic: "liraglutide", brand: "Victoza" },
  { generic: "dulaglutide", brand: "Trulicity" },
  { generic: "semaglutide", brand: "Ozempic" },
  { generic: "lixisenatide", brand: "Adlyxin" },

  // ==========================================================
  // DUAL / MULTI-AGONIST
  // ==========================================================

  { generic: "tirzepatide", brand: "Mounjaro" },

  // ==========================================================
  // AMYLIN ANALOG
  // ==========================================================

  { generic: "pramlintide", brand: "Symlin" },

  // ==========================================================
  // INSULINS — RAPID ACTING
  // ==========================================================

  { generic: "insulin lispro", brand: "Humalog" },
  { generic: "insulin aspart", brand: "NovoLog" },
  { generic: "insulin glulisine", brand: "Apidra" },

  // ==========================================================
  // INSULINS — ULTRA-RAPID ACTING
  // ==========================================================

  { generic: "insulin lispro-aabc", brand: "Lyumjev" },
  { generic: "insulin aspart-aabc", brand: "Fiasp" },

  // ==========================================================
  // INSULINS — SHORT ACTING
  // ==========================================================

  { generic: "regular insulin", brand: "Humulin R" },
  { generic: "regular insulin", brand: "Novolin R" },

  // ==========================================================
  // INSULINS — INTERMEDIATE ACTING
  // ==========================================================

  { generic: "NPH insulin", brand: "Humulin N" },
  { generic: "NPH insulin", brand: "Novolin N" },

  // ==========================================================
  // INSULINS — LONG ACTING
  // ==========================================================

  { generic: "insulin glargine", brand: "Lantus" },
  { generic: "insulin detemir", brand: "Levemir" },
  { generic: "insulin degludec", brand: "Tresiba" },

  // ==========================================================
  // INSULIN GLARGINE PRODUCTS
  // ==========================================================

  { generic: "insulin glargine-yfgn", brand: "Semglee" },
  { generic: "insulin glargine-aglr", brand: "Rezvoglar" },

  // ==========================================================
  // CONCENTRATED INSULINS
  // ==========================================================

  { generic: "insulin glargine U-300", brand: "Toujeo" },
  { generic: "insulin lispro U-200", brand: "Humalog KwikPen" },
  { generic: "insulin degludec U-200", brand: "Tresiba U-200" },
  { generic: "regular insulin U-500", brand: "Humulin R U-500" },

  // ==========================================================
  // PREMIXED INSULINS
  // ==========================================================

  {
    generic: "insulin lispro protamine/insulin lispro",
    brand: "Humalog Mix 75/25",
  },
  {
    generic: "insulin aspart protamine/insulin aspart",
    brand: "NovoLog Mix 70/30",
  },
  { generic: "NPH insulin/regular insulin", brand: "Humulin 70/30" },
  { generic: "NPH insulin/regular insulin", brand: "Novolin 70/30" },

  // ==========================================================
  // INSULIN COMBINATIONS
  // ==========================================================

  { generic: "insulin glargine/lixisenatide", brand: "Soliqua" },
  { generic: "insulin degludec/liraglutide", brand: "Xultophy" },

  // ==========================================================
  // OTHER DIABETES-RELATED MEDICATIONS
  // ==========================================================

  { generic: "glucagon", brand: "GlucaGen" },
  { generic: "glucagon", brand: "Gvoke" },
  { generic: "glucagon", brand: "Zegalogue" },
  { generic: "dasiglucagon", brand: "Zegalogue" },
];
