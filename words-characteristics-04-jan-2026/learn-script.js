class PairingGame {
    constructor() {
        // Characteristics vocabulary pairs
        this.wordPairs = [
            { english: "characteristics", hungarian: "tulajdonságok" },
            { english: "different", hungarian: "különböző" },
            { english: "common", hungarian: "közös" },
            { english: "use", hungarian: "használ" },
            { english: "sort", hungarian: "válogat" },
            { english: "sort into groups", hungarian: "csoportba sorol" },
            { english: "compare", hungarian: "összehasonlít" },
            { english: "put into the same group", hungarian: "ugyanabba a csoportba sorol" },
            { english: "also", hungarian: "is, szintén" },
            { english: "similar", hungarian: "hasonló" },
            { english: "fur", hungarian: "szőr" },
            { english: "feather", hungarian: "toll" }
        ];
        
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.matchedPairs = new Set();
        this.score = 0;
        this.startTime = null;
        this.gameInterval = null;
        
        this.initializeElements();
        this.setupGame();
        this.setupEventListeners();
    }
    
    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.progressFillElement = document.getElementById('progressFill');
        this.pairsLeftElement = document.getElementById('pairsLeft');
        this.englishWordsElement = document.getElementById('englishWords');
        this.hungarianWordsElement = document.getElementById('hungarianWords');
        this.gameAreaElement = document.getElementById('gameArea');
        this.completionMessageElement = document.getElementById('completionMessage');
        this.finalScoreElement = document.getElementById('finalScore');
        this.finalTimeElement = document.getElementById('finalTime');
        this.newGameBtnElement = document.getElementById('newGameBtn');
    }
    
    setupGame() {
        this.startTime = Date.now();
        this.score = 0;
        this.matchedPairs.clear();
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        
        this.createWordCards();
        this.updateDisplay();
        this.startTimer();
    }
    
    createWordCards() {
        // Clear existing cards
        this.englishWordsElement.innerHTML = '';
        this.hungarianWordsElement.innerHTML = '';
        
        // Create shuffled arrays
        const shuffledEnglish = [...this.wordPairs].sort(() => Math.random() - 0.5);
        const shuffledHungarian = [...this.wordPairs].sort(() => Math.random() - 0.5);
        
        // Create English word cards
        shuffledEnglish.forEach((pair, index) => {
            const card = this.createWordCard(pair.english, 'english', pair);
            this.englishWordsElement.appendChild(card);
        });
        
        // Create Hungarian word cards
        shuffledHungarian.forEach((pair, index) => {
            const card = this.createWordCard(pair.hungarian, 'hungarian', pair);
            this.hungarianWordsElement.appendChild(card);
        });
    }
    
    createWordCard(text, language, pairData) {
        const card = document.createElement('div');
        card.className = `word-card ${language}-card`;
        card.textContent = text;
        card.dataset.pairId = `${pairData.english}-${pairData.hungarian}`;
        card.dataset.language = language;
        
        card.addEventListener('click', () => this.handleCardClick(card, pairData, language));
        
        return card;
    }
    
    handleCardClick(card, pairData, language) {
        // Ignore clicks on already matched cards
        if (this.matchedPairs.has(pairData)) {
            return;
        }
        
        // Remove previous selections if clicking on the same language
        if (language === 'english') {
            if (this.selectedEnglish) {
                this.selectedEnglish.classList.remove('selected');
            }
            this.selectedEnglish = card;
            card.classList.add('selected');
        } else {
            if (this.selectedHungarian) {
                this.selectedHungarian.classList.remove('selected');
            }
            this.selectedHungarian = card;
            card.classList.add('selected');
        }
        
        // Check for match if both cards are selected
        if (this.selectedEnglish && this.selectedHungarian) {
            this.checkMatch();
        }
    }
    
    checkMatch() {
        const englishPairId = this.selectedEnglish.dataset.pairId;
        const hungarianPairId = this.selectedHungarian.dataset.pairId;
        
        if (englishPairId === hungarianPairId) {
            // Match found!
            this.handleCorrectMatch();
        } else {
            // No match
            this.handleIncorrectMatch();
        }
    }
    
    handleCorrectMatch() {
        // Find the pair data
        const pairId = this.selectedEnglish.dataset.pairId;
        const pairData = this.wordPairs.find(pair => 
            `${pair.english}-${pair.hungarian}` === pairId
        );
        
        // Add to matched pairs
        this.matchedPairs.add(pairData);
        
        // Mark cards as matched
        this.selectedEnglish.classList.remove('selected');
        this.selectedEnglish.classList.add('matched');
        this.selectedHungarian.classList.remove('selected');
        this.selectedHungarian.classList.add('matched');
        
        // Add success animation
        this.selectedEnglish.classList.add('match-animation');
        this.selectedHungarian.classList.add('match-animation');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.selectedEnglish.classList.remove('match-animation');
            this.selectedHungarian.classList.remove('match-animation');
        }, 600);
        
        // Update score
        this.score += 10;
        
        // Clear selections
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        
        // Update display
        this.updateDisplay();
        
        // Check if game is complete
        if (this.matchedPairs.size === this.wordPairs.length) {
            this.completeGame();
        }
    }
    
    handleIncorrectMatch() {
        // Add error animation
        this.selectedEnglish.classList.add('error-animation');
        this.selectedHungarian.classList.add('error-animation');
        
        // Remove selections and animations after delay
        setTimeout(() => {
            this.selectedEnglish.classList.remove('selected', 'error-animation');
            this.selectedHungarian.classList.remove('selected', 'error-animation');
            this.selectedEnglish = null;
            this.selectedHungarian = null;
        }, 800);
        
        // Subtract points for incorrect match
        this.score = Math.max(0, this.score - 2);
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        
        const remainingPairs = this.wordPairs.length - this.matchedPairs.size;
        this.pairsLeftElement.textContent = remainingPairs;
        
        const progress = (this.matchedPairs.size / this.wordPairs.length) * 100;
        this.progressFillElement.style.width = `${progress}%`;
    }
    
    startTimer() {
        this.gameInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            this.timerElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    completeGame() {
        // Stop timer
        clearInterval(this.gameInterval);
        
        // Calculate final time
        const totalTime = Date.now() - this.startTime;
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update completion message
        this.finalScoreElement.textContent = this.score;
        this.finalTimeElement.textContent = timeString;
        
        // Show completion message
        setTimeout(() => {
            this.gameAreaElement.style.display = 'none';
            this.completionMessageElement.style.display = 'block';
        }, 1000);
    }
    
    setupEventListeners() {
        this.newGameBtnElement.addEventListener('click', () => this.resetGame());
    }
    
    resetGame() {
        // Clear timer
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        
        // Reset game state
        this.matchedPairs.clear();
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        this.score = 0;
        
        // Hide completion message and show game area
        this.completionMessageElement.style.display = 'none';
        this.gameAreaElement.style.display = 'block';
        
        // Restart game
        this.setupGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});