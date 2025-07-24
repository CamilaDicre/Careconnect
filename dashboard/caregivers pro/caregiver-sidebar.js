class CaregiverSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.collapsed = false;
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-width: 260px;
          --sidebar-collapsed: 70px;
        }
        .sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-width);
          background: linear-gradient(135deg, #1976d2, #42a5f5 80%);
          color: #fff;
          box-shadow: 2px 0 18px rgba(25,118,210,0.08);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          transition: width 0.3s cubic-bezier(.4,2,.6,1);
          font-size: 1.18rem;
        }
        .sidebar.collapsed {
          width: var(--sidebar-collapsed);
        }
        .logo-section {
          padding: 20px 18px 12px 18px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        .logo-section:active {
          background: #e3eafc;
        }
        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(25,118,210,0.08);
          overflow: hidden;
        }
        .logo-icon img {
          width: 32px;
          height: 32px;
          display: block;
        }
        .logo-text {
          color: #1976d2;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0;
          letter-spacing: 1px;
          transition: all 0.3s;
        }
        .sidebar.collapsed .logo-text { display: none; }
        .toggle-btn { display: none; }
        .sidebar-header { display: none; }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 18px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 28px;
          font-size: 1.08rem;
          font-weight: 500;
          color: #fff;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 10px 0 0 10px;
          transition: background 0.18s, color 0.18s, padding 0.18s;
          outline: none;
        }
        .nav-item.active, .nav-item:hover {
          background: rgba(255,255,255,0.13);
          color: #fff;
        }
        .nav-item i {
          font-size: 1.3rem;
        }
        .sidebar.collapsed .nav-item span {
          display: none;
        }
        .sidebar-footer {
          padding: 22px 24px 18px 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 1.08rem;
          opacity: 0.95;
          background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
          color: #fff;
          text-align: center;
          letter-spacing: 0.5px;
          font-weight: 500;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 -2px 12px rgba(25,118,210,0.08);
        }
        .toggle-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 36px; height: 36px;
          background: #fff;
          color: #1976d2;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 8px rgba(25,118,210,0.10);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 1.3rem;
          transition: background 0.2s, color 0.2s;
        }
        .toggle-btn:hover { background: #1976d2; color: #fff; }
        @media (max-width: 900px) {
          .sidebar { position: fixed; left: 0; top: 0; width: 100vw; height: 70px; flex-direction: row; align-items: center; }
          .sidebar-header, .sidebar-footer { display: none; }
          .sidebar-nav { flex-direction: row; gap: 0; margin: 0; }
          .nav-item { flex: 1; justify-content: center; border-radius: 0; padding: 10px 0; }
          .sidebar.collapsed { width: 100vw; }
        }
      </style>
      <nav class="sidebar">
        <div class="logo-section" id="logo-toggle">
          <div class="logo-icon">
            <img src="../../assets/Frame - 1.svg" alt="Logo" />
          </div>
          <span class="logo-text">areConnect</span>
        </div>
        <div class="sidebar-nav">
          <button class="nav-item active" data-section="overview">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Home SVG amigable -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="20" width="32" height="20" rx="5"/><path d="M24 8L8 20h32L24 8z" fill="#fff" stroke="#1976d2" stroke-width="2"/></svg>
            </span>
            <span>Inicio</span>
          </button>
          <button class="nav-item" data-section="virtual-care">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Cruz médica SVG -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="8" width="8" height="32" rx="4" fill="#1976d2"/><rect x="8" y="20" width="32" height="8" rx="4" fill="#1976d2"/></svg>
            </span>
            <span>Virtual Care</span>
          </button>
          <button class="nav-item" data-section="medication">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Frasco de medicina SVG -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="16" width="20" height="24" rx="4" fill="#1976d2"/><rect x="18" y="8" width="12" height="8" rx="2" fill="#1976d2"/><rect x="20" y="26" width="8" height="4" rx="2" fill="#fff"/></svg>
            </span>
            <span>Medicamentos</span>
          </button>
          <button class="nav-item" data-section="documents">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Portapapeles médico SVG -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="10" width="24" height="32" rx="4" fill="#1976d2"/><rect x="18" y="6" width="12" height="8" rx="2" fill="#fff"/><rect x="20" y="22" width="8" height="2" rx="1" fill="#fff"/><rect x="20" y="28" width="8" height="2" rx="1" fill="#fff"/></svg>
            </span>
            <span>Documentos</span>
          </button>
          <button class="nav-item" data-section="earnings">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Corazón con pulso SVG -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 40s-12-8.35-12-16A8 8 0 0 1 24 16a8 8 0 0 1 12 8c0 7.65-12 16-12 16z" fill="#1976d2"/><polyline points="16 28 20 24 24 32 28 20 32 28" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span>Estadísticas</span>
          </button>
          <button class="nav-item" data-section="profile">
            <span class="sidebar-icon" aria-hidden="true" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <!-- Doctor/enfermero SVG -->
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="16" r="8" fill="#1976d2"/><rect x="12" y="28" width="24" height="12" rx="6" fill="#1976d2"/><rect x="20" y="36" width="8" height="4" rx="2" fill="#fff"/></svg>
            </span>
            <span>Perfil</span>
          </button>
        </div>
        <div class="sidebar-footer">
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
            <span><i class="bi bi-person-badge"></i> Cuidador Pro</span>
            <span style="font-size:1rem;opacity:0.8;">CareConnect &copy; 2024</span>
            <span style="font-size:0.95rem;opacity:0.7;">Soporte: soporte@careconnect.com</span>
          </div>
        </div>
      </nav>
    `;
  }

  addListeners() {
    const nav = this.shadowRoot.querySelector('.sidebar');
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');
    // Navegación por secciones
    navItems.forEach(btn => {
      btn.addEventListener('click', e => {
        navItems.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const section = btn.getAttribute('data-section');
        this.dispatchEvent(new CustomEvent('sectionChange', { detail: { section }, bubbles: true, composed: true }));
      });
    });
    // Colapsar/expandir sidebar usando el logo como botón
    const logoToggle = this.shadowRoot.getElementById('logo-toggle');
    if (logoToggle) {
      logoToggle.addEventListener('click', () => {
        this.collapsed = !this.collapsed;
        nav.classList.toggle('collapsed', this.collapsed);
        this.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed: this.collapsed }, bubbles: true, composed: true }));
      });
    }
  }
}

customElements.define('caregiver-sidebar', CaregiverSidebar); 