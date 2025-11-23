# Agent Instructions for Quiz Apps

## Project Structure & Testing
- Static HTML/CSS/JavaScript quiz collection - no build system or dependencies
- **Testing**: Open `index.html` or `learn.html` directly in browser, use DevTools for debugging
- **File structure**: Each quiz folder has `index.html`, `script.js`, `styles.css` + learning game versions

## Code Standards
- **JavaScript**: ES6 classes (`QuizApp`, `PairingGame`), `const`/`let`, arrow functions for events
- **Architecture**: `constructor() → initializeElements() → setupEventListeners() → updateDisplay()`
- **DOM**: Store elements as instance properties: `this.questionText = document.getElementById('questionText')`
- **Validation**: Case-insensitive for vocabulary: `question.acceptedAnswers.some(answer => answer.toLowerCase() === userAnswer.toLowerCase())`
- **Data**: Inline arrays: `{question: "hungarian", answer: "english", acceptedAnswers: ["english", "alt1"]}`

## Naming & Structure
- **Folders**: `words-[theme]-[date]` or `math/table-[number]/`
- **Classes**: `.quiz-container`, `.question-text`, `.answer-input` (BEM-like)
- **IDs**: camelCase (`questionText`, `answerInput`, `submitBtn`)
- **Navigation**: `<div class="top-navigation">` with 🏠 Main Menu and 🎮 Practice Game links

## Styling
- **Colors**: Purple gradients (`#667eea`, `#764ba2`), green correct (`#10b981`), red incorrect (`#ef4444`)
- **Responsive**: `@media (max-width: 768px)`, CSS Grid with `repeat(auto-fit, minmax(300px, 1fr))`
- **Effects**: `transform: translateY(-2px)` hover, `transition: all 0.3s ease`

## Requirements
- Always create both quiz (`index.html`) and learning game (`learn.html`) versions
- Implement Enter key support for answer submission
- Trim whitespace, handle empty inputs
- Follow exact patterns from existing code