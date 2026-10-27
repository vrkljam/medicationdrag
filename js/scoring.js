/*
 * ============================================================
 * SCORING AND MISSED-MEDICATION TRACKING
 * File: js/scoring.js
 * ============================================================
 */

(function () {
  "use strict";

  function createScoringController() {
    let score = 0;
    let answered = 0;
    let attempts = 0;

    const missedMedications = new Map();
    let reviewFirstAttempt = new Set();

    function medicationKey(item) {
      return `${item.generic}|||${item.brand}`;
    }

    function recordIncorrect(item, reviewMode = false) {
      attempts += 1;

      if (item) {
        const key = medicationKey(item);
        missedMedications.set(key, item);

        if (reviewMode) {
          reviewFirstAttempt.delete(key);
        }
      }

      return updateStats();
    }

    function recordCorrect(item, reviewMode = false) {
      attempts += 1;
      score += 1;
      answered += 1;

      if (item) {
        const key = medicationKey(item);

        if (reviewMode && reviewFirstAttempt.has(key)) {
          missedMedications.delete(key);
        }

        reviewFirstAttempt.delete(key);
      }

      return updateStats();
    }

    function beginQuiz() {
      score = 0;
      answered = 0;
      attempts = 0;
      reviewFirstAttempt.clear();

      return updateStats();
    }

    function beginReview(items) {
      score = 0;
      answered = 0;
      attempts = 0;

      reviewFirstAttempt = new Set(items.map(medicationKey));

      return updateStats();
    }

    function resetReviewAttempt(item) {
      if (item) {
        reviewFirstAttempt.delete(medicationKey(item));
      }
    }

    function getAccuracy() {
      return attempts === 0 ? 0 : Math.round((score / attempts) * 100);
    }

    function getResults() {
      return {
        score,
        answered,
        attempts,
        accuracy: getAccuracy(),
      };
    }

    function getMissedMedications() {
      return [...missedMedications.values()];
    }

    function getMissedCount() {
      return missedMedications.size;
    }

    function hasMissedMedications() {
      return missedMedications.size > 0;
    }

    function clearMissedMedication(item) {
      if (!item) return;

      const key = medicationKey(item);

      missedMedications.delete(key);
      reviewFirstAttempt.delete(key);

      updateStats();
    }

    function getReviewFirstAttemptKeys() {
      return new Set(reviewFirstAttempt);
    }

    function updateStats() {
      const results = getResults();

      const scoreElement = document.getElementById("score");
      const answeredElement = document.getElementById("answered");
      const accuracyElement = document.getElementById("accuracy");
      const wrongAttemptsElement = document.getElementById("wrongAttempts");
      const reviewButton = document.getElementById("reviewMissedButton");

      if (scoreElement) {
        scoreElement.textContent = results.score;
      }

      if (answeredElement) {
        answeredElement.textContent = results.answered;
      }

      if (accuracyElement) {
        accuracyElement.textContent = `${results.accuracy}%`;
      }

      if (wrongAttemptsElement) {
        wrongAttemptsElement.textContent = String(
          results.attempts - results.score,
        );
      }

      if (reviewButton) {
        reviewButton.textContent = `Review Missed (${getMissedCount()})`;

        reviewButton.disabled = !hasMissedMedications();
      }

      return results;
    }

    return {
      medicationKey,
      recordIncorrect,
      recordCorrect,
      beginQuiz,
      beginReview,
      resetReviewAttempt,
      getResults,
      getAccuracy,
      getMissedMedications,
      getMissedCount,
      hasMissedMedications,
      clearMissedMedication,
      getReviewFirstAttemptKeys,
      updateStats,
    };
  }

  window.createScoringController = createScoringController;
})();
