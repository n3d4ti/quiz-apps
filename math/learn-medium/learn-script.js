class PairingGame {
    constructor() {
        // Medium tables (5-8) - mix of multiplication and division
        this.mathPairs = [
            { problem: '5 × 2', answer: '10' },
            { problem: '5 × 3', answer: '15' },
            { problem: '5 × 6', answer: '30' },
            { problem: '5 × 8', answer: '40' },
            { problem: '6 × 3', answer: '18' },
            { problem: '6 × 4', answer: '24' },
            { problem: '6 × 6', answer: '36' },
            { problem: '6 × 7', answer: '42' },
            { problem: '7 × 3', answer: '21' },
            { problem: '7 × 4', answer: '28' },
            { problem: '7 × 6', answer: '42' },
            { problem: '7 × 8', answer: '56' },
            { problem: '8 × 3', answer: '24' },
            { problem: '8 × 4', answer: '32' },
            { problem: '8 × 6', answer: '48' },
            { problem: '8 × 7', answer: '56' }
        ];
        
        this.selectedProblem = null;
        this.selectedAnswer = null;
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
        this.problemWordsElement = document.getElementById('problemWords');
        this.answerWordsElement = document.getElementById('answerWords');
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
        this.selectedProblem = null;
        this.selectedAnswer = null;
        
        this.createWordCards();
        this.updateDisplay();
        this.startTimer();
        
        // Show game area and hide completion message
        this.gameAreaElement.style.display = 'grid';
        this.completionMessageElement.style.display = 'none';
    }
    
    createWordCards() {
        // Shuffle the arrays
        const shuffledProblems = [...this.mathPairs].sort(() => Math.random() - 0.5);
        const shuffledAnswers = [...this.mathPairs].sort(() => Math.random() - 0.5);
        
        // Clear existing content
        this.problemWordsElement.innerHTML = '';
        this.answerWordsElement.innerHTML = '';
        
        // Create problem cards
        shuffledProblems.forEach((pair, index) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = pair.problem;
            card.dataset.pairIndex = this.mathPairs.findIndex(p => p.problem === pair.problem);
            this.problemWordsElement.appendChild(card);
        });
        
        // Create answer cards
        shuffledAnswers.forEach((pair, index) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.textContent = pair.answer;
            card.dataset.pairIndex = this.mathPairs.findIndex(p => p.answer === pair.answer);
            this.answerWordsElement.appendChild(card);
        });
    }
    
    setupEventListeners() {
        this.newGameBtnElement.addEventListener('click', () => this.setupGame());
        
        // Event delegation for word cards
        this.problemWordsElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-card') && !e.target.classList.contains('matched')) {
                this.selectProblemCard(e.target);
            }
        });
        
        this.answerWordsElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('word-card') && !e.target.classList.contains('matched')) {
                this.selectAnswerCard(e.target);
            }
        });
    }
    
    selectProblemCard(card) {
        // Remove previous selection
        if (this.selectedProblem) {
            this.selectedProblem.classList.remove('selected');
        }
        
        this.selectedProblem = card;
        card.classList.add('selected');
        
        this.checkForMatch();
    }
    
    selectAnswerCard(card) {
        // Remove previous selection
        if (this.selectedAnswer) {
            this.selectedAnswer.classList.remove('selected');
        }
        
        this.selectedAnswer = card;
        card.classList.add('selected');
        
        this.checkForMatch();
    }
    
    checkForMatch() {
        if (this.selectedProblem && this.selectedAnswer) {
            const problemIndex = parseInt(this.selectedProblem.dataset.pairIndex);
            const answerIndex = parseInt(this.selectedAnswer.dataset.pairIndex);
            
            if (problemIndex === answerIndex) {
                // Match found!
                this.handleMatch();
            } else {
                // No match - clear selections after a brief delay
                setTimeout(() => {
                    if (this.selectedProblem) {
                        this.selectedProblem.classList.remove('selected');
                        this.selectedProblem = null;
                    }
                    if (this.selectedAnswer) {
                        this.selectedAnswer.classList.remove('selected');
                        this.selectedAnswer = null;
                    }
                }, 500);
            }
        }
    }
    
    handleMatch() {
        const problemIndex = parseInt(this.selectedProblem.dataset.pairIndex);
        
        // Mark cards as matched
        this.selectedProblem.classList.remove('selected');
        this.selectedProblem.classList.add('matched');
        this.selectedAnswer.classList.remove('selected');
        this.selectedAnswer.classList.add('matched');
        
        // Add to matched pairs
        this.matchedPairs.add(problemIndex);
        
        // Increase score
        this.score += 10;
        
        // Clear selections
        this.selectedProblem = null;
        this.selectedAnswer = null;
        
        // Update display
        this.updateDisplay();
        
        // Check if game is complete
        if (this.matchedPairs.size === this.mathPairs.length) {
            setTimeout(() => this.completeGame(), 500);
        }
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.pairsLeftElement.textContent = this.mathPairs.length - this.matchedPairs.size;
        
        const progress = (this.matchedPairs.size / this.mathPairs.length) * 100;
        this.progressFillElement.style.width = `${progress}%`;
    }
    
    startTimer() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        
        this.gameInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    completeGame() {
        clearInterval(this.gameInterval);
        
        // Calculate final time
        const totalTime = Date.now() - this.startTime;
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        
        // Update completion message
        this.finalScoreElement.textContent = this.score;
        this.finalTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Show completion message and hide game area
        this.gameAreaElement.style.display = 'none';
        this.completionMessageElement.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PairingGame();
});