# Agent Instructions for Quiz Apps

## Project Structure
This is a static vocabulary quiz and learning game collection with no build system. Each quiz folder contains HTML, CSS, and vanilla JavaScript files.

## Build/Test Commands
No build system - open HTML files directly in browser for testing. No package.json, no npm scripts, no test framework.

## Code Style Guidelines

### JavaScript
- ES6 classes for main application logic (QuizApp, PairingGame)
- camelCase for variables and methods
- Use `const`/`let`, avoid `var`
- Arrow functions for event handlers
- DOM elements stored as instance properties (this.questionText, etc.)
- Event listeners with arrow functions: `addEventListener('click', () => this.method())`
- Initialize all DOM elements in `initializeElements()` method
- Separate event binding in `bindEvents()` method
- Use spread operator for array copying: `[...array]`

### HTML
- Semantic HTML5 elements
- BEM-like class naming: `.quiz-container`, `.question-text`, `.answer-input`
- Navigation structure: `<div class="top-navigation">` with 🏠 Main Menu and 🎮 Practice Game links
- Consistent ID naming for JavaScript references

### CSS
- Mobile-first responsive design with `@media` queries
- CSS variables for consistent theming
- Smooth transitions and hover effects
- Grid/flexbox for layouts

### File Organization
- Quiz files: `index.html`, `script.js`, `styles.css`
- Learning game files: `learn.html`, `learn-script.js`, `learn-styles.css`
- Folder naming: `words-[theme]-[date]` format

### Vocabulary Data Structure
Quiz questions: `{question: "hungarian", answer: "english", acceptedAnswers: ["english", "alt1"]}`
Learning pairs: `{hungarian: "hungarian", english: "english"}`

Always create both quiz and learning game when adding new vocabulary sets.