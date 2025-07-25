class OverviewSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    // Obtener usuario real
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loggedInUser);
    const displayName = user ? (user.username || 'Usuario') : 'Usuario';
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
          border-left: none;
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
          background: white;
          margin-bottom: 15px;
        }
        .stat-icon svg {
          width: 40px;
          height: 40px;
          stroke: #1976d2;
        }
        .stat-icon.medications,
        .stat-icon.appointments,
        .stat-icon.caregivers,
        .stat-icon.health {
          background: white;
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
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white !important;
          color: #1976d2 !important;
          box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
          border: none;
          padding: 0;
        }
        .activity-icon svg {
          width: 24px;
          height: 24px;
          stroke: #1976d2;
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
        <h1 style="color:#1976d2;font-size:2.2rem;font-weight:700;margin-bottom:1.5rem;text-align:center;">Health Summary</h1>
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h2 class="welcome-title">Welcome, ${displayName}!</h2>
          <p class="welcome-subtitle">Here is your health summary for today</p>
        </div>
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon medications">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="5" rx="2"/><rect x="4" y="8" width="16" height="13" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
            </div>
            <div class="stat-number">5</div>
            <div class="stat-label">Active Medications</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon appointments">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="stat-number">2</div>
            <div class="stat-label">Upcoming Appointments</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon caregivers">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="stat-number">3</div>
            <div class="stat-label">Available Caregivers</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon health">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
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
              <div class="activity-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="8" height="8" rx="4"/><rect x="14" y="2" width="8" height="8" rx="4"/><line x1="8" y1="16" x2="16" y2="8"/></svg>
              </div>
              <div class="activity-content">
                <h4>Medication Reminder</h4>
                <p>Blood pressure medication taken at 8:00 AM</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div class="activity-content">
                <h4>Doctor Appointment</h4>
                <p>Dr. Smith - Cardiology checkup tomorrow at 2:00 PM</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <!-- Cambiado: SVG de caregiver visit por un icono de "handshake" -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/><path d="M12 16v-4"/></svg>
              </div>
              <div class="activity-content">
                <h4>Caregiver Visit</h4>
                <p>Sarah Johnson completed daily care routine</p>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/><polyline points="8 15 12 9 16 15"/></svg>
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