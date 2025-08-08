class WelcomeOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.initializeAnimations();
    setTimeout(() => this.hide(), 4000); // Aumentado a 4 segundos para mejor experiencia
  }
  
  hide() {
    const overlay = this.shadowRoot.querySelector('.overlay');
    const card = this.shadowRoot.querySelector('.welcome-card');
    const particles = this.shadowRoot.querySelectorAll('.particle');
    
    // Animación de salida mejorada
    overlay.style.animation = 'fadeOut 1.2s ease-out forwards';
    card.style.animation = 'slideOutUp 1s ease-in-out forwards';
    
    // Animar partículas hacia afuera
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.style.animation = `particleOut 0.8s ease-out ${index * 0.1}s forwards`;
      }, 200);
    });
    
    setTimeout(() => this.remove(), 1200);
  }
  
  getUserData() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === loggedInUser);
      const displayName = user ? (user.name || user.username) : loggedInUser;
      
      // Saludos dinámicos según la hora del día
      const hour = new Date().getHours();
      let greeting = 'Great to see you again!';
      let emoji = '💙';
      
      if (hour < 12) {
        greeting = 'Good morning!';
        emoji = '🌅';
      } else if (hour < 17) {
        greeting = 'Good afternoon!';
        emoji = '☀️';
      } else {
        greeting = 'Good evening!';
        emoji = '🌙';
      }
      
      return {
        name: displayName,
        greeting: greeting,
        message: 'We hope you have a wonderful day',
        emoji: emoji
      };
    }
    return {
      name: '',
      greeting: 'Welcome!',
      message: 'Please sign in for a personalized experience',
      emoji: '💙'
    };
  }
  
  initializeAnimations() {
    const particles = this.shadowRoot.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.style.animation = `particleFloat 3s ease-in-out infinite ${index * 0.2}s`;
      }, 500);
    });
  }
  
  render() {
    const userData = this.getUserData();
    this.shadowRoot.innerHTML = `
      <style>
        /* Google Fonts loaded via CDN in HTML head */
        
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 1s ease-out;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }
        
        .welcome-card {
          background: rgba(255,255,255,0.95);
          padding: 50px 40px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 25px 80px rgba(0,0,0,0.15);
          max-width: 450px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          animation: slideInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          z-index: 10;
        }
        
        .welcome-icon {
          font-size: 56px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 25px;
          display: block;
          animation: iconPulse 2s ease-in-out infinite;
        }
        
        .welcome-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #1976d2;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }
        .welcome-greeting {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1565c0;
          margin-bottom: 14px;
        }
        .welcome-name {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          animation: textSlideIn 1s ease-out 0.5s both;
        }
        
        .welcome-message {
          font-size: 1.6rem;
          color: #1976d2;
          margin-bottom: 28px;
        }
        
        .welcome-emoji {
          font-size: 28px;
          margin: 0 8px;
          animation: emojiBounce 2s ease-in-out infinite;
        }
        
        /* Partículas flotantes */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          animation: particleFloat 4s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 85%; animation-delay: 0.5s; }
        .particle:nth-child(3) { top: 80%; left: 20%; animation-delay: 1s; }
        .particle:nth-child(4) { top: 30%; left: 80%; animation-delay: 1.5s; }
        .particle:nth-child(5) { top: 70%; left: 5%; animation-delay: 2s; }
        .particle:nth-child(6) { top: 10%; left: 60%; animation-delay: 2.5s; }
        
        /* Animaciones */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes emojiBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-15px) translateX(15px);
            opacity: 0.9;
          }
        }
        
        @keyframes fadeOut {
          to { opacity: 0; }
        }
        
        @keyframes slideOutUp {
          to {
            opacity: 0;
            transform: translateY(-60px) scale(0.9);
          }
        }
        
        @keyframes particleOut {
          to {
            opacity: 0;
            transform: translateY(-50px) translateX(20px) scale(0);
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .welcome-card {
            padding: 40px 30px;
            max-width: 380px;
            margin: 0 20px;
          }
          
          .welcome-icon {
            font-size: 48px;
          }
          
          .welcome-greeting {
            font-size: 28px;
          }
          
          .welcome-name {
            font-size: 32px;
          }
          
          .welcome-message {
            font-size: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .welcome-card {
            padding: 35px 25px;
            max-width: 320px;
          }
          
          .welcome-icon {
            font-size: 42px;
          }
          
          .welcome-greeting {
            font-size: 24px;
          }
          
          .welcome-name {
            font-size: 28px;
          }
          
          .welcome-message {
            font-size: 15px;
          }
        }
      </style>
      
      <div class="overlay">
        <!-- Partículas flotantes -->
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        
        <div class="welcome-card">
          <i class="bi bi-heart-fill welcome-icon"></i>
          <div class="welcome-title">${userData.greeting}</div>
          <div class="welcome-name">${userData.name}</div>
          <div class="welcome-message">
            ${userData.message} <span class="welcome-emoji">${userData.emoji}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('welcome-overlay', WelcomeOverlay); 