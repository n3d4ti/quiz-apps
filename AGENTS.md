# Agent Instructions for Quiz Apps

## Overview
This repository contains educational quiz applications built with vanilla HTML, CSS, and JavaScript. The codebase includes word/vocabulary quizzes and math multiplication table quizzes, each with both quiz and interactive learning game modes.

## Build/Test Commands
- **No build system**: Static HTML/CSS/JavaScript - no npm, webpack, or dependencies
- **Technology stack**: Vanilla JavaScript ES6+, HTML5, CSS3 - no external frameworks
- **Testing**: Open `index.html` or `learn.html` directly in browser
- **Single test**: Navigate to specific quiz folder (e.g., `words-activities-26-nov-2025/index.html`)
- **Development tools**: Use browser DevTools console for debugging
- **Validation**: Check HTML structure balance, verify all div tags have matching open/close pairs
- **Local storage**: Some apps use localStorage for progress tracking

```bash
# Test main landing page
open index.html

# Test specific word quiz
open words-activities-26-nov-2025/index.html

# Test learning game
open words-activities-26-nov-2025/learn.html

# Test math quiz
open math/table-5/index.html
```

## Project Structure
```
quiz-apps/
├── math/
│   ├── table-[1-12]/          # Individual multiplication tables
│   ├── learn-[easy|medium|hard|mixed]/  # Learning modes
│   └── mixed-tables/          # Combined practice
├── words-[theme]-[date]/      # Vocabulary quizzes
│   ├── index.html            # Main quiz
│   ├── script.js            # Quiz logic  
│   ├── styles.css           # Quiz styling
│   ├── learn.html           # Learning game
│   ├── learn-script.js      # Learning game logic
│   └── learn-styles.css     # Learning game styling
├── index.html               # Landing page
└── AGENTS.md               # This file
```

## Code Architecture Patterns

### JavaScript Class Structure
All applications use ES6 classes following this consistent pattern:

```javascript
class QuizApp {
    constructor() {
        // 1. Initialize data properties
        this.questions = [...];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        // 2. Required initialization sequence
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        // Store DOM elements as instance properties
        this.questionText = document.getElementById('questionText');
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        // ... all DOM elements cached here
    }
    
    setupEventListeners() {
        // Use arrow functions to maintain 'this' context
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
    }
}
```

### Learning Game Structure (PairingGame)
```javascript
class PairingGame {
    constructor() {
        this.wordPairs = [...];
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs = new Set();
        this.score = 0;
        
        this.initializeElements();
        this.setupGame();
        this.setupEventListeners();
    }
}
```

## Naming Conventions

### Folder Names
- **Word quizzes**: `words-[theme]-[date]` format (e.g., `words-activities-26-nov-2025`)
- **Math quizzes**: `math/table-[number]/` or `math/learn-[level]/`
- **Themes**: activities, bodyparts, environment-biology, present-continuous, etc.

### File Names (Standardized)
- `index.html` - Main quiz application
- `script.js` - Quiz logic
- `styles.css` - Quiz styling
- `learn.html` - Learning/pairing game
- `learn-script.js` - Learning game logic
- `learn-styles.css` - Learning game styling

### CSS Classes (BEM-like)
- `.quiz-container`, `.question-text`, `.answer-input`, `.submit-btn`
- `.learning-card`, `.word-card`, `.english-words`, `.hungarian-words`
- `.progress-bar`, `.progress-fill`, `.quiz-info`, `.top-navigation`
- `.feedback`, `.results-container`, `.completion-message`

### JavaScript IDs (camelCase)
- `questionText`, `answerInput`, `submitBtn`, `progressFill`
- `scoreElement`, `timerElement`, `newGameBtn`, `restartBtn`
- `questionCounter`, `resultsContainer`, `finalScore`

### Variable Names
- Use descriptive camelCase: `currentQuestionIndex`, `matchedPairs`, `userAnswers`
- Boolean properties: `quizStarted`, `isCorrect`
- Collections: Use plural forms (`questions`, `wordPairs`, `acceptedAnswers`)

## Data Structures

### Quiz Questions Format
```javascript
{
    question: "hungarian_text",
    answer: "primary_english_answer",
    acceptedAnswers: ["primary", "alternative1", "alternative2"]
}
```

### Learning Game Pairs Format
```javascript
{
    english: "english_translation",
    hungarian: "hungarian_original"
}
```

### Math Questions Format
```javascript
{ 
    question: "5 × 7 = ?", 
    answer: "35", 
    acceptedAnswers: ["35"] 
}
```

## Code Style Guidelines

### JavaScript ES6+ Requirements
- **Classes only**: Use ES6 class syntax, avoid function constructors
- **Variable declarations**: `const` and `let` only, never `var`
- **Arrow functions**: For event handlers and callbacks to maintain `this` context
- **Template literals**: Use backticks for string interpolation
- **Modern array methods**: `.map()`, `.filter()`, `.some()`, `.forEach()`
- **Destructuring**: When appropriate for cleaner code

### Event Handling Patterns
```javascript
// REQUIRED: Enter key support for all input fields
this.answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        this.submitAnswer();
    }
});

// Arrow functions maintain 'this' context
this.submitBtn.addEventListener('click', () => this.submitAnswer());
```

### Validation Patterns
```javascript
// Case-insensitive validation (REQUIRED)
const isCorrect = question.acceptedAnswers.some(answer => 
    answer.toLowerCase() === userAnswer.toLowerCase()
);

// Empty input validation (REQUIRED)
if (!userAnswer.trim()) {
    this.showFeedback('Please enter an answer!', false);
    return;
}
```

### Error Handling Standards
- Always validate user input with `.trim()`
- Provide clear feedback via `.feedback` elements
- Use try-catch for localStorage operations
- Check for null/undefined DOM elements after initialization

### Progress Tracking Pattern
```javascript
// Progress calculation (REQUIRED for quiz apps)
const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
this.progressFill.style.width = `${progress}%`;

// Score tracking with feedback
if (isCorrect) {
    this.score++;
    this.showFeedback('Correct! Well done!', true);
} else {
    this.showFeedback(`Incorrect. The correct answer is: ${question.answer}`, false);
}
```

## Styling Standards

### Color Schemes
- **Word quizzes**: Purple gradients (`#667eea`, `#764ba2`)
- **Math quizzes**: Orange/red gradients (`#f59e0b`, `#dc2626`)
- **Success states**: Green (`#10b981`)
- **Error states**: Red (`#ef4444`)
- **Backgrounds**: Light gradients or solid colors

### Typography Requirements
- **Font family**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- **Responsive font sizes**: Use `clamp()` or `em`/`rem` units
- **Font weights**: 400 (normal), 600 (semi-bold), 700 (bold)

### Layout Patterns
```css
/* CSS Grid for responsive layouts */
.word-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* Flexbox for components */
.quiz-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

### Responsive Design (REQUIRED)
```css
@media (max-width: 768px) {
    .answer-container {
        flex-direction: column;
    }
    
    .quiz-info {
        flex-direction: column;
        gap: 10px;
    }
    
    .word-card {
        min-height: 60px;
        font-size: 14px;
    }
}
```

### Animation Standards
```css
/* Hover effects */
.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Transitions */
.word-card, .submit-btn {
    transition: all 0.3s ease;
}

/* Progress animations */
.progress-fill {
    transition: width 0.5s ease-in-out;
}
```

## HTML Structure Requirements

### Navigation (REQUIRED)
```html
<div class="top-navigation">
    <a href="../index.html" class="nav-link">🏠 Main Menu</a>
    <a href="learn.html" class="nav-link">🎮 Practice Game</a>
</div>
```

### Quiz Structure
```html
<div class="quiz-container">
    <div class="quiz-info">
        <span id="questionCounter">Question 1 of 10</span>
        <span id="score">Score: 0/0</span>
    </div>
    <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
    </div>
    <!-- Question content -->
</div>
```

### Structure Validation
- **CRITICAL**: Every opening `<div>` must have a matching closing `</div>`
- Use consistent indentation (2 or 4 spaces)
- Include proper semantic HTML5 elements
- Ensure all IDs are unique and follow camelCase convention

## Requirements Checklist
- [ ] Create both quiz (`index.html`) and learning game (`learn.html`) versions
- [ ] Implement Enter key support for all input fields
- [ ] Include top navigation with Main Menu and Practice Game links
- [ ] Use case-insensitive answer validation
- [ ] Provide immediate feedback for correct/incorrect answers
- [ ] Implement progress bar with percentage calculation
- [ ] Include responsive design for mobile devices
- [ ] Maintain consistent color scheme per quiz type
- [ ] Store DOM elements as class instance properties
- [ ] Use arrow functions for all event handlers
- [ ] Validate HTML structure balance (equal open/close div tags)

## Testing Checklist
- [ ] Quiz loads without console errors
- [ ] All buttons respond correctly
- [ ] Enter key submits answers
- [ ] Navigation links work properly
- [ ] Progress bar updates correctly
- [ ] Responsive design works on mobile
- [ ] Score calculation is accurate
- [ ] Learning game pairing functions correctly
- [ ] Timer (if present) works properly
- [ ] LocalStorage (if used) persists data correctly

## Common Issues to Avoid
- Missing `this` context in event handlers (use arrow functions)
- Unbalanced HTML div tags causing layout issues
- Missing Enter key support for input fields
- Case-sensitive answer validation
- Broken navigation links between quiz and learning modes
- Non-responsive design on mobile devices
- Inconsistent naming conventions across files
- Missing error handling for empty inputs