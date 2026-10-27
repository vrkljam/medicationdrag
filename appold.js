/*
 * ============================================================
 * APPLICATION COORDINATOR
 * File: app.js
 *
 * Connects:
 * - categories.js
 * - quiz.js
 * - matching.js
 * - scoring.js
 * - timer.js
 *
 * Owns application flow, quiz direction, and review mode.
 * ============================================================
 */

(function () {
  "use strict";

  // ----------------------------------------------------------
  // APPLICATION STATE
  // ----------------------------------------------------------

  let currentQuiz = [];
  let quizStarted = false;
  let quizFinished = false;
  let quizExpired = false;
  let reviewMode = false;
  let reverseMode = false;

  const elements = {
    category: document.getElementById("drugCategory"),
    questionCount: document.getElementById("questionCount"),
    timerMode: document.getElementById("timerMode"),
    timerDuration: document.getElementById("timerDuration"),
    startPanel: document.getElementById("startPanel"),
    completion: document.getElementById("completion"),
    feedback: document.getElementById("feedback"),
    total: document.getElementById("total"),
    finalScore: document.getElementById("finalScore"),
    modeDescription: document.getElementById("modeDescription"),
    instruction: document.getElementById("instruction"),
    reverseButton: document.getElementById("reverseButton"),
  };

  // ----------------------------------------------------------
  // SCORING CONTROLLER
  // ----------------------------------------------------------

  const scoring = window.createScoringController();

  // ----------------------------------------------------------
  // TIMER CONTROLLER
  // ----------------------------------------------------------

  const timer = window.createTimerController({
    onExpire: expireQuiz,
  });

  // ----------------------------------------------------------
  // MATCHING CONTROLLER
  // ----------------------------------------------------------

  const matching = window.createMatchingController({
    getQuestions: () => currentQuiz,

    getDirection: () => (reverseMode ? "brand-to-generic" : "generic-to-brand"),

    isActive: () => quizStarted && !quizFinished && !quizExpired,

    onCorrect: (item) => {
      scoring.recordCorrect(item, reviewMode);
    },

    onIncorrect: (item) => {
      scoring.recordIncorrect(item, reviewMode);
    },

    onComplete: finishQuiz,
  });

  // ----------------------------------------------------------
  // SHARED DISPLAY HELPERS
  // ----------------------------------------------------------

  function showFeedback(message, success = null) {
    matching.showFeedback(message, success);
  }

  function updateTotal() {
    if (elements.total) {
      elements.total.textContent = currentQuiz.length;
    }
  }

  function updateReviewButton() {
    const button = document.getElementById("reviewMissedButton");

    if (!button) return;

    button.textContent = `Review Missed (${scoring.getMissedCount()})`;

    button.disabled = !scoring.hasMissedMedications();
  }

  function updateCategoryPresentation() {
    if (typeof window.updateCategoryPresentation === "function") {
      window.updateCategoryPresentation(elements.category.value);
    }
  }

  function updateModeText() {
    elements.reverseButton.textContent = reverseMode
      ? "Normal Quiz"
      : "Reverse Quiz";

    if (reviewMode) {
      elements.modeDescription.textContent = reverseMode
        ? "Review missed medications: match brand names with generic names."
        : "Review missed medications: match generic names with brand names.";

      elements.instruction.textContent = reverseMode
        ? "Drag each generic answer into the empty spot beside its matching brand name. On a phone, tap the answer and then its destination."
        : "Drag each brand answer into the empty spot beside its matching generic name. On a phone, tap the answer and then its destination.";

      return;
    }

    if (reverseMode) {
      elements.modeDescription.textContent =
        "Match each brand-name medication with its correct generic name.";

      elements.instruction.textContent =
        "Drag each generic name into the empty box beside its matching brand name. On a phone, tap a generic name and then tap its destination.";
    } else {
      elements.modeDescription.textContent =
        "Match each generic medication with its correct brand name.";

      elements.instruction.textContent =
        "Drag each brand name into the empty box under its matching generic name. On a phone, tap a brand and then tap its destination.";
    }
  }

  function prepareScreen() {
    quizStarted = false;
    quizFinished = false;
    quizExpired = false;

    elements.startPanel.style.display = "block";
    elements.completion.style.display = "none";

    timer.reset();
    matching.render();

    updateTotal();
    updateReviewButton();
    updateModeText();
  }

  // ----------------------------------------------------------
  // NEW QUIZ
  // ----------------------------------------------------------

  function newQuiz() {
    reviewMode = false;

    const categoryId = elements.category.value;
    const requestedCount = Number(elements.questionCount.value);

    try {
      const result = window.quizController.prepareQuiz(
        categoryId,
        requestedCount,
      );

      currentQuiz = result.questions;

      if (
        result.diagnostics.invalidRecords.length ||
        result.diagnostics.exactDuplicates.length ||
        result.diagnostics.duplicateGenerics.length ||
        result.diagnostics.duplicateBrands.length
      ) {
        console.warn("Medication data diagnostics:", result.diagnostics);
      }
    } catch (error) {
      currentQuiz = [];
      console.error("Unable to prepare quiz:", error);
    }

    scoring.beginQuiz();
    updateCategoryPresentation();
    prepareScreen();

    if (currentQuiz.length === 0) {
      showFeedback(
        "No valid medication records are available for this category.",
        false,
      );
    } else {
      showFeedback("");
    }

    scoring.updateStats();
    updateTotal();
  }

  // ----------------------------------------------------------
  // START QUIZ
  // ----------------------------------------------------------

  function startQuiz() {
    if (quizStarted || quizFinished || quizExpired) return;

    if (currentQuiz.length === 0) {
      showFeedback("There are no questions available to start.", false);
      return;
    }

    quizStarted = true;
    elements.startPanel.style.display = "none";

    // Reveal the answer bank.
    matching.render();

    // Start the selected timer only after the user starts.
    timer.start();
  }

  // ----------------------------------------------------------
  // REVIEW MISSED MEDICATIONS
  // ----------------------------------------------------------

  function startReviewQuiz() {
    const missed = scoring.getMissedMedications();

    if (missed.length === 0) {
      updateReviewButton();
      return;
    }

    reviewMode = true;

    currentQuiz = window.quizController.shuffle(missed);

    scoring.beginReview(currentQuiz);

    updateCategoryPresentation();
    prepareScreen();
    updateTotal();

    showFeedback(
      "Review mode: answer each medication correctly on your first try to remove it from your missed list.",
    );
  }

  // ----------------------------------------------------------
  // COMPLETE OR EXPIRE QUIZ
  // ----------------------------------------------------------

  function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;
    quizStarted = false;

    timer.finish();

    const results = scoring.getResults();
    const percentage = currentQuiz.length
      ? Math.round((results.score / currentQuiz.length) * 100)
      : 0;

    elements.finalScore.textContent = `You scored ${results.score} out of ${currentQuiz.length} (${percentage}%).`;

    elements.completion.style.display = "block";

    updateReviewButton();
  }

  function expireQuiz() {
    if (quizExpired || quizFinished) return;

    quizExpired = true;
    quizStarted = false;

    showFeedback("Time is up! Your quiz has ended.", false);

    finishQuiz();
  }

  // ----------------------------------------------------------
  // RESET QUIZ
  // ----------------------------------------------------------

  function resetQuiz() {
    if (reviewMode) {
      // Keep only medications that are still on the missed list.
      currentQuiz = currentQuiz.filter((item) =>
        scoring
          .getMissedMedications()
          .some(
            (missed) =>
              window.quizController.medicationKey(missed) ===
              window.quizController.medicationKey(item),
          ),
      );

      if (currentQuiz.length === 0) {
        newQuiz();
        return;
      }

      scoring.beginReview(currentQuiz);
    } else {
      scoring.beginQuiz();
    }

    prepareScreen();
    updateTotal();
    scoring.updateStats();
    showFeedback("");
  }

  // ----------------------------------------------------------
  // NORMAL / REVERSE DIRECTION
  // ----------------------------------------------------------

  function toggleQuizMode() {
    if (quizFinished || quizExpired) return;

    reverseMode = !reverseMode;

    if (!reviewMode) {
      newQuiz();
      return;
    }

    // In review mode, keep only medications still needing review.
    currentQuiz = currentQuiz.filter((item) =>
      scoring
        .getMissedMedications()
        .some(
          (missed) =>
            window.quizController.medicationKey(missed) ===
            window.quizController.medicationKey(item),
        ),
    );

    if (currentQuiz.length === 0) {
      newQuiz();
      return;
    }

    currentQuiz = window.quizController.shuffle(currentQuiz);

    scoring.beginReview(currentQuiz);
    prepareScreen();
    updateTotal();
    scoring.updateStats();

    showFeedback(
      "Review mode: answer each medication correctly on your first try to remove it from your missed list.",
    );
  }

  // ----------------------------------------------------------
  // TIMER CONTROLS
  // ----------------------------------------------------------

  function handleTimerModeChange() {
    timer.setMode(elements.timerMode.value);
  }

  function handleTimerDurationChange() {
    timer.setDuration();
  }

  function stopCountUpTimer() {
    timer.stopCountUp();
  }

  // ----------------------------------------------------------
  // INITIALIZE
  // ----------------------------------------------------------

  function initialize() {
    updateCategoryPresentation();

    // Prepare the first quiz without starting a timer.
    newQuiz();

    // The timer controller also updates this when the mode changes.
    timer.refresh();

    console.log("Application initialized:", {
      categories: typeof window.getCategory === "function",
      quiz: typeof window.quizController?.prepareQuiz === "function",
      matching: typeof window.createMatchingController === "function",
      scoring: typeof window.createScoringController === "function",
      timer: typeof window.createTimerController === "function",
    });
  }

  // Preserve the existing HTML button handlers.
  window.newQuiz = newQuiz;
  window.startQuiz = startQuiz;
  window.startReviewQuiz = startReviewQuiz;
  window.toggleQuizMode = toggleQuizMode;
  window.resetQuiz = resetQuiz;
  window.finishQuiz = finishQuiz;
  window.handleTimerModeChange = handleTimerModeChange;
  window.handleTimerDurationChange = handleTimerDurationChange;
  window.stopCountUpTimer = stopCountUpTimer;

  initialize();
})();
