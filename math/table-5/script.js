class QuizApp {
    constructor() {
        this.questions = [
            { question: "5 × 1 = ?", answer: "5", acceptedAnswers: ["5"] },
            { question: "5 × 2 = ?", answer: "10", acceptedAnswers: ["10"] },
            { question: "5 × 3 = ?", answer: "15", acceptedAnswers: ["15"] },
            { question: "5 × 4 = ?", answer: "20", acceptedAnswers: ["20"] },
            { question: "5 × 5 = ?", answer: "25", acceptedAnswers: ["25"] },
            { question: "5 × 6 = ?", answer: "30", acceptedAnswers: ["30"] },
            { question: "5 × 7 = ?", answer: "35", acceptedAnswers: ["35"] },
            { question: "5 × 8 = ?", answer: "40", acceptedAnswers: ["40"] },
            { question: "5 × 9 = ?", answer: "45", acceptedAnswers: ["45"] },
            { question: "5 × 10 = ?", answer: "50", acceptedAnswers: ["50"] },
            { question: "5 × 11 = ?", answer: "55", acceptedAnswers: ["55"] },
            { question: "5 × 12 = ?", answer: "60", acceptedAnswers: ["60"] },
            { question: "5 ÷ 5 = ?", answer: "1", acceptedAnswers: ["1"] },
            { question: "10 ÷ 5 = ?", answer: "2", acceptedAnswers: ["2"] },
            { question: "15 ÷ 5 = ?", answer: "3", acceptedAnswers: ["3"] },
            { question: "20 ÷ 5 = ?", answer: "4", acceptedAnswers: ["4"] },
            { question: "25 ÷ 5 = ?", answer: "5", acceptedAnswers: ["5"] },
            { question: "30 ÷ 5 = ?", answer: "6", acceptedAnswers: ["6"] },
            { question: "35 ÷ 5 = ?", answer: "7", acceptedAnswers: ["7"] },
            { question: "40 ÷ 5 = ?", answer: "8", acceptedAnswers: ["8"] },
            { question: "45 ÷ 5 = ?", answer: "9", acceptedAnswers: ["9"] },
            { question: "50 ÷ 5 = ?", answer: "10", acceptedAnswers: ["10"] },
            { question: "55 ÷ 5 = ?", answer: "11", acceptedAnswers: ["11"] },
            { question: "60 ÷ 5 = ?", answer: "12", acceptedAnswers: ["12"] }
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
        
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.nextBtn.style.display = 'none';
        this.submitBtn.style.display = 'inline-block';
    }
    
    submitAnswer() {
        const userAnswer = this.answerInput.value.trim();
        const question = this.questions[this.currentQuestionIndex];
        
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', false);
            return;
        }
        
        const isCorrect = question.acceptedAnswers.some(answer => 
            answer === userAnswer
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
        
        if (percentage >= 80) {
            this.percentage.style.color = '#10b981';
        } else if (percentage >= 60) {
            this.percentage.style.color = '#f59e0b';
        } else {
            this.percentage.style.color = '#ef4444';
        }
        
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

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
