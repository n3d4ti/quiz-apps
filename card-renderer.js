// Card Renderer for Quiz Application Landing Page
class QuizCardRenderer {
  
  /**
   * Generate HTML for a quiz card
   */
  static createQuizCard(quiz) {
    return `
      <div class="quiz-card">
        <div class="card-header">
          <div class="card-icon">${quiz.icon}</div>
          <div class="test-date">
            <span class="date-label">Test Date</span>
            <span class="date-value">${quiz.testDate}</span>
          </div>
        </div>
        
        <h3 class="card-title">${quiz.title}</h3>
        <p class="card-description">
          ${quiz.description}
        </p>
        
        <div class="card-stats">
          <div class="stat-item">
            <span class="stat-number">${quiz.wordCount}</span>
            <span class="stat-label">Vocabulary Words</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">Multiple</span>
            <span class="stat-label">Practice Rounds</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">Instant</span>
            <span class="stat-label">Feedback</span>
          </div>
        </div>
        
        <div class="card-features">
          ${quiz.features.map(feature => `<div class="feature-tag">✓ ${feature}</div>`).join('')}
        </div>
        
        <a href="${quiz.url}" class="start-button">
          <span class="button-text">${quiz.buttonText}</span>
          <span class="button-arrow">→</span>
        </a>
      </div>
    `;
  }

  /**
   * Generate HTML for a learning game card
   */
  static createLearningCard(game) {
    return `
      <div class="learning-card">
        <div class="learning-header">
          <div class="learning-icon">${game.icon}</div>
          <div class="learning-title">${game.title}</div>
        </div>
        
        <p class="learning-description">
          ${game.description}
        </p>
        
        <div class="learning-features">
          ${game.features.map(feature => `<div class="learning-feature">${feature}</div>`).join('')}
        </div>
        
        <a href="${game.url}" class="learning-button">
          <span class="button-text">Play Learning Game</span>
          <span class="button-arrow">🎮</span>
        </a>
      </div>
    `;
  }

  /**
   * Render all quiz cards to the quiz grid container
   */
  static renderQuizCards() {
    const container = document.getElementById('quiz-grid');
    if (!container) {
      console.error('Quiz grid container not found');
      return;
    }

    const quizCardsHTML = quizData.quizzes
      .map(quiz => this.createQuizCard(quiz))
      .join('');
    
    container.innerHTML = quizCardsHTML;
  }

  /**
   * Render all learning game cards to the learning grid container
   */
  static renderLearningCards() {
    const container = document.getElementById('learning-grid');
    if (!container) {
      console.error('Learning grid container not found');
      return;
    }

    const learningCardsHTML = quizData.learningGames
      .map(game => this.createLearningCard(game))
      .join('');
    
    container.innerHTML = learningCardsHTML;
  }

  /**
   * Render all cards (both quiz and learning)
   */
  static renderAllCards() {
    this.renderQuizCards();
    this.renderLearningCards();
  }

  /**
   * Initialize the card rendering on page load
   */
  static initialize() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.renderAllCards());
    } else {
      this.renderAllCards();
    }
  }
}

// Auto-initialize when script loads
QuizCardRenderer.initialize();