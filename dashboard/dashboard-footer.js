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
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          padding: 20px 0;
          margin-top: 40px;
          text-align: center;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .copyright {
          color: #666;
          font-size: 14px;
          font-weight: 500;
        }
        
        .footer-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        
        .footer-link {
          color: #1976d2;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: #1565c0;
          text-decoration: underline;
        }
        
        .footer-divider {
          width: 1px;
          height: 20px;
          background: #ddd;
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