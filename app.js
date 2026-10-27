/*
 * ============================================================
 * APPLICATION COORDINATOR
 * File: app.js
 *
 * Coordinates the redesigned setup-first medication quiz.
 *
 * Reuses the existing:
 * - categories.js
 * - quiz.js
 * - matching.js
 * - scoring.js
 * - timer.js
 *
 * Does not modify medication data or controller internals.
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
  let lastResults = null;

  const elements = {
    disclaimerModal: document.getElementById("disclaimerModal"),
    disclaimerAcceptButton: document.getElementById("disclaimerAcceptButton"),
    category: document.getElementById("drugCategory"),
    questionCount: document.getElementById("questionCount"),
    setupScreen: document.getElementById("setupScreen"),
    gameScreen: document.getElementById("gameScreen"),
    completion: document.getElementById("completion"),
    setupFeedback: document.getElementById("setupFeedback"),
    feedback: document.getElementById("feedback"),
    quizGrid: document.getElementById("quizGrid"),
    total: document.getElementById("total"),
    finalScore: document.getElementById("finalScore"),
    modeDescription: document.getElementById("modeDescription"),
    instruction: document.getElementById("instruction"),
    reverseButton: document.getElementById("reverseButton"),
    timerDuration: document.getElementById("timerDuration"),
    timerDurationLabel: document.getElementById("timerDurationLabel"),
    categoryRecordCount: document.getElementById("categoryRecordCount"),
    questionCountHint: document.getElementById("questionCountHint"),
    stopElapsedButton: document.getElementById("stopElapsedButton"),
    reviewMissedButton: document.getElementById("reviewMissedButton"),
    elapsedDisplay: document.getElementById("elapsedDisplay"),
    timerDisplay: document.getElementById("timerDisplay"),
  };

  // ----------------------------------------------------------
  // EXISTING CONTROLLERS
  // ----------------------------------------------------------

  const scoring = window.createScoringController();

  const timer = window.createTimerController({
    onExpire: expireQuiz,
  });

  const matching = window.createMatchingController({
    getQuestions: () => currentQuiz,

    getDirection: () => (reverseMode ? "brand-to-generic" : "generic-to-brand"),

    isActive: () => quizStarted && !quizFinished && !quizExpired,

    onCorrect: (item) => {
      scoring.recordCorrect(item, reviewMode);
      updateProgress();
    },

    onIncorrect: (item) => {
      scoring.recordIncorrect(item, reviewMode);
      updateReviewButton();
    },

    onComplete: finishQuiz,
  });

  // ----------------------------------------------------------
  // GENERAL HELPERS
  // ----------------------------------------------------------

  function getSelectedTimerMode() {
    const selected = document.querySelector(
      'input[name="timerChoice"]:checked',
    );

    return selected ? selected.value : "off";
  }

  function getSelectedDirection() {
    const selected = document.querySelector(
      'input[name="quizDirection"]:checked',
    );

    return selected ? selected.value : "generic-to-brand";
  }

  function showSetupFeedback(message, success = null) {
    const target = elements.setupFeedback;

    if (!target) return;

    target.textContent = message || "";
    target.classList.toggle("success", success === true);
    target.classList.toggle("error", success === false);
  }

  function showFeedback(message, success = null) {
    matching.showFeedback(message, success);
  }

  function setVisible(element, visible) {
    if (!element) return;

    element.hidden = !visible;
    element.style.display = visible ? "" : "none";
  }

  function updateTotal() {
    if (elements.total) {
      elements.total.textContent = String(currentQuiz.length);
    }
  }

  function updateReviewButton() {
    const button = elements.reviewMissedButton;

    if (!button) return;

    const hasMissed = scoring.hasMissedMedications();

    button.textContent = `Review Missed (${scoring.getMissedCount()})`;
    button.disabled = !hasMissed;
    button.hidden = !hasMissed || reviewMode;
  }

  function updateCategoryPresentation() {
    if (!elements.category) return;

    const categoryId = elements.category.value;

    if (typeof window.updateCategoryPresentation === "function") {
      window.updateCategoryPresentation(categoryId);
    }

    const category = window.getCategory?.(categoryId);

    const gameCategoryName = document.getElementById("gameCategoryName");
    const gameCategorySymbol = document.getElementById("gameCategorySymbol");

    if (category && gameCategoryName) {
      gameCategoryName.textContent = category.name;
    }

    if (category && gameCategorySymbol) {
      gameCategorySymbol.textContent = category.symbol;
    }
  }

  function updateProgress() {
    const completed = matching.getCompletedCount();
    const total = currentQuiz.length;

    const progress = document.getElementById("progressFill");

    if (progress) {
      progress.style.width = `${total ? (completed / total) * 100 : 0}%`;
    }

    const progressText = document.getElementById("progressText");

    if (progressText) {
      progressText.textContent = `${completed} of ${total} matched`;
    }

    updateTotal();
    updateReviewButton();
  }

  // ----------------------------------------------------------
  // MATCHING-DIRECTION PRESENTATION
  // ----------------------------------------------------------

  function updateModeText() {
    if (elements.reverseButton) {
      elements.reverseButton.textContent = reverseMode
        ? "Normal Quiz"
        : "Reverse Quiz";
    }

    if (elements.modeDescription) {
      elements.modeDescription.textContent = reviewMode
        ? reverseMode
          ? "Review missed medications by matching brand names with generic names."
          : "Review missed medications by matching generic names with brand names."
        : reverseMode
          ? "Match each brand-name medication with its correct generic name."
          : "Match each generic medication with its correct brand name.";
    }

    if (elements.instruction) {
      elements.instruction.textContent = reverseMode
        ? "Match each generic answer to its brand name. On a phone, tap an answer and then its destination."
        : "Match each brand answer to its generic name. On a phone, tap an answer and then its destination.";
    }
  }

  // ----------------------------------------------------------
  // SETUP: QUESTION COUNTS AND CATEGORY INFORMATION
  // ----------------------------------------------------------

  function updateQuestionCountOptions() {
    if (!elements.category || !elements.questionCount) return;

    const categoryId = elements.category.value;
    const category = window.quizController.getCategoryRecords(categoryId);
    const available = category.records.length;
    const select = elements.questionCount;

    const previousValue = select.value;
    const standardCounts = [5, 10, 15, 20, 25, 30, 50];

    select.replaceChildren();

    standardCounts
      .filter((count) => count <= available)
      .forEach((count) => {
        const option = document.createElement("option");
        option.value = String(count);
        option.textContent = `${count} questions`;
        select.appendChild(option);
      });

    if (available > 0) {
      const maxOption = document.createElement("option");
      maxOption.value = String(available);
      maxOption.textContent = `All available (${available})`;
      select.appendChild(maxOption);
    }

    const values = [...select.options].map((option) => option.value);

    if (values.includes(previousValue)) {
      select.value = previousValue;
    } else if (values.includes("10")) {
      select.value = "10";
    } else if (select.options.length > 0) {
      select.selectedIndex = select.options.length - 1;
    }

    if (elements.categoryRecordCount) {
      elements.categoryRecordCount.textContent = `${available} valid medication records available`;
    }

    if (elements.questionCountHint) {
      elements.questionCountHint.textContent = available
        ? `Choose up to ${available} questions for this category.`
        : "No valid medication records are available in this category.";
    }

    if (available === 0) {
      showSetupFeedback(
        "This category has no valid medication records. Check the medication data files.",
        false,
      );
    } else {
      showSetupFeedback("");
    }
  }

  function handleCategoryChange() {
    updateCategoryPresentation();
    updateQuestionCountOptions();

    // Rebuild the question set using the newly selected category.
    newQuiz();
  }

  function handleQuestionCountChange() {
    if (!elements.questionCountHint) return;

    const selected = Number(elements.questionCount.value);

    elements.questionCountHint.textContent =
      selected > 0
        ? `Your quiz will contain up to ${selected} questions.`
        : "Choose a valid question count to continue.";

    // Rebuild the quiz using the newly selected question count.
    newQuiz();
  }

  // ----------------------------------------------------------
  // SETUP: TIMER OPTIONS
  // ----------------------------------------------------------

  function updateTimerDurationVisibility() {
    const isCountdown = getSelectedTimerMode() === "countdown";

    if (elements.timerDurationLabel) {
      elements.timerDurationLabel.style.display = isCountdown ? "" : "none";
    }

    if (elements.timerDuration) {
      elements.timerDuration.disabled = !isCountdown;
    }
  }

  function handleTimerChoiceChange() {
    timer.setMode(getSelectedTimerMode());
    updateTimerDurationVisibility();
  }

  function handleTimerDurationChange() {
    timer.setDuration();
  }

  // ----------------------------------------------------------
  // SCREEN NAVIGATION
  // ----------------------------------------------------------

  function acceptDisclaimer() {
    if (elements.disclaimerModal) {
      elements.disclaimerModal.hidden = true;
    }

    showSetupScreen();
  }

  function showSetupScreen() {
    quizStarted = false;

    setVisible(elements.setupScreen, true);
    setVisible(elements.gameScreen, false);
    setVisible(elements.completion, false);

    timer.reset();
    updateTimerDurationVisibility();
  }

  function showGameScreen() {
    setVisible(elements.setupScreen, false);
    setVisible(elements.gameScreen, true);
    setVisible(elements.completion, false);
  }

  // ----------------------------------------------------------
  // PREPARE A NEW QUIZ
  // ----------------------------------------------------------

  function newQuiz() {
    reviewMode = false;
    quizStarted = false;
    quizFinished = false;
    quizExpired = false;
    lastResults = null;

    reverseMode = getSelectedDirection() === "brand-to-generic";

    const categoryId = elements.category?.value || "all";
    const requestedCount = Number(elements.questionCount?.value || 10);

    try {
      const result = window.quizController.prepareQuiz(
        categoryId,
        requestedCount,
      );

      currentQuiz = result.questions;

      const diagnostics = result.diagnostics;

      if (
        diagnostics.invalidRecords.length ||
        diagnostics.exactDuplicates.length ||
        diagnostics.duplicateGenerics.length ||
        diagnostics.duplicateBrands.length
      ) {
        console.warn("Medication data diagnostics:", diagnostics);
      }
    } catch (error) {
      currentQuiz = [];
      console.error("Unable to prepare quiz:", error);
      showSetupFeedback(error.message || "Unable to prepare the quiz.", false);
    }

    scoring.beginQuiz();
    timer.reset();

    updateCategoryPresentation();
    updateModeText();
    updateTotal();
    updateReviewButton();
    updateProgress();

    matching.render();
    showSetupScreen();

    if (currentQuiz.length === 0) {
      showSetupFeedback(
        "No valid medication records are available for this category.",
        false,
      );
    } else {
      showSetupFeedback("");
    }

    scoring.updateStats();
  }

  // ----------------------------------------------------------
  // START GAMEPLAY
  // ----------------------------------------------------------

  function startQuiz() {
    console.log("START QUIZ DEBUG", {
      selectedCategory: elements.category?.value,
      selectedQuestionCount: elements.questionCount?.value,
      preparedQuestionCount: currentQuiz.length,
      firstQuestion: currentQuiz[0],
    });
    if (quizStarted || quizFinished || quizExpired) return;

    if (currentQuiz.length === 0) {
      showSetupFeedback(
        "There are no questions available. Choose another category.",
        false,
      );
      return;
    }

    quizStarted = true;

    showGameScreen();
    updateModeText();
    updateProgress();

    // Rerender so the answer bank becomes interactive.
    matching.render();

    // The selected timer begins only when gameplay starts.
    timer.setMode(getSelectedTimerMode());
    timer.setDuration();
    timer.start();

    showFeedback(
      "Quiz started. Match each medication with its correct answer.",
    );
  }

  // ----------------------------------------------------------
  // QUIZ COMPLETION AND RESULTS
  // ----------------------------------------------------------

  function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;
    quizStarted = false;

    timer.finish();

    lastResults = scoring.getResults();

    // !!!!!!!!!!!!!!!!!!
    const total = currentQuiz.length;
    const completionPercentage = total
      ? Math.round((lastResults.score / total) * 100)
      : 0;

    const completionScore = document.getElementById("completionScore");
    const completionCorrect = document.getElementById("completionCorrect");
    const completionAccuracy = document.getElementById("completionAccuracy");
    const completionTime = document.getElementById("completionTime");
    const completionMessage = document.getElementById("completionMessage");
    const timerText = document.getElementById("timer");

    if (completionScore) {
      completionScore.textContent = `${completionPercentage}%`;
    }

    if (completionCorrect) {
      completionCorrect.textContent = String(lastResults.score);
    }

    if (completionAccuracy) {
      completionAccuracy.textContent = `${lastResults.accuracy}%`;
    }

    if (completionTime) {
      completionTime.textContent = timerText?.textContent || "00:00";
    }

    if (completionMessage) {
      completionMessage.textContent = quizExpired
        ? "Your time ran out. Review your results and practice any missed medications."
        : reviewMode
          ? "Review round complete. Keep practicing any medications that remain on your missed list."
          : completionPercentage === 100
            ? "Excellent work! You matched every medication correctly."
            : "Quiz complete. Review your results and practice the medications you missed.";
    }

    renderMissedMedications();

    setVisible(elements.setupScreen, false);
    setVisible(elements.gameScreen, false);
    setVisible(elements.completion, true);

    updateReviewButton();
    scoring.updateStats();
  }

  function expireQuiz() {
    if (quizExpired || quizFinished) return;

    quizExpired = true;
    quizStarted = false;

    showFeedback("Time is up! Your quiz has ended.", false);

    finishQuiz();
  }

  // ----------------------------------------------------------
  // MISSED-MEDICATION RESULTS
  // ----------------------------------------------------------

  function renderMissedMedications() {
    const list = document.getElementById("missedMedicationList");
    const emptyState = document.getElementById("missedEmptyState");
    const missedCountBadge = document.getElementById("missedCountBadge");
    const practiceButton = document.getElementById("practiceMissedButton");

    const missed = scoring.getMissedMedications();

    if (missedCountBadge) {
      missedCountBadge.textContent = `${missed.length} ${missed.length === 1 ? "medication" : "missed"}`;
    }

    if (emptyState) {
      emptyState.hidden = missed.length !== 0;
    }

    if (practiceButton) {
      practiceButton.hidden = missed.length === 0;
    }

    if (!list) return;

    list.replaceChildren();
    list.hidden = missed.length === 0;

    missed.forEach((item) => {
      const card = document.createElement("article");
      card.className = "missed-medication-item";

      const genericColumn = document.createElement("div");
      const genericLabel = document.createElement("span");
      genericLabel.className = "missed-medication-label";
      genericLabel.textContent = "Generic name";

      const genericName = document.createElement("div");
      genericName.className = "missed-medication-name";
      genericName.textContent = item.generic;

      genericColumn.append(genericLabel, genericName);

      const brandColumn = document.createElement("div");
      const brandLabel = document.createElement("span");
      brandLabel.className = "missed-medication-label";
      brandLabel.textContent = "Brand name";

      const brandName = document.createElement("div");
      brandName.className = "missed-medication-name";
      brandName.textContent = item.brand;

      brandColumn.append(brandLabel, brandName);
      card.append(genericColumn, brandColumn);
      list.appendChild(card);
    });
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
    quizStarted = false;
    quizFinished = false;
    quizExpired = false;
    lastResults = null;

    currentQuiz = window.quizController.shuffle(missed);
    reverseMode = getSelectedDirection() === "brand-to-generic";

    scoring.beginReview(currentQuiz);
    timer.reset();

    updateCategoryPresentation();
    updateModeText();
    updateTotal();
    updateReviewButton();

    // Mark gameplay active BEFORE rendering the answer bank.
    quizStarted = true;

    matching.render();
    updateProgress();
    showGameScreen();

    if (elements.category) {
      elements.category.disabled = true;
    }

    if (elements.questionCount) {
      elements.questionCount.disabled = true;
    }

    // Keep the selected timer settings for the review round.
    timer.setMode(getSelectedTimerMode());
    timer.setDuration();
    timer.start();

    showFeedback(
      "Review mode: match each medication correctly on your first try to remove it from your missed list.",
    );
  }

  // ----------------------------------------------------------
  // RESET CURRENT QUIZ
  // ----------------------------------------------------------

  function resetQuiz() {
    // Return to setup instead of leaving a partially answered board.
    quizStarted = false;
    quizFinished = false;
    quizExpired = false;
    lastResults = null;

    if (elements.category) {
      elements.category.disabled = false;
    }

    if (elements.questionCount) {
      elements.questionCount.disabled = false;
    }

    if (reviewMode) {
      reviewMode = false;
    }

    newQuiz();
  }

  // ----------------------------------------------------------
  // NORMAL / REVERSE MATCHING DIRECTION
  // ----------------------------------------------------------

  function toggleQuizMode() {
    if (quizFinished || quizExpired) return;

    reverseMode = !reverseMode;

    const selectedDirection = document.querySelector(
      'input[name="quizDirection"][value="' +
        (reverseMode ? "brand-to-generic" : "generic-to-brand") +
        '"]',
    );

    if (selectedDirection) {
      selectedDirection.checked = true;
    }

    if (!reviewMode) {
      // Prepare a fresh question set in the chosen direction.
      newQuiz();

      if (quizStarted) {
        startQuiz();
      }

      return;
    }

    const missedKeys = new Set(
      scoring
        .getMissedMedications()
        .map((item) => window.quizController.medicationKey(item)),
    );

    currentQuiz = currentQuiz.filter((item) =>
      missedKeys.has(window.quizController.medicationKey(item)),
    );

    if (currentQuiz.length === 0) {
      reviewMode = false;

      if (elements.category) {
        elements.category.disabled = false;
      }

      if (elements.questionCount) {
        elements.questionCount.disabled = false;
      }

      newQuiz();
      return;
    }

    currentQuiz = window.quizController.shuffle(currentQuiz);

    quizStarted = true;
    quizFinished = false;
    quizExpired = false;

    scoring.beginReview(currentQuiz);
    timer.reset();
    timer.setMode(getSelectedTimerMode());
    timer.setDuration();

    updateModeText();
    updateTotal();
    updateReviewButton();

    matching.render();
    updateProgress();

    showFeedback(
      "Review mode: answer each medication correctly on your first try to remove it from your missed list.",
    );

    timer.start();
  }

  // ----------------------------------------------------------
  // BUTTON AND INPUT EVENT BINDINGS
  // ----------------------------------------------------------

  function bindEvents() {
    console.log("DEBUG: bindEvents is running");
    const startButton = document.getElementById("startQuizButton");
    const setupForm = document.getElementById("setupForm");
    // const newGameButton = document.getElementById("newGameButton");
    // const resetButton = document.getElementById("resetButton");
    const newGameButton = document.getElementById("resetGameButton");
    const backToSetupButton = document.getElementById("backToSetupButton");
    const reviewButton = elements.reviewMissedButton;
    const reverseButton = elements.reverseButton;
    const stopButton = elements.stopElapsedButton;
    const practiceMissedButton = document.getElementById(
      "practiceMissedButton",
    );
    const playAgainButton = document.getElementById("playAgainButton");
    const completionSetupButton = document.getElementById(
      "completionSetupButton",
    );

    if (elements.disclaimerAcceptButton) {
      elements.disclaimerAcceptButton.addEventListener(
        "click",
        acceptDisclaimer,
      );
    }

    if (elements.category) {
      elements.category.addEventListener("change", handleCategoryChange);
    }

    if (elements.questionCount) {
      elements.questionCount.addEventListener(
        "change",
        handleQuestionCountChange,
      );
    }

    document.querySelectorAll('input[name="timerChoice"]').forEach((radio) => {
      radio.addEventListener("change", handleTimerChoiceChange);
    });

    document
      .querySelectorAll('input[name="quizDirection"]')
      .forEach((radio) => {
        radio.addEventListener("change", () => {
          reverseMode = getSelectedDirection() === "brand-to-generic";

          updateModeText();
        });
      });

    if (elements.timerDuration) {
      elements.timerDuration.addEventListener(
        "change",
        handleTimerDurationChange,
      );
    }

    if (setupForm) {
      setupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        startQuiz();
      });
    }

    // if (newGameButton) {
    //   newGameButton.addEventListener("click", resetQuiz);
    // }

    // if (resetButton) {
    //   resetButton.addEventListener("click", resetQuiz);
    // }

    if (newGameButton) {
      newGameButton.addEventListener("click", resetQuiz);
    }

    if (backToSetupButton) {
      backToSetupButton.addEventListener("click", resetQuiz);
    }

    if (reviewButton) {
      reviewButton.addEventListener("click", startReviewQuiz);
    }

    if (practiceMissedButton) {
      practiceMissedButton.addEventListener("click", startReviewQuiz);
    }

    if (playAgainButton) {
      playAgainButton.addEventListener("click", resetQuiz);
    }

    if (completionSetupButton) {
      completionSetupButton.addEventListener("click", resetQuiz);
    }

    if (reverseButton) {
      reverseButton.addEventListener("click", toggleQuizMode);
    }

    if (stopButton) {
      stopButton.addEventListener("click", stopCountUpTimer);
    }

    // Support buttons using the original inline-handler names,
    // without requiring inline handlers in the redesigned HTML.
    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        switch (button.dataset.action) {
          case "start":
            startQuiz();
            break;
          case "new-game":
          case "reset":
            resetQuiz();
            break;
          case "review":
            startReviewQuiz();
            break;
          case "reverse":
            toggleQuizMode();
            break;
          case "stop-timer":
            stopCountUpTimer();
            break;
        }
      });
    });
  }

  // ----------------------------------------------------------
  // COUNT-UP TIMER CONTROL
  // ----------------------------------------------------------

  function stopCountUpTimer() {
    timer.stopCountUp();
  }

  // ----------------------------------------------------------
  // INITIALIZATION
  // ----------------------------------------------------------

  function initialize() {
    bindEvents();

    // Set up category options before preparing the first quiz.
    updateCategoryPresentation();
    updateQuestionCountOptions();

    // Synchronize the setup controls with the existing timer.
    timer.setMode(getSelectedTimerMode());
    timer.setDuration();
    updateTimerDurationVisibility();

    // Prepare a question set but never start the clock here.
    newQuiz();

    // Keep the setup inaccessible until the disclaimer is acknowledged.
    if (elements.disclaimerModal) {
      elements.disclaimerModal.hidden = false;
      setVisible(elements.setupScreen, false);
      setVisible(elements.gameScreen, false);
      setVisible(elements.completion, false);
    } else {
      // Fallback if the disclaimer markup is missing.
      showSetupScreen();
    }

    timer.refresh();

    // Keep setup controls enabled when entering a new session.
    if (elements.category) {
      elements.category.disabled = false;
    }

    if (elements.questionCount) {
      elements.questionCount.disabled = false;
    }

    console.log("Medication quiz initialized:", {
      categories: typeof window.getCategory === "function",
      quiz: typeof window.quizController?.prepareQuiz === "function",
      matching: typeof window.createMatchingController === "function",
      scoring: typeof window.createScoringController === "function",
      timer: typeof window.createTimerController === "function",
      questionCount: currentQuiz.length,
    });
  }

  // ----------------------------------------------------------
  // PUBLIC FUNCTIONS — BACKWARD COMPATIBILITY
  // ----------------------------------------------------------

  window.newQuiz = newQuiz;
  window.startQuiz = startQuiz;
  window.startReviewQuiz = startReviewQuiz;
  window.toggleQuizMode = toggleQuizMode;
  window.resetQuiz = resetQuiz;
  window.finishQuiz = finishQuiz;
  window.handleTimerModeChange = handleTimerChoiceChange;
  window.handleTimerDurationChange = handleTimerDurationChange;
  window.stopCountUpTimer = stopCountUpTimer;

  // Start only after the document's controls exist.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true,
    });
  } else {
    initialize();
  }
})();
