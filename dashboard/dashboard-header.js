class DashboardHeader extends HTMLElement {
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

        /* Header cuando el sidebar está colapsado */
        .header.sidebar-collapsed {
          left: 90px;
          right: 0;
        }

        /* Header cuando el sidebar está expandido */
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
        }

        .user-avatar {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          border: 3px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .user-details h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-details p {
          margin: 5px 0 0 0;
          opacity: 0.95;
          font-size: 1rem;
          font-weight: 500;
        }

        .header-center {
          text-align: center;
        }

        .current-time {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .current-date {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .header-btn {
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          padding: 12px 18px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(15px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .header-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .notification-btn {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: linear-gradient(135deg, #ff4757, #ff3742);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .quick-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 18px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .weather-widget {
          background: rgba(255, 255, 255, 0.15);
          padding: 15px 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .weather-icon {
          font-size: 1.4rem;
        }

        @media (max-width: 768px) {
          .header {
            padding: 15px 20px;
          }

          .header-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .header-left, .header-right {
            justify-content: center;
          }

          .quick-actions {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .user-details h3 {
            font-size: 1.1rem;
          }

          .current-time {
            font-size: 1rem;
          }

          .header-btn {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
        }
      </style>

      <div class="header">
        <div class="header-content">
          <div class="header-left">
            <div class="user-info">
              <div class="user-avatar" id="userAvatar">
                <!-- Avatar will be loaded here -->
              </div>
              <div class="user-details">
                <h3 id="userName">Welcome!</h3>
                <p id="userRole">Patient</p>
              </div>
            </div>
          </div>

          <div class="header-center">
            <div class="current-time" id="currentTime">
              <!-- Time will be updated here -->
            </div>
            <div class="current-date" id="currentDate">
              <!-- Date will be updated here -->
            </div>
          </div>

          <div class="header-right">
            <div class="weather-widget">
              <span class="weather-icon">🌤️</span>
              <span>22°C</span>
            </div>

            <div class="quick-actions">
              <button class="action-btn" id="gamesBtn">
                <i class="bi bi-controller"></i>
                Games
              </button>
              <button class="action-btn" id="helpBtn">
                <i class="bi bi-question-circle"></i>
                Help
              </button>
            </div>

            <button class="header-btn notification-btn" id="notificationBtn">
              <i class="bi bi-bell"></i>
              Notifications
              <span class="notification-badge" id="notificationBadge">3</span>
            </button>

            <button class="header-btn" id="settingsBtn">
              <i class="bi bi-gear"></i>
              Settings
            </button>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Escuchar eventos del sidebar
    document.addEventListener('sidebarToggle', (event) => {
      this.adjustHeader(event.detail.collapsed);
    });

    // Ajustar header inicialmente
    this.adjustHeader(false); // Por defecto expandido

    const notificationBtn = this.shadowRoot.querySelector('#notificationBtn');
    const gamesBtn = this.shadowRoot.querySelector('#gamesBtn');
    const helpBtn = this.shadowRoot.querySelector('#helpBtn');
    const settingsBtn = this.shadowRoot.querySelector('#settingsBtn');

    notificationBtn.addEventListener('click', () => {
      this.showNotifications();
    });

    gamesBtn.addEventListener('click', () => {
      this.showGames();
    });

    helpBtn.addEventListener('click', () => {
      this.showHelpModal();
    });

    settingsBtn.addEventListener('click', () => {
      this.showSettings();
    });
  }

  adjustHeader(collapsed) {
    const header = this.shadowRoot.querySelector('.header');
    if (header) {
      if (collapsed) {
        header.classList.remove('sidebar-expanded');
        header.classList.add('sidebar-collapsed');
      } else {
        header.classList.remove('sidebar-collapsed');
        header.classList.add('sidebar-expanded');
      }
    }
  }

  startClock() {
    const updateTime = () => {
      const now = new Date();
      const timeElement = this.shadowRoot.querySelector('#currentTime');
      const dateElement = this.shadowRoot.querySelector('#currentDate');

      if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
      }

      if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  loadUserData() {
    try {
      const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
      const users = LocalStorageUtils.getItem('users', []);
      const user = users.find(u => u.username === loggedInUser);

      if (user) {
        const userNameElement = this.shadowRoot.querySelector('#userName');
        const userRoleElement = this.shadowRoot.querySelector('#userRole');
        const userAvatarElement = this.shadowRoot.querySelector('#userAvatar');

        if (userNameElement) {
          userNameElement.textContent = `Welcome, ${user.username}!`;
        }

        if (userRoleElement) {
          userRoleElement.textContent = 'Patient';
        }

        if (userAvatarElement) {
          // Calculate initials from username
          const getInitials = (name) => {
            if (!name) return 'U';
            return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
          };
          
          // Generate unique color based on username
          const getAvatarColor = (name) => {
            if (!name) return 'linear-gradient(135deg, #1976d2, #42a5f5)';
            
            const colors = [
              'linear-gradient(135deg, #1976d2, #42a5f5)', // Blue
              'linear-gradient(135deg, #4caf50, #45a049)', // Green
              'linear-gradient(135deg, #ff9800, #f57c00)', // Orange
              'linear-gradient(135deg, #9c27b0, #7b1fa2)', // Purple
              'linear-gradient(135deg, #f44336, #d32f2f)', // Red
              'linear-gradient(135deg, #00bcd4, #0097a7)', // Cyan
              'linear-gradient(135deg, #ff5722, #e64a19)', // Deep Orange
              'linear-gradient(135deg, #795548, #5d4037)'  // Brown
            ];
            
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
              hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            return colors[Math.abs(hash) % colors.length];
          };

          const initials = getInitials(user.username);
          const avatarColor = getAvatarColor(user.username);
          
          // Check if user has a photo
          if (user.photo) {
            userAvatarElement.innerHTML = `<img src="${user.photo}" alt="Profile photo" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
          } else {
            userAvatarElement.innerHTML = `<span style="font-size: 22px; font-weight: 700; color: white; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);">${initials}</span>`;
            userAvatarElement.style.background = avatarColor;
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  showNotifications() {
    const notifications = [
      { title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 10:00 AM', time: '2 hours ago' },
      { title: 'Medication Alert', message: 'Time to take your medication', time: '1 hour ago' },
      { title: 'Caregiver Available', message: 'Maria is available for your care needs', time: '30 minutes ago' }
    ];

    const modalHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Notifications</h3>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
          </div>
          ${notifications.map(notification => `
            <div style="border: 1px solid #eee; border-radius: 10px; padding: 15px; margin-bottom: 10px;">
              <h4 style="margin: 0 0 5px 0; color: #333;">${notification.title}</h4>
              <p style="margin: 0 0 5px 0; color: #666;">${notification.message}</p>
              <small style="color: #999;">${notification.time}</small>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  showGames() {
    // Trigger sidebar navigation to games section
    const sidebar = document.querySelector('care-sidebar');
    if (sidebar) {
      // Find the games button in the sidebar and click it
      const gamesBtn = sidebar.shadowRoot.querySelector('[data-section="games"]');
      if (gamesBtn) {
        // Remove active class from all buttons
        sidebar.shadowRoot.querySelectorAll('.sidebar-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to games button
        gamesBtn.classList.add('active');
        
        // Trigger the section change
        gamesBtn.click();
      }
    }
  }

  showEmergencyModal() {
    const modalHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 400px; width: 90%; text-align: center;">
          <div style="color: #ff4757; font-size: 48px; margin-bottom: 20px;">🚨</div>
          <h3 style="margin: 0 0 20px 0; color: #333;">Emergency Contact</h3>
          <p style="margin: 0 0 20px 0; color: #666;">Do you need immediate assistance?</p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="window.location.href='tel:911'" style="background: #ff4757; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: 600;">Call 911</button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #666; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">Cancel</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  showHelpModal() {
    const modalHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Help & Support</h3>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
          </div>
          <div style="line-height: 1.6; color: #666;">
            <h4>How can we help you?</h4>
            <ul style="text-align: left;">
              <li>📞 Contact your caregiver</li>
              <li>💊 Manage your medications</li>
              <li>📅 Schedule appointments</li>
              <li>�� View health charts</li>
              <li>🎮 Play games for mental stimulation</li>
            </ul>
            <p style="margin-top: 20px;">
              <strong>Need immediate help?</strong><br>
              Call our support line: <strong>1-800-CARE-HELP</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  showSettings() {
    const modalHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
        <div style="background: white; border-radius: 20px; padding: 30px; max-width: 400px; width: 90%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Settings</h3>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #1976d2; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer;">Edit Profile</button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #1976d2; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer;">Notification Settings</button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #1976d2; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer;">Privacy Settings</button>
            <button onclick="logout()" style="background: #ff4757; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer;">Logout</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

customElements.define('dashboard-header', DashboardHeader); 