class QuizApp {
    constructor() {
        this.questions = [
            { question: "életfolyamat", answer: "life process", acceptedAnswers: ["life process", "lifeprocess"] },
            { question: "nélkül", answer: "without", acceptedAnswers: ["without"] },
            { question: "történik", answer: "take place", acceptedAnswers: ["take place", "takes place", "occur", "occurs", "happen", "happens"] },
            { question: "táplálkozás", answer: "nutrition", acceptedAnswers: ["nutrition", "nourishment"] },
            { question: "mozgás", answer: "movement", acceptedAnswers: ["movement", "motion"] },
            { question: "növekedés", answer: "growth", acceptedAnswers: ["growth", "growing"] },
            { question: "reagál a változásokra", answer: "respond to changes", acceptedAnswers: ["respond to changes", "responds to changes", "react to changes", "reacts to changes"] }
        ];
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.shuffledQuestions = this.shuffleArray([...this.questions]);
        
        this.initializeElements();
        this.bindEvents();
        this.displayQuestion();
    }
    
    initializeElements() {
        this.questionText = document.getElementById('question-text');
        this.answerInput = document.getElementById('answer-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.feedback = document.getElementById('feedback');
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.quizResults = document.getElementById('quiz-results');
        this.finalScore = document.getElementById('final-score');
        this.performanceMessage = document.getElementById('performance-message');
    }
    
    bindEvents() {
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    displayQuestion() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        this.questionText.textContent = `What is "${currentQuestion.question}" in English?`;
        this.answerInput.value = '';
        this.answerInput.focus();
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        
        this.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
        this.totalQuestionsElement.textContent = this.shuffledQuestions.length;
        
        this.submitBtn.style.display = 'inline-block';
        this.nextBtn.style.display = 'none';
    }
    
    checkAnswer() {
        const userAnswer = this.answerInput.value.trim().toLowerCase();
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        
        if (!userAnswer) {
            this.feedback.textContent = 'Please enter an answer!';
            this.feedback.className = 'feedback error';
            return;
        }
        
        const isCorrect = currentQuestion.acceptedAnswers.some(answer => 
            answer.toLowerCase() === userAnswer
        );
        
        if (isCorrect) {
            this.score++;
            this.feedback.textContent = 'Correct! Well done!';
            this.feedback.className = 'feedback correct';
            this.scoreElement.textContent = this.score;
        } else {
            this.feedback.textContent = `Incorrect. The correct answer is: ${currentQuestion.answer}`;
            this.feedback.className = 'feedback incorrect';
        }
        
        this.submitBtn.style.display = 'none';
        
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.nextBtn.style.display = 'inline-block';
        } else {
            this.showResults();
        }
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.displayQuestion();
    }
    
    showResults() {
        this.quizResults.style.display = 'block';
        this.finalScore.textContent = this.score;
        
        const percentage = (this.score / this.shuffledQuestions.length) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = 'Perfect! Excellent work! 🎉';
        } else if (percentage >= 80) {
            message = 'Great job! You\'re doing very well! 👏';
        } else if (percentage >= 60) {
            message = 'Good work! Keep practicing! 👍';
        } else {
            message = 'Keep studying and try again! 📚';
        }
        
        this.performanceMessage.textContent = message;
        this.restartBtn.style.display = 'inline-block';
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.shuffledQuestions = this.shuffleArray([...this.questions]);
        this.scoreElement.textContent = '0';
        this.quizResults.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.displayQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});