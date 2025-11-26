# Agent Instructions for Quiz Apps

## Build/Test Commands
- **No build system**: Static HTML/CSS/JavaScript - no npm, webpack, or dependencies
- **Testing**: Open `index.html` or `learn.html` directly in browser, use DevTools console for debugging
- **Single test**: Open specific quiz folder (e.g., `words-activities-26-nov-2025/index.html`) in browser
- **Validation**: Check HTML structure with DevTools, verify all div tags balanced

## Code Style Guidelines
- **JavaScript**: ES6 classes (`QuizApp`, `PairingGame`), `const`/`let` only, arrow functions for event handlers
- **Architecture**: `constructor() → initializeElements() → setupEventListeners() → updateDisplay()`
- **DOM Elements**: Store as instance properties: `this.questionText = document.getElementById('questionText')`
- **Validation**: Case-insensitive: `question.acceptedAnswers.some(answer => answer.toLowerCase() === userAnswer.toLowerCase())`
- **Data Structure**: `{question: "magyar", answer: "english", acceptedAnswers: ["english", "alt1", "alt2"]}`
- **Error Handling**: Check empty inputs with `trim()`, provide user feedback via `.feedback` element

## Naming Conventions
- **Folders**: `words-[theme]-[date]` (e.g., `words-activities-26-nov-2025`) or `math/table-[number]/`
- **CSS Classes**: BEM-like `.quiz-container`, `.question-text`, `.answer-input`, `.learning-card`
- **IDs**: camelCase (`questionText`, `answerInput`, `submitBtn`, `progressFill`)
- **Files**: Standard pattern - `index.html`, `script.js`, `styles.css`, `learn.html`, `learn-script.js`, `learn-styles.css`

## Styling Standards
- **Colors**: Purple gradients (`#667eea`, `#764ba2`), success green (`#10b981`), error red (`#ef4444`)
- **Responsive**: `@media (max-width: 768px)`, CSS Grid `repeat(auto-fit, minmax(300px, 1fr))`
- **Animations**: `transform: translateY(-2px)` hover effects, `transition: all 0.3s ease`
- **Typography**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

## Requirements
- Always create both quiz (`index.html`) and learning game (`learn.html`) versions
- Implement Enter key support: `addEventListener('keypress', (e) => { if (e.key === 'Enter') submitAnswer(); })`
- Include navigation: `<div class="top-navigation">` with 🏠 Main Menu and 🎮 Practice Game links
- Maintain HTML structure balance - verify equal opening/closing div tags