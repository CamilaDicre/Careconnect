class CareSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.sections = [];
  }
  connectedCallback() {
    this.render();
    this.attachEvents();
    this.adjustMainContent();
    
    // Agregar listener para resize de ventana
    window.addEventListener('resize', () => {
      this.adjustMainContent();
    });
  }
  getUserType() {
    return window.userType || 'patient';
  }
  getUserData() {
    // Usar datos del sistema de autenticación si está disponible
    if (window.authSystem && window.authSystem.currentUser) {
      const user = window.authSystem.currentUser;
      const isPatient = user.userType === 'patient';
      
      return {
        name: user.fullName,
        photo: isPatient ? 'assets/people/woman-whiteshirt.png' : 'assets/people/man-yellowshirt.png'
      };
    }
    
    // Fallback a datos por defecto
    if (this.getUserType() === 'patient') {
      return {
        name: 'María González',
        photo: 'assets/people/woman-whiteshirt.png'
      };
    } else {
      return {
        name: 'Cuidador',
        photo: 'assets/people/man-yellowshirt.png'
      };
    }
  }
  getSections() {
    if (this.getUserType() === 'patient') {
      return [
        { id: 'profile', label: 'Perfil', icon: 'bi-person-circle' },
        { id: 'medicines', label: 'Medicinas', icon: 'bi-capsule' },
        { id: 'charts', label: 'Gráficas', icon: 'bi-bar-chart' },
        { id: 'calendar', label: 'Calendario', icon: 'bi-calendar-event' },
        { id: 'caregivers', label: 'Buscar cuidadores', icon: 'bi-search' }
      ];
    } else {
      return [
        { id: 'profile', label: 'Perfil', icon: 'bi-person-circle' },
        { id: 'medicines', label: 'Medicinas', icon: 'bi-capsule' },
        { id: 'charts', label: 'Gráficas', icon: 'bi-bar-chart' },
        { id: 'calendar', label: 'Calendario', icon: 'bi-calendar-event' },
        { id: 'requests', label: 'Solicitudes', icon: 'bi-people' }
      ];
    }
  }
  render() {
    const sections = this.getSections();
    const userData = this.getUserData();
    this.sections = sections;
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
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
          align-items: stretch;
          z-index: 1000;
          overflow-y: auto;
          transition: all 0.4s ease;
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
        }
        @media (max-width: 480px) {
          nav {
            width: 100vw;
          }
          nav.minimized {
            width: 90px;
          }
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
        <!-- Sección del logo -->
        <div class="logo-section">
          <div class="logo-content" id="logo-toggle">
            <img src="assets/Frame - 1.svg" alt="Logo" class="logo-icon">
            <h1 class="logo-text">areConnect</h1>
          </div>
        </div>
        
        <div class="sidebar-header">
          <div class="header-left">
            <div class="user-info">
              <div class="user-photo">
                <img src="${userData.photo}" alt="Foto de perfil">
              </div>
              <div class="user-details">
                <h4>${userData.name}</h4>
                <p>${this.getUserType() === 'patient' ? 'Paciente' : 'Cuidador'}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar-menu">
          <button class="sidebar-btn" data-section="profile">
            <i class="bi bi-person-circle"></i>
            <span>Mi Perfil</span>
          </button>
          <button class="sidebar-btn" data-section="medicines">
            <i class="bi bi-capsule"></i>
            <span>Medicamentos</span>
          </button>
          <button class="sidebar-btn" data-section="charts">
            <i class="bi bi-graph-up"></i>
            <span>Gráficos de Salud</span>
          </button>
          <button class="sidebar-btn" data-section="calendar">
            <i class="bi bi-calendar-event"></i>
            <span>Calendario</span>
          </button>
          ${this.getUserType() === 'patient' ? `
          <button class="sidebar-btn" data-section="caregivers">
            <i class="bi bi-search"></i>
            <span>Buscar Cuidadores</span>
          </button>
          ` : `
          <button class="sidebar-btn" data-section="requests">
            <i class="bi bi-clipboard-check"></i>
            <span>Solicitudes de Pacientes</span>
          </button>
          `}
        </div>
      </nav>
    `;
  }
  attachEvents() {
    const menu = this.shadowRoot.querySelector('.sidebar-menu');
    if (!menu) return;
    
    menu.querySelectorAll('.sidebar-btn').forEach(btn => {
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
    
    if (nav.classList.contains('minimized')) {
      // Expandir sidebar
      nav.classList.remove('minimized');
      if (main) {
        main.style.marginLeft = '350px';
      }
    } else {
      // Minimizar sidebar
      nav.classList.add('minimized');
      if (main) {
        main.style.marginLeft = '90px';
      }
    }
  }
  showSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('dashboard-content');
    
    nav.classList.remove('minimized');
    if (main) {
      main.style.marginLeft = '350px';
    }
  }
  hideSidebar() {
    const nav = this.shadowRoot.querySelector('nav');
    const main = document.getElementById('dashboard-content');
    
    nav.classList.add('minimized');
    if (main) {
      main.style.marginLeft = '90px';
    }
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
        main.style.marginLeft = '350px';
      }
    }
  }
  showSection(section) {
    const main = document.getElementById('dashboard-content');
    if (!main) return;
    
    // Agregar transición suave pero corta
    main.style.transition = 'opacity 0.2s ease';
    main.style.opacity = '0';
    
    setTimeout(() => {
      main.innerHTML = '';
      switch(section) {
        case 'profile':
          main.innerHTML = '<user-profile></user-profile>';
          break;
        case 'medicines':
          main.innerHTML = '<medicine-list></medicine-list>';
          break;
        case 'charts':
          main.innerHTML = '<health-charts></health-charts>';
          break;
        case 'calendar':
          main.innerHTML = '<calendar-view></calendar-view>';
          break;
        case 'caregivers':
          main.innerHTML = '<caregiver-search></caregiver-search>';
          break;
        case 'requests':
          main.innerHTML = '<patient-requests></patient-requests>';
          break;
        default:
          main.innerHTML = '<user-profile></user-profile>';
      }
      
      // Mostrar con fade in
      setTimeout(() => {
        main.style.opacity = '1';
      }, 50);
    }, 200);
  }
}
customElements.define('care-sidebar', CareSidebar); 