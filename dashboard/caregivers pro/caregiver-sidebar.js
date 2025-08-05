class CaregiverSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isCollapsed = false;
    this.currentSection = 'overview';
  }

  connectedCallback() {
    // Load sidebar state from localStorage
    this.loadSidebarState();
    
    this.render();
    this.attachEvents();
    this.loadUserData();
    this.adjustMainContent();
  }

  loadSidebarState() {
    // Load sidebar collapsed state from localStorage
    if (typeof LocalStorageUtils !== 'undefined') {
      this.isCollapsed = LocalStorageUtils.getItem('sidebarCollapsed', false);
    } else {
      // Fallback to localStorage directly
      try {
        const savedState = localStorage.getItem('sidebarCollapsed');
        this.isCollapsed = savedState ? JSON.parse(savedState) : false;
      } catch (error) {
        console.error('Error loading sidebar state:', error);
        this.isCollapsed = false;
      }
    }
  }

  saveSidebarState() {
    // Save sidebar collapsed state to localStorage
    if (typeof LocalStorageUtils !== 'undefined') {
      LocalStorageUtils.setItem('sidebarCollapsed', this.isCollapsed);
    } else {
      // Fallback to localStorage directly
      try {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
      } catch (error) {
        console.error('Error saving sidebar state:', error);
      }
    }
  }

  loadUserData() {
    const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    const users = LocalStorageUtils.getItem('users', []);
    const user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
    
    if (user) {
      this.userData = {
        name: user.name || user.username,
        email: user.email || '',
        photo: user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=2563eb&color=fff&size=128&rounded=true`,
        role: 'Professional Caregiver',
        status: 'Online'
      };
    } else {
      this.userData = {
        name: 'Caregiver',
        email: '',
        photo: 'https://ui-avatars.com/api/?name=C&background=2563eb&color=fff&size=128&rounded=true',
        role: 'Professional Caregiver',
        status: 'Online'
      };
    }
  }

  render() {
    // Apply collapsed state to nav element
    const navClass = this.isCollapsed ? 'minimized' : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
        
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
          background: linear-gradient(180deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          box-shadow: 4px 0 24px rgba(37, 99, 235, 0.15);
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
          padding: 10px 8px;
          min-height: 60px;
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
        
        nav.minimized .logo-section {
          padding: 15px 8px;
          justify-content: center;
        }
        
        .logo-section {
          padding: 20px 25px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }
        
        .logo-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .logo-text {
          color: white;
          font-weight: 700;
          font-size: 22px;
          margin: 0;
          transition: all 0.3s;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-header {
          padding: 25px 30px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-height: 120px;
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
          color: white;
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
          color: #2563eb;
          border: 3px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .user-photo img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .user-photo span {
          font-size: 28px;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .user-details h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: white;
          font-family: 'Poppins', sans-serif;
        }
        
        .user-details p {
          margin: 0;
          font-size: 16px;
          opacity: 0.7;
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Poppins', sans-serif;
        }
        
        .user-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #10b981;
          margin-top: 4px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 12px;
          overflow-y: auto;
        }
        
        .nav-section {
          margin-bottom: 16px;
        }
        
        .nav-section-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 8px 16px;
          transition: all 0.3s;
        }
        
        nav.minimized .nav-section-title {
          display: none;
        }
        
        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s;
          outline: none;
          position: relative;
          text-decoration: none;
          width: 100%;
          text-align: left;
        }
        
        .sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }
        
        .sidebar-btn.active {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: white;
          border-radius: 0 2px 2px 0;
        }
        
        .sidebar-btn i {
          font-size: 1.125rem;
          width: 20px;
          text-align: center;
          transition: all 0.3s;
          display: inline-block;
          font-style: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
        }
        
        .sidebar-btn i::before {
          font-family: "bootstrap-icons" !important;
          font-weight: normal !important;
          font-style: normal !important;
          font-variant: normal !important;
          text-transform: none !important;
          line-height: 1;
          vertical-align: middle;
        }
        
        .sidebar-btn span {
          flex: 1;
          transition: all 0.3s;
        }
        
        nav.minimized .sidebar-btn span {
          display: none;
        }
        
        .sidebar-btn.logout-btn {
          color: #ff4757;
        }
        
        .sidebar-btn.logout-btn:hover {
          background: rgba(255, 71, 87, 0.1);
        }
        
        /* Scrollbar personalizada */
        .sidebar-menu::-webkit-scrollbar {
          width: 4px;
        }
        
        .sidebar-menu::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          nav {
            transform: translateX(-100%);
          }
          
          nav.mobile-open {
            transform: translateX(0);
          }
        }
      </style>
      
              <nav class="${navClass}">
        <!-- Logo section -->
        <div class="logo-section">
          <div class="logo-content" id="logo-toggle">
            <img src="../../assets/Frame - 1.svg" alt="Logo" class="logo-icon">
            <h1 class="logo-text">CareConnect</h1>
          </div>
        </div>
        
        <div class="sidebar-header">
          <div class="header-left">
            <div class="user-info">
              <div class="user-photo">
                <img src="${this.userData?.photo || ''}" alt="Avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span style="display: none;">${this.userData?.name?.charAt(0) || 'C'}</span>
              </div>
              <div class="user-details">
                <h4>${this.userData?.name || 'Caregiver'}</h4>
                <p>${this.userData?.role || 'Professional Caregiver'}</p>
                <div class="user-status">
                  <div class="status-dot"></div>
                  <span>${this.userData?.status || 'Online'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-menu">
          <div class="nav-section">
            <div class="nav-section-title">Main</div>
            <button class="sidebar-btn ${this.currentSection === 'overview' ? 'active' : ''}" data-section="overview">
              <i class="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </button>
            <button class="sidebar-btn ${this.currentSection === 'virtual-care' ? 'active' : ''}" data-section="virtual-care">
              <i class="bi bi-camera-video-fill"></i>
              <span>Virtual Care</span>
            </button>
            <button class="sidebar-btn ${this.currentSection === 'medication' ? 'active' : ''}" data-section="medication">
              <i class="bi bi-pills"></i>
              <span>Medications</span>
            </button>
          </div>

          <div class="nav-section">
            <div class="nav-section-title">Management</div>
            <button class="sidebar-btn ${this.currentSection === 'documents' ? 'active' : ''}" data-section="documents">
              <i class="bi bi-folder2-open"></i>
              <span>Documents</span>
            </button>
            <button class="sidebar-btn ${this.currentSection === 'earnings' ? 'active' : ''}" data-section="earnings">
              <i class="bi bi-cash-stack"></i>
              <span>Earnings</span>
            </button>
          </div>

          <div class="nav-section">
            <div class="nav-section-title">Account</div>
            <button class="sidebar-btn ${this.currentSection === 'profile' ? 'active' : ''}" data-section="profile">
              <i class="bi bi-person-badge"></i>
              <span>My Profile</span>
            </button>
            <button class="sidebar-btn logout-btn" onclick="logout()">
              <i class="bi bi-power"></i>
              <span>Logout</span>
            </button>
          </div>
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
    
    // By default, activate the first section
    const firstBtn = menu.querySelector('.sidebar-btn');
    if (firstBtn) {
      firstBtn.classList.add('active');
      this.showSection(firstBtn.dataset.section);
    }
  }

  toggleSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('mainContent');
    this.isCollapsed = !this.isCollapsed;
    
    if (this.isCollapsed) {
      nav.classList.add('minimized');
      if (main) {
        main.classList.add('sidebar-collapsed');
        main.style.marginLeft = '90px';
      }
    } else {
      nav.classList.remove('minimized');
      if (main) {
        main.classList.remove('sidebar-collapsed');
        main.style.marginLeft = '350px';
      }
    }
    
    // Save state to localStorage
    this.saveSidebarState();
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sidebarToggle', {
      detail: { collapsed: this.isCollapsed }
    }));
  }

  showSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('mainContent');
    
    nav.classList.remove('minimized');
    if (main) {
      main.classList.remove('sidebar-collapsed');
      main.style.marginLeft = '350px';
    }
    this.isCollapsed = false;
  }

  hideSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('mainContent');
    
    nav.classList.add('minimized');
    if (main) {
      main.classList.add('sidebar-collapsed');
      main.style.marginLeft = '90px';
    }
    this.isCollapsed = true;
  }

  adjustMainContent() {
    const main = document.getElementById('mainContent');
    const nav = this.shadowRoot.querySelector('nav');
    if (main) {
      main.style.transition = 'margin-left 0.4s ease';
    }
    
    // Apply saved sidebar state
    if (nav) {
      if (this.isCollapsed) {
        nav.classList.add('minimized');
        if (main) {
          main.classList.add('sidebar-collapsed');
          main.style.marginLeft = '90px';
        }
      } else {
        nav.classList.remove('minimized');
        if (main) {
          main.classList.remove('sidebar-collapsed');
          main.style.marginLeft = '350px';
        }
      }
    }
  }

  showSection(section) {
    const main = document.getElementById('dashboard-content');
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
        case 'virtual-care':
          sectionContent = '<virtual-care></virtual-care>';
          break;
        case 'medication':
          sectionContent = '<medication-management></medication-management>';
          break;
        case 'documents':
          sectionContent = '<caregiver-documents></caregiver-documents>';
          break;
        case 'earnings':
          sectionContent = '<earnings-statistics></earnings-statistics>';
          break;
        case 'profile':
          sectionContent = '<caregiver-profile-section></caregiver-profile-section>';
          break;
        default:
          sectionContent = '<caregiver-overview></caregiver-overview>';
      }
      
      main.innerHTML = sectionContent;
      main.style.opacity = '1';
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('sectionChange', {
        detail: { section: section }
      }));
    }, 200);
  }
}

customElements.define('caregiver-sidebar', CaregiverSidebar); 