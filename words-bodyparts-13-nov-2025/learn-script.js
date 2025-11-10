class PairingGame {
    constructor() {
        this.wordPairs = [
            { hungarian: "lábujjak", english: "toes" },
            { hungarian: "fog", english: "tooth" },
            { hungarian: "fogak", english: "teeth" },
            { hungarian: "lábfej", english: "foot" },
            { hungarian: "lábfejek", english: "feet" },
            { hungarian: "has", english: "stomach" },
            { hungarian: "boka", english: "ankle" }
        ];
        
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.timeElapsed = 0;
        this.gameTimer = null;
        this.gameStarted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.createCards();
        this.startTimer();
    }
    
    initializeElements() {
        this.hungarianContainer = document.getElementById('hungarian-cards');
        this.englishContainer = document.getElementById('english-cards');
        this.scoreElement = document.getElementById('score');
        this.timeElement = document.getElementById('time');
        this.shuffleBtn = document.getElementById('shuffle-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.gameResults = document.getElementById('game-results');
        this.finalScore = document.getElementById('final-score');
        this.finalTime = document.getElementById('final-time');
        this.playAgainBtn = document.getElementById('play-again-btn');
    }
    
    bindEvents() {
        this.shuffleBtn.addEventListener('click', () => this.shuffleCards());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
    }
    
    createCards() {
        // Clear containers
        this.hungarianContainer.innerHTML = '';
        this.englishContainer.innerHTML = '';
        
        // Create shuffled arrays
        const shuffledHungarian = this.shuffleArray([...this.wordPairs]);
        const shuffledEnglish = this.shuffleArray([...this.wordPairs]);
        
        // Create Hungarian cards
        shuffledHungarian.forEach((pair, index) => {
            const card = this.createCard(pair.hungarian, 'hungarian', index);
            this.hungarianContainer.appendChild(card);
        });
        
        // Create English cards
        shuffledEnglish.forEach((pair, index) => {
            const card = this.createCard(pair.english, 'english', index);
            this.englishContainer.appendChild(card);
        });
    }
    
    createCard(text, language, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = text;
        card.dataset.text = text;
        card.dataset.language = language;
        card.dataset.index = index;
        
        card.addEventListener('click', () => this.selectCard(card));
        
        return card;
    }
    
    selectCard(card) {
        if (!this.gameStarted) {
            this.gameStarted = true;
        }
        
        // Don't select if already matched or already selected
        if (card.classList.contains('matched') || card.classList.contains('selected')) {
            return;
        }
        
        // If we already have 2 cards selected, deselect all
        if (this.selectedCards.length >= 2) {
            this.deselectAllCards();
        }
        
        card.classList.add('selected');
        this.selectedCards.push(card);
        
        if (this.selectedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 500);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.selectedCards;
        const text1 = card1.dataset.text;
        const text2 = card2.dataset.text;
        
        // Find if these texts form a valid pair
        const isMatch = this.wordPairs.some(pair => 
            (pair.hungarian === text1 && pair.english === text2) ||
            (pair.english === text1 && pair.hungarian === text2)
        );
        
        if (isMatch) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            
            this.matchedPairs++;
            this.score += 10;
            this.updateScore();
            
            // Check if game is complete
            if (this.matchedPairs === this.wordPairs.length) {
                this.gameComplete();
            }
        } else {
            // No match
            card1.classList.add('no-match');
            card2.classList.add('no-match');
            
            setTimeout(() => {
                card1.classList.remove('selected', 'no-match');
                card2.classList.remove('selected', 'no-match');
            }, 1000);
        }
        
        this.selectedCards = [];
    }
    
    deselectAllCards() {
        this.selectedCards.forEach(card => {
            card.classList.remove('selected');
        });
        this.selectedCards = [];
    }
    
    shuffleCards() {
        this.deselectAllCards();
        this.createCards();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    startTimer() {
        this.gameTimer = setInterval(() => {
            if (this.gameStarted) {
                this.timeElapsed++;
                this.timeElement.textContent = this.timeElapsed;
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }
    
    gameComplete() {
        this.stopTimer();
        this.finalScore.textContent = this.score;
        this.finalTime.textContent = this.timeElapsed;
        
        setTimeout(() => {
            this.gameResults.style.display = 'block';
        }, 1000);
    }
    
    resetGame() {
        this.stopTimer();
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.timeElapsed = 0;
        this.gameStarted = false;
        
        this.updateScore();
        this.timeElement.textContent = '0';
        this.gameResults.style.display = 'none';
        
        this.createCards();
        this.startTimer();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});