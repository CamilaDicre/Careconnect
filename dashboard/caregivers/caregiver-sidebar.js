class CaregiverSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.sections = [];
    this.isCollapsed = false;
  }
  
  connectedCallback() {
    this.render();
    this.attachEvents();
    this.adjustMainContent();
    
    // Add window resize listener
    window.addEventListener('resize', () => {
      this.adjustMainContent();
    });
  }
  
  getUserType() {
    return window.userType || 'caregiver';
  }
  
  getUserData() {
    const username = localStorage.getItem('loggedInUser') || 'Cuidador';
    // Generar iniciales
    const initials = username.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    return {
      name: username,
      photo: '', // No foto personalizada por defecto
      initials: initials
    };
  }
  
  getSections() {
    return [
      { id: 'overview', label: 'Overview', icon: 'bi-house' },
      { id: 'profile', label: 'My Profile', icon: 'bi-person-circle' },
      { id: 'patients', label: 'Patient Management', icon: 'bi-people' },
      { id: 'schedule', label: 'Schedule & Calendar', icon: 'bi-calendar-event' },
      { id: 'monitoring', label: 'Health Monitoring', icon: 'bi-heart-pulse' },
      { id: 'reports', label: 'Care Reports', icon: 'bi-clipboard-data' }
    ];
  }
  
  render() {
    const sections = this.getSections();
    const userData = this.getUserData();
    this.sections = sections;
    
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        nav {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 350px;
          background: white;
          box-shadow: 2px 0 15px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          transition: all 0.4s ease;
          overflow: hidden;
        }
        
        nav.minimized {
          width: 90px;
        }
        
        nav.minimized .sidebar-header {
          padding: 15px 8px;
          min-height: 70px;
          justify-content: center;
        }
        
        nav.minimized .user-info {
          display: none;
        }
        
        nav.minimized .sidebar-menu {
          padding: 15px 0;
        }
        
        nav.minimized .sidebar-btn {
          padding: 15px 12px;
          justify-content: center;
        }
        
        nav.minimized .sidebar-btn span {
          display: none;
        }
        
        nav.minimized .sidebar-btn i {
          font-size: 24px;
          width: auto;
        }
        
        nav.minimized .logo-text {
          display: none;
        }
        
        nav.minimized .logo-icon {
          transform: scale(1.2);
        }
        
        .logo-section {
          padding: 30px 25px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        
        .logo-content {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
          padding: 8px;
          border-radius: 12px;
        }
        
        .logo-content:hover {
          background: #e3eafc;
          transform: scale(1.05);
        }
        
        .logo-icon {
          width: 50px;
          height: 50px;
          filter: none;
          transition: all 0.3s;
        }
        
        .logo-text {
          color: #333;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 22px;
          margin: 0;
          transition: all 0.3s;
        }
        
        .sidebar-header {
          padding: 40px 30px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-height: 140px;
          position: relative;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 18px;
          color: #333;
        }
        
        .user-photo {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: #667eea;
          border: 3px solid #e9ecef;
          overflow: hidden;
        }
        
        .user-photo img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .user-details h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #333;
          font-family: 'Poppins', sans-serif;
        }
        
        .user-details p {
          margin: 0;
          font-size: 16px;
          opacity: 0.7;
          color: #666;
          font-family: 'Poppins', sans-serif;
        }
        
        .sidebar-menu {
          flex: 1;
          padding: 30px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 35px;
          background: transparent;
          border: none;
          color: #555;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 18px;
          font-weight: 500;
          text-align: left;
          border-left: 4px solid transparent;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }
        
        .sidebar-btn:hover {
          background: #f0f2ff;
          color: #333;
          border-left-color: #667eea;
          transform: translateX(5px);
        }
        
        .sidebar-btn.active {
          background: #e3f2fd;
          color: #667eea;
          border-left-color: #667eea;
          font-weight: 600;
        }
        
        .sidebar-btn i {
          font-size: 24px;
          width: 28px;
          text-align: center;
          color: #667eea;
          flex-shrink: 0;
        }
        
        .logout-btn {
          margin-top: auto;
          margin-bottom: 20px;
          background: #ff4757;
          color: white;
          border-left-color: #ff4757;
        }
        
        .logout-btn:hover {
          background: #ff3742;
          color: white;
          border-left-color: #ff3742;
        }
        
        @media (max-width: 768px) {
          nav {
            width: 100vw;
            transform: translateX(-100%);
          }
          
          nav.show-mobile {
            transform: translateX(0);
          }
          
          nav.minimized {
            width: 100vw;
            transform: translateX(-100%);
          }
          
          #caregiver-content {
            margin-left: 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          .sidebar-header {
            padding: 30px 25px;
            min-height: 120px;
          }
          
          .user-photo {
            width: 60px;
            height: 60px;
          }
          
          .sidebar-btn {
            padding: 20px 30px;
            font-size: 17px;
          }
        }
      </style>
      
      <nav>
        <!-- Logo section -->
        <div class="logo-section">
          <div class="logo-content" id="logo-toggle">
            <img src="../../assets/Frame - 1.svg" alt="Logo" class="logo-icon">
            <h1 class="logo-text">areConnect</h1>
          </div>
        </div>
        
        <div class="sidebar-header">
          <div class="header-left">
            <div class="user-info">
              <div class="user-photo">
                ${userData.photo ? `<img src="${userData.photo}" alt="Avatar">` : `<span style="font-size:32px;font-weight:700;color:#667eea;">${userData.initials}</span>`}
              </div>
              <div class="user-details">
                <h4>${userData.name}</h4>
                <p>Professional Caregiver</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-menu">
          <button class="sidebar-btn" data-section="overview">
            <i class="bi bi-house"></i>
            <span>Overview</span>
          </button>
          <button class="sidebar-btn" data-section="profile">
            <i class="bi bi-person-circle"></i>
            <span>My Profile</span>
          </button>
          <button class="sidebar-btn" data-section="patients">
            <i class="bi bi-people"></i>
            <span>Patient Management</span>
          </button>
          <button class="sidebar-btn" data-section="schedule">
            <i class="bi bi-calendar-event"></i>
            <span>Schedule & Calendar</span>
          </button>
          <button class="sidebar-btn" data-section="monitoring">
            <i class="bi bi-heart-pulse"></i>
            <span>Health Monitoring</span>
          </button>
          <button class="sidebar-btn" data-section="reports">
            <i class="bi bi-clipboard-data"></i>
            <span>Care Reports</span>
          </button>
          
          <button class="sidebar-btn logout-btn" onclick="logout()">
            <i class="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    `;
  }
  
  attachEvents() {
    const menu = this.shadowRoot.querySelector('.sidebar-menu');
    if (!menu) return;
    
    menu.querySelectorAll('.sidebar-btn').forEach(btn => {
      if (btn.classList.contains('logout-btn')) return;
      
      btn.addEventListener('click', e => {
        menu.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.showSection(btn.dataset.section);
      });
    });
    
    // Add event for logo as toggle button
    const logoToggle = this.shadowRoot.querySelector('#logo-toggle');
    if (logoToggle) {
      logoToggle.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }
    
    // By default, activate the overview section
    const overviewBtn = menu.querySelector('[data-section="overview"]');
    if (overviewBtn) {
      overviewBtn.classList.add('active');
      this.showSection('overview');
    }
  }
  
  toggleSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('caregiver-content');
    
    this.isCollapsed = !this.isCollapsed;
    
    if (this.isCollapsed) {
      nav.classList.add('minimized');
      if (main) {
        main.classList.add('sidebar-collapsed');
      }
    } else {
      nav.classList.remove('minimized');
      if (main) {
        main.classList.remove('sidebar-collapsed');
      }
    }
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sidebarToggle', {
      detail: { collapsed: this.isCollapsed }
    }));
  }
  
  showSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('caregiver-content');
    
    nav.classList.remove('minimized');
    if (main) {
      main.classList.remove('sidebar-collapsed');
    }
    this.isCollapsed = false;
  }
  
  hideSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('caregiver-content');
    
    nav.classList.add('minimized');
    if (main) {
      main.classList.add('sidebar-collapsed');
    }
    this.isCollapsed = true;
  }
  
  adjustMainContent() {
    const main = document.getElementById('caregiver-content');
    const nav = this.shadowRoot.querySelector('nav');
    
    if (main) {
      main.style.transition = 'margin-left 0.4s ease';
    }
    
    // Initialize sidebar expanded by default on all devices
    if (nav) {
      nav.classList.remove('minimized');
      if (main) {
        main.classList.remove('sidebar-collapsed');
      }
    }
  }
  
  showSection(section) {
    const main = document.getElementById('caregiver-content');
    if (!main) return;
    
    // Add smooth but short transition
    main.style.transition = 'opacity 0.2s ease';
    main.style.opacity = '0';
    
    setTimeout(() => {
      main.innerHTML = '';
      let sectionContent = '';
      
      switch(section) {
        case 'overview':
          sectionContent = '<caregiver-overview></caregiver-overview>';
          break;
        case 'profile':
          sectionContent = '<caregiver-profile></caregiver-profile>';
          break;
        case 'patients':
          sectionContent = '<patient-management></patient-management>';
          break;
        case 'schedule':
          sectionContent = '<schedule-calendar></schedule-calendar>';
          break;
        case 'monitoring':
          sectionContent = '<health-monitoring></health-monitoring>';
          break;
        case 'reports':
          sectionContent = '<care-reports></care-reports>';
          break;
        default:
          sectionContent = '<caregiver-overview></caregiver-overview>';
      }
      
      // Add footer to all sections
      main.innerHTML = `
        <div style="min-height: calc(100vh - 40px); display: flex; flex-direction: column;">
          <div style="flex: 1;">
            ${sectionContent}
          </div>
          <caregiver-footer></caregiver-footer>
        </div>
      `;
      
      // Show with fade in
      setTimeout(() => {
        main.style.opacity = '1';
      }, 50);
    }, 200);
  }
}

customElements.define('caregiver-sidebar', CaregiverSidebar); 