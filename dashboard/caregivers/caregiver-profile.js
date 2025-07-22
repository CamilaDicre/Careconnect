class CaregiverProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    // Obtener usuario logueado y datos reales
    const username = localStorage.getItem('loggedInUser') || '';
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.role === 'cuidador');
    const displayName = user ? (user.name || user.username) : 'Cuidador';
    const displayEmail = user ? (user.email || '-') : '-';
    const displayUsername = user ? user.username : '-';
    // Iniciales para el avatar
    const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .profile-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .header h2 {
          color: #1976d2;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .edit-btn {
          background: linear-gradient(135deg, #1976d2, #1565c0);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
        }
        
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
        }
        
        .profile-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 48px;
          font-weight: 600;
          margin: 0 auto 20px;
        }
        
        .profile-name {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 5px;
        }
        
        .profile-title {
          font-size: 16px;
          color: #666;
          margin-bottom: 10px;
        }
        
        .profile-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-bottom: 20px;
        }
        
        .star {
          color: #ffc107;
          font-size: 18px;
        }
        
        .rating-text {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .stat-item {
          text-align: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }
        
        .profile-details {
          margin-bottom: 30px;
        }
        
        .detail-section {
          margin-bottom: 20px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .detail-value {
          font-size: 14px;
          color: #333;
          font-weight: 600;
        }
        
        .certifications-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        
        .certification-tag {
          background: #e3f2fd;
          color: #1976d2;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        
        .content-section {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .content-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .experience-item {
          margin-bottom: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #1976d2;
        }
        
        .experience-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .experience-period {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        
        .experience-description {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }
        
        .skill-item {
          background: #e3f2fd;
          color: #1976d2;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
        }
        
        .availability-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-top: 15px;
        }
        
        .day-item {
          text-align: center;
          padding: 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .day-item.available {
          background: #d4edda;
          color: #155724;
        }
        
        .day-item.unavailable {
          background: #f8d7da;
          color: #721c24;
        }
        
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          
          .main-content {
            grid-template-columns: 1fr;
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .profile-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .availability-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      </style>
      
      <div class="profile-container">
        <div class="header">
          <h2>
            <i class="bi bi-person-circle"></i>
            My Profile
          </h2>
          <button class="edit-btn" id="edit-profile-btn">
            <i class="bi bi-pencil"></i>
            Edit Profile
          </button>
        </div>
        
        <div class="profile-grid">
          <!-- Profile Card -->
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">${initials}</div>
              <div class="profile-name">${displayName}</div>
              <div class="profile-title">Professional Caregiver</div>
              <div class="profile-rating">
                <i class="bi bi-star-fill star"></i>
                <i class="bi bi-star-fill star"></i>
                <i class="bi bi-star-fill star"></i>
                <i class="bi bi-star-fill star"></i>
                <i class="bi bi-star-fill star"></i>
                <span class="rating-text">4.8/5.0</span>
              </div>
            </div>
            
            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-number">5</div>
                <div class="stat-label">Years Experience</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">3</div>
                <div class="stat-label">Active Patients</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">150+</div>
                <div class="stat-label">Hours This Month</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Satisfaction Rate</div>
              </div>
            </div>
            
            <div class="profile-details">
              <div class="detail-section">
                <div class="section-title">
                  <i class="bi bi-person"></i>
                  Personal Information
                </div>
                <div class="detail-row">
                  <span class="detail-label">Full Name:</span>
                  <span class="detail-value">${displayName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${displayEmail}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Username:</span>
                  <span class="detail-value">${displayUsername}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">+1 (555) 123-4567</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Location:</span>
                  <span class="detail-value">Miami, FL</span>
                </div>
              </div>
              
              <div class="detail-section">
                <div class="section-title">
                  <i class="bi bi-award"></i>
                  Certifications
                </div>
                <div class="certifications-list">
                  <span class="certification-tag">Certified Nursing Assistant</span>
                  <span class="certification-tag">First Aid & CPR</span>
                  <span class="certification-tag">Alzheimer's Care</span>
                  <span class="certification-tag">Medication Management</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Content -->
          <div class="main-content">
            <!-- Experience Section -->
            <div class="content-section">
              <h3 class="content-title">
                <i class="bi bi-briefcase"></i>
                Work Experience
              </h3>
              
              <div class="experience-item">
                <div class="experience-title">Senior Caregiver - Careconnect</div>
                <div class="experience-period">2022 - Present</div>
                <div class="experience-description">
                  Providing comprehensive care for elderly patients including medication management, 
                  health monitoring, and daily living assistance. Managing 3-5 patients simultaneously.
                </div>
              </div>
              
              <div class="experience-item">
                <div class="experience-title">Home Health Aide - Sunshine Care</div>
                <div class="experience-period">2020 - 2022</div>
                <div class="experience-description">
                  Assisted patients with daily activities, medication reminders, and health monitoring. 
                  Specialized in dementia and Alzheimer's care.
                </div>
              </div>
              
              <div class="experience-item">
                <div class="experience-title">Nursing Assistant - Miami General Hospital</div>
                <div class="experience-period">2019 - 2020</div>
                <div class="experience-description">
                  Provided patient care in hospital setting, assisting nurses with patient monitoring 
                  and basic medical procedures.
                </div>
              </div>
            </div>
            
            <!-- Skills & Availability -->
            <div class="content-section">
              <h3 class="content-title">
                <i class="bi bi-stars"></i>
                Skills & Specializations
              </h3>
              
              <div class="skills-grid">
                <div class="skill-item">Medication Management</div>
                <div class="skill-item">Health Monitoring</div>
                <div class="skill-item">Mobility Assistance</div>
                <div class="skill-item">Dementia Care</div>
                <div class="skill-item">First Aid & CPR</div>
                <div class="skill-item">Patient Communication</div>
                <div class="skill-item">Emergency Response</div>
                <div class="skill-item">Care Planning</div>
              </div>
              
              <h3 class="content-title" style="margin-top: 30px;">
                <i class="bi bi-calendar-check"></i>
                Weekly Availability
              </h3>
              
              <div class="availability-grid">
                <div class="day-item available">Mon</div>
                <div class="day-item available">Tue</div>
                <div class="day-item available">Wed</div>
                <div class="day-item available">Thu</div>
                <div class="day-item available">Fri</div>
                <div class="day-item unavailable">Sat</div>
                <div class="day-item unavailable">Sun</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('caregiver-profile', CaregiverProfile); 