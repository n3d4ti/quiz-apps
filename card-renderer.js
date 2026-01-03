// Card Renderer for Quiz Application Landing Page
class QuizCardRenderer {
  
  // Store current filter state
  static currentFilters = {
    quizSearch: '',
    learningSearch: '', 
    category: 'all'
  };

  // Loading and error states
  static isLoading = false;
  static hasError = false;
  static errorMessage = '';

  // Progress tracking
  static progressData = {};

  /**
   * Load progress data from localStorage
   */
  static loadProgress() {
    try {
      const stored = localStorage.getItem('quiz-progress');
      this.progressData = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load progress data:', error);
      this.progressData = {};
    }
  }

  /**
   * Save progress data to localStorage
   */
  static saveProgress() {
    try {
      localStorage.setItem('quiz-progress', JSON.stringify(this.progressData));
    } catch (error) {
      console.error('Failed to save progress data:', error);
    }
  }

  /**
   * Update progress for a quiz
   */
  static updateQuizProgress(quizUrl, completed = true, score = null) {
    const quizId = quizUrl.replace(/[^a-zA-Z0-9]/g, '_');
    this.progressData[quizId] = {
      completed,
      score,
      lastPlayed: new Date().toISOString(),
      attempts: (this.progressData[quizId]?.attempts || 0) + 1
    };
    this.saveProgress();
  }

  /**
   * Get progress for a quiz
   */
  static getQuizProgress(quizUrl) {
    const quizId = quizUrl.replace(/[^a-zA-Z0-9]/g, '_');
    return this.progressData[quizId] || null;
  }

  /**
   * Get completion statistics
   */
  static getCompletionStats() {
    const totalQuizzes = quizData.quizzes?.length || 0;
    const completedQuizzes = Object.values(this.progressData).filter(p => p.completed).length;
    const completionRate = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
    
    return {
      total: totalQuizzes,
      completed: completedQuizzes,
      remaining: totalQuizzes - completedQuizzes,
      completionRate
    };
  }

  /**
   * Show loading state
   */
  static showLoading(containerId, message = 'Loading...') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text">${message}</div>
      </div>
    `;
  }

  /**
   * Show error state
   */
  static showError(containerId, errorMessage = 'Something went wrong') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">Oops! Something went wrong</h3>
        <p class="error-message">${errorMessage}</p>
        <button class="retry-button" onclick="QuizCardRenderer.initialize()">
          <span>🔄</span> Try Again
        </button>
      </div>
    `;
  }

  /**
   * Validate quiz data
   */
  static validateData() {
    try {
      // Check if quizData exists
      if (typeof quizData === 'undefined') {
        throw new Error('Quiz data not found. Please check if quiz-data.js is loaded correctly.');
      }

      // Check if quizData has required properties
      if (!quizData.quizzes || !Array.isArray(quizData.quizzes)) {
        throw new Error('Invalid quiz data structure: quizzes array not found.');
      }

      if (!quizData.learningGames || !Array.isArray(quizData.learningGames)) {
        throw new Error('Invalid quiz data structure: learning games array not found.');
      }

      // Check if arrays are empty
      if (quizData.quizzes.length === 0) {
        throw new Error('No quizzes available at the moment.');
      }

      if (quizData.learningGames.length === 0) {
        throw new Error('No learning games available at the moment.');
      }

      // Validate each quiz has required fields
      quizData.quizzes.forEach((quiz, index) => {
        if (!quiz.title || !quiz.description || !quiz.url) {
          throw new Error(`Invalid quiz data at index ${index}: missing required fields.`);
        }
      });

      // Validate each learning game has required fields
      quizData.learningGames.forEach((game, index) => {
        if (!game.title || !game.description || !game.url) {
          throw new Error(`Invalid learning game data at index ${index}: missing required fields.`);
        }
      });

      return true;
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
      console.error('Data validation error:', error);
      return false;
    }
  }

  /**
   * Generate HTML for a quiz card
   */
  static createQuizCard(quiz) {
    const progress = this.getQuizProgress(quiz.url);
    const isCompleted = progress?.completed || false;
    const attempts = progress?.attempts || 0;
    const lastPlayed = progress?.lastPlayed ? new Date(progress.lastPlayed).toLocaleDateString() : null;
    
    const progressBadge = isCompleted 
      ? '<div class="progress-badge completed">✓ Completed</div>'
      : attempts > 0 
        ? '<div class="progress-badge in-progress">📝 In Progress</div>'
        : '<div class="progress-badge new">🆕 New</div>';

    const progressInfo = progress 
      ? `<div class="progress-info">
           <span class="attempts">Attempts: ${attempts}</span>
           ${lastPlayed ? `<span class="last-played">Last played: ${lastPlayed}</span>` : ''}
         </div>`
      : '';

    return `
      <div class="quiz-card ${isCompleted ? 'completed' : ''}" data-category="${quiz.category}" data-title="${quiz.title.toLowerCase()}" data-description="${quiz.description.toLowerCase()}">
        <div class="card-header">
          <div class="card-icon">${quiz.icon}</div>
          <div class="test-date">
            <span class="date-label">Test Date</span>
            <span class="date-value">${quiz.testDate}</span>
          </div>
          ${progressBadge}
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
        
        ${progressInfo}
        
        <a href="${quiz.url}" class="start-button ${isCompleted ? 'completed' : ''}">
          <span class="button-text">${isCompleted ? 'Play Again' : quiz.buttonText}</span>
          <span class="button-arrow">${isCompleted ? '🔄' : '→'}</span>
        </a>
      </div>
    `;
  }

  /**
   * Generate HTML for a learning game card
   */
  static createLearningCard(game) {
    return `
      <div class="learning-card" data-title="${game.title.toLowerCase()}" data-description="${game.description.toLowerCase()}">
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
   * Determine category from quiz title/description
   */
  static determineCategory(quiz) {
    const title = quiz.title.toLowerCase();
    const description = quiz.description.toLowerCase();
    
    if (title.includes('environment') || title.includes('biology') || description.includes('environment')) return 'environment';
    if (title.includes('body') || title.includes('parts') || description.includes('body')) return 'body';
    return 'words';
  }

  /**
   * Get category display information
   */
  static getCategoryInfo(categoryKey) {
    const categories = {
      words: { title: 'General Vocabulary', icon: '📚', description: 'Essential English words and phrases' },
      environment: { title: 'Environment & Biology', icon: '🌱', description: 'Nature, environment, and biological terms' },
      body: { title: 'Body Parts & Health', icon: '🫀', description: 'Human anatomy and health-related vocabulary' }
    };
    return categories[categoryKey] || categories.words;
  }

  /**
   * Render progress overview section
   */
  static renderProgressOverview() {
    const container = document.getElementById('progress-overview');
    if (!container) return;

    const stats = this.getCompletionStats();
    
    container.innerHTML = `
      <div class="progress-cards">
        <div class="progress-card">
          <div class="progress-card-icon">📊</div>
          <div class="progress-card-content">
            <span class="progress-card-number">${stats.completionRate}%</span>
            <span class="progress-card-label">Overall Progress</span>
          </div>
        </div>
        
        <div class="progress-card">
          <div class="progress-card-icon">✅</div>
          <div class="progress-card-content">
            <span class="progress-card-number">${stats.completed}</span>
            <span class="progress-card-label">Completed Quizzes</span>
          </div>
        </div>
        
        <div class="progress-card">
          <div class="progress-card-icon">📚</div>
          <div class="progress-card-content">
            <span class="progress-card-number">${stats.remaining}</span>
            <span class="progress-card-label">Remaining Quizzes</span>
          </div>
        </div>
        
        <div class="progress-card">
          <div class="progress-card-icon">🎯</div>
          <div class="progress-card-content">
            <span class="progress-card-number">${stats.total}</span>
            <span class="progress-card-label">Total Available</span>
          </div>
        </div>
      </div>
      
      <div class="progress-bar-container">
        <div class="progress-bar-label">
          <span>Quiz Completion Progress</span>
          <span>${stats.completed}/${stats.total}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${stats.completionRate}%"></div>
        </div>
      </div>
    `;
  }
  static createCategorySection(category, quizzes) {
    const categoryInfo = this.getCategoryInfo(category);
    const quizCardsHTML = quizzes.map(quiz => this.createQuizCard(quiz)).join('');
    
    return `
      <div class="category-section" data-category="${category}">
        <div class="category-header">
          <div class="category-icon">${categoryInfo.icon}</div>
          <h3 class="category-title">${categoryInfo.title}</h3>
          <span class="category-count">${quizzes.length} quiz${quizzes.length !== 1 ? 'es' : ''}</span>
        </div>
        <div class="category-grid">
          ${quizCardsHTML}
        </div>
      </div>
    `;
  }

  /**
   * Filter quiz cards based on search and category
   */
  static filterQuizCards() {
    const container = document.getElementById('quiz-categories');
    const noResults = document.getElementById('no-results');
    const sections = container.querySelectorAll('.category-section');
    let totalVisibleQuizzes = 0;

    sections.forEach(section => {
      const category = section.dataset.category;
      const cards = section.querySelectorAll('.quiz-card');
      let visibleInSection = 0;

      cards.forEach(card => {
        const title = card.dataset.title;
        const description = card.dataset.description;
        
        const matchesSearch = title.includes(this.currentFilters.quizSearch.toLowerCase()) || 
                             description.includes(this.currentFilters.quizSearch.toLowerCase());
        const matchesCategory = this.currentFilters.category === 'all' || category === this.currentFilters.category;
        
        if (matchesSearch && matchesCategory) {
          card.style.display = 'block';
          visibleInSection++;
          totalVisibleQuizzes++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide entire category section based on visible cards
      if (visibleInSection > 0) {
        section.classList.remove('hidden');
        // Update category count
        const countElement = section.querySelector('.category-count');
        countElement.textContent = `${visibleInSection} quiz${visibleInSection !== 1 ? 'es' : ''}`;
      } else {
        section.classList.add('hidden');
      }
    });

    // Show/hide no results message
    if (totalVisibleQuizzes === 0 && sections.length > 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  /**
   * Filter learning cards based on search
   */
  static filterLearningCards() {
    const container = document.getElementById('learning-grid');
    const noResults = document.getElementById('no-learning-results');
    const cards = container.querySelectorAll('.learning-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      
      const matchesSearch = title.includes(this.currentFilters.learningSearch.toLowerCase()) || 
                           description.includes(this.currentFilters.learningSearch.toLowerCase());
      
      if (matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show/hide no results message
    if (visibleCount === 0 && cards.length > 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  /**
   * Setup search and filter event listeners
   */
  static setupSearchAndFilters() {
    // Quiz search
    const quizSearch = document.getElementById('quiz-search');
    if (quizSearch) {
      quizSearch.addEventListener('input', (e) => {
        this.currentFilters.quizSearch = e.target.value;
        this.filterQuizCards();
      });
    }

    // Learning search
    const learningSearch = document.getElementById('learning-search');
    if (learningSearch) {
      learningSearch.addEventListener('input', (e) => {
        this.currentFilters.learningSearch = e.target.value;
        this.filterLearningCards();
      });
    }

    // Category filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Update filter and apply
        this.currentFilters.category = e.target.dataset.category;
        this.filterQuizCards();
      });
    });
  }

  /**
   * Render all quiz cards to the quiz grid container organized by category
   */
  static renderQuizCards() {
    const container = document.getElementById('quiz-categories');
    if (!container) {
      console.error('Quiz categories container not found');
      return;
    }

    // Add category data to quizzes and group by category
    const quizzesWithCategory = quizData.quizzes.map(quiz => ({
      ...quiz,
      category: this.determineCategory(quiz)
    }));

    // Group quizzes by category
    const quizzesByCategory = quizzesWithCategory.reduce((groups, quiz) => {
      const category = quiz.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(quiz);
      return groups;
    }, {});

    // Create category sections
    const categorySectionsHTML = Object.entries(quizzesByCategory)
      .map(([category, quizzes]) => this.createCategorySection(category, quizzes))
      .join('');
    
    container.innerHTML = categorySectionsHTML;
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
   * Create category section HTML
   */
  static createCategorySection(category, quizzes) {
    const categoryInfo = this.getCategoryInfo(category);
    const quizCardsHTML = quizzes.map(quiz => this.createQuizCard(quiz)).join('');
    
    return `
      <div class="category-section" data-category="${category}">
        <div class="category-header">
          <div class="category-icon">${categoryInfo.icon}</div>
          <h3 class="category-title">${categoryInfo.title}</h3>
          <span class="category-count">${quizzes.length} quiz${quizzes.length !== 1 ? 'es' : ''}</span>
        </div>
        <div class="category-grid">
          ${quizCardsHTML}
        </div>
      </div>
    `;
  }

  /**
   * Render all cards (both quiz and learning) with error handling
   */
  static renderAllCards() {
    try {
      this.isLoading = true;
      this.hasError = false;
      
      // Load progress data first
      this.loadProgress();
      
      // Show loading states
      this.showLoading('progress-overview', 'Loading progress...');
      this.showLoading('quiz-categories', 'Loading quizzes...');
      this.showLoading('learning-grid', 'Loading learning games...');
      
      // Validate data
      if (!this.validateData()) {
        this.showError('progress-overview', this.errorMessage);
        this.showError('quiz-categories', this.errorMessage);
        this.showError('learning-grid', this.errorMessage);
        return;
      }
      
      // Simulate slight delay for smooth loading experience
      setTimeout(() => {
        try {
          this.renderProgressOverview();
          this.renderQuizCards();
          this.renderLearningCards();
          this.setupSearchAndFilters();
          this.isLoading = false;
        } catch (error) {
          console.error('Rendering error:', error);
          this.showError('progress-overview', 'Failed to load progress data.');
          this.showError('quiz-categories', 'Failed to load quizzes. Please try refreshing the page.');
          this.showError('learning-grid', 'Failed to load learning games. Please try refreshing the page.');
        }
      }, 300);
      
    } catch (error) {
      console.error('Critical error:', error);
      this.showError('progress-overview', 'A critical error occurred. Please refresh the page.');
      this.showError('quiz-categories', 'A critical error occurred. Please refresh the page.');
      this.showError('learning-grid', 'A critical error occurred. Please refresh the page.');
    }
  }

  /**
   * Initialize the card rendering on page load with error handling
   */
  static initialize() {
    try {
      // Reset error state
      this.hasError = false;
      this.errorMessage = '';
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.renderAllCards());
      } else {
        this.renderAllCards();
      }
    } catch (error) {
      console.error('Initialization error:', error);
      // Fallback error handling if containers exist
      setTimeout(() => {
        this.showError('quiz-categories', 'Failed to initialize the application. Please refresh the page.');
        this.showError('learning-grid', 'Failed to initialize the application. Please refresh the page.');
      }, 100);
    }
  }
}

// Auto-initialize when script loads
QuizCardRenderer.initialize();