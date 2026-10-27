Project Handoff Sheet — Brand vs Generic Quiz

Last updated: October 11, 2026
Project: Brand vs Generic Medication Quiz
Status: Active development; optional timer implementation provided, pending verification in the actual project files.

1. Project Overview

A browser-based medication matching quiz built with HTML, CSS, and vanilla JavaScript.

The purpose is to help users learn brand-name and generic medication pairs, with medication categories, randomized questions, reverse quiz mode, scoring, and a review system for missed medications.

The user prefers:

Simple, practical enhancements.
Minimal disruption to existing working functionality.
Clear, exact code changes and instructions specifying where each change belongs.
Keeping the existing visual style.
Session-only storage where possible, without databases or backend services. 2. Current Project Structure
brand-generic-quiz/
├── index.html
├── styles.css
├── general-drugs.js
├── oncology-drugs.js
├── diabetes-drugs.js
├── antibiotics-drugs.js
├── cardiology-drugs.js
└── psychiatry-drugs.js

Responsibilities
index.html: Page markup and main quiz JavaScript.
styles.css: All visual styling and responsive layout.
Each \*-drugs.js file: Medication data for its category.

CSS was moved from the HTML into styles.css. The quiz JavaScript has not yet been moved into its own app.js file.

3. Existing Quiz Features
   Six medication categories, including General Medications.
   Configurable question counts: 10, 20, 50, 100, and 200.
   Normal and reverse quiz modes.
   Randomized questions and independently randomized answers.
   Drag-and-drop support on desktop.
   Tap-to-select and tap-to-answer support on touch devices.
   Correct answers highlighted in green.
   Used answers grayed out.
   Incorrect-answer feedback with a shake animation.
   Score, answered count, and accuracy.
   Quiz completion screen.
   Reset and New Quiz controls.
   Automatic scrolling during desktop drag operations.
4. Current Three-Column Layout

The quiz uses a three-column matching list.

Question: Generic medication in normal mode; brand name in reverse mode.
Your Answer: The destination drop zone.
Answer Bank: A shared list of randomized answers.

Each answer appears once in the answer bank. Correctly used answers become grayed out, and correct destinations turn green.

The three columns are retained on mobile devices, with narrower padding and font sizes.

Important CSS classes include:

.quiz-grid
.column
.column-heading
.generic
.drop-zone
.drop-zone.correct
.drop-zone.incorrect
.brand
.brand.used
.brand.selected 5. Missed-Medication Review Feature

A session-only review system was added conceptually and code changes were provided.

Intended behavior
A Review Missed (N) button shows the number of missed medications.
Incorrect answers add the medication to a temporary Map.
Duplicate mistakes do not create duplicate entries.
New regular quizzes preserve the missed-medication list.
Review quizzes contain only medications still on the missed list.
A medication is removed only when answered correctly on its first attempt in a review round.
If a medication is missed during review, it remains on the list.
Review mode supports normal and reverse quiz directions.
Refreshing or closing the page clears the list.
Important state variables
let missedMedications = new Map();
let reviewMode = false;
let reviewFirstAttempt = new Set();

The medication key is built from the generic and brand names:

function medicationKey(item) {
return `${item.generic}|||${item.brand}`;
}

Important review functions
updateReviewButton()
startReviewQuiz()
checkAnswer()
newQuiz()
resetQuiz()
toggleQuizMode()

The review feature was implemented through suggested replacements and additions. The actual local files have not been inspected, so verify their current contents before making further changes.

6. Optional Timer — Most Recent Enhancement

An optional countdown timer was requested with these requirements:

Default duration: 10 minutes.
Checkbox to enable or disable the timer.
Visible countdown in the statistics area.
Subtle pulsing red background glow during the final 10 seconds.
End the quiz at zero, prevent further answers, and show the final score.
Work with normal and reverse modes.
Work with Review Missed.
Reset should restart the selected duration.
New Quiz should start a fresh countdown.
Switching quiz direction should preserve remaining time.
Completing a quiz early should stop the timer and remove the warning effect.
Timer controls added to the proposed HTML

A checkbox with ID timerEnabled, calling handleTimerSettingChange(), and a duration selector with ID timerDuration.

Available duration options:

1 minute
2 minutes
5 minutes
10 minutes, selected by default

The visible timer uses IDs:

timerStat
timerDisplay

The checkbox is initially unchecked.

Timer state variables proposed
let timerInterval = null;
let timerDeadline = null;
let remainingTimeMs = null;
let quizExpired = false;
let quizFinished = false;

Timer functions proposed
selectedDurationMs()
stopQuizTimer()
renderTimer()
startQuizTimer()
handleTimerSettingChange()
expireQuiz()

The timer uses a deadline-based countdown rather than assuming each interval runs exactly on schedule.

Timer CSS proposed

Added to the bottom of styles.css:

.timer-setting
.timer-stat
.timer-stat.urgent
body.timer-warning
@keyframes timerGlow
Reduced-motion handling
Functions proposed for replacement or modification
newQuiz()
startReviewQuiz()
checkAnswer()
finishQuiz()
resetQuiz()
toggleQuizMode()

The timer changes were supplied as code snippets, but they have not been tested against the actual project files.

7. Important Verification Items

Priority: Test the timer and review feature together before adding more features.

Potential integration issues to check:

Review eligibility: Confirm that a medication missed during review cannot be removed merely by resetting or switching quiz direction.
Timer preservation: Confirm toggleQuizMode() preserves the remaining time correctly. Check that the regular-mode branch does not accidentally reset the question set or timer more than intended.
Enabling/disabling the timer: Verify that disabling the timer while running clears the warning and that re-enabling starts the expected duration.
Time expiration: Ensure the timeout prevents both drag-and-drop and tap-based answers from being submitted.
Completion: Ensure finishQuiz() can run only once, stops the timer, and displays the final score.
Reset behavior: Confirm Reset restores the current quiz without accidentally erasing the missed-medication list.
Category changes: Confirm switching categories starts a fresh quiz and resets the timer appropriately.
Timer duration changes: Confirm changing the duration during a quiz does not silently produce an unexpected countdown.
Answer-bank behavior: Confirm each answer remains associated with its intended medication and that randomized answers are not duplicated.
Browser behavior: Check mobile devices and desktop browsers, including when a tab is backgrounded.
Known scoring limitation

The current accuracy calculation is based on correctly answered questions divided by answered questions. Incorrect attempts are not included in the denominator, so a user who guesses repeatedly can still finish with 100% accuracy.

This is a known improvement opportunity, not a blocker for the timer.

8. Recommended Next Steps
   First: Stabilize the current implementation
   Review the actual index.html and styles.css.
   Confirm the timer and review code are integrated without duplicate function definitions.
   Test the timer, review flow, reset behavior, reverse mode, and quiz completion.
   Fix any integration problems before adding new features.
   Second: Small, useful improvements

Potential next features:

Progress bar showing quiz completion.
First-attempt accuracy and incorrect-attempt tracking.
End-of-quiz summary of missed medications.
Option to retry missed questions immediately.
Optional dark mode.

Keep additions incremental and avoid introducing frameworks or external dependencies.

Third: Consider a JavaScript refactor

Once the quiz is stable, move the main inline JavaScript from index.html into app.js.

The intended structure would then be:

brand-generic-quiz/
├── index.html
├── styles.css
├── app.js
├── general-drugs.js
├── oncology-drugs.js
├── diabetes-drugs.js
├── antibiotics-drugs.js
├── cardiology-drugs.js
└── psychiatry-drugs.js

This is optional and should be a separate step.

9. Instructions for Resuming Work

When continuing this project:

Ask the user to provide the current index.html, styles.css, and any relevant medication data files if the exact current code is not available.
Inspect the existing code before proposing further replacements.
Preserve the three-column layout and existing CSS behavior.
Keep session-only review tracking unless the user explicitly requests persistence.
Prefer small, complete, copy-ready changes.
Avoid replacing a function without checking the current version and its dependencies.
Clearly distinguish code that has been proposed from code that has actually been tested.

Immediate next task: Verify and stabilize the optional timer together with the Review Missed feature before proceeding to additional enhancements.
