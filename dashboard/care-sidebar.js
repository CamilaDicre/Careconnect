class CareSidebar extends HTMLElement {
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
    // Botón flotante para colapsar/restaurar sidebar
    const btn = document.getElementById('sidebar-toggle-btn');
    if (btn) {
      btn.remove();
    }
  }
  getUserType() {
    return window.userType || 'patient';
  }
  getUserData() {
    const username = localStorage.getItem('loggedInUser') || 'Paciente';
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.role === 'paciente');
    let displayName = user ? (user.name || user.username) : username;
    let photo = user && user.photo ? user.photo : '../assets/people/woman-whiteshirt.png';
    return {
      name: displayName,
      photo: photo,
      email: user ? (user.email || '-') : '-',
      username: user ? user.username : '-'
    };
  }
  getSections() {
    return [
      { id: 'overview', label: 'Overview', icon: 'bi-house' },
      { id: 'profile', label: 'My Profile', icon: 'bi-person-circle' },
      { id: 'medicines', label: 'Medications', icon: 'bi-capsule' },
      { id: 'charts', label: 'Health Charts', icon: 'bi-graph-up' },
      { id: 'calendar', label: 'Calendar', icon: 'bi-calendar-event' },
      { id: 'caregivers', label: 'Find Caregivers', icon: 'bi-search' },
      { id: 'virtual-care', label: 'Virtual Care', icon: 'bi-camera-video' },
      { id: 'appointment-booking', label: 'Book Appointment', icon: 'bi-calendar-plus' },
      { id: 'health-monitoring', label: 'Health Monitoring', icon: 'bi-heart-pulse' },
      { id: 'emergency-contacts', label: 'Emergency Contacts', icon: 'bi-telephone' }
    ];
  }
  render() {
    const sections = this.getSections();
    const userData = this.getUserData();
    // Calcular iniciales para el avatar si no hay foto personalizada
    const initials = userData.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
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
          
          #dashboard-content {
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
            <img src="../assets/Frame - 1.svg" alt="Logo" class="logo-icon">
            <h1 class="logo-text">areConnect</h1>
          </div>
        </div>
        
        <div class="sidebar-header">
          <div class="header-left">
            <div class="user-info">
              <div class="user-photo">
                ${(userData.photo && userData.photo !== '../assets/people/woman-whiteshirt.png')
                  ? `<img src="${userData.photo}" alt="Profile photo" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\'font-size:32px;font-weight:700;color:#667eea;\'>${initials}</span>';">`
                  : `<span style="font-size:32px;font-weight:700;color:#667eea;">${initials}</span>`}
              </div>
              <div class="user-details">
                <h4>${userData.name}</h4>
                <p>Patient</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-menu">
          <button class="sidebar-btn" data-section="overview">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 4L21 10.5V19A1.5 1.5 0 0 1 19.5 20.5H4.5A1.5 1.5 0 0 1 3 19V10.5Z" stroke="#5271ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 20.5V14.5H15V20.5" stroke="#5271ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span>Overview</span>
          </button>
          <button class="sidebar-btn" data-section="profile">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="#5271ff" stroke-width="2"/><path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <span>My Profile</span>
          </button>
          <button class="sidebar-btn" data-section="medicines">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="14" width="7" height="7" rx="3.5" stroke="#5271ff" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="3.5" stroke="#5271ff" stroke-width="2"/><path d="M7.5 16.5L16.5 7.5" stroke="#5271ff" stroke-width="2"/></svg>
            </span>
            <span>Medications</span>
          </button>
          <button class="sidebar-btn" data-section="charts">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="4" height="8" rx="2" stroke="#5271ff" stroke-width="2"/><rect x="10" y="8" width="4" height="12" rx="2" stroke="#5271ff" stroke-width="2"/><rect x="17" y="4" width="4" height="16" rx="2" stroke="#5271ff" stroke-width="2"/></svg>
            </span>
            <span>Health Charts</span>
          </button>
          <button class="sidebar-btn" data-section="calendar">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#5271ff" stroke-width="2"/><path d="M16 3V7" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/><path d="M8 3V7" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/><path d="M3 11H21" stroke="#5271ff" stroke-width="2"/></svg>
            </span>
            <span>Calendar</span>
          </button>
          <button class="sidebar-btn" data-section="caregivers">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#5271ff" stroke-width="2"/><path d="M21 21L16.65 16.65" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <span>Find Caregivers</span>
          </button>
          <button class="sidebar-btn" data-section="virtual-care">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="15" height="14" rx="2" stroke="#5271ff" stroke-width="2"/><path d="M21 7V17L17 14V10L21 7Z" stroke="#5271ff" stroke-width="2"/></svg>
            </span>
            <span>Virtual Care</span>
          </button>
          <button class="sidebar-btn" data-section="appointment-booking">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#5271ff" stroke-width="2"/><path d="M16 3V7" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/><path d="M8 3V7" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/><path d="M12 13V17" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/><path d="M10 15H14" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <span>Book Appointment</span>
          </button>
          <button class="sidebar-btn" data-section="health-monitoring">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="#5271ff" stroke-width="2"/><path d="M8 13L11 16L16 9" stroke="#5271ff" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
            <span>Health Monitoring</span>
          </button>
          <button class="sidebar-btn" data-section="emergency-contacts">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V19A2 2 0 0 1 20 21C10.61 21 3 13.39 3 4A2 2 0 0 1 5 2H7.09A2 2 0 0 1 9.06 3.06L11.29 6.29A2 2 0 0 1 11.29 8.71L9.17 10.83A16.06 16.06 0 0 0 13.17 14.83L15.29 12.71A2 2 0 0 1 17.71 12.71L20.94 14.94A2 2 0 0 1 22 16.92Z" stroke="#5271ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span>Emergency Contacts</span>
          </button>
          <button class="sidebar-btn logout-btn" onclick="logout()">
            <span class="sidebar-icon" style="width:24px;height:24px;display:inline-block;vertical-align:middle;">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H9" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17L21 12L16 7" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12H9" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
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
    
    // Agregar evento para el logo como botón toggle
    const logoToggle = this.shadowRoot.querySelector('#logo-toggle');
    if (logoToggle) {
      logoToggle.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }
    
    // Por defecto, activa la primera sección
    const firstBtn = menu.querySelector('.sidebar-btn');
    if (firstBtn) {
      firstBtn.classList.add('active');
      this.showSection(firstBtn.dataset.section);
    }
  }
  toggleSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('dashboard-content');
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      nav.classList.add('minimized');
      if (main) {
        main.classList.add('sidebar-collapsed');
        main.style.marginLeft = '0';
      }
    } else {
      nav.classList.remove('minimized');
      if (main) {
        main.classList.remove('sidebar-collapsed');
        main.style.marginLeft = '350px';
      }
    }
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sidebarToggle', {
      detail: { collapsed: this.isCollapsed }
    }));
  }
  showSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('dashboard-content');
    
    nav.classList.remove('minimized');
    if (main) {
      main.classList.remove('sidebar-collapsed');
    }
    this.isCollapsed = false;
  }
  hideSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('dashboard-content');
    
    nav.classList.add('minimized');
    if (main) {
      main.classList.add('sidebar-collapsed');
    }
    this.isCollapsed = true;
  }
  adjustMainContent() {
    const main = document.getElementById('dashboard-content');
    const nav = this.shadowRoot.querySelector('nav');
    if (main) {
      main.style.transition = 'margin-left 0.4s ease';
    }
    // Inicializar sidebar expandido por defecto en todos los dispositivos
    if (nav) {
      nav.classList.remove('minimized');
      if (main) {
        main.classList.remove('sidebar-collapsed');
        main.style.marginLeft = '350px';
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
          sectionContent = '<overview-section></overview-section>';
          break;
        case 'profile':
          sectionContent = '<user-profile></user-profile>';
          break;
        case 'medicines':
          sectionContent = '<medicine-list></medicine-list>';
          break;
        case 'charts':
          sectionContent = '<health-charts></health-charts>';
          break;
        case 'calendar':
          sectionContent = '<calendar-view></calendar-view>';
          break;
        case 'caregivers':
          sectionContent = '<caregiver-search></caregiver-search>';
          break;
        default:
          sectionContent = '<overview-section></overview-section>';
      }
      
      // Add footer to all sections
      main.innerHTML = `
        <div style="min-height: calc(100vh - 40px); display: flex; flex-direction: column;">
          <div style="flex: 1;">
            ${sectionContent}
          </div>
          <dashboard-footer></dashboard-footer>
        </div>
      `;
      
      // Show with fade in
      setTimeout(() => {
        main.style.opacity = '1';
      }, 50);
    }, 200);
  }
}
customElements.define('care-sidebar', CareSidebar); 