class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "tulajdonságok",
                answer: "characteristics",
                acceptedAnswers: ["characteristics", "properties", "qualities", "traits"]
            },
            {
                question: "különböző",
                answer: "different",
                acceptedAnswers: ["different", "various", "distinct"]
            },
            {
                question: "közös",
                answer: "common",
                acceptedAnswers: ["common", "shared", "mutual"]
            },
            {
                question: "használ",
                answer: "use",
                acceptedAnswers: ["use", "uses", "using", "to use"]
            },
            {
                question: "válogat",
                answer: "sort",
                acceptedAnswers: ["sort", "sorts", "sorting", "to sort", "select", "choose"]
            },
            {
                question: "csoportba sorol",
                answer: "sort into groups",
                acceptedAnswers: ["sort into groups", "group", "groups", "categorize", "classify"]
            },
            {
                question: "összehasonlít",
                answer: "compare",
                acceptedAnswers: ["compare", "compares", "comparing", "to compare"]
            },
            {
                question: "ugyanabba a csoportba sorol",
                answer: "put into the same group",
                acceptedAnswers: ["put into the same group", "group together", "put together", "same group"]
            },
            {
                question: "is, szintén",
                answer: "also",
                acceptedAnswers: ["also", "too", "as well", "likewise"]
            },
            {
                question: "hasonló",
                answer: "similar",
                acceptedAnswers: ["similar", "alike", "comparable"]
            },
            {
                question: "szőr",
                answer: "fur",
                acceptedAnswers: ["fur", "hair", "coat"]
            },
            {
                question: "toll",
                answer: "feather",
                acceptedAnswers: ["feather", "feathers"]
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
        this.startContainer = document.getElementById('startContainer');
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
        
        this.startContainer.style.display = 'none';
        this.questionContainer.style.display = 'block';
        this.resultsContainer.style.display = 'none';
        
        this.showQuestion();
        this.answerInput.focus();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.answerInput.value = this.userAnswers[this.currentQuestionIndex] || '';
        this.updateDisplay();
        this.clearFeedback();
        
        // Update navigation buttons
        this.prevBtn.style.display = this.currentQuestionIndex > 0 ? 'inline-block' : 'none';
        this.nextBtn.style.display = this.userAnswers[this.currentQuestionIndex] ? 'inline-block' : 'none';
        
        this.answerInput.focus();
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
        
        // Store the user's answer
        this.userAnswers[this.currentQuestionIndex] = userAnswer;
        
        if (isCorrect) {
            this.showFeedback('Correct! Well done!', true);
            if (!this.userAnswers[this.currentQuestionIndex + '_correct']) {
                this.score++;
                this.userAnswers[this.currentQuestionIndex + '_correct'] = true;
            }
        } else {
            this.showFeedback(`Incorrect. The correct answer is: ${question.answer}`, false);
            this.userAnswers[this.currentQuestionIndex + '_correct'] = false;
        }
        
        this.nextBtn.style.display = 'inline-block';
        this.updateDisplay();
        
        // Auto advance to next question after 2 seconds if correct
        if (isCorrect && this.currentQuestionIndex < this.questions.length - 1) {
            setTimeout(() => {
                this.nextQuestion();
            }, 2000);
        } else if (this.currentQuestionIndex === this.questions.length - 1) {
            setTimeout(() => {
                this.showResults();
            }, 2000);
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }
    
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
        }
    }
    
    showResults() {
        this.questionContainer.style.display = 'none';
        this.resultsContainer.style.display = 'block';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScore.textContent = `Your final score: ${this.score}/${this.questions.length}`;
        this.percentage.textContent = `Percentage: ${percentage}%`;
        
        this.generateResultsDetails();
    }
    
    generateResultsDetails() {
        let detailsHTML = '<h3>Question Review:</h3>';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index] || 'No answer';
            const isCorrect = this.userAnswers[index + '_correct'];
            const statusClass = isCorrect ? 'correct' : 'incorrect';
            
            detailsHTML += `
                <div class="result-item ${statusClass}">
                    <div class="question-review">${question.question}</div>
                    <div class="answer-review">Your answer: ${userAnswer}</div>
                    <div class="correct-answer">Correct answer: ${question.answer}</div>
                </div>
            `;
        });
        
        this.resultsDetails.innerHTML = detailsHTML;
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        
        this.resultsContainer.style.display = 'none';
        this.startContainer.style.display = 'block';
        this.questionContainer.style.display = 'none';
        
        this.updateDisplay();
        this.clearFeedback();
    }
    
    updateDisplay() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        
        const answeredQuestions = this.userAnswers.filter((answer, index) => 
            answer && typeof answer === 'string'
        ).length;
        this.scoreDisplay.textContent = `Score: ${this.score}/${answeredQuestions}`;
    }
    
    showFeedback(message, isCorrect) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        this.feedback.style.display = 'block';
    }
    
    clearFeedback() {
        this.feedback.style.display = 'none';
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});