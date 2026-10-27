PROJECT: Medication Mastery — medication matching quiz

CURRENT STATUS

- New visual CSS design is in place.
- Drag-and-drop matching works.
- New Game and Back to Setup buttons are working.
- Two remaining UI issues: correct-answer highlight is too dim; results need a wrong-answer statistic and a Review Missed Answers section/button.

FILES RECEIVED

- js/scoring.js
- Main CSS, Parts 1–4 received so far.

SCORING.JS DETAILS

- Tracks score, answered, attempts, and accuracy.
- Tracks unique missed medications in a Map keyed by generic + brand.
- Exposes getMissedMedications(), getMissedCount(), hasMissedMedications(), clearMissedMedication(), beginReview(), and related functions.
- Updates #score, #answered, #accuracy, and #reviewMissedButton.
- Review button label is currently "Review Missed (N)".

RELEVANT CSS

- Answer states: .correct, .incorrect, .selected, .drag-over, .used
- Quiz statistics: .stats-grid, .stat-card, .stat-label, .stat-value
- Results statistics: .results-summary, .result-stat-card, .result-stat-label, .result-stat-value
- Missed-answer review: .review-panel, .missed-medication-list, .missed-medication-item, .missed-count-badge, .empty-state
- Completion buttons: .completion-actions

CURRENT CSS VARIABLES

- --success: #247b53
- --success-light: #e8f5ec
- .correct background currently uses var(--success-light), border #a7d5b6, text #1d6845.

NEXT STEPS

1. Receive remaining CSS parts.
2. Inspect HTML and JS for the results screen, review button, and review flow.
3. Strengthen correct-answer highlight without breaking drag-and-drop behavior.
4. Add/display wrong-answer statistics and restore missed-answer review UI.
5. Return precise code edits and test recommendations.

IMPORTANT

- Preserve working drag-and-drop, New Game, and Back to Setup behavior.
- Avoid rewriting large files unnecessarily; prefer targeted changes.
- Verify whether wrong-answer statistics should count incorrect attempts or unique medications missed.
