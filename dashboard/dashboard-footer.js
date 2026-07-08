class DashboardFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.setupNavigation();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

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
        }

        .footer-links {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-family: inherit;
        }

        .footer-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .footer-link.static {
          cursor: default;
          opacity: 0.85;
        }

        .footer-link.static:hover {
          transform: none;
          box-shadow: none;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 18px;
          color: white;
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
            gap: 10px;
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
              <button type="button" class="footer-link" data-nav="emergency-contacts"><i class="bi bi-telephone-fill"></i>Emergency</button>
              <button type="button" class="footer-link" data-nav="appointment-booking"><i class="bi bi-calendar-plus"></i>Appointments</button>
              <button type="button" class="footer-link" data-nav="medicines"><i class="bi bi-capsule"></i>Medications</button>
              <button type="button" class="footer-link" data-nav="charts"><i class="bi bi-graph-up"></i>Health Charts</button>
              <span class="footer-link static"><i class="bi bi-shield-lock"></i>Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  setupNavigation() {
    this.shadowRoot.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const section = el.dataset.nav;
        if (section && window.DashboardNavigation) {
          window.DashboardNavigation.navigatePatient(section);
        }
      });
    });
  }
}

customElements.define('dashboard-footer', DashboardFooter);
