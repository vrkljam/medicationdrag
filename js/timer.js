/*
 * ============================================================
 * TIMER CONTROLLER
 * File: js/timer.js
 *
 * Responsibilities:
 * - Countdown timer
 * - Count-up timer
 * - Timer display and warning styles
 * - Timer cleanup
 *
 * Does NOT:
 * - Prepare or rebuild quizzes
 * - Change scores
 * - Track medication answers
 * - End a quiz directly
 *
 * The application supplies an onExpire callback to decide
 * what happens when a countdown reaches zero.
 * ============================================================
 */

(function () {
  "use strict";

  function createTimerController(options = {}) {
    const onExpire =
      typeof options.onExpire === "function" ? options.onExpire : () => {};

    const elements = {
      duration: document.getElementById("timerDuration"),
      countdown: document.getElementById("timer"),
      countdownStat: document.getElementById("timerStatus"),
      elapsed: document.getElementById("timer"),
      stopButton: document.getElementById("stopElapsedButton"),
      durationLabel: document.getElementById("timerDurationLabel"),
      displayLabel: document.getElementById("timerDisplayLabel"),
    };

    const selectedMode = document.querySelector(
      'input[name="timerChoice"]:checked',
    );

    let mode = selectedMode?.value || "off";

    let quizActive = false;
    let quizOver = false;

    let intervalId = null;
    let deadline = null;

    let remainingMs = null;
    let elapsedMs = 0;
    let elapsedStart = null;

    let countdownExpired = false;
    let countUpStopped = false;

    function getDurationMs() {
      const seconds = Number(elements.duration?.value || 120);

      return Math.max(0, seconds) * 1000;
    }

    function formatTime(milliseconds, roundUp = false) {
      const totalSeconds = Math.max(
        0,
        roundUp
          ? Math.ceil(milliseconds / 1000)
          : Math.floor(milliseconds / 1000),
      );

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(
          seconds,
        ).padStart(2, "0")}`;
      }

      return `${Math.floor(totalSeconds / 60)}:${String(seconds).padStart(
        2,
        "0",
      )}`;
    }

    function clearIntervalIfRunning() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function clearWarning() {
      elements.countdownStat?.classList.remove("urgent");
      document.body.classList.remove("timer-warning");
    }

    function render() {
      if (elements.durationLabel) {
        elements.durationLabel.style.display =
          mode === "countdown" ? "" : "none";
      }

      if (elements.displayLabel) {
        elements.displayLabel.textContent =
          mode === "countdown"
            ? "Time remaining"
            : mode === "countup"
              ? "Time elapsed"
              : "Timer";
      }

      if (mode === "off") {
        if (elements.countdown) {
          elements.countdown.textContent = "Off";
        }

        if (elements.countdownStat) {
          elements.countdownStat.textContent = "No timer selected";
        }

        clearWarning();
      } else if (mode === "countdown") {
        const displayedMs =
          remainingMs === null ? getDurationMs() : remainingMs;

        if (elements.countdown) {
          elements.countdown.textContent = formatTime(displayedMs, true);
        }

        if (elements.countdownStat) {
          elements.countdownStat.textContent = !quizActive
            ? "Ready when you are"
            : quizOver
              ? "Quiz finished"
              : countdownExpired
                ? "Time is up"
                : "Countdown running";
        }

        const urgent =
          quizActive &&
          !quizOver &&
          !countdownExpired &&
          displayedMs > 0 &&
          displayedMs <= 10000;

        elements.countdownStat?.classList.toggle("urgent", urgent);
        document.body.classList.toggle("timer-warning", urgent);
      } else {
        if (elements.countdown) {
          elements.countdown.textContent = formatTime(elapsedMs);
        }

        if (elements.countdownStat) {
          elements.countdownStat.textContent = !quizActive
            ? "Ready when you are"
            : quizOver
              ? "Quiz finished"
              : countUpStopped
                ? "Timer paused"
                : "Counting up";
        }

        clearWarning();
      }

      if (elements.stopButton) {
        const showButton = mode === "countup" && quizActive && !quizOver;

        elements.stopButton.hidden = !showButton;
        elements.stopButton.disabled = false;
        elements.stopButton.textContent = countUpStopped
          ? "Resume timer"
          : "Pause timer";
      }
    }

    function updateCountdown() {
      if (mode !== "countdown" || deadline === null) {
        return;
      }

      remainingMs = Math.max(0, deadline - Date.now());

      if (remainingMs === 0) {
        clearIntervalIfRunning();
        deadline = null;
        countdownExpired = true;

        render();

        // The application decides how to finish the quiz.
        onExpire();
        return;
      }

      render();
    }

    function updateCountUp() {
      if (mode !== "countup" || elapsedStart === null || countUpStopped) {
        return;
      }

      elapsedMs = Date.now() - elapsedStart;

      render();
    }

    function startSelectedClock() {
      clearIntervalIfRunning();

      if (!quizActive || quizOver) {
        render();
        return;
      }

      if (mode === "off") {
        render();
        return;
      }

      if (mode === "countdown") {
        if (countdownExpired) {
          render();
          return;
        }

        if (remainingMs === null) {
          remainingMs = getDurationMs();
        }

        deadline = Date.now() + remainingMs;

        intervalId = setInterval(updateCountdown, 200);

        render();
        return;
      }

      if (mode === "countup") {
        if (countUpStopped) {
          render();
          return;
        }

        elapsedStart = Date.now() - elapsedMs;

        intervalId = setInterval(updateCountUp, 200);

        render();
      }
    }

    /*
     * Called explicitly when START QUIZ is pressed.
     * Preparing a quiz never starts a clock.
     */
    function start() {
      if (quizActive || quizOver) {
        return;
      }

      quizActive = true;
      countdownExpired = false;
      countUpStopped = false;

      elapsedMs = 0;
      elapsedStart = null;

      remainingMs = mode === "countdown" ? getDurationMs() : null;

      startSelectedClock();
    }

    /*
     * Stop the running interval without ending the quiz.
     */
    function stop() {
      if (mode === "countup" && elapsedStart !== null && !countUpStopped) {
        elapsedMs = Date.now() - elapsedStart;
        elapsedStart = null;
        countUpStopped = true;
      }

      if (mode === "countdown" && deadline !== null) {
        remainingMs = Math.max(0, deadline - Date.now());
        deadline = null;
      }

      clearIntervalIfRunning();
      render();
    }

    /*
     * Specifically freezes the count-up clock.
     * It does not stop the quiz or affect scoring.
     */
    function stopCountUp() {
      if (mode !== "countup" || !quizActive || quizOver) {
        return;
      }

      if (countUpStopped) {
        countUpStopped = false;
        elapsedStart = Date.now() - elapsedMs;
        startSelectedClock();
      } else {
        stop();
      }

      render();
    }

    /*
     * Changing modes during an active quiz switches clocks
     * immediately:
     * - Off: no clock runs.
     * - Countdown: starts a fresh selected duration.
     * - Count-Up: starts at zero.
     *
     * A stopped count-up clock remains stopped until the user
     * explicitly switches modes or starts a new quiz.
     */
    function setMode(nextMode) {
      if (!["off", "countdown", "countup"].includes(nextMode)) {
        return;
      }

      clearIntervalIfRunning();

      mode = nextMode;

      deadline = null;
      elapsedStart = null;
      remainingMs = null;
      elapsedMs = 0;

      countUpStopped = false;
      countdownExpired = false;

      if (mode === "countdown") {
        remainingMs = getDurationMs();
      }

      if (quizActive && !quizOver) {
        startSelectedClock();
      } else {
        render();
      }
    }

    /*
     * Changing the duration updates the prepared countdown.
     * During a running countdown, the current deadline remains
     * unchanged until the next mode switch or new quiz.
     */
    function setDuration() {
      if (mode !== "countdown") {
        render();
        return;
      }

      if (!quizActive || quizOver || intervalId === null) {
        remainingMs = getDurationMs();
        render();
      }
    }

    /*
     * End timer activity without changing the quiz itself.
     */
    function finish() {
      if (mode === "countdown" && deadline !== null) {
        remainingMs = Math.max(0, deadline - Date.now());
      }

      if (mode === "countup" && elapsedStart !== null) {
        elapsedMs = Date.now() - elapsedStart;
      }

      clearIntervalIfRunning();

      deadline = null;
      elapsedStart = null;

      quizActive = false;
      quizOver = true;

      clearWarning();
      render();
    }

    /*
     * Reset timer state for a new or reset quiz.
     * Does not start any clock.
     */
    function reset() {
      clearIntervalIfRunning();

      quizActive = false;
      quizOver = false;
      countdownExpired = false;
      countUpStopped = false;

      deadline = null;
      elapsedStart = null;

      elapsedMs = 0;
      remainingMs = mode === "countdown" ? getDurationMs() : null;

      clearWarning();
      render();
    }

    /*
     * Refreshes the display without starting a clock.
     */
    function refresh() {
      render();
    }

    render();

    return {
      start,
      stop,
      stopCountUp,
      setMode,
      setDuration,
      finish,
      reset,
      refresh,
    };
  }

  // Expose one factory for app.js to initialize.
  window.createTimerController = createTimerController;
})();
