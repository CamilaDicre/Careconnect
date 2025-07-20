class OverviewSection extends HTMLElement {
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
        
        .stat-icon.medications {
          background: linear-gradient(135deg, #1976d2, #1565c0);
        }
        
        .stat-icon.appointments {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }
        
        .stat-icon.caregivers {
          background: linear-gradient(135deg, #4caf50, #388e3c);
        }
        
        .stat-icon.health {
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
        
        .activity-icon.medication {
          background: linear-gradient(135deg, #1976d2, #1565c0);
        }
        
        .activity-icon.appointment {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        }
        
        .activity-icon.caregiver {
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
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
      
      <div class="overview-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1 class="welcome-title">Welcome, Mr./Mrs. Gonzalez!</h1>
          <p class="welcome-subtitle">Here's your health overview for today</p>
        </div>
        
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon medications">
              <i class="bi bi-capsule"></i>
            </div>
            <div class="stat-number">5</div>
            <div class="stat-label">Active Medications</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon appointments">
              <i class="bi bi-calendar-check"></i>
            </div>
            <div class="stat-number">2</div>
            <div class="stat-label">Upcoming Appointments</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon caregivers">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-number">3</div>
            <div class="stat-label">Available Caregivers</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon health">
              <i class="bi bi-heart-pulse"></i>
            </div>
            <div class="stat-number">Good</div>
            <div class="stat-label">Health Status</div>
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
              <div class="activity-icon medication">
                <i class="bi bi-capsule"></i>
              </div>
              <div class="activity-content">
                <h4>Medication Reminder</h4>
                <p>Blood pressure medication taken at 8:00 AM</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon appointment">
                <i class="bi bi-calendar-check"></i>
              </div>
              <div class="activity-content">
                <h4>Doctor Appointment</h4>
                <p>Dr. Smith - Cardiology checkup tomorrow at 2:00 PM</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon caregiver">
                <i class="bi bi-person-check"></i>
              </div>
              <div class="activity-content">
                <h4>Caregiver Visit</h4>
                <p>Sarah Johnson completed daily care routine</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon medication">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <div class="activity-content">
                <h4>Health Check</h4>
                <p>Blood pressure: 120/80 - Normal range</p>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="quick-actions">
            <h2 class="section-title">
              <i class="bi bi-lightning"></i>
              Quick Actions
            </h2>
            
            <button class="action-btn" onclick="document.querySelector('care-sidebar').showSection('medicines')">
              <i class="bi bi-capsule"></i>
              Manage Medications
            </button>
            
            <button class="action-btn" onclick="document.querySelector('care-sidebar').showSection('calendar')">
              <i class="bi bi-calendar-plus"></i>
              Schedule Appointment
            </button>
            
            <button class="action-btn" onclick="document.querySelector('care-sidebar').showSection('caregivers')">
              <i class="bi bi-search"></i>
              Find Caregiver
            </button>
            
            <button class="action-btn" onclick="document.querySelector('care-sidebar').showSection('charts')">
              <i class="bi bi-graph-up"></i>
              View Health Charts
            </button>
            
            <button class="action-btn" onclick="document.querySelector('care-sidebar').showSection('profile')">
              <i class="bi bi-person-circle"></i>
              Update Profile
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('overview-section', OverviewSection); 