// Quiz and Learning Game Data
const quizData = {
  quizzes: [
    {
      id: "clothing",
      icon: "👕",
      title: "Clothing Vocabulary",
      description: "Master essential clothing and fashion words. Practice with real test-style questions including clothing items, accessories, and their English translations.",
      testDate: "October 16th, 2025",
      wordCount: 9,
      features: ["Clothing Items", "Accessories", "Fashion Terms", "Spelling Practice"],
      url: "words-16-oct-2025/index.html",
      buttonText: "Start Clothing Quiz"
    },
    {
      id: "toys",
      icon: "🧸",
      title: "Toys Vocabulary",
      description: "Learn toy and game vocabulary with fun, interactive practice. Master words for different types of toys, games, and playtime activities.",
      testDate: "October 20th, 2025", 
      wordCount: 7,
      features: ["Toy Types", "Game Names", "Play Activities", "Entertainment Terms"],
      url: "words-20-oct-2025/index.html",
      buttonText: "Start Toys Quiz"
    },
    {
      id: "breathing-air",
      icon: "🧬",
      title: "Breathing & Air Vocabulary",
      description: "Understand essential vocabulary about breathing, air quality, and respiratory processes. Perfect for biology and health science students.",
      testDate: "November 10th, 2025",
      wordCount: 6,
      features: ["Respiratory Terms", "Air Quality", "Biological Processes", "Health Vocabulary"],
      url: "words-10-nov-2025/index.html", 
      buttonText: "Start Breathing Quiz"
    },
    {
      id: "environment-nature",
      icon: "🌱",
      title: "Environment & Nature Vocabulary",
      description: "Learn essential environmental and nature vocabulary. Master terms related to ecosystems, conservation, and natural processes.",
      testDate: "Environment Quiz",
      wordCount: 8,
      features: ["Nature Terms", "Environmental Science", "Conservation Vocabulary", "Ecosystem Words"],
      url: "words-kornyezet-angol-01/index.html",
      buttonText: "Start Environment Quiz"
    },
    {
      id: "body-parts",
      icon: "🧬",
      title: "Body Parts Vocabulary", 
      description: "Master essential body parts vocabulary. Learn anatomical terms and their English translations through interactive practice sessions.",
      testDate: "November 13th, 2025",
      wordCount: 7,
      features: ["Body Parts", "Anatomical Terms", "Health Vocabulary", "Medical Terms"],
      url: "words-bodyparts-13-nov-2025/index.html",
      buttonText: "Start Body Parts Quiz"
    },
    {
      id: "life-process",
      icon: "🧬", 
      title: "Life Process Vocabulary",
      description: "Learn essential biology vocabulary about life processes. Master terms related to nutrition, movement, growth, and how living organisms respond to changes.",
      testDate: "November 14th, 2025",
      wordCount: 7,
      features: ["Life Processes", "Biology Terms", "Scientific Vocabulary", "Living Organisms"],
      url: "words-lifeprocess-14-nov-2025/index.html",
      buttonText: "Start Life Process Quiz"
    },
    {
      id: "present-continuous",
      icon: "⏰",
      title: "Present Continuous Vocabulary",
      description: "Master present continuous tense expressions in English. Learn to describe ongoing actions and activities happening right now.",
      testDate: "November 23rd, 2025", 
      wordCount: 5,
      features: ["Present Continuous", "Action Verbs", "Grammar Practice", "Tense Usage"],
      url: "words-present-continuous-23-nov-2025/index.html",
      buttonText: "Start Grammar Quiz"
    },
    {
      id: "activities",
      icon: "🎯",
      title: "Activities Vocabulary",
      description: "Master essential vocabulary for describing activities and actions. Learn present continuous verbs, common activities, and everyday actions in English.",
      testDate: "November 26th, 2025",
      wordCount: 12,
      features: ["Action Verbs", "Present Continuous", "Daily Activities", "Common Phrases"],
      url: "words-activities-26-nov-2025/index.html", 
      buttonText: "Start Activities Quiz"
    },
    {
      id: "environment-biology",
      icon: "🌱",
      title: "Environment & Biology Vocabulary",
      description: "Master essential biology and environmental science terms. Learn vocabulary about organisms, their responses to environment, and biological processes.",
      testDate: "Biology Quiz",
      wordCount: 6,
      features: ["Biology Terms", "Environmental Science", "Organism Functions", "Scientific Vocabulary"],
      url: "words-environment-biology-23-nov-2025/index.html",
      buttonText: "Start Biology Quiz"
    }
  ],
  
  learningGames: [
    {
      id: "clothing-game",
      icon: "🎯",
      title: "Clothing Pairing Game",
      description: "Match Hungarian clothing words with their English translations in this interactive pairing game.",
      features: ["Interactive matching", "Timed gameplay", "Score tracking"],
      url: "words-16-oct-2025/learn.html"
    },
    {
      id: "toys-game", 
      icon: "🧸",
      title: "Toys Pairing Game",
      description: "Learn toy vocabulary through fun interactive matching. Perfect practice before taking the full vocabulary quiz!",
      features: ["Fun matching game", "Instant feedback", "Progress tracking"],
      url: "words-20-oct-2025/learn.html"
    },
    {
      id: "breathing-game",
      icon: "💨", 
      title: "Breathing & Air Pairing Game",
      description: "Master breathing and air vocabulary through interactive word matching. Great preparation for your test!",
      features: ["Scientific terms", "Health vocabulary", "Biology focus"],
      url: "words-10-nov-2025/learn.html"
    },
    {
      id: "environment-game",
      icon: "🌿",
      title: "Environment & Nature Pairing Game", 
      description: "Learn environmental vocabulary through interactive matching. Master nature and conservation terms!",
      features: ["Nature vocabulary", "Environmental terms", "Conservation focus"],
      url: "words-kornyezet-angol-01/learn.html"
    },
    {
      id: "body-parts-game",
      icon: "👤",
      title: "Body Parts Pairing Game",
      description: "Master body parts vocabulary through interactive matching. Learn anatomical terms and medical vocabulary!",
      features: ["Anatomical terms", "Medical vocabulary", "Health focus"],
      url: "words-bodyparts-13-nov-2025/learn.html"
    },
    {
      id: "life-process-game",
      icon: "🔬",
      title: "Life Process Pairing Game", 
      description: "Learn biology vocabulary about life processes through interactive matching. Perfect for science students!",
      features: ["Biology terms", "Life processes", "Scientific focus"],
      url: "words-lifeprocess-14-nov-2025/learn.html"
    },
    {
      id: "grammar-game",
      icon: "📝",
      title: "Present Continuous Pairing Game",
      description: "Master present continuous grammar through interactive matching. Practice verb forms and tense usage!",
      features: ["Grammar focus", "Verb forms", "Tense practice"],
      url: "words-present-continuous-23-nov-2025/learn.html"
    },
    {
      id: "activities-game",
      icon: "🎯",
      title: "Activities Pairing Game",
      description: "Master activity vocabulary through interactive matching. Learn to describe actions, daily activities, and common phrases in English!",
      features: ["Action verbs", "Daily activities", "Common phrases"],
      url: "words-activities-26-nov-2025/learn.html"
    },
    {
      id: "biology-game",
      icon: "🌱", 
      title: "Environment & Biology Pairing Game",
      description: "Master biology and environmental science vocabulary through interactive matching. Learn about organisms and their environmental responses!",
      features: ["Scientific terms", "Environmental science", "Biology vocabulary"],
      url: "words-environment-biology-23-nov-2025/learn.html"
    }
  ]
};