class CaregiverOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    // Obtener datos del cuidador logueado
    let loggedInUser = localStorage.getItem('loggedInUser');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
    let profilePic = user && user.photo ? user.photo : 'https://ui-avatars.com/api/?name=' + (user ? encodeURIComponent(user.username) : 'C') + '&background=1976d2&color=fff&size=128&rounded=true';
    let displayName = user ? (user.name || user.username) : 'Cuidador';
    let displayEmail = user ? (user.email || '-') : '-';
    let displayPhone = user ? (user.phone || '-') : '-';
    let displayTitles = user ? (user.titles || 'No especificado') : 'No especificado';

    this.shadowRoot.innerHTML = `
      <style>
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        .overview-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 28px;
          background: linear-gradient(135deg, #1976d2, #42a5f5 80%);
          color: white;
          padding: 36px 32px 32px 32px;
          border-radius: 18px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(25, 118, 210, 0.18);
          position: relative;
          overflow: hidden;
          animation: fadeInDown 1.1s cubic-bezier(.4,2,.6,1) 0s 1;
        }
        .profile-pic {
          width: 96px; height: 96px; border-radius: 50%; border: 4px solid #fff; box-shadow: 0 2px 12px rgba(25,118,210,0.18); object-fit: cover; background: #fff; }
        .profile-info { flex: 1; }
        .profile-name { font-size: 2.1rem; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px; }
        .profile-email { font-size: 1.1rem; opacity: 0.92; margin-bottom: 2px; }
        .profile-role { font-size: 1rem; opacity: 0.8; font-weight: 500; }
        .profile-actions { display: flex; gap: 12px; margin-top: 10px; }
        .profile-actions button { background: #fff; color: #1976d2; border: none; border-radius: 8px; padding: 8px 18px; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 2px 8px rgba(25,118,210,0.08); transition: background 0.2s, color 0.2s; }
        .profile-actions button:hover { background: #1976d2; color: #fff; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-40px);} to { opacity: 1; transform: none; } }
        .welcome-section, .stats-row, .content-grid, .patient-list { animation: fadeInUp 1.1s cubic-bezier(.4,2,.6,1) 0.1s 1; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
        
        .overview-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .welcome-section {
          background: linear-gradient(135deg, #1976d2, #1565c0);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 30px;
          box-shadow: 0 5px 15px rgba(25, 118, 210, 0.3);
        }
        
        .welcome-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .welcome-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 20px;
        }
        
        .welcome-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }
        
        .welcome-stat {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        .welcome-stat-number {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .welcome-stat-label {
          font-size: 12px;
          opacity: 0.8;
        }
        
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          transition: all 0.3s;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 24px;
          color: white;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .recent-activities {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 15px;
          transition: all 0.3s;
        }
        
        .activity-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .activity-subtitle {
          font-size: 14px;
          color: #666;
        }
        
        .activity-time {
          font-size: 12px;
          color: #888;
        }
        
        .quick-actions {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .action-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-bottom: 15px;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        
        .action-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .action-item i {
          font-size: 20px;
          color: #1976d2;
        }
        
        .patient-list {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-top: 30px;
        }
        
        .patient-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 10px;
          transition: all 0.3s;
        }
        
        .patient-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .patient-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          font-weight: 600;
        }
        
        .patient-info {
          flex: 1;
        }
        
        .patient-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }
        
        .patient-status {
          font-size: 12px;
          color: #666;
        }
        
        .patient-status.active {
          color: #28a745;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .welcome-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .modal-bg {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.25);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
        }
        .modal-bg.active { display: flex; }
        .profile-modal {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(25,118,210,0.18);
          padding: 36px 32px 28px 32px;
          min-width: 340px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
          animation: fadeInUp 0.5s cubic-bezier(.4,2,.6,1);
        }
        .profile-modal h2 {
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 18px;
        }
        .profile-modal .modal-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .profile-modal .modal-label {
          min-width: 90px;
          font-weight: 600;
          color: #1976d2;
        }
        .profile-modal .modal-value {
          font-size: 1.1rem;
          color: #333;
        }
        .profile-modal .modal-photo {
          width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid #1976d2; background: #f8f9fa; }
        .close-modal-btn {
          position: absolute;
          top: 18px; right: 24px;
          background: none;
          border: none;
          font-size: 1.7rem;
          color: #1976d2;
          cursor: pointer;
        }
      </style>
      <div class="overview-container">
        <!-- Modal de perfil -->
        <div class="modal-bg" id="profileModalBg">
          <div class="profile-modal" style="position:relative;">
            <button class="close-modal-btn" id="closeProfileModal" title="Cerrar">&times;</button>
            <h2>Perfil del cuidador</h2>
            <div class="modal-row"><img class="modal-photo" src="${profilePic}" alt="Foto de perfil" /></div>
            <div class="modal-row"><span class="modal-label">Nombre:</span><span class="modal-value">${displayName}</span></div>
            <div class="modal-row"><span class="modal-label">Email:</span><span class="modal-value">${displayEmail}</span></div>
            <div class="modal-row"><span class="modal-label">Teléfono:</span><span class="modal-value">${displayPhone}</span></div>
            <div class="modal-row"><span class="modal-label">Títulos:</span><span class="modal-value">${displayTitles}</span></div>
            <div class="modal-row"><span class="modal-label">Usuario:</span><span class="modal-value">${loggedInUser}</span></div>
          </div>
        </div>
        <!-- Cabecera de perfil innovadora -->
        <div class="profile-header">
          <img class="profile-pic" src="${profilePic}" alt="Foto de perfil" />
          <div class="profile-info">
            <div class="profile-name">${displayName}</div>
            <div class="profile-email"><i class="bi bi-envelope"></i> ${displayEmail}</div>
            <div class="profile-role"><i class="bi bi-person-badge"></i> Cuidador profesional</div>
            <div class="profile-actions">
              <button title="Editar perfil" id="editProfileBtn"><i class="bi bi-pencil"></i> Editar perfil</button>
              <button title="Cerrar sesión" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</button>
            </div>
          </div>
        </div>
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="welcome-title">¡Bienvenido de nuevo, ${displayName}!</div>
          <div class="welcome-subtitle">Here's your professional overview for today</div>
          <div class="welcome-stats">
            <div class="welcome-stat">
              <div class="welcome-stat-number">3</div>
              <div class="welcome-stat-label">Active Patients</div>
            </div>
            <div class="welcome-stat">
              <div class="welcome-stat-number">8</div>
              <div class="welcome-stat-label">Today's Appointments</div>
            </div>
            <div class="welcome-stat">
              <div class="welcome-stat-number">12</div>
              <div class="welcome-stat-label">Tasks Completed</div>
            </div>
            <div class="welcome-stat">
              <div class="welcome-stat-number">4.8</div>
              <div class="welcome-stat-label">Rating</div>
            </div>
          </div>
        </div>
        
        <!-- Statistics Cards -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-number">3</div>
            <div class="stat-label">Active Patients</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="stat-number">8</div>
            <div class="stat-label">Today's Appointments</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-number">12</div>
            <div class="stat-label">Tasks Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-star"></i>
            </div>
            <div class="stat-number">4.8</div>
            <div class="stat-label">Average Rating</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Recent Activities -->
          <div class="recent-activities">
            <h3 class="section-title">
              <i class="bi bi-clock-history"></i>
              Recent Activities
            </h3>
            
            <div class="activity-item">
              <div class="activity-icon">
                <i class="bi bi-capsule"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Medication administered to Maria Gonzalez</div>
                <div class="activity-subtitle">Blood pressure medication - 8:00 AM</div>
              </div>
              <div class="activity-time">2 hours ago</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <i class="bi bi-camera-video"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Virtual consultation with Robert Wilson</div>
                <div class="activity-subtitle">Health monitoring session - 45 minutes</div>
              </div>
              <div class="activity-time">4 hours ago</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <i class="bi bi-file-earmark-text"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Care report submitted for Linda Martinez</div>
                <div class="activity-subtitle">Evening care session completed</div>
              </div>
              <div class="activity-time">6 hours ago</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <i class="bi bi-calendar-plus"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">New appointment scheduled</div>
                <div class="activity-subtitle">Maria Gonzalez - Tomorrow 9:00 AM</div>
              </div>
              <div class="activity-time">8 hours ago</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">Monthly performance report generated</div>
                <div class="activity-subtitle">December ${new Date().getFullYear()} statistics updated</div>
              </div>
              <div class="activity-time">1 day ago</div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="quick-actions">
            <h3 class="section-title">
              <i class="bi bi-lightning"></i>
              Quick Actions
            </h3>
            
            <button class="action-item">
              <i class="bi bi-people"></i>
              Manage Patients
            </button>
            
            <button class="action-item">
              <i class="bi bi-calendar-plus"></i>
              Schedule Appointment
            </button>
            
            <button class="action-item">
              <i class="bi bi-camera-video"></i>
              Start Virtual Care
            </button>
            
            <button class="action-item">
              <i class="bi bi-capsule"></i>
              Medication Management
            </button>
            
            <button class="action-item">
              <i class="bi bi-file-earmark-text"></i>
              Create Care Report
            </button>
            
            <button class="action-item">
              <i class="bi bi-graph-up"></i>
              View Statistics
            </button>
          </div>
        </div>
        
        <!-- Patient List -->
        <div class="patient-list">
          <h3 class="section-title">
            <i class="bi bi-people"></i>
            My Patients
          </h3>
          
          <div class="patient-item">
            <div class="patient-avatar">MG</div>
            <div class="patient-info">
              <div class="patient-name">Maria Gonzalez</div>
              <div class="patient-status active">Active - Morning Care</div>
            </div>
          </div>
          
          <div class="patient-item">
            <div class="patient-avatar">RW</div>
            <div class="patient-info">
              <div class="patient-name">Robert Wilson</div>
              <div class="patient-status active">Active - Afternoon Care</div>
            </div>
          </div>
          
          <div class="patient-item">
            <div class="patient-avatar">LM</div>
            <div class="patient-info">
              <div class="patient-name">Linda Martinez</div>
              <div class="patient-status active">Active - Evening Care</div>
            </div>
          </div>
        </div>
      </div>
    `;
    // --- Lógica para mostrar/ocultar el modal de perfil ---
    setTimeout(() => {
      const editBtn = this.shadowRoot.getElementById('editProfileBtn');
      const modalBg = this.shadowRoot.getElementById('profileModalBg');
      const closeBtn = this.shadowRoot.getElementById('closeProfileModal');
      if (editBtn && modalBg && closeBtn) {
        editBtn.onclick = () => { modalBg.classList.add('active'); };
        closeBtn.onclick = () => { modalBg.classList.remove('active'); };
        modalBg.onclick = (e) => { if (e.target === modalBg) modalBg.classList.remove('active'); };
      }
    }, 100);
  }
}

customElements.define('caregiver-overview', CaregiverOverview); 