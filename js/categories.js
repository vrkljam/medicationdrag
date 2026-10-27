/*
 * ============================================================
 * CATEGORY SETTINGS
 * File: js/categories.js
 *
 * Responsibilities:
 * - Define medication categories
 * - Provide category names, colors, and symbols
 * - Update the category indicator
 * - Update category-related CSS variables
 *
 * Does NOT:
 * - Prepare quiz questions
 * - Change scores
 * - Control timers
 * - Modify medication records
 * ============================================================
 */

(function () {
  "use strict";

  const categorySettings = {
    all: {
      name: "General Medications",
      accent: "#2563eb",
      light: "#eaf1ff",
      symbol: "●",
    },

    oncology: {
      name: "Oncology",
      accent: "#7c3aed",
      light: "#f3e8ff",
      symbol: "■",
    },

    diabetes: {
      name: "Diabetes",
      accent: "#15803d",
      light: "#dcfce7",
      symbol: "▲",
    },

    antibiotics: {
      name: "Antibiotics",
      accent: "#ea580c",
      light: "#ffedd5",
      symbol: "◆",
    },

    cardiology: {
      name: "Cardiology",
      accent: "#dc2626",
      light: "#fee2e2",
      symbol: "♥",
    },

    psychiatry: {
      name: "Psychiatry",
      accent: "#6366f1",
      light: "#eef2ff",
      symbol: "✦",
    },
  };

  function getCategory(categoryId) {
    return categorySettings[categoryId] || categorySettings.all;
  }

  function updateCategoryPresentation(categoryId) {
    const selected = getCategory(categoryId);
    const root = document.documentElement;

    root.style.setProperty("--accent", selected.accent);
    root.style.setProperty("--accent-light", selected.light);
    root.style.setProperty(
      "--category-symbol",
      JSON.stringify(selected.symbol),
    );

    const symbolElement = document.getElementById("categorySymbol");
    const textElement = document.getElementById("categoryText");
    const categorySelect = document.getElementById("drugCategory");

    if (symbolElement) {
      symbolElement.textContent = selected.symbol;
    }

    if (textElement) {
      textElement.textContent = selected.name;
    }

    if (categorySelect) {
      categorySelect.setAttribute(
        "aria-label",
        `Drug category: ${selected.name}`,
      );
    }
  }

  window.categorySettings = categorySettings;
  window.getCategory = getCategory;
  window.updateCategoryPresentation = updateCategoryPresentation;
})();
