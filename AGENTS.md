# Agent Instructions for Quiz Apps

## Project Structure
This is a static vocabulary quiz and learning game collection with no build system. Each quiz folder contains HTML, CSS, and vanilla JavaScript files.

## Build/Test Commands
- **No build system** - open HTML files directly in browser for testing
- **Single test**: Open specific `index.html` or `learn.html` in browser
- **No package.json, npm scripts, or test framework** - manual testing only
- **Browser DevTools**: Use for debugging and console testing

## Code Style Guidelines

### JavaScript Classes & Architecture
- **ES6 classes**: `QuizApp` for quizzes, `PairingGame` for learning games
- **Constructor pattern**: `constructor() → initializeElements() → setupEventListeners() → updateDisplay()`
- **Method organization**: `startQuiz()`, `loadQuestion()`, `submitAnswer()`, `showFeedback()`
- **camelCase**: variables, methods, DOM element properties

### Variables & Functions
- **Use `const`/`let`**, avoid `var`
- **Arrow functions**: for event handlers `addEventListener('click', () => this.method())`
- **DOM elements**: Store as instance properties `this.questionText = document.getElementById('questionText')`
- **Array operations**: Use spread operator `[...array]` for copying

### Error Handling & Validation
- **Answer validation**: `question.acceptedAnswers.some(answer => answer.toLowerCase() === userAnswer.toLowerCase())`
- **Case-insensitive**: For vocabulary (not math), use `toLowerCase()` comparison
- **Input sanitization**: Trim whitespace, handle empty inputs
- **Enter key support**: Always implement for answer submission

### HTML Structure & Naming
- **Semantic HTML5**: `<header>`, `<main>`, `<section>`
- **BEM-like classes**: `.quiz-container`, `.question-text`, `.answer-input`, `.nav-link`
- **Navigation**: `<div class="top-navigation">` with 🏠 Main Menu and 🎮 Practice Game links
- **IDs**: camelCase for JavaScript references `questionText`, `answerInput`, `submitBtn`

### CSS & Responsive Design
- **Mobile-first**: `@media (max-width: 768px)` breakpoints
- **Color system**: Purple gradients (`#667eea`, `#764ba2`), green correct (`#10b981`), red incorrect (`#ef4444`)
- **Spacing**: 15px, 20px, 30px, 40px increments
- **Effects**: `transform: translateY(-2px)` hover, `transition: all 0.3s ease`
- **Layout**: CSS Grid `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`

### File Organization & Naming
- **Quiz files**: `index.html`, `script.js`, `styles.css`
- **Learning games**: `learn.html`, `learn-script.js`, `learn-styles.css`
- **Folder naming**: `words-[theme]-[date]` or `math/table-[number]/`
- **Consistent structure**: Each quiz needs both quiz and learning game versions

### Data Structures
- **Quiz questions**: `{question: "hungarian", answer: "english", acceptedAnswers: ["english", "alt1"]}`
- **Learning pairs**: `{hungarian: "hungarian", english: "english"}`
- **Inline data**: Embed directly in JavaScript files, no external JSON

Always create both quiz and learning game when adding new vocabulary sets. Follow exact patterns from existing code.