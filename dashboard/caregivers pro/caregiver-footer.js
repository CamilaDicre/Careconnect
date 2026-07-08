class CaregiverFooter extends HTMLElement {
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
        
        .footer {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          color: white;
          padding: 30px 0;
          margin-top: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .footer::before {
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
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 25px;
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-section-title {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.95);
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          padding: 4px 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        
        .footer-link i {
          font-size: 1rem;
          opacity: 0.9;
        }
        
        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }
        
        .footer-copyright {
          font-size: 14px;
          opacity: 0.9;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .footer-content {
            padding: 0 20px;
          }

          .footer-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px 20px;
          }

          .footer-section:first-child {
            grid-column: 1 / -1;
          }
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 24px 0;
            margin-top: 24px;
          }

          .footer-content {
            padding: 0 16px;
          }
          
          .footer-row {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 24px;
          }
          
          .footer-section {
            align-items: center;
          }

          .footer-section-title {
            justify-content: center;
          }
          
          .footer-links {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px 16px;
            width: 100%;
            max-width: 360px;
          }

          .footer-link {
            justify-content: center;
            min-height: 44px;
            padding: 8px 4px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            padding: 0 12px;
          }

          .footer-links {
            grid-template-columns: 1fr;
            max-width: 100%;
          }

          .footer-link {
            justify-content: flex-start;
            padding-left: 12px;
          }

          .footer-section:not(:first-child) .footer-links {
            align-items: stretch;
          }
        }
      </style>
      
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-row">
            <div class="footer-section">
              <div class="footer-section-title" style="display:flex; align-items:center; gap:8px;">
                <img src="../../assets/Frame-splash.svg" alt="CareConnect Logo" style="width:28px; height:28px;"/>
                areconnect
              </div>
              <div class="footer-copyright">
                © ${new Date().getFullYear()} CareConnect. All rights reserved.
              </div>
              <div style="font-size: 12px; opacity: 0.7;">
                Professional Caregiver Platform
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Quick Links</div>
              <div class="footer-links">
                <button type="button" class="footer-link" data-nav="overview"><i class="bi bi-speedometer2"></i>Dashboard</button>
                <button type="button" class="footer-link" data-nav="virtual-care"><i class="bi bi-calendar-check"></i>My Schedule</button>
                <button type="button" class="footer-link" data-nav="earnings"><i class="bi bi-cash-stack"></i>Earnings</button>
                <button type="button" class="footer-link" data-nav="documents"><i class="bi bi-folder2-open"></i>Documents</button>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Support</div>
              <div class="footer-links">
                <button type="button" class="footer-link" data-nav="profile"><i class="bi bi-question-circle"></i>Help Center</button>
                <button type="button" class="footer-link" data-nav="profile"><i class="bi bi-headset"></i>Contact Support</button>
                <button type="button" class="footer-link" data-nav="virtual-care"><i class="bi bi-telephone-fill"></i>Emergency</button>
                <button type="button" class="footer-link" data-nav="medication"><i class="bi bi-mortarboard"></i>Training</button>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Legal</div>
              <div class="footer-links">
                <span class="footer-link" style="cursor: default; opacity: 0.75;"><i class="bi bi-shield-lock"></i>Privacy Policy</span>
                <span class="footer-link" style="cursor: default; opacity: 0.75;"><i class="bi bi-file-text"></i>Terms of Service</span>
                <span class="footer-link" style="cursor: default; opacity: 0.75;"><i class="bi bi-award"></i>Code of Conduct</span>
                <span class="footer-link" style="cursor: default; opacity: 0.75;"><i class="bi bi-shield-check"></i>Safety Guidelines</span>
              </div>
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
          window.DashboardNavigation.navigateCaregiver(section);
        }
      });
    });
  }
}

customElements.define('caregiver-footer', CaregiverFooter);
