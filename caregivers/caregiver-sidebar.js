class CaregiverSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.collapsed = false;
  }
  
  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target.closest('.sidebar-toggle')) {
        this.toggleSidebar();
      } else if (e.target.closest('.menu-item')) {
        const section = e.target.closest('.menu-item').dataset.section;
        this.showSection(section);
      }
    });
  }
  
  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.render();
    
    // Dispatch event for main content
    this.dispatchEvent(new CustomEvent('sidebarToggle', {
      detail: { collapsed: this.collapsed }
    }));
  }
  
  showSection(section) {
    // Dispatch event for section change
    this.dispatchEvent(new CustomEvent('sectionChange', {
      detail: { section: section }
    }));
    
    // Update active menu item
    this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
    });
    this.shadowRoot.querySelector(`[data-section="${section}"]`).classList.add('active');
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .sidebar {
          width: 280px;
          height: 100vh;
          background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
          color: white;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          overflow-y: auto;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        .sidebar.collapsed {
          width: 80px;
        }
        
        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 700;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .logo-text {
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        
        .collapsed .logo-text {
          opacity: 0;
          display: none;
        }
        
        .toggle-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
          transition: background 0.3s ease;
        }
        
        .toggle-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .menu-section {
          padding: 20px 0;
        }
        
        .section-title {
          padding: 0 20px 10px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .collapsed .section-title {
          opacity: 0;
          display: none;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-size: 16px;
          font-weight: 500;
        }
        
        .menu-item:hover {
          background: rgba(255,255,255,0.1);
          border-left-color: rgba(255,255,255,0.3);
        }
        
        .menu-item.active {
          background: rgba(255,255,255,0.15);
          border-left-color: white;
        }
        
        .menu-icon {
          font-size: 20px;
          min-width: 20px;
          text-align: center;
        }
        
        .menu-text {
          opacity: 1;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }
        
        .collapsed .menu-text {
          opacity: 0;
          display: none;
        }
        
        .menu-badge {
          background: #ff4757;
          color: white;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          margin-left: auto;
        }
        
        .collapsed .menu-badge {
          display: none;
        }
        
        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: auto;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .user-details {
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        
        .collapsed .user-details {
          opacity: 0;
          display: none;
        }
        
        .user-name {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        
        .user-role {
          font-size: 12px;
          opacity: 0.8;
        }
        
        .logout-btn {
          width: 100%;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .collapsed .logout-btn span {
          display: none;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            width: 280px;
          }
          
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          
          .sidebar.collapsed {
            width: 280px;
          }
        }
      </style>
      
      <div class="sidebar ${this.collapsed ? 'collapsed' : ''}">
        <div class="sidebar-header">
          <div class="logo">
            <div class="logo-icon">
              <i class="bi bi-heart-pulse"></i>
            </div>
            <div class="logo-text">CareConnect</div>
          </div>
          <button class="toggle-btn sidebar-toggle">
            <i class="bi bi-list"></i>
          </button>
        </div>
        
        <div class="menu-section">
          <div class="section-title">Main Menu</div>
          <div class="menu-item active" data-section="overview">
            <i class="bi bi-house-door menu-icon"></i>
            <span class="menu-text">Overview</span>
          </div>
          <div class="menu-item" data-section="patient-management">
            <i class="bi bi-people menu-icon"></i>
            <span class="menu-text">Patient Management</span>
            <span class="menu-badge">3</span>
          </div>
          <div class="menu-item" data-section="schedule">
            <i class="bi bi-calendar-event menu-icon"></i>
            <span class="menu-text">Schedule & Calendar</span>
          </div>
        </div>
        
        <div class="menu-section">
          <div class="section-title">Care Services</div>
          <div class="menu-item" data-section="virtual-care">
            <i class="bi bi-camera-video menu-icon"></i>
            <span class="menu-text">Virtual Care</span>
            <span class="menu-badge">2</span>
          </div>
          <div class="menu-item" data-section="medication">
            <i class="bi bi-capsule menu-icon"></i>
            <span class="menu-text">Medication Management</span>
          </div>
        </div>
        
        <div class="menu-section">
          <div class="section-title">Professional</div>
          <div class="menu-item" data-section="documents">
            <i class="bi bi-file-earmark-text menu-icon"></i>
            <span class="menu-text">Documents & Certifications</span>
          </div>
          <div class="menu-item" data-section="earnings">
            <i class="bi bi-graph-up menu-icon"></i>
            <span class="menu-text">Earnings & Statistics</span>
          </div>
        </div>
        
        <div class="menu-section">
          <div class="section-title">Account</div>
          <div class="menu-item" data-section="profile">
            <i class="bi bi-person-circle menu-icon"></i>
            <span class="menu-text">My Profile</span>
          </div>
        </div>
        
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">SJ</div>
            <div class="user-details">
              <div class="user-name">Sarah Johnson</div>
              <div class="user-role">Professional Caregiver</div>
            </div>
          </div>
          <button class="logout-btn">
            <i class="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('caregiver-sidebar', CaregiverSidebar); 