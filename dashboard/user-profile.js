class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  getUserType() {
    return window.userType || 'patient';
  }
  getProfileData() {
    // Use AvatarUtils to get user data
    if (window.AvatarUtils) {
      const userData = AvatarUtils.getUserDataWithAvatar();
      const loggedInUser = localStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
      
      return {
        ...userData,
        name: user ? (user.name || user.username || 'User') : 'User',
        age: this.getUserField('age'),
        gender: this.getUserField('gender') || this.getUserField('sexo'),
        type: this.getUserField('role') === 'patient' ? 'Patient' : (this.getUserField('role') === 'caregiver' ? 'Caregiver' : this.getUserField('role')),
        areas: this.getUserField('areas') ? (Array.isArray(this.getUserField('areas')) ? this.getUserField('areas') : [this.getUserField('areas')]) : [],
        phone: this.getUserField('phone'),
        address: this.getUserField('address'),
        experience: this.getUserField('experience'),
        education: this.getUserField('education'),
        certifications: this.getUserField('certifications'),
        skills: this.getUserField('skills'),
        languages: this.getUserField('languages'),
        bio: this.getUserField('bio'),
        availability: this.getUserField('availability'),
      };
    } else {
      // Fallback to original method
      const loggedInUser = localStorage.getItem('loggedInUser');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
      
      if (user) {
        return {
          name: user.name || user.username || 'User',
          initials: user.username ? user.username.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U',
          avatarColor: 'linear-gradient(135deg, #667eea, #764ba2)',
          age: user.age || '-',
          gender: user.gender || user.sexo || '-',
          photo: user.photo || null,
          type: user.role === 'patient' ? 'Patient' : (user.role === 'caregiver' ? 'Caregiver' : user.role),
          areas: user.areas ? (Array.isArray(user.areas) ? user.areas : [user.areas]) : [],
          email: user.email || '-',
          phone: user.phone || '-',
          address: user.address || '-',
          experience: user.experience || '-',
          education: user.education || '-',
          certifications: user.certifications || '-',
          skills: user.skills || '-',
          languages: user.languages || '-',
          bio: user.bio || '-',
          availability: user.availability || '-',
        };
      } else {
        return {
          name: 'User',
          initials: 'U',
          avatarColor: 'linear-gradient(135deg, #667eea, #764ba2)',
          age: '-',
          gender: '-',
          photo: null,
          type: '-',
          areas: [],
          email: '-',
          phone: '-',
          address: '-',
          experience: '-',
          education: '-',
          certifications: '-',
          skills: '-',
          languages: '-',
          bio: '-',
          availability: '-',
        };
      }
    }
  }
  
  getUserField(field) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
    return user ? user[field] : '-';
  }
  render() {
    const data = this.getProfileData();
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
          min-height: calc(100vh - 200px);
        }
        
        .profile-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
          color: white;
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
        }
        
        .profile-hero::before {
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
          display: flex;
          align-items: center;
          gap: 30px;
          position: relative;
          z-index: 2;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.3);
          object-fit: cover;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        
        .profile-avatar.initials {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 1px;
          font-family: 'Poppins', sans-serif;
        }
        
        .profile-avatar:hover {
          transform: scale(1.05);
        }
        
        .hero-info h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .hero-email {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .profile-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        
        .profile-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .section-title i {
          color: #667eea;
          font-size: 1.3rem;
        }
        
        .info-grid {
          display: grid;
          gap: 20px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        
        .info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }
        
        .info-content {
          flex: 1;
        }
        
        .info-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }
        
        .skills-section {
          grid-column: 1 / -1;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .skill-item {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          padding: 20px;
          border-radius: 15px;
          border-left: 4px solid #1976d2;
          transition: all 0.3s ease;
        }
        
        .skill-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(25, 118, 210, 0.2);
        }
        
        .skill-title {
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 8px;
          font-size: 1rem;
        }
        
        .skill-value {
          color: #333;
          font-size: 0.95rem;
        }
        
        .areas-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }
        
        .area-tag {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
        }
        
        .action-buttons {
          grid-column: 1 / -1;
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }
        
        .action-btn {
          padding: 15px 30px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .edit-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .edit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .logout-btn {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          color: white;
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .logout-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }
        
        @media (max-width: 768px) {
          .profile-sections {
            grid-template-columns: 1fr;
          }
          
          .hero-content {
            flex-direction: column;
            text-align: center;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      </style>
      
      <div class="profile-container">
        <!-- Hero Section -->
        <div class="profile-hero">
          <div class="hero-content">
            ${data.photo ? 
              `<img src="${data.photo}" alt="Profile photo" class="profile-avatar">` :
              `<div class="profile-avatar initials" style="background: ${data.avatarColor};">${data.initials}</div>`
            }
            <div class="hero-info">
              <h1>${data.name}</h1>
              <span class="hero-badge">${data.type}</span>
              <p class="hero-email">${data.email}</p>
            </div>
          </div>
        </div>
        
        <!-- Profile Sections -->
        <div class="profile-sections">
          <!-- Personal Information -->
          <div class="profile-section">
            <h2 class="section-title">
              <i class="bi bi-person-circle"></i>
              Personal Information
            </h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-calendar"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Age</div>
                  <div class="info-value">${data.age} years</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-gender-ambiguous"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Gender</div>
                  <div class="info-value">${data.gender}</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-telephone"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Phone</div>
                  <div class="info-value">${data.phone}</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Address</div>
                  <div class="info-value">${data.address}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Professional Information -->
          <div class="profile-section">
            <h2 class="section-title">
              <i class="bi bi-briefcase"></i>
              Professional Info
            </h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-clock-history"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Experience</div>
                  <div class="info-value">${data.experience}</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-mortarboard"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Education</div>
                  <div class="info-value">${data.education}</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-award"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Certifications</div>
                  <div class="info-value">${data.certifications}</div>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="bi bi-translate"></i>
                </div>
                <div class="info-content">
                  <div class="info-label">Languages</div>
                  <div class="info-value">${data.languages}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Skills & Bio Section -->
          <div class="profile-section skills-section">
            <h2 class="section-title">
              <i class="bi bi-lightbulb"></i>
              Skills & Bio
            </h2>
            <div class="skills-grid">
              <div class="skill-item">
                <div class="skill-title">Skills</div>
                <div class="skill-value">${data.skills}</div>
              </div>
              
              <div class="skill-item">
                <div class="skill-title">Bio</div>
                <div class="skill-value">${data.bio}</div>
              </div>
              
              <div class="skill-item">
                <div class="skill-title">Availability</div>
                <div class="skill-value">${data.availability}</div>
              </div>
            </div>
            
            ${data.areas && Array.isArray(data.areas) ? `
              <div style="margin-top: 25px;">
                <h3 style="color: #333; margin-bottom: 15px; font-weight: 600;">Study Areas</h3>
                <div class="areas-tags">
                  ${data.areas.map(area => `<span class="area-tag">${area}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="action-btn edit-btn">
              <i class="bi bi-pencil"></i>
              Edit Profile
            </button>
            <button class="action-btn logout-btn" onclick="logout()">
              <i class="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('user-profile', UserProfile); 