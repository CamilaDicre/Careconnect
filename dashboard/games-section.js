class GamesSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentGame = null;
    this.score = 0;
    this.gameTimer = null;
    this.level = 1;
    this.gameState = null;
    this.maxLevel = 50; // Máximo 50 niveles
    this.levelConfig = this.generateLevelConfig();
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        .games-container {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .games-hero {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(25, 118, 210, 0.3);
        }

        .games-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .games-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .games-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 20px;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .game-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .game-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(25, 118, 210, 0.15);
          border-color: #1976d2;
        }

        .game-card:hover::before {
          transform: scaleX(1);
        }

        .game-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
          display: block;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .game-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 12px;
        }

        .game-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .game-features {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .feature-tag {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          color: #1976d2;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .game-difficulty {
          display: flex;
          gap: 5px;
          margin-bottom: 20px;
        }

        .difficulty-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: all 0.3s ease;
        }

        .difficulty-dot.active {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          transform: scale(1.2);
        }

        .play-btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .play-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(25, 118, 210, 0.4);
        }

        .game-area {
          background: white;
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: none;
          position: relative;
        }

        .game-area.active {
          display: block;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .game-header {
          margin-bottom: 30px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 25px;
          border-radius: 20px;
          border: 1px solid rgba(25, 118, 210, 0.1);
        }

        .game-score {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 10px;
        }

        .game-timer {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 15px;
        }

        .game-progress {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          transition: width 0.3s ease;
        }

        .game-board {
          margin: 30px 0;
          padding: 30px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 20px;
          border: 1px solid rgba(25, 118, 210, 0.1);
        }

        .memory-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 450px;
          margin: 0 auto;
        }

        .memory-card {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.2rem;
          cursor: pointer;
          transition: all 0.4s ease;
          transform-style: preserve-3d;
          position: relative;
        }

        .memory-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
        }

        .memory-card.flipped {
          background: linear-gradient(135deg, #4caf50, #45a049);
          transform: rotateY(180deg);
        }

        .memory-card.matched {
          background: linear-gradient(135deg, #4caf50, #45a049);
          opacity: 0.8;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .puzzle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          max-width: 350px;
          margin: 0 auto;
        }

        .puzzle-tile {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.2);
        }

        .puzzle-tile:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(25, 118, 210, 0.3);
        }

        .puzzle-tile.empty {
          background: transparent;
          border: 2px dashed #ccc;
          box-shadow: none;
        }

        .math-problem {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin: 30px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .math-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 400px;
          margin: 0 auto;
        }

        .math-option {
          padding: 20px;
          font-size: 1.5rem;
          border: 3px solid #1976d2;
          background: white;
          color: #1976d2;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .math-option:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
        }

        .math-option.correct {
          background: linear-gradient(135deg, #4caf50, #45a049);
          color: white;
          border-color: #4caf50;
        }

        .math-option.incorrect {
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
          border-color: #f44336;
        }

        .word-display {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin: 30px 0;
          letter-spacing: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .word-keyboard {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }

        .letter-btn {
          padding: 15px;
          border: 2px solid #1976d2;
          background: white;
          color: #1976d2;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .letter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(25, 118, 210, 0.3);
        }

        .letter-btn.used {
          background: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          transform: none;
        }

        .letter-btn.correct {
          background: linear-gradient(135deg, #4caf50, #45a049);
          color: white;
          border-color: #4caf50;
        }

        .letter-btn.incorrect {
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
          border-color: #f44336;
        }

        .back-btn {
          background: linear-gradient(135deg, #666, #555);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 30px;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .game-info {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }

        .game-level {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1976d2;
        }

        .game-target {
          font-size: 1rem;
          font-weight: 600;
          color: #ff9800;
          text-align: center;
          margin: 10px 0;
          padding: 8px 15px;
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          border-radius: 15px;
          border: 2px solid #ff9800;
        }

        #levelDescription {
          font-size: 0.9rem;
          color: #666;
          font-weight: 400;
        }

        .game-controls {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;
        }

        .game-btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .game-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(25, 118, 210, 0.3);
        }

        .continue-btn {
          background: linear-gradient(135deg, #4caf50, #45a049);
        }

        .continue-btn:hover {
          box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
        }

        .restart-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
        }

        .restart-btn:hover {
          box-shadow: 0 6px 15px rgba(255, 152, 0, 0.3);
        }

        .word-restart-btn {
          background: linear-gradient(135deg, #4caf50, #45a049);
        }

        .word-restart-btn:hover {
          box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
        }

        .game-over-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(10px);
        }

        .modal-content {
          background: white;
          border-radius: 25px;
          padding: 40px;
          text-align: center;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 20px;
        }

        .modal-score {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 30px;
        }

        .modal-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .modal-btn {
          padding: 12px 25px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .play-again-btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
        }

        .close-btn {
          background: #666;
          color: white;
        }

        @media (max-width: 768px) {
          .games-grid {
            grid-template-columns: 1fr;
          }
          
          .games-title {
            font-size: 2rem;
          }
          
          .stats-bar {
            flex-direction: column;
            gap: 15px;
          }
          
          .memory-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .memory-card {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }
          
          .puzzle-tile {
            width: 80px;
            height: 80px;
            font-size: 1.5rem;
          }
        }
      </style>

      <div class="games-container">
        <div class="games-hero">
          <div class="hero-content">
            <h1 class="games-title">🎮 Brain Training Games</h1>
            <p class="games-subtitle">Keep your mind sharp and have fun with these engaging games!</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">6</span>
                <span class="stat-label">Games Available</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">∞</span>
                <span class="stat-label">Fun Unlimited</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">🧠</span>
                <span class="stat-label">Brain Exercise</span>
              </div>
            </div>
          </div>
        </div>

        <div class="games-grid" id="gamesGrid">
          <div class="game-card" data-game="memory">
            <i class="bi bi-lightbulb game-icon"></i>
            <h3 class="game-title">Memory Match</h3>
            <p class="game-description">Find matching pairs of cards to test your memory and concentration skills.</p>
            <div class="game-features">
              <span class="feature-tag">Memory</span>
              <span class="feature-tag">Concentration</span>
              <span class="feature-tag">Visual</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="puzzle">
            <i class="bi bi-grid-3x3 game-icon"></i>
            <h3 class="game-title">Sliding Puzzle</h3>
            <p class="game-description">Arrange the numbers in order by sliding tiles. Great for problem solving!</p>
            <div class="game-features">
              <span class="feature-tag">Logic</span>
              <span class="feature-tag">Problem Solving</span>
              <span class="feature-tag">Spatial</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="math">
            <i class="bi bi-calculator game-icon"></i>
            <h3 class="game-title">Math Challenge</h3>
            <p class="game-description">Solve math problems quickly to keep your brain sharp and active.</p>
            <div class="game-features">
              <span class="feature-tag">Math</span>
              <span class="feature-tag">Speed</span>
              <span class="feature-tag">Calculation</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="word">
            <i class="bi bi-type game-icon"></i>
            <h3 class="game-title">Word Search</h3>
            <p class="game-description">Find hidden words in a grid of letters. Perfect for vocabulary building!</p>
            <div class="game-features">
              <span class="feature-tag">Vocabulary</span>
              <span class="feature-tag">Language</span>
              <span class="feature-tag">Pattern</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="color">
            <i class="bi bi-palette game-icon"></i>
            <h3 class="game-title">Color Match</h3>
            <p class="game-description">Match colors quickly to test your reflexes and visual processing.</p>
            <div class="game-features">
              <span class="feature-tag">Reflexes</span>
              <span class="feature-tag">Visual</span>
              <span class="feature-tag">Speed</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="sequence">
            <i class="bi bi-list-ol game-icon"></i>
            <h3 class="game-title">Sequence Memory</h3>
            <p class="game-description">Remember and repeat sequences to improve your working memory.</p>
            <div class="game-features">
              <span class="feature-tag">Memory</span>
              <span class="feature-tag">Sequence</span>
              <span class="feature-tag">Focus</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>

          <div class="game-card" data-game="crossword">
            <i class="bi bi-list-ol game-icon"></i>
            <h3 class="game-title">Crossword Puzzle</h3>
            <p class="game-description">Complete the crossword puzzle to test your vocabulary and problem-solving skills.</p>
            <div class="game-features">
              <span class="feature-tag">Vocabulary</span>
              <span class="feature-tag">Knowledge</span>
              <span class="feature-tag">Problem Solving</span>
            </div>
            <div class="game-difficulty">
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
              <span class="difficulty-dot active"></span>
            </div>
            <button class="play-btn">
              <i class="bi bi-play-circle"></i>
              Play Now
            </button>
          </div>
        </div>

        <div class="game-area" id="gameArea">
          <div class="game-header">
            <h2 id="currentGameTitle">Game Title</h2>
            <div class="game-info">
              <div class="game-score">Score: <span id="gameScore">0</span></div>
              <div class="game-level">Level: <span id="gameLevel">1</span> <span id="levelDescription">(Beginner)</span></div>
              <div class="game-timer">Time: <span id="gameTimer">60</span>s</div>
            </div>
            <div class="game-target">
              Target: <span id="gameTarget">25</span> pts
            </div>
            <div class="game-progress">
              <div class="progress-bar" id="progressBar" style="width: 100%"></div>
            </div>
          </div>
          
          <div class="game-board" id="gameBoard">
            <!-- Game content will be loaded here -->
          </div>
          
          <div class="game-controls">
            <button class="game-btn continue-btn" id="continueBtn" style="display: none;">
              <i class="bi bi-arrow-right-circle"></i>
              Continue
            </button>
            <button class="game-btn restart-btn" id="restartBtn" style="display: none;">
              <i class="bi bi-play-circle"></i>
              Restart
            </button>
            <button class="back-btn" id="backBtn">
              <i class="bi bi-arrow-left"></i>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const gameCards = this.shadowRoot.querySelectorAll('.game-card');
    const backBtn = this.shadowRoot.querySelector('#backBtn');
    const continueBtn = this.shadowRoot.querySelector('#continueBtn');
    const restartBtn = this.shadowRoot.querySelector('#restartBtn');
    const gamesGrid = this.shadowRoot.querySelector('#gamesGrid');
    const gameArea = this.shadowRoot.querySelector('#gameArea');

    gameCards.forEach(card => {
      card.addEventListener('click', () => {
        const gameType = card.dataset.game;
        this.startGame(gameType);
      });
    });

    backBtn.addEventListener('click', () => {
      this.showGamesList();
    });

    continueBtn.addEventListener('click', () => {
      this.continueGame();
    });

    restartBtn.addEventListener('click', () => {
      this.restartGame();
    });
  }

  startGame(gameType, continueMode = false) {
    this.currentGame = gameType;
    
    if (!continueMode) {
      this.score = 0;
      this.level = 1;
    }
    
    this.updateScore();
    
    const gamesGrid = this.shadowRoot.querySelector('#gamesGrid');
    const gameArea = this.shadowRoot.querySelector('#gameArea');
    const gameBoard = this.shadowRoot.querySelector('#gameBoard');
    const currentGameTitle = this.shadowRoot.querySelector('#currentGameTitle');

    gamesGrid.style.display = 'none';
    gameArea.classList.add('active');
    this.hideContinueButtons();

    switch(gameType) {
      case 'memory':
        currentGameTitle.textContent = 'Memory Match';
        this.startMemoryGame(gameBoard);
        break;
      case 'puzzle':
        currentGameTitle.textContent = 'Sliding Puzzle';
        this.startPuzzleGame(gameBoard);
        break;
      case 'math':
        currentGameTitle.textContent = 'Math Challenge';
        this.startMathGame(gameBoard);
        break;
      case 'word':
        currentGameTitle.textContent = 'Word Search';
        this.startWordGame(gameBoard);
        break;
      case 'color':
        currentGameTitle.textContent = 'Color Match';
        this.startColorGame(gameBoard);
        break;
      case 'sequence':
        currentGameTitle.textContent = 'Sequence Memory';
        this.startSequenceGame(gameBoard);
        break;
    }

    this.startTimer();
  }

  startMemoryGame(container) {
    const levelConfig = this.getCurrentLevelConfig();
    const difficulty = levelConfig.difficulty;
    
    // Increase symbols based on difficulty
    const baseSymbols = ['🎮', '🏥', '💊', '❤️', '👨‍⚕️', '👴', '🏠', '📱', '🩺', '🏥', '💉', '🩹', '🦴', '🧠', '🫀', '🫁'];
    const symbols = baseSymbols.slice(0, Math.min(4 + difficulty, 16));
    const cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    container.innerHTML = `
      <div class="memory-grid">
        ${cards.map((symbol, index) => `
          <div class="memory-card" data-index="${index}" data-symbol="${symbol}">
            ?
          </div>
        `).join('')}
      </div>
    `;

    const memoryCards = container.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
      card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
          card.classList.add('flipped');
          card.textContent = card.dataset.symbol;
          flippedCards.push(card);

          if (flippedCards.length === 2) {
            setTimeout(() => {
              if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                flippedCards.forEach(c => c.classList.add('matched'));
                matchedPairs++;
                this.score += 10;
                this.updateScore();
                
                if (matchedPairs === symbols.length) {
                  this.level++; // Increment level when player wins
                  this.updateScore();
                  this.showContinueButtons();
                  setTimeout(() => {
                    this.endGame();
                  }, 1000);
                }
              } else {
                flippedCards.forEach(c => {
                  c.classList.remove('flipped');
                  c.textContent = '?';
                });
              }
              flippedCards = [];
            }, 1000);
          }
        }
      });
    });
  }

  startPuzzleGame(container) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, ''];
    let currentState = [...numbers];
    
    // Shuffle
    for (let i = currentState.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentState[i], currentState[j]] = [currentState[j], currentState[i]];
    }

    const renderPuzzle = () => {
      container.innerHTML = `
        <div class="puzzle-grid">
          ${currentState.map((num, index) => `
            <div class="puzzle-tile ${num === '' ? 'empty' : ''}" data-index="${index}">
              ${num}
            </div>
          `).join('')}
        </div>
      `;

      const tiles = container.querySelectorAll('.puzzle-tile');
      tiles.forEach(tile => {
        tile.addEventListener('click', () => {
          const index = parseInt(tile.dataset.index);
          const emptyIndex = currentState.indexOf('');
          
          if (this.canMove(index, emptyIndex)) {
            [currentState[index], currentState[emptyIndex]] = [currentState[emptyIndex], currentState[index]];
            this.score += 5;
            this.updateScore();
            renderPuzzle();
            
            if (this.isPuzzleSolved()) {
              this.level++; // Increment level when player wins
              this.updateScore();
              this.endGame();
            }
          }
        });
      });
    };

    renderPuzzle();
  }

  canMove(index, emptyIndex) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    
    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
           (Math.abs(col - emptyCol) === 1 && row === emptyRow);
  }

  isPuzzleSolved() {
    const solution = [1, 2, 3, 4, 5, 6, 7, 8, ''];
    return currentState.every((num, index) => num === solution[index]);
  }

  startMathGame(container) {
    let currentProblem = this.generateMathProblem();
    let timeLeft = 30;
    let questionsAnswered = 0; // Track number of questions answered

    const renderProblem = () => {
      container.innerHTML = `
        <div class="math-problem">
          ${currentProblem.question} = ?
        </div>
        <div class="math-options">
          ${currentProblem.options.map(option => `
            <button class="math-option" data-answer="${option}">
              ${option}
            </button>
          `).join('')}
        </div>
      `;

      const buttons = container.querySelectorAll('.math-option');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const answer = parseInt(button.dataset.answer);
          if (answer === currentProblem.answer) {
            this.score += 10;
            this.updateScore();
            button.classList.add('correct');
          } else {
            button.classList.add('incorrect');
          }
          
          setTimeout(() => {
            this.score += 5; // Bonus for correct answer
            this.updateScore();
            
            questionsAnswered++; // Increment questions counter
            
            // Check if we should continue to next level (after 5 questions)
            if (questionsAnswered >= 5) {
              const levelConfig = this.getCurrentLevelConfig();
              this.score += levelConfig.bonus; // Add level completion bonus
              this.level++; // Increment level when player wins
              this.updateScore();
              this.showContinueButtons();
              setTimeout(() => {
                this.endGame();
              }, 1000);
            } else {
              currentProblem = this.generateMathProblem();
              renderProblem();
            }
          }, 1000);
        });
      });
    };

    renderProblem();
  }

  generateMathProblem() {
    const levelConfig = this.getCurrentLevelConfig();
    const difficulty = levelConfig.difficulty;
    
    // Increase number range based on difficulty
    const maxNumber = 10 + (difficulty * 5);
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    
    // Add more operations based on difficulty
    let operations = ['+', '-'];
    if (difficulty >= 3) operations.push('*');
    if (difficulty >= 5) operations.push('/');
    if (difficulty >= 7) operations.push('**');
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    switch(operation) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      case '/': 
        // Ensure division results in whole numbers
        answer = num1;
        num1 = num1 * num2;
        break;
      case '**': answer = Math.pow(num1, Math.min(num2, 3)); break; // Limit power to avoid huge numbers
    }
    
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    return {
      question: `${num1} ${operation} ${num2}`,
      answer: answer,
      options: options
    };
  }

  startWordGame(container) {
    const words = ['HEALTH', 'CARE', 'DOCTOR', 'MEDICINE', 'PATIENT', 'HOSPITAL', 'CONNECT', 'PILLS', 'NURSE', 'CAREGIVER', 'LOVE', 'EXERCISE', 'MEALS'];
    this.currentWord = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = new Set();
    let wrongGuesses = 0;
    const maxWrongGuesses = 6;
    let gameEnded = false;

    const renderWordGame = () => {
      const displayWord = this.currentWord.split('').map(letter => 
        guessedLetters.has(letter) ? letter : '_'
      ).join(' ');

      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
      container.innerHTML = `
        <div class="word-display">
          ${displayWord}
        </div>
        <div style="margin: 20px 0; font-size: 1.2rem; color: #666;">
          Wrong guesses: ${wrongGuesses}/${maxWrongGuesses}
        </div>
        <div class="word-keyboard">
          ${alphabet.split('').map(letter => `
            <button class="letter-btn ${guessedLetters.has(letter) ? 'used' : ''}" data-letter="${letter}" ${guessedLetters.has(letter) ? 'disabled' : ''}>
              ${letter}
            </button>
          `).join('')}
        </div>
      `;

      const letterButtons = container.querySelectorAll('.letter-btn');
      letterButtons.forEach(button => {
        button.addEventListener('click', () => {
          if (gameEnded) {
            return;
          }
          const letter = button.dataset.letter;
          guessedLetters.add(letter);
          
          if (this.currentWord.includes(letter)) {
            this.score += 5;
            this.updateScore();
            button.classList.add('correct');
          } else {
            wrongGuesses++;
            button.classList.add('incorrect');
          }
          
          // Check win/loss conditions immediately
          const hasWon = this.currentWord.split('').every(letter => guessedLetters.has(letter));
          const hasLost = wrongGuesses >= maxWrongGuesses;
          
                    if (hasWon || hasLost) {
            // Set game ended immediately to prevent further interaction
            gameEnded = true;
            
            // Stop the timer when game ends
            if (this.gameTimer) {
              clearInterval(this.gameTimer);
              this.gameTimer = null;
            }

            setTimeout(() => {
              if (hasWon) {
                this.score += 20;
                this.level++; // Increment level when player wins
                this.updateScore();
                this.showWordGameResult(true);
              } else {
                this.showWordGameResult(false);
              }
            }, 1000);
          } else {
            setTimeout(() => {
              renderWordGame();
            }, 1000);
          }
        });
      });
    };

    renderWordGame();
  }

  showWordGameResult(won) {
    // Clear the timer when showing result
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    
    const container = this.shadowRoot.querySelector('#gameBoard');
    
    const resultTitle = won ? '🎉 Congratulations! You Won!' : '😔 Try Again!';
    const resultMessage = won ? `You found the word: ${this.currentWord}` : `The word was: ${this.currentWord}`;
    
    container.innerHTML = `
      <div style="text-align: center; margin: 30px 0;">
        <h2 style="font-size: 2.5rem; font-weight: 700; color: ${won ? '#4caf50' : '#f44336'}; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          ${resultTitle}
        </h2>
        <div style="font-size: 1.5rem; color: #333; margin-bottom: 30px; font-weight: 600;">
          ${resultMessage}
        </div>
        <div style="font-size: 1.2rem; color: #666; margin-bottom: 40px;">
          Final Score: ${this.score} points
        </div>
      </div>
    `;
    
    // Show custom buttons for Word Search game
    this.showWordGameButtons();
  }

  startColorGame(container) {
    const colors = ['#ff4757', '#2ed573', '#3742fa', '#ffa502', '#ff6348', '#5352ed'];
    let currentColor = '';
    let colorName = '';
    let timeLeft = 30;
    let gameInterval;

    const colorNames = {
      '#ff4757': 'RED',
      '#2ed573': 'GREEN', 
      '#3742fa': 'BLUE',
      '#ffa502': 'ORANGE',
      '#ff6348': 'CORAL',
      '#5352ed': 'PURPLE'
    };

    const startRound = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomName = Object.values(colorNames)[Math.floor(Math.random() * Object.values(colorNames).length)];
      
      currentColor = randomColor;
      colorName = randomName;

      container.innerHTML = `
        <div style="margin: 30px 0;">
          <div style="font-size: 2.5rem; font-weight: 700; color: ${currentColor}; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ${colorName}
          </div>
          <div style="font-size: 1.2rem; color: #666; margin-bottom: 30px;">
            Click the button that matches the COLOR of the text
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 400px; margin: 0 auto;">
            ${colors.slice(0, 4).map(color => `
              <button class="math-option" style="background: ${color}; color: white; border-color: ${color};" data-color="${color}">
                ${colorNames[color]}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      const colorButtons = container.querySelectorAll('.math-option');
      colorButtons.forEach(button => {
        button.addEventListener('click', () => {
          const selectedColor = button.dataset.color;
          if (selectedColor === currentColor) {
            this.score += 10;
            this.updateScore();
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          } else {
            button.style.transform = 'scale(0.95)';
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }
          
          setTimeout(() => {
            startRound();
          }, 1000);
        });
      });
    };

    startRound();
    
    // Timer for color game
    gameInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        this.endGame();
      }
    }, 1000);
  }

  startSequenceGame(container) {
    const levelConfig = this.getCurrentLevelConfig();
    const difficulty = levelConfig.difficulty;
    
    let sequence = [];
    let playerSequence = [];
    
    // Increase sequence length based on difficulty
    const baseLength = 3 + Math.floor(difficulty / 2);
    const maxLength = Math.min(baseLength, 15); // Cap at 15
    let isShowingSequence = false;

    const colors = ['#ff4757', '#2ed573', '#3742fa', '#ffa502'];
    const colorNames = ['RED', 'GREEN', 'BLUE', 'ORANGE'];

    const showSequence = () => {
      isShowingSequence = true;
      let i = 0;
      
      const showNext = () => {
        if (i < sequence.length) {
          container.innerHTML = `
            <div style="margin: 30px 0;">
              <div style="font-size: 2rem; color: #333; margin-bottom: 20px;">
                Remember the sequence!
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 300px; margin: 0 auto;">
                ${colors.map((color, index) => `
                  <button class="math-option" style="background: ${color}; color: white; border-color: ${color}; opacity: ${sequence[i] === index ? '1' : '0.3'};" data-index="${index}">
                    ${colorNames[index]}
                  </button>
                `).join('')}
              </div>
            </div>
          `;
          
          setTimeout(() => {
            i++;
            showNext();
          }, 800);
        } else {
          isShowingSequence = false;
          showPlayerInput();
        }
      };
      
      showNext();
    };

    const showPlayerInput = () => {
      container.innerHTML = `
        <div style="margin: 30px 0;">
          <div style="font-size: 2rem; color: #333; margin-bottom: 20px;">
            Repeat the sequence!
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 300px; margin: 0 auto;">
            ${colors.map((color, index) => `
              <button class="math-option" style="background: ${color}; color: white; border-color: ${color};" data-index="${index}">
                ${colorNames[index]}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      const buttons = container.querySelectorAll('.math-option');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          if (!isShowingSequence) {
            const index = parseInt(button.dataset.index);
            playerSequence.push(index);
            
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
            
            setTimeout(() => {
              button.style.transform = 'scale(1)';
              button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }, 200);
            
            // Check if sequence is correct
            if (playerSequence.length === sequence.length) {
              const isCorrect = playerSequence.every((val, i) => val === sequence[i]);
              
              if (isCorrect) {
                this.score += this.level * 10;
                this.updateScore();
                this.level++; // Increment level when player wins
                
                // Continue to next level or end game
                const levelConfig = this.getCurrentLevelConfig();
                if (this.score >= levelConfig.scoreTarget) {
                  this.score += levelConfig.bonus; // Add level completion bonus
                  this.updateScore();
                  this.showContinueButtons();
                  setTimeout(() => {
                    this.endGame();
                  }, 1000);
                } else {
                  sequence.push(Math.floor(Math.random() * 4));
                  playerSequence = [];
                  setTimeout(() => {
                    showSequence();
                  }, 1000);
                }
              } else {
                this.endGame();
              }
            }
          }
        });
      });
    };

    // Start the game
    sequence.push(Math.floor(Math.random() * 4));
    showSequence();
  }

  startTimer() {
    const levelConfig = this.getCurrentLevelConfig();
    let timeLeft = levelConfig.timeLimit;
    const timerElement = this.shadowRoot.querySelector('#gameTimer');
    const progressBar = this.shadowRoot.querySelector('#progressBar');
    
    // Update timer display with level info
    timerElement.textContent = timeLeft;
    
    this.gameTimer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      
      // Update progress bar
      const progress = (timeLeft / levelConfig.timeLimit) * 100;
      progressBar.style.width = `${progress}%`;
      
      // Change color based on time remaining
      if (timeLeft <= 10) {
        progressBar.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
      } else if (timeLeft <= 30) {
        progressBar.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
      } else {
        progressBar.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
      }
      
      if (timeLeft <= 0) {
        // For Word Search game, show lose screen when timer runs out
        if (this.currentGame === 'word') {
          this.showWordGameResult(false);
        } else {
          this.endGame();
        }
      }
    }, 1000);
  }

  updateScore() {
    const scoreElement = this.shadowRoot.querySelector('#gameScore');
    const levelElement = this.shadowRoot.querySelector('#gameLevel');
    const levelDescriptionElement = this.shadowRoot.querySelector('#levelDescription');
    const targetElement = this.shadowRoot.querySelector('#gameTarget');
    
    const levelConfig = this.getCurrentLevelConfig();
    
    scoreElement.textContent = this.score;
    levelElement.textContent = this.level;
    levelDescriptionElement.textContent = `(${levelConfig.description})`;
    targetElement.textContent = levelConfig.scoreTarget;
  }

  endGame() {
    clearInterval(this.gameTimer);
    
    const levelConfig = this.getCurrentLevelConfig();
    const nextLevel = this.level + 1;
    const nextLevelConfig = this.levelConfig[nextLevel] || levelConfig;
    
    const modalHTML = `
      <div class="game-over-modal">
        <div class="modal-content">
          <h2 class="modal-title">🎉 Level ${this.level} Complete!</h2>
          <div class="modal-score">
            <div style="font-size: 3rem; color: #1976d2; margin-bottom: 10px;">🏆</div>
            <div style="font-size: 2rem; font-weight: 700; color: #333; margin-bottom: 10px;">
              Score: ${this.score}
            </div>
            <div style="font-size: 1.1rem; color: #666; margin-bottom: 15px;">
              ${levelConfig.description} Level - Great job!
            </div>
            ${nextLevel <= this.maxLevel ? `
              <div style="background: linear-gradient(135deg, #4caf50, #45a049); color: white; padding: 15px; border-radius: 15px; margin: 15px 0;">
                <div style="font-weight: 600; margin-bottom: 5px;">Next Level: ${nextLevel}</div>
                <div style="font-size: 0.9rem;">${nextLevelConfig.description} - ${nextLevelConfig.timeLimit}s - Target: ${nextLevelConfig.scoreTarget}pts</div>
              </div>
            ` : `
              <div style="background: linear-gradient(135deg, #ff9800, #f57c00); color: white; padding: 15px; border-radius: 15px; margin: 15px 0;">
                <div style="font-weight: 600;">🎉 Congratulations! You've reached the maximum level!</div>
              </div>
            `}
          </div>
          <div class="modal-buttons">
            ${nextLevel <= this.maxLevel ? `
              <button class="modal-btn continue-btn" id="modalContinueBtn">
                <i class="bi bi-arrow-right-circle"></i>
                Continue to Level ${nextLevel}
              </button>
            ` : `
              <button class="modal-btn continue-btn" id="modalPlayAgainBtn">
                <i class="bi bi-trophy"></i>
                Play Again
              </button>
            `}
            <button class="modal-btn play-again-btn" id="modalRestartBtn">
              <i class="bi bi-play-circle"></i>
              Restart Game
            </button>
            <button class="modal-btn close-btn" id="modalBackBtn">
              <i class="bi bi-x-circle"></i>
              Back to Games
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Insert modal within the shadow DOM instead of document.body
    this.shadowRoot.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners for modal buttons
    const modalContinueBtn = this.shadowRoot.querySelector('#modalContinueBtn');
    const modalPlayAgainBtn = this.shadowRoot.querySelector('#modalPlayAgainBtn');
    const modalRestartBtn = this.shadowRoot.querySelector('#modalRestartBtn');
    const modalBackBtn = this.shadowRoot.querySelector('#modalBackBtn');
    
    if (modalContinueBtn) {
      modalContinueBtn.addEventListener('click', () => {
        this.shadowRoot.querySelector('.game-over-modal').remove();
        this.shadowRoot.querySelector('#continueBtn').click();
      });
    }
    
    if (modalPlayAgainBtn) {
      modalPlayAgainBtn.addEventListener('click', () => {
        this.shadowRoot.querySelector('.game-over-modal').remove();
        this.shadowRoot.querySelector('#restartBtn').click();
      });
    }
    
    if (modalRestartBtn) {
      modalRestartBtn.addEventListener('click', () => {
        this.shadowRoot.querySelector('.game-over-modal').remove();
        this.shadowRoot.querySelector('#restartBtn').click();
      });
    }
    
    if (modalBackBtn) {
      modalBackBtn.addEventListener('click', () => {
        this.shadowRoot.querySelector('.game-over-modal').remove();
        this.shadowRoot.querySelector('#backBtn').click();
      });
    }
  }

  continueGame() {
    this.level++;
    const levelConfig = this.getCurrentLevelConfig();
    this.score += levelConfig.bonus; // Bonus for continuing
    this.updateScore();
    
    // Clear the existing timer before starting the new level
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    
    // Restart the current game with increased difficulty
    const gameBoard = this.shadowRoot.querySelector('#gameBoard');
    
    if (this.currentGame) {
      this.hideContinueButtons();
      
      switch(this.currentGame) {
        case 'memory':
          this.startMemoryGame(gameBoard);
          break;
        case 'puzzle':
          this.startPuzzleGame(gameBoard);
          break;
        case 'math':
          this.startMathGame(gameBoard);
          break;
        case 'word':
          this.startWordGame(gameBoard);
          break;
        case 'color':
          this.startColorGame(gameBoard);
          break;
        case 'sequence':
          this.startSequenceGame(gameBoard);
          break;
      }
      
      // Restart the timer for the new level
      this.startTimer();
    }
  }

  restartGame() {
    this.score = 0;
    this.level = 1;
    this.updateScore();
    
    // Restart the current game
    if (this.currentGame) {
      this.hideContinueButtons();
      this.startGame(this.currentGame, false); // false = restart mode
    }
  }

  showContinueButtons() {
    const continueBtn = this.shadowRoot.querySelector('#continueBtn');
    const restartBtn = this.shadowRoot.querySelector('#restartBtn');
    
    continueBtn.style.display = 'flex';
    restartBtn.style.display = 'flex';
  }

  hideContinueButtons() {
    const continueBtn = this.shadowRoot.querySelector('#continueBtn');
    const restartBtn = this.shadowRoot.querySelector('#restartBtn');
    
    continueBtn.style.display = 'none';
    restartBtn.style.display = 'none';
  }

  generateLevelConfig() {
    const config = {};
    
    for (let level = 1; level <= this.maxLevel; level++) {
      config[level] = {
        timeLimit: Math.max(30, 120 - (level * 2)), // Disminuye el tiempo por nivel
        scoreTarget: level * 25, // Puntuación objetivo por nivel
        difficulty: Math.min(10, Math.floor(level / 5) + 1), // Dificultad 1-10
        bonus: level * 10, // Bonus por completar el nivel
        description: this.getLevelDescription(level)
      };
    }
    
    return config;
  }

  getLevelDescription(level) {
    const descriptions = [
      "Beginner", "Novice", "Apprentice", "Student", "Learner",
      "Intermediate", "Practitioner", "Skilled", "Advanced", "Expert",
      "Master", "Grandmaster", "Champion", "Legend", "Hero",
      "Veteran", "Elite", "Pro", "Ace", "Star",
      "Diamond", "Platinum", "Gold", "Silver", "Bronze",
      "Iron", "Steel", "Titanium", "Carbon", "Neon",
      "Quantum", "Atomic", "Molecular", "Cellular", "Neural",
      "Digital", "Virtual", "Cyber", "Tech", "Future",
      "Ultimate", "Supreme", "Divine", "Mythic", "Eternal",
      "Infinite", "Cosmic", "Universal", "Omnipotent", "Godlike"
    ];
    
    return descriptions[Math.min(level - 1, descriptions.length - 1)];
  }

  getCurrentLevelConfig() {
    return this.levelConfig[this.level] || this.levelConfig[1];
  }

  showWordGameButtons() {
    const gameControls = this.shadowRoot.querySelector('.game-controls');
    
    // Hide default buttons
    const continueBtn = this.shadowRoot.querySelector('#continueBtn');
    const restartBtn = this.shadowRoot.querySelector('#restartBtn');
    const backBtn = this.shadowRoot.querySelector('#backBtn');
    
    if (continueBtn) continueBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    
    // Create custom buttons for Word Search
    gameControls.innerHTML = `
      <button class="game-btn word-restart-btn" id="wordRestartBtn">
        <i class="bi bi-play-circle"></i>
        Restart
      </button>
      <button class="back-btn" id="wordBackBtn">
        <i class="bi bi-arrow-left"></i>
        Back to Games
      </button>
    `;
    
    // Add event listeners for Word Search buttons
    const wordRestartBtn = this.shadowRoot.querySelector('#wordRestartBtn');
    const wordBackBtn = this.shadowRoot.querySelector('#wordBackBtn');
    
    wordRestartBtn.addEventListener('click', () => {
      this.restartWordGame();
    });
    
    wordBackBtn.addEventListener('click', () => {
      this.showGamesList();
    });
  }

    restartWordGame() {
    // Hide the Restart button immediately when clicked
    const wordRestartBtn = this.shadowRoot.querySelector('#wordRestartBtn');
    if (wordRestartBtn) {
      wordRestartBtn.style.display = 'none';
    }
    
    // Reset score and level for Word Search
    this.score = 0;
    this.level = 1;
    this.updateScore();

    // Reset and restart the timer for Word Search
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    this.startTimer();

    // Restart the Word Search game
    const gameBoard = this.shadowRoot.querySelector('#gameBoard');
    this.startWordGame(gameBoard);
  }

  showGamesList() {
    const gamesGrid = this.shadowRoot.querySelector('#gamesGrid');
    const gameArea = this.shadowRoot.querySelector('#gameArea');
    
    gamesGrid.style.display = 'grid';
    gameArea.classList.remove('active');
    
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
    }
  }
}

customElements.define('games-section', GamesSection); 