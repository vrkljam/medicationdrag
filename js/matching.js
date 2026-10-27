/*
 * ============================================================
 * MATCHING CONTROLLER
 * File: js/matching.js
 *
 * Responsibilities:
 * - Render the three-column matching interface
 * - Support desktop drag-and-drop
 * - Support tapping on mobile devices
 * - Prevent duplicate answer assignments
 * - Validate answers against medication records
 * - Display matching feedback
 *
 * Does NOT:
 * - Prepare quiz questions
 * - Control timers
 * - Own scoring or missed-medication state
 * ============================================================
 */

(function () {
  "use strict";

  function createMatchingController(options = {}) {
    const getQuestions = options.getQuestions;
    const getDirection = options.getDirection;
    const isActive = options.isActive;
    const onCorrect = options.onCorrect;
    const onIncorrect = options.onIncorrect;
    const onComplete = options.onComplete;

    let selectedAnswerElement = null;

    const assignedQuestionKeys = new Set();

    function medicationKey(item) {
      return `${item.generic}|||${item.brand}`;
    }

    function showFeedback(message, success = null) {
      const feedback = document.getElementById("feedback");

      if (!feedback) return;

      feedback.textContent = message;

      feedback.className =
        success === true
          ? "feedback success"
          : success === false
            ? "feedback error"
            : "feedback";
    }

    function clearSelection() {
      document.querySelectorAll(".brand.selected").forEach((element) => {
        element.classList.remove("selected");
      });

      selectedAnswerElement = null;
    }

    function shuffle(items) {
      const result = [...items];

      for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
      }

      return result;
    }

    function getQuestionLabel(item, reverse) {
      return reverse ? item.brand : item.generic;
    }

    function getAnswerLabel(item, reverse) {
      return reverse ? item.generic : item.brand;
    }

    function render() {
      const grid = document.getElementById("quizGrid");

      if (!grid) return;

      clearSelection();
      assignedQuestionKeys.clear();
      grid.replaceChildren();

      const questions = getQuestions();

      if (!Array.isArray(questions) || questions.length === 0) {
        showFeedback("No questions are available for this quiz.");
        return;
      }

      const reverse = getDirection() === "brand-to-generic";

      const questionColumn = document.createElement("div");
      questionColumn.className = "column";

      const dropColumn = document.createElement("div");
      dropColumn.className = "column";

      const answerColumn = document.createElement("div");
      answerColumn.className = isActive()
        ? "column answer-column"
        : "column answer-column answers-hidden";

      function addHeading(column, label) {
        const heading = document.createElement("div");

        heading.className = "column-heading";
        heading.textContent = label;

        column.appendChild(heading);
      }

      addHeading(questionColumn, reverse ? "Brand Name" : "Generic Name");
      addHeading(dropColumn, "Your Answer");
      addHeading(answerColumn, reverse ? "Generic Answers" : "Brand Answers");

      questions.forEach((item) => {
        const question = document.createElement("div");

        question.className = "generic";
        question.textContent = getQuestionLabel(item, reverse);

        questionColumn.appendChild(question);

        const drop = document.createElement("div");

        drop.className = "drop-zone";
        drop.textContent = "Drop answer here";

        drop.dataset.medicationKey = medicationKey(item);
        drop.dataset.expectedAnswer = getAnswerLabel(item, reverse);

        drop.addEventListener("dragover", (event) => {
          if (!isActive() || drop.classList.contains("correct")) return;

          event.preventDefault();
          drop.classList.add("drag-over");
        });

        drop.addEventListener("dragleave", () => {
          drop.classList.remove("drag-over");
        });

        drop.addEventListener("drop", (event) => {
          event.preventDefault();

          drop.classList.remove("drag-over");

          if (!isActive()) return;

          const answerId = event.dataTransfer.getData("text/plain");

          const answer = answerColumn.querySelector(
            `[data-answer-id="${CSS.escape(answerId)}"]`,
          );

          if (answer) {
            submitAnswer(drop, answer, item);
          }
        });

        drop.addEventListener("click", () => {
          if (!isActive() || !selectedAnswerElement) return;

          submitAnswer(drop, selectedAnswerElement, item);
        });

        dropColumn.appendChild(drop);
      });

      shuffle(questions).forEach((item, index) => {
        const answer = document.createElement("div");

        answer.className = "brand";
        answer.textContent = getAnswerLabel(item, reverse);

        // Unique to this rendered answer, even if labels repeat.
        answer.dataset.answerId = `answer-${index}`;
        answer.dataset.medicationKey = medicationKey(item);
        answer.draggable = true;

        answer.addEventListener("dragstart", (event) => {
          if (!isActive() || answer.classList.contains("used")) {
            event.preventDefault();
            return;
          }

          event.dataTransfer.setData("text/plain", answer.dataset.answerId);
          event.dataTransfer.effectAllowed = "move";

          answer.classList.add("dragging");
        });

        answer.addEventListener("dragend", () => {
          answer.classList.remove("dragging");
        });

        answer.addEventListener("click", () => {
          if (!isActive() || answer.classList.contains("used")) return;

          clearSelection();

          selectedAnswerElement = answer;
          answer.classList.add("selected");

          showFeedback(
            reverse
              ? "Now tap the destination for this generic name."
              : "Now tap the destination for this brand name.",
          );
        });

        answerColumn.appendChild(answer);
      });

      grid.append(questionColumn, dropColumn, answerColumn);
    }

    function submitAnswer(drop, answer, item) {
      if (!isActive()) return;

      if (
        drop.classList.contains("correct") ||
        answer.classList.contains("used")
      ) {
        return;
      }

      const questionKey = drop.dataset.medicationKey;

      // The answer must belong to the exact medication record.
      // Matching by displayed text alone would be ambiguous.
      const answerKey = answer.dataset.medicationKey;

      if (questionKey === answerKey) {
        if (assignedQuestionKeys.has(questionKey)) return;

        assignedQuestionKeys.add(questionKey);

        drop.textContent = answer.textContent;
        drop.classList.remove("incorrect");
        drop.classList.add("correct");

        answer.classList.remove("selected");
        answer.classList.add("used");

        clearSelection();

        showFeedback("Correct!", true);

        onCorrect(item);

        const questions = getQuestions();

        if (assignedQuestionKeys.size === questions.length) {
          onComplete();
        }

        return;
      }

      drop.classList.remove("incorrect");
      void drop.offsetWidth;
      drop.classList.add("incorrect");

      showFeedback(
        getDirection() === "brand-to-generic"
          ? "Not quite — try another generic name."
          : "Not quite — try another brand.",
        false,
      );

      onIncorrect(item);
    }

    function reset() {
      clearSelection();
      assignedQuestionKeys.clear();
      showFeedback("");
    }

    function getCompletedCount() {
      return assignedQuestionKeys.size;
    }

    return {
      render,
      reset,
      showFeedback,
      getCompletedCount,
    };
  }

  window.createMatchingController = createMatchingController;
})();
