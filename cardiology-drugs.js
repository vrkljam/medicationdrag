/*
 * ============================================================
 * CARDIOLOGY MEDICATION LIST
 * ============================================================
 *
 * Used by the Brand vs Generic Quiz.
 *
 * Variable expected by the main HTML:
 *
 *     cardiologyMedicationData
 *
 * Each entry contains:
 *
 *     generic: Generic medication name
 *     brand:   Brand name
 *
 * Some medications may also appear in the General Medications
 * list. Duplication between categories is intentional and okay.
 */

// const cardiologyMedicationData = [
window.cardiologyMedicationData = [
  /* ============================================================
     ACE INHIBITORS
     ============================================================ */

  { generic: "lisinopril", brand: "Prinivil" },
  { generic: "enalapril", brand: "Vasotec" },
  { generic: "ramipril", brand: "Altace" },
  { generic: "benazepril", brand: "Lotensin" },
  { generic: "quinapril", brand: "Accupril" },
  { generic: "perindopril", brand: "Aceon" },
  { generic: "captopril", brand: "Capoten" },
  { generic: "fosinopril", brand: "Monopril" },
  { generic: "trandolapril", brand: "Mavik" },
  { generic: "moexipril", brand: "Univasc" },

  /* ============================================================
     ANGIOTENSIN II RECEPTOR BLOCKERS (ARBs)
     ============================================================ */

  { generic: "losartan", brand: "Cozaar" },
  { generic: "valsartan", brand: "Diovan" },
  { generic: "irbesartan", brand: "Avapro" },
  { generic: "olmesartan", brand: "Benicar" },
  { generic: "telmisartan", brand: "Micardis" },
  { generic: "candesartan", brand: "Atacand" },
  { generic: "azilsartan", brand: "Edarbi" },
  { generic: "eprosartan", brand: "Teveten" },

  /* ============================================================
     ARNI
     ============================================================ */

  { generic: "sacubitril/valsartan", brand: "Entresto" },

  /* ============================================================
     BETA BLOCKERS
     ============================================================ */

  { generic: "metoprolol", brand: "Lopressor" },
  { generic: "metoprolol succinate", brand: "Toprol-XL" },
  { generic: "carvedilol", brand: "Coreg" },
  { generic: "atenolol", brand: "Tenormin" },
  { generic: "propranolol", brand: "Inderal" },
  { generic: "bisoprolol", brand: "Zebeta" },
  { generic: "nadolol", brand: "Corgard" },
  { generic: "nebivolol", brand: "Bystolic" },
  { generic: "labetalol", brand: "Trandate" },
  { generic: "sotalol", brand: "Betapace" },
  { generic: "acebutolol", brand: "Sectral" },
  { generic: "pindolol", brand: "Visken" },

  /* ============================================================
     CALCIUM CHANNEL BLOCKERS
     ============================================================ */

  { generic: "amlodipine", brand: "Norvasc" },
  { generic: "diltiazem", brand: "Cardizem" },
  { generic: "verapamil", brand: "Calan" },
  { generic: "nifedipine", brand: "Procardia" },
  { generic: "felodipine", brand: "Plendil" },
  { generic: "nicardipine", brand: "Cardene" },
  { generic: "isradipine", brand: "Dynacirc" },
  { generic: "clevidipine", brand: "Cleviprex" },

  /* ============================================================
     DIURETICS
     ============================================================ */

  { generic: "hydrochlorothiazide", brand: "Microzide" },
  { generic: "chlorthalidone", brand: "Thalitone" },
  { generic: "indapamide", brand: "Lozol" },

  { generic: "furosemide", brand: "Lasix" },
  { generic: "bumetanide", brand: "Bumex" },
  { generic: "torsemide", brand: "Demadex" },

  { generic: "spironolactone", brand: "Aldactone" },
  { generic: "eplerenone", brand: "Inspra" },

  /* ============================================================
     ALPHA BLOCKERS / OTHER ANTIHYPERTENSIVES
     ============================================================ */

  { generic: "clonidine", brand: "Catapres" },
  { generic: "hydralazine", brand: "Apresoline" },
  { generic: "minoxidil", brand: "Loniten" },
  { generic: "doxazosin", brand: "Cardura" },
  { generic: "prazosin", brand: "Minipress" },
  { generic: "terazosin", brand: "Hytrin" },
  { generic: "methyldopa", brand: "Aldomet" },

  /* ============================================================
     NITRATES / ANTI-ANGINAL MEDICATIONS
     ============================================================ */

  { generic: "nitroglycerin", brand: "Nitrostat" },
  { generic: "isosorbide mononitrate", brand: "Imdur" },
  { generic: "isosorbide dinitrate", brand: "Isordil" },
  { generic: "ranolazine", brand: "Ranexa" },

  /* ============================================================
     STATINS
     ============================================================ */

  { generic: "atorvastatin", brand: "Lipitor" },
  { generic: "rosuvastatin", brand: "Crestor" },
  { generic: "simvastatin", brand: "Zocor" },
  { generic: "pravastatin", brand: "Pravachol" },
  { generic: "lovastatin", brand: "Mevacor" },
  { generic: "fluvastatin", brand: "Lescol" },
  { generic: "pitavastatin", brand: "Livalo" },

  /* ============================================================
     OTHER LIPID-LOWERING MEDICATIONS
     ============================================================ */

  { generic: "ezetimibe", brand: "Zetia" },
  { generic: "fenofibrate", brand: "Tricor" },
  { generic: "gemfibrozil", brand: "Lopid" },
  { generic: "niacin", brand: "Niaspan" },
  { generic: "icosapent ethyl", brand: "Vascepa" },

  /* ============================================================
     ANTICOAGULANTS
     ============================================================ */

  { generic: "warfarin", brand: "Coumadin" },
  { generic: "apixaban", brand: "Eliquis" },
  { generic: "rivaroxaban", brand: "Xarelto" },
  { generic: "dabigatran", brand: "Pradaxa" },
  { generic: "edoxaban", brand: "Savaysa" },
  { generic: "heparin", brand: "Heparin" },
  { generic: "enoxaparin", brand: "Lovenox" },

  /* ============================================================
     ANTIPLATELET MEDICATIONS
     ============================================================ */

  { generic: "clopidogrel", brand: "Plavix" },
  { generic: "ticagrelor", brand: "Brilinta" },
  { generic: "prasugrel", brand: "Effient" },
  { generic: "dipyridamole", brand: "Persantine" },
  { generic: "aspirin", brand: "Bayer" },

  /* ============================================================
     HEART FAILURE / CARDIAC MEDICATIONS
     ============================================================ */

  { generic: "digoxin", brand: "Lanoxin" },
  { generic: "ivabradine", brand: "Corlanor" },
  { generic: "vericiguat", brand: "Verquvo" },

  /* ============================================================
     ANTIARRHYTHMIC MEDICATIONS
     ============================================================ */

  { generic: "amiodarone", brand: "Cordarone" },
  { generic: "dronedarone", brand: "Multaq" },
  { generic: "flecainide", brand: "Tambocor" },
  { generic: "propafenone", brand: "Rythmol" },
  { generic: "procainamide", brand: "Pronestyl" },
  { generic: "quinidine", brand: "Quinidex" },
  { generic: "disopyramide", brand: "Norpace" },
  { generic: "adenosine", brand: "Adenocard" },

  /* ============================================================
     POTASSIUM / ELECTROLYTE REPLACEMENT
     ============================================================ */

  { generic: "potassium chloride", brand: "Klor-Con" },
  { generic: "magnesium sulfate", brand: "Magnesium Sulfate" },

  /* ============================================================
     VASOPRESSORS / INOTROPES
     ============================================================ */

  { generic: "dobutamine", brand: "Dobutrex" },
  { generic: "milrinone", brand: "Primacor" },
  { generic: "norepinephrine", brand: "Levophed" },
  { generic: "phenylephrine", brand: "Neo-Synephrine" },
];
