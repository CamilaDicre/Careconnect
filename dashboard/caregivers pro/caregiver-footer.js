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
          background: linear-gradient(135deg, #1976d2, #1565c0);
          color: white;
          padding: 20px 0;
          margin-top: 40px;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
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
            flex-direction: column;
            text-align: center;
          }
          
          .footer-right {
            flex-direction: column;
            gap: 10px;
          }
          
          .footer-divider {
            display: none;
          }
        }
      </style>
      
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-left">
            <div class="footer-logo">
              <i class="bi bi-heart-pulse"></i>
              CareConnect
            </div>
            <div class="footer-copyright">
              © ${new Date().getFullYear()} CareConnect. All rights reserved.
            </div>
          </div>
          
          <div class="footer-right">
            <a href="#" class="footer-link">Privacy Policy</a>
            <div class="footer-divider"></div>
            <a href="#" class="footer-link">Terms of Service</a>
            <div class="footer-divider"></div>
            <a href="#" class="footer-link">Contact Support</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('caregiver-footer', CaregiverFooter); 