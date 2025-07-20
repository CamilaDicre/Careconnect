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
        
        .caregiver-overview-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }
        
        .welcome-section {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          color: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(25, 118, 210, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .welcome-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }
        
        .welcome-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        
        .welcome-subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          border-left: 4px solid #1976d2;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
          margin-bottom: 15px;
        }
        
        .stat-icon.patients {
          background: linear-gradient(135deg, #1976d2, #1565c0);
        }
        
        .stat-icon.schedule {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }
        
        .stat-icon.tasks {
          background: linear-gradient(135deg, #4caf50, #388e3c);
        }
        
        .stat-icon.performance {
          background: linear-gradient(135deg, #ff9800, #f57c00);
        }
        
        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 16px;
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
          padding: 15px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
        }
        
        .activity-icon.patient {
          background: linear-gradient(135deg, #1976d2, #1565c0);
        }
        
        .activity-icon.schedule {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }
        
        .activity-icon.health {
          background: linear-gradient(135deg, #4caf50, #388e3c);
        }
        
        .activity-content h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .activity-content p {
          margin: 5px 0 0 0;
          font-size: 14px;
          color: #666;
        }
        
        .quick-actions {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
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
        
        .action-btn:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .action-btn i {
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
          margin-bottom: 15px;
          transition: all 0.3s ease;
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
        
        .patient-info h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .patient-info p {
          margin: 5px 0 0 0;
          font-size: 14px;
          color: #666;
        }
        
        .patient-status {
          margin-left: auto;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-active {
          background: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .welcome-section {
            padding: 30px 20px;
          }
          
          .welcome-title {
            font-size: 28px;
          }
        }
      </style>
      
      <div class="caregiver-overview-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1 class="welcome-title">Welcome, Ms. Johnson!</h1>
          <p class="welcome-subtitle">Here's your professional overview for today</p>
        </div>
        
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon patients">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-number">3</div>
            <div class="stat-label">Active Patients</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon schedule">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="stat-number">8</div>
            <div class="stat-label">Today's Appointments</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon tasks">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-number">12</div>
            <div class="stat-label">Completed Tasks</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon performance">
              <i class="bi bi-star"></i>
            </div>
            <div class="stat-number">4.8</div>
            <div class="stat-label">Performance Rating</div>
          </div>
        </div>
        
        <!-- Content Grid -->
        <div class="content-grid">
          <!-- Recent Activities -->
          <div class="recent-activities">
            <h2 class="section-title">
              <i class="bi bi-clock-history"></i>
              Recent Activities
            </h2>
            
            <div class="activity-item">
              <div class="activity-icon patient">
                <i class="bi bi-person-check"></i>
              </div>
              <div class="activity-content">
                <h4>Patient Care Completed</h4>
                <p>Mrs. Gonzalez - Morning medication and health check completed</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon schedule">
                <i class="bi bi-calendar-event"></i>
              </div>
              <div class="activity-content">
                <h4>Appointment Scheduled</h4>
                <p>Dr. Smith consultation for Mr. Rodriguez at 2:00 PM</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon health">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <div class="activity-content">
                <h4>Health Report Updated</h4>
                <p>Blood pressure monitoring for Mrs. Martinez - Normal range</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon patient">
                <i class="bi bi-clipboard-check"></i>
              </div>
              <div class="activity-content">
                <h4>Care Plan Updated</h4>
                <p>Modified daily routine for Mr. Wilson based on doctor's recommendations</p>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="quick-actions">
            <h2 class="section-title">
              <i class="bi bi-lightning"></i>
              Quick Actions
            </h2>
            
            <button class="action-btn" onclick="document.querySelector('caregiver-sidebar').showSection('patients')">
              <i class="bi bi-people"></i>
              Manage Patients
            </button>
            
            <button class="action-btn" onclick="document.querySelector('caregiver-sidebar').showSection('schedule')">
              <i class="bi bi-calendar-plus"></i>
              Schedule Appointment
            </button>
            
            <button class="action-btn" onclick="document.querySelector('caregiver-sidebar').showSection('monitoring')">
              <i class="bi bi-heart-pulse"></i>
              Health Monitoring
            </button>
            
            <button class="action-btn" onclick="document.querySelector('caregiver-sidebar').showSection('reports')">
              <i class="bi bi-clipboard-data"></i>
              Create Report
            </button>
            
            <button class="action-btn" onclick="document.querySelector('caregiver-sidebar').showSection('profile')">
              <i class="bi bi-person-circle"></i>
              Update Profile
            </button>
          </div>
        </div>
        
        <!-- Patient List -->
        <div class="patient-list">
          <h2 class="section-title">
            <i class="bi bi-people"></i>
            My Patients
          </h2>
          
          <div class="patient-item">
            <div class="patient-avatar">MG</div>
            <div class="patient-info">
              <h4>Mrs. Maria Gonzalez</h4>
              <p>Morning care • Blood pressure monitoring</p>
            </div>
            <div class="patient-status status-active">Active</div>
          </div>
          
          <div class="patient-item">
            <div class="patient-avatar">RW</div>
            <div class="patient-info">
              <h4>Mr. Robert Wilson</h4>
              <p>Afternoon care • Medication management</p>
            </div>
            <div class="patient-status status-active">Active</div>
          </div>
          
          <div class="patient-item">
            <div class="patient-avatar">LM</div>
            <div class="patient-info">
              <h4>Mrs. Linda Martinez</h4>
              <p>Evening care • Health check</p>
            </div>
            <div class="patient-status status-pending">Pending</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('caregiver-overview', CaregiverOverview); 