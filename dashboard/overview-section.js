class OverviewSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    // Get real user
    const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    const users = LocalStorageUtils.getItem('users', []);
    const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
    const displayName = user ? (user.name || user.username || 'User') : 'User';
    
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .overview-container {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .overview-hero {
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
        }

        .overview-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .overview-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .overview-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 20px;
        }

        .quick-stats {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .quick-stat {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .quick-stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .quick-stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .dashboard-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        /* Dark mode support */
        :host-context(.dark-mode) .overview-container { color: #e5e7eb; }
        :host-context(.dark-mode) .dashboard-card {
          background: #0f172a;
          border-color: #1f2937;
          box-shadow: 0 8px 25px rgba(2,6,23,0.6);
          color: #e5e7eb;
        }
        :host-context(.dark-mode) .card-title { color: #e5e7eb; }
        :host-context(.dark-mode) .stats-grid .stat-item,
        :host-context(.dark-mode) .metric-item {
          background: linear-gradient(135deg, #0b1220, #0f172a);
          border-color: #1f2937;
          color: #e5e7eb;
        }
        :host-context(.dark-mode) .stat-label,
        :host-context(.dark-mode) .metric-label,
        :host-context(.dark-mode) .empty-description { color: #94a3b8; }
        :host-context(.dark-mode) .activity-item,
        :host-context(.dark-mode) .medication-item,
        :host-context(.dark-mode) .appointment-item { border-bottom-color: #1f2937; }
        :host-context(.dark-mode) .medication-name,
        :host-context(.dark-mode) .appointment-name,
        :host-context(.dark-mode) .activity-title,
        :host-context(.dark-mode) .empty-title { color: #e5e7eb; }
        :host-context(.dark-mode) .overview-hero {
          box-shadow: 0 15px 35px rgba(2,6,23,0.6);
        }

        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #2196f3, #1976d2);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(33, 150, 243, 0.15);
          border-color: #2196f3;
        }

        .dashboard-card:hover::before {
          transform: scaleX(1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-icon {
          font-size: 1.5rem;
          color: #1976d2;
        }

        .card-action {
          background: linear-gradient(135deg, #2196f3, #1976d2);
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .stat-item {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e9ecef;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 600;
        }

        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .activity-content {
          flex: 1;
        }

        .activity-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }

        .activity-time {
          font-size: 0.8rem;
          color: #666;
        }

        .medication-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .medication-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .medication-item:last-child {
          border-bottom: none;
        }

        .medication-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .medication-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: linear-gradient(135deg, #28a745, #20c997);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
        }

        .medication-name {
          font-weight: 600;
          color: #333;
        }

        .medication-time {
          font-size: 0.8rem;
          color: #28a745;
          font-weight: 600;
        }

        .appointment-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .appointment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .appointment-item:last-child {
          border-bottom: none;
        }

        .appointment-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .appointment-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
        }

        .appointment-name {
          font-weight: 600;
          color: #333;
        }

        .appointment-time {
          font-size: 0.8rem;
          color: #1976d2;
          font-weight: 600;
        }

        .health-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .metric-item {
          text-align: center;
          padding: 15px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 12px;
          border: 1px solid #e9ecef;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }

        .metric-label {
          font-size: 0.8rem;
          color: #666;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .empty-description {
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .overview-container {
            padding: 20px;
          }
          
          .overview-title {
            font-size: 2rem;
          }
          
          .quick-stats {
            flex-direction: column;
            gap: 15px;
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      
      <div class="overview-container">
        <div class="overview-hero">
          <div class="hero-content">
            <h1 class="overview-title">Welcome back, ${displayName}! 👋</h1>
            <p class="overview-subtitle">Here's your health summary for today</p>
            <div class="quick-stats">
              <div class="quick-stat">
                <span class="quick-stat-number">5</span>
                <span class="quick-stat-label">Medications</span>
              </div>
              <div class="quick-stat">
                <span class="quick-stat-number">2</span>
                <span class="quick-stat-label">Appointments</span>
              </div>
              <div class="quick-stat">
                <span class="quick-stat-number">95%</span>
                <span class="quick-stat-label">Health Score</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Health Overview -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-heart-pulse card-icon"></i>
                Health Overview
              </div>
              <button class="card-action">View Details</button>
            </div>
            <div class="health-metrics">
              <div class="metric-item">
                <div class="metric-value">120/80</div>
                <div class="metric-label">Blood Pressure</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">95</div>
                <div class="metric-label">Heart Rate</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">98.6°F</div>
                <div class="metric-label">Temperature</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">72 kg</div>
                <div class="metric-label">Weight</div>
              </div>
            </div>
          </div>

          <!-- Today's Medications -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-capsule card-icon"></i>
                Today's Medications
              </div>
              <button class="card-action">View All</button>
            </div>
            <ul class="medication-list">
              <li class="medication-item">
                <div class="medication-info">
                  <div class="medication-icon">💊</div>
                  <div>
                    <div class="medication-name">Metformin</div>
                    <div class="medication-time">8:00 AM</div>
                  </div>
                </div>
                <button class="card-action" style="padding: 5px 10px; font-size: 0.7rem;">Take</button>
              </li>
              <li class="medication-item">
                <div class="medication-info">
                  <div class="medication-icon">💊</div>
                  <div>
                    <div class="medication-name">Aspirin</div>
                    <div class="medication-time">12:00 PM</div>
                  </div>
                </div>
                <button class="card-action" style="padding: 5px 10px; font-size: 0.7rem;">Take</button>
              </li>
              <li class="medication-item">
                <div class="medication-info">
                  <div class="medication-icon">💊</div>
                  <div>
                    <div class="medication-name">Vitamin D</div>
                    <div class="medication-time">8:00 PM</div>
                  </div>
                </div>
                <button class="card-action" style="padding: 5px 10px; font-size: 0.7rem;">Take</button>
              </li>
            </ul>
          </div>

          <!-- Upcoming Appointments -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-calendar-event card-icon"></i>
                Upcoming Appointments
              </div>
              <button class="card-action">View All</button>
            </div>
            <ul class="appointment-list">
              <li class="appointment-item">
                <div class="appointment-info">
                  <div class="appointment-icon">👨‍⚕️</div>
                  <div>
                    <div class="appointment-name">Dr. Martínez</div>
                    <div class="appointment-time">Tomorrow, 10:00 AM</div>
                  </div>
                </div>
                <button class="card-action" style="padding: 5px 10px; font-size: 0.7rem;">Join</button>
              </li>
              <li class="appointment-item">
                <div class="appointment-info">
                  <div class="appointment-icon">🏥</div>
                  <div>
                    <div class="appointment-name">Blood Test</div>
                    <div class="appointment-time">Friday, 9:00 AM</div>
                  </div>
                </div>
                <button class="card-action" style="padding: 5px 10px; font-size: 0.7rem;">Details</button>
              </li>
            </ul>
          </div>

          <!-- Recent Activity -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-activity card-icon"></i>
                Recent Activity
              </div>
              <button class="card-action">View All</button>
            </div>
            <ul class="activity-list">
              <li class="activity-item">
                <div class="activity-icon" style="background: linear-gradient(135deg, #28a745, #20c997);">✅</div>
                <div class="activity-content">
                  <div class="activity-title">Medication taken</div>
                  <div class="activity-time">2 hours ago</div>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-icon" style="background: linear-gradient(135deg, #1976d2, #42a5f5);">📊</div>
                <div class="activity-content">
                  <div class="activity-title">Blood pressure recorded</div>
                  <div class="activity-time">4 hours ago</div>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-icon" style="background: linear-gradient(135deg, #ffc107, #ff9800);">📅</div>
                <div class="activity-content">
                  <div class="activity-title">Appointment scheduled</div>
                  <div class="activity-time">Yesterday</div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Health Stats -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-graph-up card-icon"></i>
                Health Statistics
              </div>
              <button class="card-action">View Details</button>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">7</div>
                <div class="stat-label">Days Active</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">95%</div>
                <div class="stat-label">Medication Adherence</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">8.5h</div>
                <div class="stat-label">Avg. Sleep</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">6,500</div>
                <div class="stat-label">Steps Today</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="dashboard-card">
            <div class="card-header">
              <div class="card-title">
                <i class="bi bi-lightning card-icon"></i>
                Quick Actions
              </div>
            </div>
            <div class="stats-grid">
              <button class="stat-item" style="cursor: pointer; border: none; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div class="stat-value">📞</div>
                <div class="stat-label">Emergency Call</div>
              </button>
              <button class="stat-item" style="cursor: pointer; border: none; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div class="stat-value">📋</div>
                <div class="stat-label">Book Appointment</div>
              </button>
              <button class="stat-item" style="cursor: pointer; border: none; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div class="stat-value">💊</div>
                <div class="stat-label">Add Medication</div>
              </button>
              <button class="stat-item" style="cursor: pointer; border: none; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div class="stat-value">📊</div>
                <div class="stat-label">Health Report</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('overview-section', OverviewSection); 