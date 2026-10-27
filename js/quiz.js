/*
 * ============================================================
 * QUIZ PREPARATION
 * File: js/quiz.js
 *
 * Responsibilities:
 * - Select the active medication category
 * - Validate medication records
 * - Detect exact duplicate records
 * - Shuffle and select quiz questions
 * - Report ambiguous generic or brand names
 *
 * Does NOT:
 * - Render the matching interface
 * - Change scores
 * - Control timers
 * - Modify medication database records
 * ============================================================
 */

(function () {
  "use strict";

  const categoryDataSources = {
    all: () => window.generalMedicationData,
    oncology: () => window.oncologyMedicationData,
    diabetes: () => window.diabetesMedicationData,
    antibiotics: () => window.antibioticsMedicationData,
    cardiology: () => window.cardiologyMedicationData,
    psychiatry: () => window.psychiatryMedicationData,
  };

  function medicationKey(item) {
    return `${item.generic}|||${item.brand}`;
  }

  function normalizeName(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase();
  }

  function validateRecords(records) {
    const validRecords = [];
    const invalidRecords = [];
    const exactDuplicates = [];
    const seenRecords = new Set();

    for (const item of records || []) {
      if (
        !item ||
        typeof item.generic !== "string" ||
        typeof item.brand !== "string" ||
        !item.generic.trim() ||
        !item.brand.trim()
      ) {
        invalidRecords.push(item);
        continue;
      }

      const key = medicationKey({
        generic: item.generic.trim(),
        brand: item.brand.trim(),
      });

      if (seenRecords.has(key)) {
        exactDuplicates.push(item);
        continue;
      }

      seenRecords.add(key);

      // Keep the original record; do not silently rewrite it.
      validRecords.push(item);
    }

    return {
      validRecords,
      invalidRecords,
      exactDuplicates,
    };
  }

  function findAmbiguousNames(records) {
    const brandsByGeneric = new Map();
    const genericsByBrand = new Map();

    for (const item of records) {
      const generic = normalizeName(item.generic);
      const brand = normalizeName(item.brand);

      if (!brandsByGeneric.has(generic)) {
        brandsByGeneric.set(generic, new Set());
      }

      brandsByGeneric.get(generic).add(brand);

      if (!genericsByBrand.has(brand)) {
        genericsByBrand.set(brand, new Set());
      }

      genericsByBrand.get(brand).add(generic);
    }

    return {
      duplicateGenerics: [...brandsByGeneric.entries()]
        .filter(([, brands]) => brands.size > 1)
        .map(([generic, brands]) => ({
          generic,
          brands: [...brands],
        })),

      duplicateBrands: [...genericsByBrand.entries()]
        .filter(([, generics]) => generics.size > 1)
        .map(([brand, generics]) => ({
          brand,
          generics: [...generics],
        })),
    };
  }

  function shuffle(records) {
    const result = [...records];

    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function getCategoryRecords(categoryId = "all") {
    const sourceFactory = categoryDataSources[categoryId];
    const records = sourceFactory ? sourceFactory() : null;

    if (!Array.isArray(records)) {
      return {
        records: [],
        invalidRecords: [],
        exactDuplicates: [],
        duplicateGenerics: [],
        duplicateBrands: [],
      };
    }

    const validation = validateRecords(records);
    const ambiguities = findAmbiguousNames(validation.validRecords);

    return {
      records: validation.validRecords,
      invalidRecords: validation.invalidRecords,
      exactDuplicates: validation.exactDuplicates,
      ...ambiguities,
    };
  }

  function prepareQuiz(categoryId, requestedCount) {
    const category = getCategoryRecords(categoryId);

    const countRequested = Number(requestedCount);

    if (!Number.isInteger(countRequested) || countRequested < 1) {
      throw new Error(
        "The requested question count must be a positive integer.",
      );
    }

    if (category.records.length === 0) {
      throw new Error(
        "No valid medication records are available for this category.",
      );
    }

    /*
     * Important:
     * This preserves all legitimate records, including records
     * that share generic names but have different brands.
     *
     * Ambiguous question/answer labels are reported rather than
     * silently deleted. Matching rules will resolve those cases
     * during integration.
     */
    const count = Math.min(countRequested, category.records.length);
    const questions = shuffle(category.records).slice(0, count);

    return {
      questions,
      requestedCount: countRequested,
      actualCount: questions.length,
      categoryId,
      diagnostics: {
        invalidRecords: category.invalidRecords,
        exactDuplicates: category.exactDuplicates,
        duplicateGenerics: category.duplicateGenerics,
        duplicateBrands: category.duplicateBrands,
      },
    };
  }

  window.quizController = {
    medicationKey,
    validateRecords,
    findAmbiguousNames,
    shuffle,
    getCategoryRecords,
    prepareQuiz,
  };
})();
