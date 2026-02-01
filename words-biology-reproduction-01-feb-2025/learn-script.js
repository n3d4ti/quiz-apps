class PairingGame {
    constructor() {
        // Word pairs data
        this.wordPairs = [
            {
                english: "adult",
                hungarian: "felnőtt"
            },
            {
                english: "give birth",
                hungarian: "elevenen szül"
            },
            {
                english: "through the skin",
                hungarian: "bőrön keresztül"
            },
            {
                english: "egg",
                hungarian: "pete, ikra"
            },
            {
                english: "lay eggs",
                hungarian: "petét, ikrát rak"
            }
        ];

        // Game state
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs = new Set();
        this.score = 0;
        this.startTime = null;
        this.gameCompleted = false;
        this.attempts = 0;
        this.correctMatches = 0;
        this.wrongAttempts = 0;

        // Initialize game
        this.initializeElements();
        this.setupGame();
        this.setupEventListeners();
        this.startTimer();
    }

    initializeElements() {
        // Cache DOM elements
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.progressText = document.getElementById('progressText');
        this.progressFill = document.getElementById('progressFill');
        this.hungarianCards = document.getElementById('hungarianCards');
        this.englishCards = document.getElementById('englishCards');
        this.gameContent = document.getElementById('gameContent');
        this.completionContainer = document.getElementById('completionContainer');
        this.finalStats = document.getElementById('finalStats');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.hintBtn = document.getElementById('hintBtn');
        this.hintModal = document.getElementById('hintModal');
        this.hintContent = document.getElementById('hintContent');
        this.closeHintBtn = document.getElementById('closeHintBtn');
    }

    setupEventListeners() {
        // Action buttons
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.closeHintBtn.addEventListener('click', () => this.closeHint());

        // Modal click outside to close
        this.hintModal.addEventListener('click', (e) => {
            if (e.target === this.hintModal) {
                this.closeHint();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeHint();
            }
        });
    }

    setupGame() {
        this.clearSelections();
        this.shuffleArrays();
        this.createWordCards();
        this.updateDisplay();
        this.startTime = Date.now();
    }

    shuffleArrays() {
        // Create separate arrays for shuffling
        this.shuffledHungarian = [...this.wordPairs].sort(() => Math.random() - 0.5);
        this.shuffledEnglish = [...this.wordPairs].sort(() => Math.random() - 0.5);
    }

    createWordCards() {
        // Clear existing cards
        this.hungarianCards.innerHTML = '';
        this.englishCards.innerHTML = '';

        // Create Hungarian cards
        this.shuffledHungarian.forEach((pair, index) => {
            const card = this.createCard(pair.hungarian, 'hungarian', index);
            this.hungarianCards.appendChild(card);
        });

        // Create English cards
        this.shuffledEnglish.forEach((pair, index) => {
            const card = this.createCard(pair.english, 'english', index);
            this.englishCards.appendChild(card);
        });
    }

    createCard(text, type, index) {
        const card = document.createElement('div');
        card.className = `word-card ${type}-card`;
        card.textContent = text;
        card.dataset.word = text;
        card.dataset.type = type;
        card.dataset.index = index;

        // Add click event listener
        card.addEventListener('click', () => this.selectCard(card, type, text));

        return card;
    }

    selectCard(cardElement, type, word) {
        // Ignore clicks on already matched cards
        if (this.matchedPairs.has(word) || this.gameCompleted) {
            return;
        }

        if (type === 'hungarian') {
            this.selectHungarianCard(cardElement, word);
        } else {
            this.selectEnglishCard(cardElement, word);
        }

        // Check for match if both cards are selected
        if (this.selectedHungarian && this.selectedEnglish) {
            setTimeout(() => this.checkMatch(), 300);
        }
    }

    selectHungarianCard(cardElement, word) {
        // Clear previous Hungarian selection
        this.clearHungarianSelection();

        // Select new card
        this.selectedHungarian = word;
        cardElement.classList.add('selected');
    }

    selectEnglishCard(cardElement, word) {
        // Clear previous English selection
        this.clearEnglishSelection();

        // Select new card
        this.selectedEnglish = word;
        cardElement.classList.add('selected');
    }

    clearHungarianSelection() {
        const previousSelected = document.querySelector('.hungarian-card.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        this.selectedHungarian = null;
    }

    clearEnglishSelection() {
        const previousSelected = document.querySelector('.english-card.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        this.selectedEnglish = null;
    }

    clearSelections() {
        this.clearHungarianSelection();
        this.clearEnglishSelection();
    }

    checkMatch() {
        const hungarianCard = document.querySelector(`[data-word="${this.selectedHungarian}"].hungarian-card`);
        const englishCard = document.querySelector(`[data-word="${this.selectedEnglish}"].english-card`);

        // Find matching pair
        const matchingPair = this.wordPairs.find(pair => 
            pair.hungarian === this.selectedHungarian && pair.english === this.selectedEnglish
        );

        this.attempts++;

        if (matchingPair) {
            // Correct match
            this.handleCorrectMatch(hungarianCard, englishCard);
        } else {
            // Wrong match
            this.handleWrongMatch(hungarianCard, englishCard);
        }

        // Clear selections
        this.clearSelections();
        this.updateDisplay();

        // Check if game is completed
        if (this.matchedPairs.size === this.wordPairs.length * 2) {
            setTimeout(() => this.completeGame(), 500);
        }
    }

    handleCorrectMatch(hungarianCard, englishCard) {
        this.correctMatches++;
        this.score += 10;

        // Add matched pairs to set
        this.matchedPairs.add(this.selectedHungarian);
        this.matchedPairs.add(this.selectedEnglish);

        // Add matched class with animation
        hungarianCard.classList.remove('selected');
        englishCard.classList.remove('selected');
        hungarianCard.classList.add('matched');
        englishCard.classList.add('matched');

        // Add success animation
        this.addSuccessAnimation(hungarianCard);
        this.addSuccessAnimation(englishCard);
    }

    handleWrongMatch(hungarianCard, englishCard) {
        this.wrongAttempts++;
        this.score = Math.max(0, this.score - 2); // Don't go below 0

        // Add wrong animation
        hungarianCard.classList.add('wrong');
        englishCard.classList.add('wrong');

        // Remove wrong class after animation
        setTimeout(() => {
            hungarianCard.classList.remove('wrong', 'selected');
            englishCard.classList.remove('wrong', 'selected');
        }, 600);
    }

    addSuccessAnimation(card) {
        card.style.transform = 'scale(1.1)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 300);
    }

    updateDisplay() {
        // Update score
        this.scoreElement.textContent = this.score;

        // Update progress
        const matchedCount = this.matchedPairs.size / 2; // Divide by 2 since each pair adds 2 items to set
        this.progressText.textContent = `${matchedCount}/${this.wordPairs.length}`;

        // Update progress bar
        const progress = (matchedCount / this.wordPairs.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.gameCompleted) {
                const elapsed = Date.now() - this.startTime;
                const minutes = Math.floor(elapsed / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    completeGame() {
        this.gameCompleted = true;
        this.stopTimer();

        const finalTime = Date.now() - this.startTime;
        const minutes = Math.floor(finalTime / 60000);
        const seconds = Math.floor((finalTime % 60000) / 1000);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Calculate accuracy
        const accuracy = this.attempts > 0 ? Math.round((this.correctMatches / this.attempts) * 100) : 100;

        // Show completion screen
        this.gameContent.style.display = 'none';
        this.completionContainer.style.display = 'block';

        // Display final statistics
        this.finalStats.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">Final Score:</span>
                <span class="stat-value">${this.score} points</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Time:</span>
                <span class="stat-value">${timeString}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Accuracy:</span>
                <span class="stat-value">${accuracy}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Attempts:</span>
                <span class="stat-value">${this.attempts}</span>
            </div>
            <div class="performance-message">
                ${this.getPerformanceMessage(accuracy, finalTime)}
            </div>
        `;
    }

    getPerformanceMessage(accuracy, time) {
        const timeInSeconds = time / 1000;
        
        if (accuracy >= 90 && timeInSeconds <= 30) {
            return "🌟 Excellent! Perfect accuracy and great speed!";
        } else if (accuracy >= 80 && timeInSeconds <= 60) {
            return "🎉 Great job! Very good performance!";
        } else if (accuracy >= 70) {
            return "👍 Good work! Keep practicing!";
        } else if (accuracy >= 50) {
            return "📚 Not bad! More practice will help!";
        } else {
            return "💪 Keep trying! Practice makes perfect!";
        }
    }

    showHint() {
        if (this.selectedHungarian && !this.selectedEnglish) {
            // Show English translation for selected Hungarian word
            const pair = this.wordPairs.find(p => p.hungarian === this.selectedHungarian);
            if (pair) {
                this.hintContent.innerHTML = `
                    <p><strong>Hungarian:</strong> ${this.selectedHungarian}</p>
                    <p><strong>English:</strong> ${pair.english}</p>
                    <p>Now click on the English card to make the match!</p>
                `;
            }
        } else if (this.selectedEnglish && !this.selectedHungarian) {
            // Show Hungarian translation for selected English word
            const pair = this.wordPairs.find(p => p.english === this.selectedEnglish);
            if (pair) {
                this.hintContent.innerHTML = `
                    <p><strong>English:</strong> ${this.selectedEnglish}</p>
                    <p><strong>Hungarian:</strong> ${pair.hungarian}</p>
                    <p>Now click on the Hungarian card to make the match!</p>
                `;
            }
        } else {
            this.hintContent.innerHTML = `
                <h4>How to play:</h4>
                <ul>
                    <li>Click on a Hungarian word first</li>
                    <li>Then click on its English translation</li>
                    <li>Correct matches earn +10 points</li>
                    <li>Wrong attempts lose -2 points</li>
                    <li>Match all pairs to complete the game!</li>
                </ul>
            `;
        }
        
        this.hintModal.style.display = 'flex';
    }

    closeHint() {
        this.hintModal.style.display = 'none';
    }

    restartGame() {
        // Reset game state
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs = new Set();
        this.score = 0;
        this.gameCompleted = false;
        this.attempts = 0;
        this.correctMatches = 0;
        this.wrongAttempts = 0;

        // Reset UI
        this.gameContent.style.display = 'block';
        this.completionContainer.style.display = 'none';
        this.closeHint();

        // Stop existing timer
        this.stopTimer();

        // Setup new game
        this.setupGame();
        this.startTimer();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});