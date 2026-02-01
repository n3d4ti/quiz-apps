class QuizApp {
    constructor() {
        // Quiz data with Hungarian questions and English answers
        this.questions = [
            {
                question: "felnőtt",
                answer: "adult",
                acceptedAnswers: ["adult", "grown-up", "grownup"]
            },
            {
                question: "elevenen szül",
                answer: "give birth",
                acceptedAnswers: ["give birth", "gives birth", "birth", "live birth"]
            },
            {
                question: "bőrön keresztül",
                answer: "through the skin",
                acceptedAnswers: ["through the skin", "through skin", "via skin", "cutaneous", "percutaneous"]
            },
            {
                question: "pete, ikra",
                answer: "egg",
                acceptedAnswers: ["egg", "eggs", "roe", "spawn"]
            },
            {
                question: "petét, ikrát rak",
                answer: "lay eggs",
                acceptedAnswers: ["lay eggs", "lays eggs", "laying eggs", "spawn", "oviposit"]
            }
        ];

        // Quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStarted = false;
        this.quizCompleted = false;

        // Initialize the quiz
        this.initializeElements();
        this.setupEventListeners();
        this.shuffleQuestions();
        this.updateDisplay();
        this.startQuiz();
    }

    initializeElements() {
        // Cache DOM elements
        this.questionText = document.getElementById('questionText');
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.questionCounter = document.getElementById('questionCounter');
        this.scoreElement = document.getElementById('score');
        this.progressFill = document.getElementById('progressFill');
        this.feedback = document.getElementById('feedback');
        this.quizContent = document.getElementById('quizContent');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.finalScore = document.getElementById('finalScore');
        this.scoreBreakdown = document.getElementById('scoreBreakdown');
        this.restartBtn = document.getElementById('restartBtn');
        this.reviewBtn = document.getElementById('reviewBtn');
        this.reviewSection = document.getElementById('reviewSection');
        this.reviewContent = document.getElementById('reviewContent');
        this.backToResultsBtn = document.getElementById('backToResultsBtn');
    }

    setupEventListeners() {
        // Submit button
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        
        // Enter key support
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());

        // Action buttons
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.reviewBtn.addEventListener('click', () => this.showReview());
        this.backToResultsBtn.addEventListener('click', () => this.showResults());

        // Auto-focus on input
        this.answerInput.focus();
    }

    shuffleQuestions() {
        // Shuffle questions for variety
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    startQuiz() {
        this.quizStarted = true;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.quizCompleted) return;

        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = currentQuestion.question;
        
        // Update counters
        this.questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        this.scoreElement.textContent = `Score: ${this.score}/${this.currentQuestionIndex}`;
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Show/hide navigation buttons
        this.prevBtn.style.display = this.currentQuestionIndex > 0 ? 'inline-block' : 'none';
        
        // Clear previous answer and feedback
        if (!this.userAnswers[this.currentQuestionIndex]) {
            this.answerInput.value = '';
            this.feedback.textContent = '';
            this.submitBtn.style.display = 'inline-block';
            this.nextBtn.style.display = 'none';
        } else {
            // Show previous answer
            this.answerInput.value = this.userAnswers[this.currentQuestionIndex].userAnswer;
            this.submitBtn.style.display = 'none';
            this.nextBtn.style.display = this.currentQuestionIndex < this.questions.length - 1 ? 'inline-block' : 'none';
            
            // Show previous feedback
            const answer = this.userAnswers[this.currentQuestionIndex];
            this.showFeedback(
                answer.isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is: ${currentQuestion.answer}`,
                answer.isCorrect
            );
        }

        this.answerInput.focus();
    }

    submitAnswer() {
        const userAnswer = this.answerInput.value.trim();
        
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', false);
            return;
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        // Case-insensitive validation
        const isCorrect = currentQuestion.acceptedAnswers.some(answer => 
            answer.toLowerCase() === userAnswer.toLowerCase()
        );

        // Store answer
        this.userAnswers[this.currentQuestionIndex] = {
            userAnswer: userAnswer,
            correctAnswer: currentQuestion.answer,
            isCorrect: isCorrect
        };

        // Update score
        if (isCorrect) {
            this.score++;
            this.showFeedback('Correct! Well done!', true);
        } else {
            this.showFeedback(`Incorrect. The correct answer is: ${currentQuestion.answer}`, false);
        }

        // Hide submit button, show next button or finish quiz
        this.submitBtn.style.display = 'none';
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.nextBtn.style.display = 'inline-block';
        } else {
            // Quiz completed
            setTimeout(() => this.completeQuiz(), 2000);
        }

        // Update score display
        this.scoreElement.textContent = `Score: ${this.score}/${this.currentQuestionIndex + 1}`;
    }

    showFeedback(message, isCorrect) {
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.updateDisplay();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateDisplay();
        }
    }

    completeQuiz() {
        this.quizCompleted = true;
        this.quizContent.style.display = 'none';
        this.resultsContainer.style.display = 'block';

        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.finalScore.innerHTML = `
            <h3>Final Score: ${this.score}/${this.questions.length} (${percentage}%)</h3>
        `;

        let performanceMessage = '';
        if (percentage >= 90) {
            performanceMessage = 'Excellent work! 🌟';
        } else if (percentage >= 70) {
            performanceMessage = 'Good job! 👍';
        } else if (percentage >= 50) {
            performanceMessage = 'Keep practicing! 📚';
        } else {
            performanceMessage = 'More study needed. 💪';
        }

        this.scoreBreakdown.innerHTML = `
            <p class="performance-message">${performanceMessage}</p>
            <div class="score-details">
                <p>Correct answers: ${this.score}</p>
                <p>Incorrect answers: ${this.questions.length - this.score}</p>
                <p>Accuracy: ${percentage}%</p>
            </div>
        `;
    }

    showReview() {
        this.reviewSection.style.display = 'block';
        this.finalScore.parentElement.style.display = 'none';

        let reviewHTML = '<div class="review-list">';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer.isCorrect;
            
            reviewHTML += `
                <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-question">
                        <strong>Q${index + 1}:</strong> ${question.question}
                    </div>
                    <div class="review-answer">
                        <span class="label">Your answer:</span> 
                        <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">${userAnswer.userAnswer}</span>
                    </div>
                    ${!isCorrect ? `
                        <div class="review-correct">
                            <span class="label">Correct answer:</span> 
                            <span class="correct-answer">${question.answer}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        reviewHTML += '</div>';
        this.reviewContent.innerHTML = reviewHTML;
    }

    showResults() {
        this.reviewSection.style.display = 'none';
        this.finalScore.parentElement.style.display = 'block';
    }

    restartQuiz() {
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizCompleted = false;
        
        // Reset UI
        this.quizContent.style.display = 'block';
        this.resultsContainer.style.display = 'none';
        this.reviewSection.style.display = 'none';
        
        // Shuffle and restart
        this.shuffleQuestions();
        this.updateDisplay();
    }
}

// Initialize the quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});