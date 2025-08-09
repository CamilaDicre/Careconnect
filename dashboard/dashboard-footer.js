class DashboardFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .dashboard-footer {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          color: white;
          border-top: none;
          padding: 25px 0;
          margin-top: 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .dashboard-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .dashboard-footer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px;
          position: relative;
          z-index: 2;
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 25px;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .footer-links {
          display: flex;
          gap: 35px;
          align-items: center;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          padding: 8px 15px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .footer-divider {
          width: 1px;
          height: 25px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 1px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 18px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .footer-logo img {
          width: 34px;
          height: 34px;
          filter: brightness(0) invert(1);
        }
        
        @media (max-width: 768px) {
          .footer-row {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 15px;
          }
          
          .footer-divider {
            display: none;
          }
        }
      </style>
      
      <footer class="dashboard-footer">
        <div class="footer-content">
          <div class="footer-row">
            <div class="footer-logo">
              <img src="../assets/Frame-splash.svg" alt="Careconnect Logo">
              <span>areconnect</span>
            </div>
            <div class="copyright">
              © ${new Date().getFullYear()} Careconnect. All rights reserved.
            </div>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <div class="footer-divider"></div>
              <a href="#" class="footer-link">Terms of Service</a>
              <div class="footer-divider"></div>
              <a href="#" class="footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('dashboard-footer', DashboardFooter); 