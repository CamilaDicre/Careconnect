class WelcomeOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
    setTimeout(() => this.hide(), 3000);
  }
  hide() {
    this.shadowRoot.querySelector('.overlay').style.opacity = '0';
    setTimeout(() => this.remove(), 800);
  }
  getUserData() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // Buscar el usuario por username
      const user = users.find(u => u.username === loggedInUser);
      const displayName = user ? (user.name || user.username) : loggedInUser;
      return {
        name: displayName,
        greeting: '¡Qué bueno verte de nuevo!',
        message: 'Esperamos que tengas un día maravilloso'
      };
    }
    // Fallback genérico si no hay usuario
    return {
      name: '',
      greeting: '¡Bienvenido/a!',
      message: 'Por favor inicia sesión para una experiencia personalizada'
    };
  }
  render() {
    const userData = this.getUserData();
    this.shadowRoot.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.8s ease;
          font-family: 'Poppins', sans-serif;
        }
        .welcome-card {
          background: rgba(255,255,255,0.95);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          max-width: 400px;
          backdrop-filter: blur(10px);
        }
        .welcome-icon {
          font-size: 48px;
          color: #4facfe;
          margin-bottom: 20px;
          display: block;
        }
        .welcome-greeting {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .welcome-name {
          font-size: 32px;
          font-weight: 800;
          color: #4facfe;
          margin-bottom: 15px;
        }
        .welcome-message {
          font-size: 16px;
          color: #7f8c8d;
          line-height: 1.5;
          font-family: 'Josefin Sans', sans-serif;
        }
        .welcome-emoji {
          font-size: 24px;
          margin: 0 5px;
        }
      </style>
      <div class="overlay">
        <div class="welcome-card">
          <i class="bi bi-heart-fill welcome-icon"></i>
          <div class="welcome-greeting">${userData.greeting}</div>
          <div class="welcome-name">${userData.name}</div>
          <div class="welcome-message">
            ${userData.message} <span class="welcome-emoji">💙</span>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('welcome-overlay', WelcomeOverlay); 