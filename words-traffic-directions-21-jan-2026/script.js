class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "menj egyenesen",
                answer: "go straight",
                acceptedAnswers: ["go straight", "go straight ahead", "continue straight", "straight ahead"]
            },
            {
                question: "fordulj jobbra",
                answer: "turn right",
                acceptedAnswers: ["turn right", "make a right turn", "go right", "turn to the right"]
            },
            {
                question: "ne fordulj balra",
                answer: "don't turn left",
                acceptedAnswers: ["don't turn left", "do not turn left", "don't go left", "no left turn"]
            },
            {
                question: "állj meg itt",
                answer: "stop here",
                acceptedAnswers: ["stop here", "stop", "halt here", "come to a stop here"]
            },
            {
                question: "menj át itt",
                answer: "cross the street here",
                acceptedAnswers: ["cross the street here", "cross here", "go across here", "cross the road here"]
            },
            {
                question: "kösd be az övet",
                answer: "put your seatbelt on",
                acceptedAnswers: ["put your seatbelt on", "fasten your seatbelt", "buckle up", "put on your seatbelt", "wear your seatbelt"]
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
        this.startContainer = document.getElementById('startContainer');
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
    }
    
    startQuiz() {
        this.quizStarted = true;
        this.startContainer.style.display = 'none';
        this.questionContainer.style.display = 'block';
        this.showCurrentQuestion();
        this.answerInput.focus();
    }
    
    showCurrentQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.answerInput.value = this.userAnswers[this.currentQuestionIndex] || '';
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        
        this.updateNavigationButtons();
        this.updateDisplay();
    }
    
    submitAnswer() {
        const userAnswer = this.answerInput.value.trim();
        
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', false);
            return;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = question.acceptedAnswers.some(answer => 
            answer.toLowerCase() === userAnswer.toLowerCase()
        );
        
        this.userAnswers[this.currentQuestionIndex] = userAnswer;
        
        if (isCorrect) {
            this.showFeedback('Correct! Well done!', true);
            if (!this.userAnswers[this.currentQuestionIndex + '_scored']) {
                this.score++;
                this.userAnswers[this.currentQuestionIndex + '_scored'] = true;
            }
        } else {
            this.showFeedback(`Incorrect. The correct answer is: ${question.answer}`, false);
        }
        
        this.updateDisplay();
        this.updateNavigationButtons();
        
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.nextQuestion();
            } else {
                this.showResults();
            }
        }, 2000);
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showCurrentQuestion();
            this.answerInput.focus();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showCurrentQuestion();
            this.answerInput.focus();
        }
    }
    
    showResults() {
        this.questionContainer.style.display = 'none';
        this.resultsContainer.style.display = 'block';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScore.textContent = this.score;
        this.percentage.textContent = `${percentage}%`;
        
        let resultsHTML = '<h3>Review Your Answers:</h3>';
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index] || 'No answer';
            const isCorrect = this.userAnswers[index + '_scored'];
            
            resultsHTML += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-question">${question.question}</div>
                    <div class="result-answer">Your answer: ${userAnswer}</div>
                    <div class="result-correct">Correct answer: ${question.answer}</div>
                </div>
            `;
        });
        
        this.resultsDetails.innerHTML = resultsHTML;
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.resultsContainer.style.display = 'none';
        this.startContainer.style.display = 'block';
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        this.scoreDisplay.textContent = `Score: ${this.score}/${this.questions.length}`;
        
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentQuestionIndex === 0;
        this.nextBtn.disabled = !this.userAnswers[this.currentQuestionIndex];
    }
    
    showFeedback(message, isCorrect) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});