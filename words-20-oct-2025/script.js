class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "játékok",
                answer: "toys",
                acceptedAnswers: ["toys"]
            },
            {
                question: "labda",
                answer: "ball",
                acceptedAnswers: ["ball"]
            },
            {
                question: "baba",
                answer: "doll",
                acceptedAnswers: ["doll"]
            },
            {
                question: "számítógépes játék",
                answer: "computer game",
                acceptedAnswers: ["computer game"]
            },
            {
                question: "szörnyeteg",
                answer: "monster",
                acceptedAnswers: ["monster"]
            },
            {
                question: "robot",
                answer: "robot",
                acceptedAnswers: ["robot"]
            },
            {
                question: "papír sárkány",
                answer: "kite",
                acceptedAnswers: ["kite"]
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.questionText = document.getElementById('questionText');
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.feedback = document.getElementById('feedback');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.startBtn = document.getElementById('startBtn');
        this.questionCounter = document.getElementById('questionCounter');
        this.scoreDisplay = document.getElementById('score');
        this.progressFill = document.getElementById('progressFill');
        this.questionContainer = document.getElementById('questionContainer');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.finalScore = document.getElementById('finalScore');
        this.percentage = document.getElementById('percentage');
        this.resultsDetails = document.getElementById('resultsDetails');
        this.restartBtn = document.getElementById('restartBtn');
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        this.answerInput.addEventListener('input', () => {
            this.clearFeedback();
        });
    }
    
    startQuiz() {
        this.quizStarted = true;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.startBtn.style.display = 'none';
        this.questionContainer.style.display = 'block';
        
        this.loadQuestion();
        this.updateDisplay();
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.answerInput.value = '';
        this.answerInput.focus();
        this.clearFeedback();
        
        // Show/hide navigation buttons
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.nextBtn.style.display = 'none';
        this.submitBtn.style.display = 'inline-block';
    }
    
    submitAnswer() {
        const userAnswer = this.answerInput.value.trim().toLowerCase();
        const question = this.questions[this.currentQuestionIndex];
        
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', false);
            return;
        }
        
        const isCorrect = question.acceptedAnswers.some(answer => 
            answer.toLowerCase() === userAnswer
        );
        
        this.userAnswers[this.currentQuestionIndex] = {
            question: question.question,
            userAnswer: this.answerInput.value.trim(),
            correctAnswer: question.answer,
            isCorrect: isCorrect
        };
        
        if (isCorrect) {
            this.score++;
            this.showFeedback('Correct! Well done!', true);
        } else {
            this.showFeedback(`Incorrect. The correct answer is: ${question.answer}`, false);
        }
        
        this.submitBtn.style.display = 'none';
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.nextBtn.style.display = 'inline-block';
        } else {
            setTimeout(() => this.showResults(), 2000);
        }
        
        this.updateDisplay();
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
            this.updateDisplay();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
            
            // If this question was already answered, show the feedback
            const userAnswer = this.userAnswers[this.currentQuestionIndex];
            if (userAnswer) {
                this.answerInput.value = userAnswer.userAnswer;
                this.showFeedback(
                    userAnswer.isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is: ${userAnswer.correctAnswer}`,
                    userAnswer.isCorrect
                );
                this.submitBtn.style.display = 'none';
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.nextBtn.style.display = 'inline-block';
                }
            }
            
            this.updateDisplay();
        }
    }
    
    showFeedback(message, isCorrect) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
    
    clearFeedback() {
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
    }
    
    updateDisplay() {
        if (!this.quizStarted) {
            this.questionCounter.textContent = `Ready to start?`;
            this.scoreDisplay.textContent = `Score: 0`;
            this.progressFill.style.width = '0%';
            return;
        }
        
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    showResults() {
        this.questionContainer.style.display = 'none';
        this.resultsContainer.style.display = 'block';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScore.textContent = `${this.score}/${this.questions.length}`;
        this.percentage.textContent = `${percentage}%`;
        
        // Update percentage color based on score
        if (percentage >= 80) {
            this.percentage.style.color = '#10b981'; // Green
        } else if (percentage >= 60) {
            this.percentage.style.color = '#f59e0b'; // Yellow
        } else {
            this.percentage.style.color = '#ef4444'; // Red
        }
        
        // Show detailed results
        this.resultsDetails.innerHTML = '';
        this.userAnswers.forEach((answer, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            resultItem.innerHTML = `
                <div class="result-question">Q${index + 1}: ${answer.question}</div>
                <div class="result-answer">
                    <span class="${answer.isCorrect ? 'answer-correct' : 'answer-incorrect'}">
                        Your answer: ${answer.userAnswer}
                    </span>
                    ${!answer.isCorrect ? `<span class="answer-correct">Correct: ${answer.correctAnswer}</span>` : ''}
                </div>
            `;
            
            this.resultsDetails.appendChild(resultItem);
        });
    }
    
    restartQuiz() {
        this.resultsContainer.style.display = 'none';
        this.questionContainer.style.display = 'none';
        this.startBtn.style.display = 'inline-block';
        
        this.quizStarted = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.updateDisplay();
    }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});