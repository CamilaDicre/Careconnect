class CaregiverFooter extends HTMLElement {
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
        
        .footer::after {
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
        
        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .footer-section-title {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.95);
        }
        
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          padding: 4px 0;
        }
        
        .footer-link:hover {
          color: white;
          transform: translateX(5px);
        }
        
        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .footer-logo {
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-logo i {
          font-size: 24px;
        }
        
        .footer-copyright {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .footer-right {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        
        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.9;
          transition: opacity 0.3s;
        }
        
        .footer-link:hover {
          opacity: 1;
        }
        
        .footer-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            padding: 0 20px;
          }
          
          .footer-row {
            flex-direction: column;
            text-align: center;
            gap: 30px;
          }
          
          .footer-section {
            align-items: center;
          }
          
          .footer-links {
            align-items: center;
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
              <div style="font-size: 12px; opacity: 0.7; margin-top: 5px;">
                Professional Caregiver Platform
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Quick Links</div>
              <div class="footer-links">
                <a href="#" class="footer-link">Dashboard</a>
                <a href="#" class="footer-link">My Schedule</a>
                <a href="#" class="footer-link">Earnings</a>
                <a href="#" class="footer-link">Documents</a>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Support</div>
              <div class="footer-links">
                <a href="#" class="footer-link">Help Center</a>
                <a href="#" class="footer-link">Contact Support</a>
                <a href="#" class="footer-link">Emergency</a>
                <a href="#" class="footer-link">Training</a>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Legal</div>
              <div class="footer-links">
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
                <a href="#" class="footer-link">Code of Conduct</a>
                <a href="#" class="footer-link">Safety Guidelines</a>
              </div>
            </div>
            
            <div class="footer-section">
              <div class="footer-section-title">Connect</div>
              <div class="footer-links">
                <a href="#" class="footer-link">Community</a>
                <a href="#" class="footer-link">Feedback</a>
                <a href="#" class="footer-link">Updates</a>
                <a href="#" class="footer-link">Caregiver Network</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('caregiver-footer', CaregiverFooter); 