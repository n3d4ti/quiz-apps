class PairingGame {
    constructor() {
        this.wordPairs = [
            { english: "go straight", hungarian: "menj egyenesen" },
            { english: "turn right", hungarian: "fordulj jobbra" },
            { english: "don't turn left", hungarian: "ne fordulj balra" },
            { english: "stop here", hungarian: "állj meg itt" },
            { english: "cross the street here", hungarian: "menj át itt" },
            { english: "put your seatbelt on", hungarian: "kösd be az övet" }
        ];
        
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs = new Set();
        this.score = 0;
        this.attempts = 0;
        
        this.initializeElements();
        this.setupGame();
        this.setupEventListeners();
    }
    
    initializeElements() {
        this.scoreValue = document.getElementById('scoreValue');
        this.pairsLeft = document.getElementById('pairsLeft');
        this.hungarianWords = document.getElementById('hungarianWords');
        this.englishWords = document.getElementById('englishWords');
        this.gameFeedback = document.getElementById('gameFeedback');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.showAllBtn = document.getElementById('showAllBtn');
        this.completionMessage = document.getElementById('completionMessage');
        this.finalScore = document.getElementById('finalScore');
        this.playAgainBtn = document.getElementById('playAgainBtn');
    }
    
    setupEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.resetGame());
        this.showAllBtn.addEventListener('click', () => this.showAllPairs());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
    }
    
    setupGame() {
        this.createWordCards();
        this.updateDisplay();
    }
    
    createWordCards() {
        // Clear existing cards
        this.hungarianWords.innerHTML = '';
        this.englishWords.innerHTML = '';
        
        // Shuffle arrays to randomize positions
        const shuffledHungarian = [...this.wordPairs].sort(() => Math.random() - 0.5);
        const shuffledEnglish = [...this.wordPairs].sort(() => Math.random() - 0.5);
        
        // Create Hungarian word cards
        shuffledHungarian.forEach((pair, index) => {
            const card = this.createWordCard(pair.hungarian, 'hungarian', index);
            this.hungarianWords.appendChild(card);
        });
        
        // Create English word cards
        shuffledEnglish.forEach((pair, index) => {
            const card = this.createWordCard(pair.english, 'english', index);
            this.englishWords.appendChild(card);
        });
    }
    
    createWordCard(text, language, index) {
        const card = document.createElement('div');
        card.className = `word-card ${language}-card`;
        card.textContent = text;
        card.dataset.text = text;
        card.dataset.language = language;
        
        card.addEventListener('click', () => this.selectCard(card, text, language));
        
        return card;
    }
    
    selectCard(cardElement, text, language) {
        // Don't allow selection of already matched cards
        if (this.matchedPairs.has(text)) return;
        
        // Clear previous selections if clicking the same type
        if (language === 'english') {
            this.clearSelection('english');
            this.selectedEnglish = { element: cardElement, text: text };
            cardElement.classList.add('selected');
        } else {
            this.clearSelection('hungarian');
            this.selectedHungarian = { element: cardElement, text: text };
            cardElement.classList.add('selected');
        }
        
        // Check for match if both cards are selected
        if (this.selectedEnglish && this.selectedHungarian) {
            setTimeout(() => this.checkMatch(), 500);
        }
    }
    
    clearSelection(language) {
        if (language === 'english' && this.selectedEnglish) {
            this.selectedEnglish.element.classList.remove('selected');
            this.selectedEnglish = null;
        } else if (language === 'hungarian' && this.selectedHungarian) {
            this.selectedHungarian.element.classList.remove('selected');
            this.selectedHungarian = null;
        }
    }
    
    checkMatch() {
        this.attempts++;
        
        const isMatch = this.wordPairs.some(pair => 
            pair.english === this.selectedEnglish.text && 
            pair.hungarian === this.selectedHungarian.text
        );
        
        if (isMatch) {
            // Correct match
            this.selectedEnglish.element.classList.remove('selected');
            this.selectedHungarian.element.classList.remove('selected');
            this.selectedEnglish.element.classList.add('matched');
            this.selectedHungarian.element.classList.add('matched');
            
            this.matchedPairs.add(this.selectedEnglish.text);
            this.matchedPairs.add(this.selectedHungarian.text);
            
            this.score += 10;
            this.showFeedback('Perfect match! 🎉', 'success');
            
            // Check if game is complete
            if (this.matchedPairs.size === this.wordPairs.length * 2) {
                setTimeout(() => this.showCompletion(), 1000);
            }
        } else {
            // Incorrect match
            this.selectedEnglish.element.classList.add('incorrect');
            this.selectedHungarian.element.classList.add('incorrect');
            
            this.showFeedback('Not quite right, try again! 🤔', 'error');
            
            // Remove incorrect styling after a delay
            setTimeout(() => {
                this.selectedEnglish.element.classList.remove('incorrect');
                this.selectedHungarian.element.classList.remove('incorrect');
            }, 1000);
        }
        
        // Clear selections
        this.clearSelection('english');
        this.clearSelection('hungarian');
        
        this.updateDisplay();
    }
    
    showFeedback(message, type) {
        this.gameFeedback.textContent = message;
        this.gameFeedback.className = `game-feedback ${type}`;
        
        // Clear feedback after 3 seconds
        setTimeout(() => {
            this.gameFeedback.textContent = '';
            this.gameFeedback.className = 'game-feedback';
        }, 3000);
    }
    
    showAllPairs() {
        let pairsList = 'Traffic Direction Pairs:\n\n';
        this.wordPairs.forEach(pair => {
            pairsList += `${pair.hungarian} → ${pair.english}\n`;
        });
        alert(pairsList);
    }
    
    showCompletion() {
        const accuracy = Math.round((this.wordPairs.length / this.attempts) * 100);
        const bonusPoints = accuracy > 80 ? 20 : accuracy > 60 ? 10 : 0;
        this.score += bonusPoints;
        
        this.finalScore.textContent = this.score;
        this.completionMessage.style.display = 'block';
        
        // Scroll to completion message
        this.completionMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    resetGame() {
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs.clear();
        this.score = 0;
        this.attempts = 0;
        
        this.completionMessage.style.display = 'none';
        this.gameFeedback.textContent = '';
        this.gameFeedback.className = 'game-feedback';
        
        this.setupGame();
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    updateDisplay() {
        this.scoreValue.textContent = this.score;
        this.pairsLeft.textContent = this.wordPairs.length - (this.matchedPairs.size / 2);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});