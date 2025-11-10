class PairingGame {
    constructor() {
        this.vocabulary = [
            { hungarian: "életfolyamat", english: "life process" },
            { hungarian: "nélkül", english: "without" },
            { hungarian: "történik", english: "take place" },
            { hungarian: "táplálkozás", english: "nutrition" },
            { hungarian: "mozgás", english: "movement" },
            { hungarian: "növekedés", english: "growth" },
            { hungarian: "reagál a változásokra", english: "respond to changes" }
        ];
        
        this.cards = [];
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.gameStarted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeGame();
    }
    
    initializeElements() {
        this.cardsContainer = document.getElementById('cards-container');
        this.scoreElement = document.getElementById('score');
        this.pairsLeftElement = document.getElementById('pairs-left');
        this.messageElement = document.getElementById('message');
        this.restartBtn = document.getElementById('restart-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.completionScreen = document.getElementById('completion-screen');
        this.finalScoreElement = document.getElementById('final-score');
        this.playAgainBtn = document.getElementById('play-again-btn');
    }
    
    bindEvents() {
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
    }
    
    initializeGame() {
        this.createCards();
        this.shuffleCards();
        this.renderCards();
        this.updateDisplay();
        this.gameStarted = true;
    }
    
    createCards() {
        this.cards = [];
        
        this.vocabulary.forEach((pair, index) => {
            // Hungarian card
            this.cards.push({
                id: `hun-${index}`,
                text: pair.hungarian,
                language: 'hungarian',
                pairId: index,
                matched: false
            });
            
            // English card
            this.cards.push({
                id: `eng-${index}`,
                text: pair.english,
                language: 'english',
                pairId: index,
                matched: false
            });
        });
    }
    
    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    renderCards() {
        this.cardsContainer.innerHTML = '';
        
        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.language}`;
            cardElement.dataset.cardId = card.id;
            cardElement.dataset.pairId = card.pairId;
            cardElement.textContent = card.text;
            
            if (card.matched) {
                cardElement.classList.add('matched');
            }
            
            cardElement.addEventListener('click', () => this.selectCard(card, cardElement));
            this.cardsContainer.appendChild(cardElement);
        });
    }
    
    selectCard(card, cardElement) {
        if (!this.gameStarted || card.matched || cardElement.classList.contains('selected')) {
            return;
        }
        
        if (this.selectedCards.length >= 2) {
            this.clearSelection();
        }
        
        cardElement.classList.add('selected');
        this.selectedCards.push({ card, element: cardElement });
        
        if (this.selectedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 500);
        }
        
        this.clearMessage();
    }
    
    checkMatch() {
        const [first, second] = this.selectedCards;
        
        if (first.card.pairId === second.card.pairId && first.card.language !== second.card.language) {
            // Match found
            this.handleMatch();
        } else {
            // No match
            this.handleMismatch();
        }
    }
    
    handleMatch() {
        const [first, second] = this.selectedCards;
        
        first.element.classList.remove('selected');
        second.element.classList.remove('selected');
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        
        first.card.matched = true;
        second.card.matched = true;
        
        this.matchedPairs++;
        this.score += 10;
        
        this.showMessage('✅ Perfect match!', 'success');
        this.updateDisplay();
        
        if (this.matchedPairs === this.vocabulary.length) {
            setTimeout(() => this.gameCompleted(), 1000);
        }
        
        this.selectedCards = [];
    }
    
    handleMismatch() {
        this.showMessage('❌ Try again!', 'error');
        this.score = Math.max(0, this.score - 2);
        this.updateDisplay();
        
        setTimeout(() => {
            this.clearSelection();
        }, 1000);
    }
    
    clearSelection() {
        this.selectedCards.forEach(selected => {
            selected.element.classList.remove('selected');
        });
        this.selectedCards = [];
    }
    
    showHint() {
        if (this.selectedCards.length === 1) {
            const selectedCard = this.selectedCards[0].card;
            const matchingCard = this.cards.find(card => 
                card.pairId === selectedCard.pairId && 
                card.language !== selectedCard.language && 
                !card.matched
            );
            
            if (matchingCard) {
                const matchingElement = document.querySelector(`[data-card-id="${matchingCard.id}"]`);
                if (matchingElement) {
                    matchingElement.classList.add('hint');
                    setTimeout(() => {
                        matchingElement.classList.remove('hint');
                    }, 2000);
                    
                    this.score = Math.max(0, this.score - 1);
                    this.updateDisplay();
                    this.showMessage('💡 Hint: The highlighted card is the match!', 'info');
                }
            }
        } else {
            this.showMessage('💡 Select a card first to get a hint!', 'info');
        }
    }
    
    showMessage(text, type = '') {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;
        this.messageElement.style.display = 'block';
    }
    
    clearMessage() {
        this.messageElement.style.display = 'none';
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.pairsLeftElement.textContent = this.vocabulary.length - this.matchedPairs;
    }
    
    gameCompleted() {
        this.gameStarted = false;
        this.finalScoreElement.textContent = this.score;
        this.completionScreen.style.display = 'block';
    }
    
    restartGame() {
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.gameStarted = false;
        this.completionScreen.style.display = 'none';
        
        this.initializeGame();
        this.clearMessage();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});