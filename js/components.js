async function loadComponent(elementId, componentPath, callback) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        if (callback) callback();
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Componente de loading global mejorado
class GlobalLoading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  show(message = 'Loading...', type = 'default') {
    this.shadowRoot.querySelector('.loading-overlay').style.display = 'flex';
    this.shadowRoot.querySelector('.loading-message').textContent = message;
    this.shadowRoot.querySelector('.loading-spinner').className = `loading-spinner ${type}`;
  }
  
  hide() {
    this.shadowRoot.querySelector('.loading-overlay').style.display = 'none';
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          font-family: 'Poppins', sans-serif;
        }
        
        .loading-container {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          max-width: 300px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: loadingSlideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(102, 126, 234, 0.2);
          border-top: 4px solid #667eea;
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        
        .loading-spinner.success {
          border-top-color: #4caf50;
        }
        
        .loading-spinner.error {
          border-top-color: #f44336;
        }
        
        .loading-spinner.warning {
          border-top-color: #ff9800;
        }
        
        .loading-message {
          font-size: 16px;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        
        .loading-subtitle {
          font-size: 14px;
          color: #7f8c8d;
          opacity: 0.8;
        }
        
        /* Partículas de fondo */
        .loading-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
        }
        
        .loading-particle:nth-child(1) { top: 20%; left: 15%; animation-delay: 0s; }
        .loading-particle:nth-child(2) { top: 70%; left: 80%; animation-delay: 0.5s; }
        .loading-particle:nth-child(3) { top: 40%; left: 10%; animation-delay: 1s; }
        .loading-particle:nth-child(4) { top: 80%; left: 20%; animation-delay: 1.5s; }
        
        @keyframes loadingSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-8px) translateX(-5px);
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-12px) translateX(8px);
            opacity: 0.9;
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .loading-container {
            padding: 30px 25px;
            max-width: 280px;
            margin: 0 20px;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
          }
          
          .loading-message {
            font-size: 15px;
          }
        }
      </style>
      
      <div class="loading-overlay">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-message">Loading...</div>
          <div class="loading-subtitle">Please wait while we process your request</div>
          
          <!-- Partículas de fondo -->
          <div class="loading-particle"></div>
          <div class="loading-particle"></div>
          <div class="loading-particle"></div>
          <div class="loading-particle"></div>
        </div>
      </div>
    `;
  }
}

// Registrar el componente
customElements.define('global-loading', GlobalLoading);

// Función helper para mostrar/ocultar loading
window.showGlobalLoading = function(message = 'Loading...', type = 'default') {
  let loading = document.querySelector('global-loading');
  if (!loading) {
    loading = document.createElement('global-loading');
    document.body.appendChild(loading);
  }
  loading.show(message, type);
};

window.hideGlobalLoading = function() {
  const loading = document.querySelector('global-loading');
  if (loading) {
    loading.hide();
  }
};

// Load components when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load header, then load login.js and main.js
    loadComponent('header-component', 'components/header.html', () => {
        const loginScript = document.createElement('script');
        loginScript.src = 'js/login.js';
        document.body.appendChild(loginScript);
        const mainScript = document.createElement('script');
        mainScript.src = 'main.js';
        document.body.appendChild(mainScript);
    });
    // Load footer
    loadComponent('footer-component', 'components/footer.html');

    if (window.location.pathname.endsWith('login.html')) {
        var loginSignupBtn = document.getElementById('loginSignupButton');
        if (loginSignupBtn) loginSignupBtn.style.display = 'none';
    }
}); 