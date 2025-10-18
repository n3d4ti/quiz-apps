# Quiz App Creation Instructions

## Overview
This document provides step-by-step instructions for creating new vocabulary quiz apps when given a test date and vocabulary words.

## Required Information from User
- **Test date** (e.g., "October 25th, 2025")
- **Vocabulary list** in format: `hungarian_word → english_translation`

## Step-by-Step Process

### 1. Create Todo List
Use the TodoWrite tool to create the following tasks:
- [ ] Create new quiz folder structure
- [ ] Copy and modify HTML file
- [ ] Copy CSS file
- [ ] Create JavaScript file with vocabulary questions
- [ ] Add quiz card to main landing page
- [ ] Test the new quiz functionality

### 2. Create Folder Structure
Create a new folder using the pattern: `words-[descriptive-name]-[date]`
- **Examples**: 
  - `words-clothing-16-oct-2025`
  - `words-toys-20-oct-2025`
  - `words-kornyezet-angol-01`

### 3. Copy Base Files
Copy files from an existing quiz folder:

```bash
# Create new folder
mkdir words-[name]-[date]

# Copy files from existing quiz
cp words-16-oct-2025/index.html words-[name]-[date]/index.html
cp words-16-oct-2025/styles.css words-[name]-[date]/styles.css
```

### 4. Modify HTML File
Update the following elements in `index.html`:

#### Title and Headers
- `<title>` → `[Theme] Vocabulary Quiz`
- `<h1>` → `[Theme] Vocabulary`

#### Question Count
- Question counter: `Question 1 of [X]` (where X = number of vocabulary words)
- Final score display: `0/[X]`

#### Example Changes
```html
<!-- Before -->
<title>Quiz Application</title>
<h1>Quiz Application</h1>
<span id="questionCounter">Question 1 of 5</span>
<span class="score-value" id="finalScore">0/5</span>

<!-- After -->
<title>Food Vocabulary Quiz</title>
<h1>Food Vocabulary</h1>
<span id="questionCounter">Question 1 of 8</span>
<span class="score-value" id="finalScore">0/8</span>
```

### 5. Create JavaScript File
Create `script.js` with the quiz questions:

#### Template Structure
```javascript
class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "hungarian_word",
                answer: "english_translation",
                acceptedAnswers: ["english_translation", "alternative_1", "alternative_2"]
            },
            // ... more questions
        ];
        
        // Rest of the constructor remains the same
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    // Copy all other methods from existing quiz exactly as-is
}
```

#### AcceptedAnswers Guidelines
- Always include the main answer
- Add common variations (e.g., singular/plural)
- Include alternative phrasings where appropriate
- Examples:
  - `"lay eggs"` → `["lay eggs", "lays eggs"]`
  - `"look after"` → `["look after", "looks after", "take care", "takes care", "care for", "cares for"]`
  - `"one thousand"` → `["one thousand", "1000", "thousand"]`

### 6. Add Quiz Card to Landing Page
Add a new quiz card to `index.html` in the main directory:

#### Card Template
```html
<div class="quiz-card">
    <div class="card-header">
        <div class="card-icon">[EMOJI]</div>
        <div class="test-date">
            <span class="date-label">Test Date</span>
            <span class="date-value">[TEST_DATE]</span>
        </div>
    </div>
    
    <h3 class="card-title">[THEME] Vocabulary</h3>
    <p class="card-description">
        [Description of the vocabulary theme and what students will learn]
    </p>
    
    <div class="card-stats">
        <div class="stat-item">
            <span class="stat-number">[X]</span>
            <span class="stat-label">Vocabulary Words</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">Multiple</span>
            <span class="stat-label">Practice Rounds</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">Instant</span>
            <span class="stat-label">Feedback</span>
        </div>
    </div>
    
    <div class="card-features">
        <div class="feature-tag">✓ [Feature 1]</div>
        <div class="feature-tag">✓ [Feature 2]</div>
        <div class="feature-tag">✓ [Feature 3]</div>
        <div class="feature-tag">✓ [Feature 4]</div>
    </div>
    
    <a href="words-[name]-[date]/index.html" class="start-button">
        <span class="button-text">Start [Theme] Quiz</span>
        <span class="button-arrow">→</span>
    </a>
</div>
```

#### Icon Suggestions by Theme
- 👕 Clothing
- 🧸 Toys
- 🌿 Environment/Nature
- 🍎 Food
- 🏠 Home/House
- 🚗 Transportation
- 🎵 Music
- ⚽ Sports
- 📚 School/Education
- 👨‍👩‍👧‍👦 Family

#### Feature Tag Examples by Theme
- **Clothing**: Clothing Items, Accessories, Fashion Terms, Spelling Practice
- **Food**: Food Names, Cooking Terms, Meal Types, Nutrition Words
- **Transportation**: Vehicles, Travel Terms, Directions, Speed Terms
- **Home**: Room Names, Furniture, Household Items, Home Activities

### 7. CSS Verification
The existing CSS should handle any number of quiz cards automatically due to the grid layout:
```css
.quiz-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 30px;
}
```

No CSS changes needed unless special styling is required.

### 8. Testing Checklist
After creation, verify:
- [ ] Quiz loads without errors
- [ ] All questions display correctly
- [ ] Answer validation works
- [ ] Progress bar updates properly
- [ ] Final score calculation is correct
- [ ] Navigation between questions works
- [ ] Results page displays properly
- [ ] Link from landing page works

## File Structure Example
```
quiz-apps/
├── words-new-theme-date/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── index.html (main landing page)
├── landing-styles.css
└── [existing quiz folders]
```

## Quick Reference Commands
```bash
# Create new quiz folder
mkdir words-[theme]-[date]

# Copy base files
cp words-16-oct-2025/index.html words-[theme]-[date]/
cp words-16-oct-2025/styles.css words-[theme]-[date]/

# Edit files
# - Update HTML titles and question counts
# - Create JavaScript with vocabulary
# - Add card to main landing page
```

## Vocabulary Processing Tips
1. **Count words first** to determine question count
2. **Identify alternative answers** for flexible validation
3. **Consider Hungarian grammar** (singular/plural variations)
4. **Think about English alternatives** (synonyms, different phrasings)
5. **Test edge cases** (articles, prepositions, etc.)

## Common Patterns
- **Animals**: Include both specific and general terms
- **Verbs**: Consider tense variations (present/past)
- **Phrases**: Allow for different word orders where appropriate
- **Numbers**: Include both word and digit forms

## Error Prevention
- Always count vocabulary words correctly
- Test acceptedAnswers array thoroughly
- Verify file paths in HTML links
- Check that all IDs in HTML match JavaScript references
- Ensure responsive design works with additional cards