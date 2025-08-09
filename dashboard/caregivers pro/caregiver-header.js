class CaregiverHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notifications = [];
    this.currentTime = new Date();
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
    this.startClock();
    this.loadUserData();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }

        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%);
          color: white;
          padding: 30px 35px;
          border-radius: 0;
          box-shadow: 0 8px 32px rgba(25, 118, 210, 0.4);
          margin: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          backdrop-filter: blur(10px);
          min-height: 180px;
          display: flex;
          align-items: center;
          z-index: 500;
          transition: all 0.4s ease;
        }

        /* Header when sidebar is collapsed */
        .header.sidebar-collapsed {
          left: 90px;
          right: 0;
        }

        /* Header when sidebar is expanded */
        .header.sidebar-expanded {
          left: 350px;
          right: 0;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .header::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.15);
          padding: 12px 20px;
          border-radius: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .user-info:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-weight: 600;
          font-size: 16px;
          color: white;
        }

        .user-role {
          font-size: 12px;
          opacity: 0.9;
          font-weight: 500;
        }

        .header-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .welcome-text {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }

        .current-time {
          font-size: 18px;
          font-weight: 600;
          color: white;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .action-button {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .action-button.primary {
          background: rgba(255, 255, 255, 0.25);
          font-weight: 600;
        }

        .action-button.primary:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        .action-button i {
          font-size: 16px;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.2);
          padding: 8px 15px;
          border-radius: 20px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-text {
          font-size: 12px;
          font-weight: 500;
          color: #10b981;
        }

        @media (max-width: 768px) {
          .header {
            padding: 20px 15px;
            min-height: 140px;
          }

          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          .header-left, .header-right {
            width: 100%;
            justify-content: center;
          }

          .user-info {
            padding: 8px 15px;
          }

          .user-avatar {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .action-button {
            padding: 8px 12px;
            font-size: 12px;
          }

          .current-time {
            font-size: 16px;
          }
        }
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
      </style>

      <header class="header" id="caregiverHeader">
        <div class="header-content">
          <div class="header-left">
            <div class="user-info" id="userInfo">
              <div class="user-avatar" id="userAvatar">
                CG
              </div>
              <div class="user-details">
                <div class="user-name" id="userName">Caregiver</div>
                <div class="user-role">Professional Caregiver</div>
              </div>
            </div>
            
            <div class="status-indicator">
              <div class="status-dot"></div>
              <div class="status-text">Available</div>
            </div>
          </div>

          <div class="header-center">
            <div class="welcome-text">Welcome back!</div>
            <div class="current-time" id="currentTime">Loading...</div>
          </div>

          <div class="header-right">
            <div class="header-actions">
              <button class="action-button" id="notificationsBtn" title="Notifications">
                <i class="bi bi-bell"></i>
                <span class="notification-badge" id="notificationBadge" style="display: none;">3</span>
              </button>
              
              <button class="action-button" id="scheduleBtn" title="My Schedule">
                <i class="bi bi-calendar-check"></i>
                Schedule
              </button>
              
              <button class="action-button" id="earningsBtn" title="Earnings">
                <i class="bi bi-cash-coin"></i>
                Earnings
              </button>
              
              <button class="action-button primary" id="emergencyBtn" title="Emergency Contact">
                <i class="bi bi-telephone"></i>
                Emergency
              </button>
              
              <button class="action-button" id="logoutBtn" title="Logout">
                <i class="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  attachEvents() {
    const notificationsBtn = this.shadowRoot.getElementById('notificationsBtn');
    const scheduleBtn = this.shadowRoot.getElementById('scheduleBtn');
    const earningsBtn = this.shadowRoot.getElementById('earningsBtn');
    const emergencyBtn = this.shadowRoot.getElementById('emergencyBtn');
    const logoutBtn = this.shadowRoot.getElementById('logoutBtn');

    notificationsBtn.addEventListener('click', () => this.showNotifications());
    scheduleBtn.addEventListener('click', () => this.showSchedule());
    earningsBtn.addEventListener('click', () => this.showEarnings());
    emergencyBtn.addEventListener('click', () => this.showEmergencyModal());
    logoutBtn.addEventListener('click', () => this.handleLogout());
  }

  adjustHeader(collapsed) {
    const header = this.shadowRoot.getElementById('caregiverHeader');
    if (collapsed) {
      header.classList.remove('sidebar-expanded');
      header.classList.add('sidebar-collapsed');
    } else {
      header.classList.remove('sidebar-collapsed');
      header.classList.add('sidebar-expanded');
    }
  }
  
  // Method to handle sidebar toggle events
  handleSidebarToggle(event) {
    this.adjustHeader(event.detail.collapsed);
  }

  startClock() {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      const timeElement = this.shadowRoot.getElementById('currentTime');
      if (timeElement) {
        timeElement.textContent = timeString;
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  loadUserData() {
    try {
      // Load user data from localStorage
      const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
      const users = LocalStorageUtils.getItem('users', []);
      const user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
      
      let userData;
      if (user) {
        userData = {
          name: user.name || user.username,
          role: 'Professional Caregiver',
          avatar: user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'CG',
          status: 'Available'
        };
      } else {
        userData = {
          name: 'Caregiver',
          role: 'Professional Caregiver',
          avatar: 'CG',
          status: 'Available'
        };
      }

      const userName = this.shadowRoot.getElementById('userName');
      const userAvatar = this.shadowRoot.getElementById('userAvatar');
      const statusText = this.shadowRoot.querySelector('.status-text');

      if (userName) userName.textContent = userData.name;
      if (userAvatar) userAvatar.textContent = userData.avatar;
      if (statusText) statusText.textContent = userData.status;

      // Update notification badge
      this.updateNotificationBadge(3);

    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  updateNotificationBadge(count) {
    const badge = this.shadowRoot.getElementById('notificationBadge');
    if (badge) {
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  showNotifications() {
    // Disparar evento personalizado para mostrar notificaciones
    this.dispatchEvent(new CustomEvent('showNotifications', {
      detail: { type: 'caregiver' }
    }));
  }

  showSchedule() {
    // Disparar evento para mostrar el calendario de horarios
    this.dispatchEvent(new CustomEvent('showSchedule', {
      detail: { type: 'caregiver' }
    }));
  }

  showEarnings() {
    // Disparar evento para mostrar estadísticas de ganancias
    this.dispatchEvent(new CustomEvent('showEarnings', {
      detail: { type: 'caregiver' }
    }));
  }

  showEmergencyModal() {
    // Disparar evento para mostrar modal de emergencia
    this.dispatchEvent(new CustomEvent('showEmergency', {
      detail: { type: 'caregiver' }
    }));
  }

  handleLogout() {
    // Disparar evento para manejar el logout
    this.dispatchEvent(new CustomEvent('logoutRequested', {
      detail: { type: 'caregiver' }
    }));
  }
}

customElements.define('caregiver-header', CaregiverHeader); 