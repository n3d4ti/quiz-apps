class PairingGame {
    constructor() {
        // Activities vocabulary pairs
        this.wordPairs = [
            { english: "she is planting a tree", hungarian: "Fát ültet" },
            { english: "I am feeding the fish", hungarian: "halat etetek" },
            { english: "he is fishing", hungarian: "pecázik" },
            { english: "they are eating", hungarian: "esznek" },
            { english: "he is drinking water", hungarian: "vizet iszik" },
            { english: "it is flying", hungarian: "repül" },
            { english: "he is watering the flowers", hungarian: "virágokat locsol" },
            { english: "help", hungarian: "segít" },
            { english: "child", hungarian: "gyerek" },
            { english: "children", hungarian: "gyerekek" },
            { english: "balloon", hungarian: "lufi" },
            { english: "she is making a cake", hungarian: "tortát készít" }
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
        
        // Shuffle arrays for random order
        const shuffledEnglish = [...this.wordPairs].sort(() => Math.random() - 0.5);
        const shuffledHungarian = [...this.wordPairs].sort(() => Math.random() - 0.5);
        
        // Create English word cards
        shuffledEnglish.forEach((pair, index) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = pair.english;
            card.dataset.word = pair.english;
            card.dataset.pair = pair.hungarian;
            card.addEventListener('click', () => this.selectEnglishWord(card));
            this.englishWordsElement.appendChild(card);
        });
        
        // Create Hungarian word cards
        shuffledHungarian.forEach((pair, index) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = pair.hungarian;
            card.dataset.word = pair.hungarian;
            card.dataset.pair = pair.english;
            card.addEventListener('click', () => this.selectHungarianWord(card));
            this.hungarianWordsElement.appendChild(card);
        });
    }
    
    selectEnglishWord(card) {
        if (card.classList.contains('matched')) return;
        
        // Clear previous selection
        document.querySelectorAll('.word-card.selected').forEach(c => {
            if (c.dataset.word !== card.dataset.word) {
                c.classList.remove('selected');
            }
        });
        
        if (this.selectedEnglish === card) {
            // Deselect if clicking the same card
            card.classList.remove('selected');
            this.selectedEnglish = null;
        } else {
            // Select new card
            this.selectedEnglish = card;
            card.classList.add('selected');
            
            // Check for match if Hungarian word is also selected
            if (this.selectedHungarian) {
                this.checkMatch();
            }
        }
    }
    
    selectHungarianWord(card) {
        if (card.classList.contains('matched')) return;
        
        // Clear previous selection
        document.querySelectorAll('.word-card.selected').forEach(c => {
            if (c.dataset.word !== card.dataset.word) {
                c.classList.remove('selected');
            }
        });
        
        if (this.selectedHungarian === card) {
            // Deselect if clicking the same card
            card.classList.remove('selected');
            this.selectedHungarian = null;
        } else {
            // Select new card
            this.selectedHungarian = card;
            card.classList.add('selected');
            
            // Check for match if English word is also selected
            if (this.selectedEnglish) {
                this.checkMatch();
            }
        }
    }
    
    checkMatch() {
        const englishWord = this.selectedEnglish.dataset.word;
        const hungarianWord = this.selectedHungarian.dataset.word;
        const englishPair = this.selectedEnglish.dataset.pair;
        const hungarianPair = this.selectedHungarian.dataset.pair;
        
        if (englishPair === hungarianWord && hungarianPair === englishWord) {
            // Correct match!
            this.handleCorrectMatch();
        } else {
            // Wrong match
            this.handleWrongMatch();
        }
    }
    
    handleCorrectMatch() {
        const englishCard = this.selectedEnglish;
        const hungarianCard = this.selectedHungarian;
        
        // Mark as matched
        englishCard.classList.remove('selected');
        hungarianCard.classList.remove('selected');
        englishCard.classList.add('matched');
        hungarianCard.classList.add('matched');
        
        // Add to matched pairs
        this.matchedPairs.add(englishCard.dataset.word);
        
        // Update score
        this.score += 10;
        
        // Clear selections
        this.selectedEnglish = null;
        this.selectedHungarian = null;
        
        // Update display
        this.updateDisplay();
        
        // Check if game is complete
        if (this.matchedPairs.size === this.wordPairs.length) {
            setTimeout(() => this.completeGame(), 500);
        }
    }
    
    handleWrongMatch() {
        const englishCard = this.selectedEnglish;
        const hungarianCard = this.selectedHungarian;
        
        // Show wrong animation
        englishCard.classList.add('wrong');
        hungarianCard.classList.add('wrong');
        
        // Remove wrong class and selection after animation
        setTimeout(() => {
            englishCard.classList.remove('wrong', 'selected');
            hungarianCard.classList.remove('wrong', 'selected');
            
            // Clear selections
            this.selectedEnglish = null;
            this.selectedHungarian = null;
        }, 500);
        
        // Deduct score (minimum 0)
        this.score = Math.max(0, this.score - 2);
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.pairsLeftElement.textContent = this.wordPairs.length - this.matchedPairs.size;
        
        const progress = (this.matchedPairs.size / this.wordPairs.length) * 100;
        this.progressFillElement.style.width = `${progress}%`;
    }
    
    startTimer() {
        this.gameInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    completeGame() {
        clearInterval(this.gameInterval);
        
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        this.finalScoreElement.textContent = this.score;
        this.finalTimeElement.textContent = timeString;
        
        this.gameAreaElement.style.display = 'none';
        this.completionMessageElement.classList.add('show');
    }
    
    setupEventListeners() {
        this.newGameBtnElement.addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    resetGame() {
        clearInterval(this.gameInterval);
        this.gameAreaElement.style.display = 'grid';
        this.completionMessageElement.classList.remove('show');
        this.setupGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});