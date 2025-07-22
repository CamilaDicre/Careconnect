class CaregiverOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
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
      </style>
      
      <div class="overview-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="welcome-title">Welcome back, Sarah!</div>
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
                <div class="activity-subtitle">December 2024 statistics updated</div>
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
  }
}

customElements.define('caregiver-overview', CaregiverOverview); 