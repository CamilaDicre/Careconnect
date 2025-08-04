class CaregiverOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = this.getMockData();
  }
  
  connectedCallback() {
    this.render();
    this.initializeCharts();
    this.startRealTimeUpdates();
  }

  getMockData() {
    return {
      stats: {
        totalPatients: 12,
        activeSessions: 3,
        completedToday: 8,
        earningsThisMonth: 2840,
        rating: 4.8,
        hoursWorked: 156
      },
      recentActivity: [
        {
          id: 1,
          type: 'session_completed',
          patient: 'Maria Gonzalez',
          time: '2 horas atrás',
          description: 'Sesión de cuidado matutino completada',
          icon: 'bi-check-circle-fill',
          color: '#10b981'
        },
        {
          id: 2,
          type: 'medication_reminder',
          patient: 'Robert Wilson',
          time: '4 horas atrás',
          description: 'Recordatorio de medicamento enviado',
          icon: 'bi-capsule',
          color: '#3b82f6'
        },
        {
          id: 3,
          type: 'virtual_call',
          patient: 'Linda Martinez',
          time: '6 horas atrás',
          description: 'Llamada virtual programada',
          icon: 'bi-camera-video-fill',
          color: '#8b5cf6'
        },
        {
          id: 4,
          type: 'document_uploaded',
          patient: 'Carlos Rodriguez',
          time: '1 día atrás',
          description: 'Reporte de salud subido',
          icon: 'bi-file-earmark-text',
          color: '#f59e0b'
        }
      ],
      upcomingSessions: [
        {
          id: 1,
          patient: 'Maria Gonzalez',
          time: '09:00 AM',
          duration: '2 horas',
          type: 'Cuidado Matutino',
          status: 'confirmado'
        },
        {
          id: 2,
          patient: 'Robert Wilson',
          time: '02:00 PM',
          duration: '1.5 horas',
          type: 'Cuidado Vespertino',
          status: 'pendiente'
        },
        {
          id: 3,
          patient: 'Linda Martinez',
          time: '06:00 PM',
          duration: '1 hora',
          type: 'Llamada Virtual',
          status: 'confirmado'
        }
      ],
      weeklyStats: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        sessions: [5, 7, 6, 8, 9, 4, 3],
        earnings: [120, 168, 144, 192, 216, 96, 72]
      }
    };
  }
  
  render() {
    // Get logged in caregiver data
    let loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    let users = LocalStorageUtils.getItem('users', []);
    let user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
    let profilePic = user && user.photo ? user.photo : 'https://ui-avatars.com/api/?name=' + (user ? encodeURIComponent(user.username) : 'C') + '&background=2563eb&color=fff&size=128&rounded=true';
    let displayName = user ? (user.name || user.username) : 'Caregiver';
    let displayEmail = user ? (user.email || '-') : '-';
    let displayPhone = user ? (user.phone || '-') : '-';
    let displayTitles = user ? (user.titles || 'No especificado') : 'No especificado';

    this.shadowRoot.innerHTML = `
      <style>
        * { 
          font-family: 'Inter', 'Poppins', sans-serif; 
          box-sizing: border-box; 
        }
        
        .overview-container { 
          padding: 0; 
          max-width: 1400px; 
          margin: 0 auto; 
        }
        
        /* Header con perfil */
        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          color: white;
          padding: 32px;
          border-radius: 20px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.15);
          position: relative;
          overflow: hidden;
          animation: fadeInDown 0.8s ease-out;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .profile-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        
        .profile-pic {
          width: 100px; 
          height: 100px; 
          border-radius: 50%; 
          border: 4px solid rgba(255, 255, 255, 0.3); 
          box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
          object-fit: cover; 
          background: #fff; 
          position: relative;
          z-index: 1;
        }
        
        .profile-info { 
          flex: 1; 
          position: relative;
          z-index: 1;
        }
        
        .profile-name { 
          font-size: 2.2rem; 
          font-weight: 700; 
          margin-bottom: 8px; 
          letter-spacing: 0.5px; 
        }
        
        .profile-email { 
          font-size: 1.1rem; 
          opacity: 0.9; 
          margin-bottom: 4px; 
        }
        
        .profile-role { 
          font-size: 1rem; 
          opacity: 0.8; 
          font-weight: 500; 
        }
        
        .profile-actions { 
          display: flex; 
          gap: 12px; 
          margin-top: 16px; 
        }
        
        .profile-actions button { 
          background: rgba(255, 255, 255, 0.2); 
          color: #fff; 
          border: 1px solid rgba(255, 255, 255, 0.3); 
          border-radius: 12px; 
          padding: 10px 20px; 
          font-weight: 600; 
          font-size: 0.9rem; 
          cursor: pointer; 
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .profile-actions button:hover { 
          background: rgba(255, 255, 255, 0.3); 
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        /* Métricas principales */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
        }
        
        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .stat-icon.primary { background: linear-gradient(135deg, #2563eb, #3b82f6); }
        .stat-icon.success { background: linear-gradient(135deg, #10b981, #34d399); }
        .stat-icon.warning { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        .stat-icon.purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .stat-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 8px;
        }
        
        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }
        
        /* Contenido principal */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Gráfico semanal */
        .chart-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .chart-container {
          position: relative;
          height: 300px;
        }
        
        /* Actividad reciente */
        .activity-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .activity-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .activity-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
        }
        
        .activity-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: white;
          flex-shrink: 0;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-description {
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .activity-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .activity-patient {
          font-weight: 600;
          color: #2563eb;
        }
        
        /* Sesiones próximas */
        .sessions-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .sessions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .sessions-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .sessions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .session-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
          border-left: 4px solid #2563eb;
        }
        
        .session-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }
        
        .session-time {
          text-align: center;
          min-width: 80px;
        }
        
        .session-time-main {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .session-time-duration {
          font-size: 0.8rem;
          color: #6b7280;
        }
        
        .session-info {
          flex: 1;
        }
        
        .session-patient {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .session-type {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .session-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .session-status.confirmado {
          background: #dcfce7;
          color: #166534;
        }
        
        .session-status.pendiente {
          background: #fef3c7;
          color: #92400e;
        }
        
        /* Animaciones */
        @keyframes fadeInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .stats-grid, .content-grid {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
            padding: 24px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .content-grid {
            gap: 24px;
          }
          
          .stat-value {
            font-size: 2rem;
          }
        }
      </style>

      <div class="overview-container">
        <!-- Header con perfil -->
        <div class="profile-header">
          <img src="${profilePic}" alt="Profile" class="profile-pic" onerror="this.src='https://ui-avatars.com/api/?name=C&background=2563eb&color=fff&size=128&rounded=true'">
          <div class="profile-info">
            <div class="profile-name">${displayName}</div>
            <div class="profile-email">${displayEmail}</div>
            <div class="profile-role">${displayTitles}</div>
            <div class="profile-actions">
              <button onclick="window.notifications.show('Función de edición próximamente', 'info', 3000)">
                <i class="bi bi-pencil-square me-2"></i>Editar Perfil
              </button>
              <button onclick="window.notifications.show('Función de configuración próximamente', 'info', 3000)">
                <i class="bi bi-gear me-2"></i>Configuración
              </button>
            </div>
          </div>
        </div>

        <!-- Métricas principales -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon primary">
                <i class="bi bi-people-fill"></i>
              </div>
            </div>
            <div class="stat-value">${this.data.stats.totalPatients}</div>
            <div class="stat-label">Pacientes Totales</div>
            <div class="stat-change positive">
              <i class="bi bi-arrow-up"></i>
              +2 este mes
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon success">
                <i class="bi bi-camera-video-fill"></i>
              </div>
            </div>
            <div class="stat-value">${this.data.stats.activeSessions}</div>
            <div class="stat-label">Sesiones Activas</div>
            <div class="stat-change positive">
              <i class="bi bi-arrow-up"></i>
              +1 hoy
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon warning">
                <i class="bi bi-check-circle-fill"></i>
              </div>
            </div>
            <div class="stat-value">${this.data.stats.completedToday}</div>
            <div class="stat-label">Completadas Hoy</div>
            <div class="stat-change positive">
              <i class="bi bi-arrow-up"></i>
              +3 vs ayer
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <div class="stat-icon purple">
                <i class="bi bi-currency-dollar"></i>
              </div>
            </div>
            <div class="stat-value">$${this.data.stats.earningsThisMonth.toLocaleString()}</div>
            <div class="stat-label">Ganancias del Mes</div>
            <div class="stat-change positive">
              <i class="bi bi-arrow-up"></i>
              +7.2% vs mes pasado
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="content-grid">
          <!-- Gráfico semanal -->
          <div class="chart-section">
            <div class="chart-header">
              <div class="chart-title">Actividad Semanal</div>
              <div style="display: flex; gap: 8px;">
                <button style="padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; font-size: 0.875rem; cursor: pointer;">Sesiones</button>
                <button style="padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; font-size: 0.875rem; cursor: pointer;">Ganancias</button>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="weeklyChart"></canvas>
            </div>
          </div>

          <!-- Actividad reciente -->
          <div class="activity-section">
            <div class="activity-header">
              <div class="activity-title">Actividad Reciente</div>
              <button style="background: none; border: none; color: #2563eb; font-size: 0.875rem; cursor: pointer;">Ver todo</button>
            </div>
            <div class="activity-list">
              ${this.data.recentActivity.map(activity => `
                <div class="activity-item">
                  <div class="activity-icon" style="background: ${activity.color}">
                    <i class="bi ${activity.icon}"></i>
                  </div>
                  <div class="activity-content">
                    <div class="activity-description">${activity.description}</div>
                    <div class="activity-meta">
                      <span class="activity-patient">${activity.patient}</span>
                      <span>•</span>
                      <span>${activity.time}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sesiones próximas -->
        <div class="sessions-section">
          <div class="sessions-header">
            <div class="sessions-title">Próximas Sesiones</div>
            <button style="background: none; border: none; color: #2563eb; font-size: 0.875rem; cursor: pointer;">Ver calendario</button>
          </div>
          <div class="sessions-list">
            ${this.data.upcomingSessions.map(session => `
              <div class="session-item">
                <div class="session-time">
                  <div class="session-time-main">${session.time}</div>
                  <div class="session-time-duration">${session.duration}</div>
                </div>
                <div class="session-info">
                  <div class="session-patient">${session.patient}</div>
                  <div class="session-type">${session.type}</div>
                </div>
                <div class="session-status ${session.status}">${session.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  initializeCharts() {
    const canvas = this.shadowRoot.getElementById('weeklyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Configurar el tamaño del canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear gráfico con Chart.js
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.weeklyStats.labels,
        datasets: [
          {
            label: 'Sesiones',
            data: this.data.weeklyStats.sessions,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Ganancias ($)',
            data: this.data.weeklyStats.earnings,
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#7c3aed',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              }
            }
          }
        }
      }
    });
  }

  startRealTimeUpdates() {
    // Simular actualizaciones en tiempo real
    setInterval(() => {
      // Actualizar métricas aleatoriamente
      this.data.stats.activeSessions = Math.max(1, Math.min(5, this.data.stats.activeSessions + (Math.random() > 0.5 ? 1 : -1)));
      this.data.stats.completedToday = Math.max(0, this.data.stats.completedToday + (Math.random() > 0.7 ? 1 : 0));
      
      // Re-renderizar solo las métricas que cambian
      this.updateStats();
    }, 30000); // Actualizar cada 30 segundos
  }

  updateStats() {
    // Actualizar solo las métricas sin re-renderizar todo
    const statCards = this.shadowRoot.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
      // Actualizar sesiones activas
      const activeSessionsCard = statCards[1];
      const activeSessionsValue = activeSessionsCard.querySelector('.stat-value');
      if (activeSessionsValue) {
        activeSessionsValue.textContent = this.data.stats.activeSessions;
      }

      // Actualizar completadas hoy
      const completedCard = statCards[2];
      const completedValue = completedCard.querySelector('.stat-value');
      if (completedValue) {
        completedValue.textContent = this.data.stats.completedToday;
      }
    }
  }
}

customElements.define('caregiver-overview', CaregiverOverview); 