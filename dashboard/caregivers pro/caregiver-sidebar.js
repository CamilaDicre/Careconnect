class CaregiverSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.collapsed = false;
    this.currentSection = 'overview';
  }

  connectedCallback() {
    this.render();
    this.addListeners();
    this.loadUserData();
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
        role: 'Cuidador Profesional',
        status: 'En línea'
      };
    } else {
      this.userData = {
        name: 'Cuidador',
        email: '',
        photo: 'https://ui-avatars.com/api/?name=C&background=2563eb&color=fff&size=128&rounded=true',
        role: 'Cuidador Profesional',
        status: 'En línea'
      };
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-width: 280px;
          --sidebar-collapsed: 80px;
          --primary-color: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary-color: #7c3aed;
          --text-light: #ffffff;
          --text-muted: rgba(255, 255, 255, 0.7);
          --bg-hover: rgba(255, 255, 255, 0.1);
          --bg-active: rgba(255, 255, 255, 0.15);
          --border-color: rgba(255, 255, 255, 0.1);
        }

        * {
          font-family: 'Inter', 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        .sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-width);
          background: linear-gradient(180deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: var(--text-light);
          box-shadow: 4px 0 24px rgba(37, 99, 235, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          overflow: hidden;
        }

        .sidebar.collapsed {
          width: var(--sidebar-collapsed);
        }

        /* Header con logo */
        .sidebar-header {
          padding: 24px 20px 20px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s;
          position: relative;
          cursor: pointer;
          user-select: none;
        }

        .sidebar-header:active {
          background: rgba(255, 255, 255, 0.1);
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s;
        }

        .logo-icon:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .logo-icon img {
          width: 28px;
          height: 28px;
          display: block;
        }

        .logo-text {
          color: var(--text-light);
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0;
          letter-spacing: 0.5px;
          transition: all 0.3s;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .sidebar.collapsed .logo-text {
          opacity: 0;
          transform: translateX(-20px);
        }

        /* Perfil del usuario */
        .user-profile {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s;
        }

        .sidebar.collapsed .user-profile {
          padding: 16px 12px;
          justify-content: center;
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.2);
          object-fit: cover;
          transition: all 0.3s;
        }

        .sidebar.collapsed .user-avatar {
          width: 40px;
          height: 40px;
        }

        .user-info {
          flex: 1;
          min-width: 0;
          transition: all 0.3s;
        }

        .sidebar.collapsed .user-info {
          opacity: 0;
          transform: translateX(-20px);
        }

        .user-name {
          font-weight: 600;
          font-size: 1rem;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

        /* Búsqueda rápida */
        .search-container {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          transition: all 0.3s;
        }

        .sidebar.collapsed .search-container {
          padding: 12px 8px;
        }

        .search-box {
          position: relative;
          transition: all 0.3s;
        }

        .sidebar.collapsed .search-box {
          opacity: 0;
          transform: translateX(-20px);
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: none;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          font-size: 0.875rem;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1rem;
        }

        /* Navegación */
        .sidebar-nav {
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
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 8px 16px;
          transition: all 0.3s;
        }

        .sidebar.collapsed .nav-section-title {
          opacity: 0;
          transform: translateX(-20px);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-light);
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s;
          outline: none;
          position: relative;
          text-decoration: none;
        }

        .nav-item:hover {
          background: var(--bg-hover);
          transform: translateX(4px);
        }

        .nav-item.active {
          background: var(--bg-active);
          color: var(--text-light);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: var(--text-light);
          border-radius: 0 2px 2px 0;
        }

        .nav-icon {
          font-size: 1.125rem;
          width: 20px;
          text-align: center;
          transition: all 0.3s;
        }

        .nav-text {
          flex: 1;
          transition: all 0.3s;
        }

        .sidebar.collapsed .nav-text {
          opacity: 0;
          transform: translateX(-20px);
        }

        .nav-badge {
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          transition: all 0.3s;
        }

        .sidebar.collapsed .nav-badge {
          opacity: 0;
          transform: translateX(-20px);
        }

        /* Botón de colapso */
        .toggle-btn {
          position: absolute;
          top: 20px;
          right: -12px;
          width: 24px;
          height: 24px;
          background: var(--text-light);
          border: none;
          border-radius: 50%;
          color: var(--primary-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
          z-index: 10;
        }

        .toggle-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .toggle-icon {
          transition: transform 0.3s;
        }

        .sidebar.collapsed .toggle-icon {
          transform: rotate(180deg);
        }

        /* Footer */
        .sidebar-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar.collapsed .sidebar-footer {
          padding: 12px 8px;
        }

        .footer-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-action {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          color: var(--text-light);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 0.875rem;
        }

        .footer-action:hover {
          background: var(--bg-hover);
          text-decoration: none;
          color: var(--text-light);
        }

        .sidebar.collapsed .footer-action span {
          opacity: 0;
          transform: translateX(-20px);
        }

        /* Scrollbar personalizada */
        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .toggle-btn {
            display: none;
          }
        }

        /* Tooltip para sidebar colapsado */
        .tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background: #1f2937;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.875rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s;
          z-index: 1001;
          margin-left: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tooltip::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 4px solid #1f2937;
        }

        .sidebar.collapsed .nav-item:hover .tooltip {
          opacity: 1;
        }
      </style>

      <div class="sidebar ${this.collapsed ? 'collapsed' : ''}">
        <!-- Botón de colapso -->
        <button class="toggle-btn" id="toggleBtn">
          <i class="bi bi-chevron-left toggle-icon"></i>
        </button>

        <!-- Header con logo -->
        <div class="sidebar-header" id="logoSection">
          <div class="logo-icon">
            <i class="bi bi-shield-heart-fill" style="color: white; font-size: 24px;"></i>
          </div>
          <h1 class="logo-text">CareConnect</h1>
        </div>

        <!-- Perfil del usuario -->
        <div class="user-profile">
          <img src="${this.userData?.photo || ''}" alt="Avatar" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=C&background=2563eb&color=fff&size=128&rounded=true'">
          <div class="user-info">
            <div class="user-name">${this.userData?.name || 'Cuidador'}</div>
            <div class="user-role">${this.userData?.role || 'Cuidador Profesional'}</div>
            <div class="user-status">
              <div class="status-dot"></div>
              <span>${this.userData?.status || 'En línea'}</span>
            </div>
          </div>
        </div>

        <!-- Búsqueda rápida -->
        <div class="search-container">
          <div class="search-box">
            <i class="bi bi-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Buscar..." id="searchInput">
          </div>
        </div>

        <!-- Navegación -->
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-section-title">Principal</div>
            <button class="nav-item ${this.currentSection === 'overview' ? 'active' : ''}" data-section="overview">
              <i class="bi bi-house-door-fill nav-icon"></i>
              <span class="nav-text">Dashboard</span>
              <div class="tooltip">Dashboard</div>
            </button>
            <button class="nav-item ${this.currentSection === 'virtual-care' ? 'active' : ''}" data-section="virtual-care">
              <i class="bi bi-camera-video-fill nav-icon"></i>
              <span class="nav-text">Cuidado Virtual</span>
              <div class="tooltip">Cuidado Virtual</div>
            </button>
            <button class="nav-item ${this.currentSection === 'medication' ? 'active' : ''}" data-section="medication">
              <i class="bi bi-capsule nav-icon"></i>
              <span class="nav-text">Medicamentos</span>
              <div class="tooltip">Medicamentos</div>
            </button>
          </div>

          <div class="nav-section">
            <div class="nav-section-title">Gestión</div>
            <button class="nav-item ${this.currentSection === 'documents' ? 'active' : ''}" data-section="documents">
              <i class="bi bi-file-earmark-text nav-icon"></i>
              <span class="nav-text">Documentos</span>
              <div class="tooltip">Documentos</div>
            </button>
            <button class="nav-item ${this.currentSection === 'earnings' ? 'active' : ''}" data-section="earnings">
              <i class="bi bi-graph-up nav-icon"></i>
              <span class="nav-text">Ganancias</span>
              <div class="tooltip">Ganancias</div>
            </button>
          </div>

          <div class="nav-section">
            <div class="nav-section-title">Cuenta</div>
            <button class="nav-item ${this.currentSection === 'profile' ? 'active' : ''}" data-section="profile">
              <i class="bi bi-person-circle nav-icon"></i>
              <span class="nav-text">Mi Perfil</span>
              <div class="tooltip">Mi Perfil</div>
            </button>
          </div>
        </nav>

        <!-- Footer -->
        <div class="sidebar-footer">
          <div class="footer-actions">
            <a href="../../pages/login.html" class="footer-action">
              <i class="bi bi-box-arrow-right"></i>
              <span>Cerrar Sesión</span>
            </a>
            <a href="../../index.html" class="footer-action">
              <i class="bi bi-house"></i>
              <span>Ir al Inicio</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  addListeners() {
    // Toggle sidebar
    const toggleBtn = this.shadowRoot.getElementById('toggleBtn');
    toggleBtn.addEventListener('click', () => {
      this.collapsed = !this.collapsed;
      this.render();
      this.dispatchEvent(new CustomEvent('sidebarToggle', {
        detail: { collapsed: this.collapsed }
      }));
    });

    // Navigation
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        this.currentSection = section;
        
        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Dispatch event
        this.dispatchEvent(new CustomEvent('sectionChange', {
          detail: { section: section }
        }));
      });
    });

    // Search functionality
    const searchInput = this.shadowRoot.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      this.handleSearch(query);
    });

    // Logo click
    const logoSection = this.shadowRoot.getElementById('logoSection');
    logoSection.addEventListener('click', () => {
      // Reset to overview
      this.currentSection = 'overview';
      this.render();
      this.addListeners();
      this.dispatchEvent(new CustomEvent('sectionChange', {
        detail: { section: 'overview' }
      }));
    });

    // Mobile responsive
    if (window.innerWidth <= 1024) {
      this.collapsed = true;
      this.render();
      this.addListeners();
    }
  }

  handleSearch(query) {
    if (query.length < 2) return;

    // Simular búsqueda
    const searchResults = [
      { section: 'overview', title: 'Dashboard', description: 'Vista general del dashboard' },
      { section: 'virtual-care', title: 'Cuidado Virtual', description: 'Sesiones de cuidado virtual' },
      { section: 'medication', title: 'Medicamentos', description: 'Gestión de medicamentos' },
      { section: 'documents', title: 'Documentos', description: 'Documentos y archivos' },
      { section: 'earnings', title: 'Ganancias', description: 'Estadísticas de ganancias' },
      { section: 'profile', title: 'Mi Perfil', description: 'Configuración del perfil' }
    ];

    const results = searchResults.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      // Mostrar resultados (aquí se puede implementar un dropdown)
      console.log('Resultados de búsqueda:', results);
      
      // Por ahora, navegar al primer resultado
      if (results[0]) {
        this.currentSection = results[0].section;
        this.render();
        this.addListeners();
        this.dispatchEvent(new CustomEvent('sectionChange', {
          detail: { section: results[0].section }
        }));
      }
    }
  }
}

customElements.define('caregiver-sidebar', CaregiverSidebar); 