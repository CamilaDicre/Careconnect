class CaregiverWelcomeOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.initializeAnimations();
    setTimeout(() => this.hide(), 4000);
  }
  
  hide() {
    const overlay = this.shadowRoot.querySelector('.overlay');
    const card = this.shadowRoot.querySelector('.welcome-card');
    const particles = this.shadowRoot.querySelectorAll('.particle');
    
    overlay.style.animation = 'fadeOut 1.2s ease-out forwards';
    card.style.animation = 'slideOutUp 1s ease-in-out forwards';
    
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
      const user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
      const displayName = user ? (user.name || user.username) : loggedInUser;
      
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
        message: 'Ready to provide excellent care today?',
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
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
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
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          animation: slideInUp 1s ease-out;
          position: relative;
          z-index: 2;
        }
        
        .welcome-emoji {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
        }
        
        .welcome-greeting {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .welcome-name {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }
        
        .welcome-message {
          font-size: 1.1rem;
          color: #6b7280;
          margin-bottom: 0;
        }
        
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .particle:nth-child(1) { top: 20%; left: 10%; }
        .particle:nth-child(2) { top: 60%; left: 80%; }
        .particle:nth-child(3) { top: 80%; left: 20%; }
        .particle:nth-child(4) { top: 30%; left: 90%; }
        .particle:nth-child(5) { top: 70%; left: 5%; }
        .particle:nth-child(6) { top: 10%; left: 70%; }
        .particle:nth-child(7) { top: 90%; left: 60%; }
        .particle:nth-child(8) { top: 40%; left: 30%; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideOutUp {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes particleOut {
          0% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0); 
          }
        }
      </style>
      
      <div class="overlay">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        
        <div class="welcome-card">
          <div class="welcome-emoji">${userData.emoji}</div>
          <div class="welcome-greeting">${userData.greeting}</div>
          <div class="welcome-name">${userData.name}</div>
          <p class="welcome-message">${userData.message}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('caregiver-welcome-overlay', CaregiverWelcomeOverlay); 