HANDOFF SHEET — Brand vs. Generic Medication Quiz

1. Project overview

I'm rebuilding and reorganizing an existing Brand vs. Generic Medication Quiz.

The application currently uses plain HTML, CSS, and JavaScript. Keep that approach; do not introduce a framework unless there is a compelling reason.

Primary goal: Refactor the existing application into clearly organized JavaScript modules while preserving the current design, medication databases, and existing functionality.

The game includes medication matching, scoring, timers, multiple quiz directions, and missed-question review.

2. Current progress

All six medication database files have been supplied in the previous conversation:

general-drugs.js
Array: generalMedicationData
oncology-drugs.js
Array: oncologyMedicationData
diabetes-drugs.js
Array: diabetesMedicationData
antibiotics-drugs.js
Array: antibioticsMedicationData
cardiology-drugs.js
Array: cardiologyMedicationData
psychiatry-drugs.js
Array: psychiatryMedicationData

Each database contains records in this general format:

{ generic: "generic name", brand: "Brand Name" }

The full contents were supplied in the previous conversation. They are not reproduced in this handoff sheet. Ask me to provide a file again if its exact contents are needed.

Important: Do not recreate, replace, or simplify these databases from memory. Preserve the actual source records when implementing the project.

3. Agreed application architecture

The proposed project structure is:

brand-vs-generic/
├── index.html
├── styles.css
├── js/
│ ├── app.js
│ ├── quiz.js
│ ├── timer.js
│ ├── matching.js
│ ├── scoring.js
│ └── categories.js
└── data/
├── general-drugs.js
├── oncology-drugs.js
├── diabetes-drugs.js
├── antibiotics-drugs.js
├── cardiology-drugs.js
└── psychiatry-drugs.js

This is the target organization, not a completed implementation. Existing filenames and compatibility requirements should be checked before changing them.

Responsibilities:

app.js: Initialization, event wiring, and coordination between modules.
quiz.js: Quiz preparation, validation, question selection, shuffling, and game flow.
timer.js: Independent countdown, count-up, and stopped-timer behavior.
matching.js: Drag-and-drop, mobile tapping, answer checking, and matching feedback.
scoring.js: Correct-answer counts, accuracy, missed medications, and review tracking.
categories.js: Category definitions, labels, colors, symbols, and category-specific presentation.
data/\*.js: Existing medication records.

Use a simple architecture that works with the existing application. Do not split code into files merely for the sake of having more files.

4. Features to preserve
   Six medication categories:
   General Medications
   Oncology
   Diabetes
   Antibiotics
   Cardiology
   Psychiatry
   Existing category colors and symbols.
   Both quiz directions:
   Generic → Brand
   Brand → Generic
   Question-count options: 10, 20, 50, 100, and 200.
   Clear handling when a category has fewer available medications than requested.
   Drag-and-drop matching and mobile tapping.
   Duplicate-assignment prevention and clear incorrect-answer feedback.
   Scoring, completed-question counts, accuracy, and final results.
   Review Missed functionality.
   The ability to play again without stale game or timer state.
   Existing interface and visual design wherever practical.
5. Timer requirements

The timer must be independent of quiz preparation and scoring.

Timer modes

Off

No clock runs.
The countdown display indicates Off.

Countdown

Counts down from the selected duration.
Define and implement the intended expiration behavior.
Clarify whether pausing or stopping is supported.

Count-Up

Measures elapsed time starting at zero.
The elapsed clock is the only clock that runs.
The countdown display indicates Off.
Stopping freezes the displayed time.
Answering questions cannot restart a stopped timer.
Required timer behavior
Pressing START QUIZ is the explicit point at which the timer starts, if the selected mode requires a timer.
Preparing or rebuilding a quiz must never start a timer.
Stopping a timer must not rebuild the quiz.
Finish, reset, and new-game actions must clean up timer intervals.
Switching timer modes during an active game must follow a deliberate, documented rule.
Calculate elapsed or remaining time using actual timestamps, not assumptions about interval frequency.
Decide whether stopping the timer leaves the quiz active. Prefer separating clock state from quiz state so stopping the clock does not automatically end the game. 6. Data integrity and validation

Preserve intentional overlaps between categories. The Antibiotics database, for example, intentionally overlaps with General Medications.

Some entries share a generic name but have different brands. Examples include:

Diabetes: regular insulin → Humulin R and regular insulin → Novolin R.
Diabetes: NPH insulin → Humulin N and NPH insulin → Novolin N.
Psychiatry: doxepin → Sinequan and doxepin → Silenor.
Cardiology: metoprolol → Lopressor and metoprolol succinate → Toprol-XL.

Do not automatically remove records simply because their generic names repeat.

During implementation:

Validate records and required fields.
Detect exact duplicate records separately from legitimate multiple-brand entries.
Avoid ambiguous questions when a generic name maps to multiple brands.
Define how the quiz handles multiple valid answers.
Ensure scoring follows the answer-validation rules.
Do not make unverified medication corrections silently. Flag questionable records for review. 7. Implementation stages

Proceed in this order:

Audit the existing application.
Inspect HTML IDs, CSS selectors, script loading, and event handlers.
Inspect the six medication files and their data formats.
Establish a single authoritative game state.
Implement and test the independent timer controller.
Implement quiz preparation and validation.
Reconnect matching, scoring, and missed-question review.
Reconnect the interface and category presentation.
Test the full user journey, including reset, replay, timer expiration, early stopping, and both quiz directions.
Check for console errors, broken controls, missing data, and stale state.

Avoid rewriting the entire application before inspecting the current code. Preserve working behavior wherever possible.

8. Current stopping point — NEXT ACTION

The next file I need to provide is my existing index.html.

The assistant should inspect it before asking for the next file. Then request styles.css and the existing application JavaScript files in a sensible order.

The actual application files have not yet been reviewed in this conversation. The proposed architecture is a plan, not a finished codebase.

9. Instructions for the next conversation

Continue from this handoff rather than starting the project over.

Ask me to paste index.html first.
Work through the files one at a time.
Do not ask me to resend the six medication databases unless the actual contents are necessary.
Do not claim files have been created, tested, or saved unless that has actually happened.
Once the existing code has been reviewed, help me implement the refactor in complete, clearly labeled files.
Explain exactly where each file belongs and how the HTML should load the scripts.
Prefer reliable, maintainable code over unnecessary complexity.
Preserve existing functionality and avoid silently changing medication records.
Keep the timer independent from quiz preparation, matching, and scoring.

First message to send after reading this handoff:
"Let's continue with the audit. Please paste your current index.html so I can identify the existing elements, controls, and JavaScript dependencies before we make changes."
