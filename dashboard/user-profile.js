class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isEditing = false;
    this.userProfileData = null;
  }

  connectedCallback() {
    this.loadUserData();
    this.render();
  }

  getUserType() {
    return window.userType || 'patient';
  }

  loadUserData() {
    // Cargar datos del usuario desde localStorage
    const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    const users = LocalStorageUtils.getItem('users', []);
    const user = users.find(u => u.username === loggedInUser || u.email === loggedInUser);
    
    // Cargar datos adicionales del perfil si existen
    const userProfileData = LocalStorageUtils.getItem(`userProfile_${loggedInUser}`, {});
    
    this.userProfileData = {
      // Datos básicos del usuario
      name: user ? (user.name || user.username || 'Usuario') : 'Usuario',
      email: user ? user.email : '-',
      username: user ? user.username : '-',
      role: user ? user.role : 'patient',
      
      // Datos adicionales del perfil
      age: userProfileData.age || '',
      gender: userProfileData.gender || '',
      phone: userProfileData.phone || user?.phone || '',
      address: userProfileData.address || user?.address || '',
      
      // Información médica y personal
      allergies: userProfileData.allergies || [],
      medications: userProfileData.medications || [],
      conditions: userProfileData.conditions || [],
      emergencyContact: userProfileData.emergencyContact || {
        name: '',
        phone: '',
        relationship: ''
      },
      bloodType: userProfileData.bloodType || '',
      height: userProfileData.height || '',
      weight: userProfileData.weight || '',
      insurance: userProfileData.insurance || '',
      doctor: userProfileData.doctor || '',
      
      // Información adicional
      preferences: userProfileData.preferences || {
        language: 'Español',
        notifications: true,
        accessibility: false
      },
      notes: userProfileData.notes || '',
      
      // Avatar y datos visuales
      photo: user?.photo || null,
      avatarColor: 'linear-gradient(135deg, #667eea, #764ba2)',
      initials: user ? user.username.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U'
    };
  }

  saveUserData() {
    const loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    if (loggedInUser && this.userProfileData) {
      LocalStorageUtils.setItem(`userProfile_${loggedInUser}`, this.userProfileData);
      return true;
    }
    return false;
  }

  updateField(field, value) {
    if (this.userProfileData) {
      this.userProfileData[field] = value;
    }
  }

  updateNestedField(parent, field, value) {
    if (this.userProfileData && this.userProfileData[parent]) {
      this.userProfileData[parent][field] = value;
    }
  }

  addArrayItem(field, item) {
    if (this.userProfileData && !this.userProfileData[field]) {
      this.userProfileData[field] = [];
    }
    if (this.userProfileData && this.userProfileData[field]) {
      this.userProfileData[field].push(item);
    }
  }

  removeArrayItem(field, index) {
    if (this.userProfileData && this.userProfileData[field]) {
      this.userProfileData[field].splice(index, 1);
    }
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    this.render();
  }

  saveProfile() {
    if (this.saveUserData()) {
      this.showNotification('Perfil actualizado exitosamente', 'success');
      this.isEditing = false;
      this.render();
    } else {
      this.showNotification('Error al guardar el perfil', 'error');
    }
  }

  showNotification(message, type = 'success') {
    // Usar la función global de notificación si existe
    if (window.showNotification) {
      window.showNotification(message, type);
    } else {
      // Crear notificación local
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe, #00f2fe)' : 'linear-gradient(135deg, #ff9a9e, #fecfef)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
      `;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  }

  render() {
    const data = this.userProfileData;
    if (!data) return;

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
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
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
          background: linear-gradient(135deg, #2196f3, #1976d2);
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
          color: #1976d2;
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
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 15px;
          border-left: 4px solid #1976d2;
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        }
        
        .info-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e3f2fd;
          border-radius: 50%;
        }
        .info-icon i {
          font-size: 1.3rem;
          color: #1976d2;
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
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        
        .form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .array-input-container {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .array-input {
          flex: 1;
          padding: 10px 15px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        .array-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .add-btn {
          background: linear-gradient(135deg, #2196f3, #1976d2);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .remove-btn {
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .remove-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .array-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 10px;
          margin-bottom: 8px;
          border-left: 4px solid #1976d2;
        }
        
        .array-item-text {
          flex: 1;
          font-weight: 500;
          color: #1976d2;
        }
        
        .help-section {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 2px solid #ffc107;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .help-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #856404;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .help-message {
          font-size: 1.1rem;
          color: #856404;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .help-btn {
          background: linear-gradient(135deg, #ffc107, #ff8f00);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
        }
        
        .help-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
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
          background: linear-gradient(135deg, #2196f3, #1976d2);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .edit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .save-btn {
          background: linear-gradient(135deg, #1976d2, #0d47a1);
          color: white;
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
        }
        
        .save-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        }
        
        .cancel-btn {
          background: linear-gradient(135deg, #6c757d, #495057);
          color: white;
          box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
        }
        
        .cancel-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
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
        
        .medical-section {
          grid-column: 1 / -1;
        }
        
        .medical-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .medical-card {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          padding: 20px;
          border-radius: 15px;
          border-left: 4px solid #1976d2;
        }
        
        .medical-card-title {
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 15px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .medical-card-title i {
          font-size: 1.2rem;
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
          
          .medical-grid {
            grid-template-columns: 1fr;
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
              <span class="hero-badge">${data.role === 'patient' ? 'Patient' : 'Caregiver'}</span>
              <p class="hero-email">${data.email}</p>
            </div>
          </div>
        </div>
        
        <!-- Help Section -->
        <div class="help-section">
          <h2 class="help-title">
            <i class="bi bi-clipboard2-pulse"></i>
            Help us get to know you!
          </h2>
          <p class="help-message">
            Complete your profile with important information so we can provide you with better medical care and personalized support.
          </p>
          <button class="help-btn" onclick="this.getRootNode().host.toggleEditMode()">
            <i class="bi bi-pencil-square"></i>
            ${this.isEditing ? 'View Profile' : 'Complete Profile'}
          </button>
        </div>
        
        <!-- Profile Sections -->
        <div class="profile-sections">
          <!-- Personal Information -->
          <div class="profile-section">
            <h2 class="section-title">
              <i class="bi bi-person-badge"></i>
              Personal Information
            </h2>
            ${this.isEditing ? this.renderPersonalInfoForm() : this.renderPersonalInfo()}
          </div>
          
          <!-- Medical Information -->
          <div class="profile-section medical-section">
            <h2 class="section-title">
              <i class="bi bi-heart-pulse"></i>
              Medical Information
            </h2>
            ${this.isEditing ? this.renderMedicalInfoForm() : this.renderMedicalInfo()}
          </div>
          
          <!-- Emergency Contact -->
          <div class="profile-section">
            <h2 class="section-title">
              <i class="bi bi-telephone-plus"></i>
              Emergency Contact
            </h2>
            ${this.isEditing ? this.renderEmergencyContactForm() : this.renderEmergencyContact()}
          </div>
          
          <!-- Preferences -->
          <div class="profile-section">
            <h2 class="section-title">
              <i class="bi bi-gear"></i>
              Preferences
            </h2>
            ${this.isEditing ? this.renderPreferencesForm() : this.renderPreferences()}
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          ${this.isEditing ? `
            <button class="action-btn save-btn" onclick="this.getRootNode().host.saveProfile()">
              <i class="bi bi-check-circle"></i>
              Save Changes
            </button>
            <button class="action-btn cancel-btn" onclick="this.getRootNode().host.toggleEditMode()">
              <i class="bi bi-x-circle"></i>
              Cancel
            </button>
          ` : `
            <button class="action-btn edit-btn" onclick="this.getRootNode().host.toggleEditMode()">
              <i class="bi bi-pencil"></i>
              Edit Profile
            </button>
          `}
          <button class="action-btn logout-btn" onclick="logout()">
            <i class="bi bi-box-arrow-right"></i>
            Log Out
          </button>
        </div>
      </div>
    `;
  }

  renderPersonalInfo() {
    const data = this.userProfileData;
    return `
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-calendar-event"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Age</div>
            <div class="info-value">${data.age || 'Not specified'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-person-heart"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Gender</div>
            <div class="info-value">${data.gender || 'Not specified'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-telephone-fill"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Phone</div>
            <div class="info-value">${data.phone || 'Not specified'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Address</div>
            <div class="info-value">${data.address || 'Not specified'}</div>
          </div>
        </div>
      </div>
    `;
  }

  renderPersonalInfoForm() {
    const data = this.userProfileData;
    return `
      <div class="info-grid">
        <div class="form-group">
          <label class="form-label">Age</label>
          <input type="number" class="form-input" value="${data.age}" 
                 onchange="this.getRootNode().host.updateField('age', this.value)" 
                 placeholder="Enter your age">
        </div>
        
        <div class="form-group">
          <label class="form-label">Gender</label>
          <select class="form-select" onchange="this.getRootNode().host.updateField('gender', this.value)">
            <option value="">Select your gender</option>
            <option value="Masculino" ${data.gender === 'Masculino' ? 'selected' : ''}>Male</option>
            <option value="Femenino" ${data.gender === 'Femenino' ? 'selected' : ''}>Female</option>
            <option value="No binario" ${data.gender === 'No binario' ? 'selected' : ''}>Non-binary</option>
            <option value="Prefiero no decir" ${data.gender === 'Prefiero no decir' ? 'selected' : ''}>Prefer not to say</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" value="${data.phone}" 
                 onchange="this.getRootNode().host.updateField('phone', this.value)" 
                 placeholder="Enter your phone number">
        </div>
        
        <div class="form-group">
          <label class="form-label">Address</label>
          <input type="text" class="form-input" value="${data.address}" 
                 onchange="this.getRootNode().host.updateField('address', this.value)" 
                 placeholder="Enter your address">
        </div>
      </div>
    `;
  }

  renderMedicalInfo() {
    const data = this.userProfileData;
    return `
      <div class="medical-grid">
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-exclamation-triangle"></i>
            Allergies
          </div>
          ${data.allergies && data.allergies.length > 0 ? 
            data.allergies.map(allergy => `<div class="array-item"><span class="array-item-text">${allergy}</span></div>`).join('') :
            '<p style="color: #666; font-style: italic;">No allergies registered</p>'
          }
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-capsule"></i>
            Medications
          </div>
          ${data.medications && data.medications.length > 0 ? 
            data.medications.map(med => `<div class="array-item"><span class="array-item-text">${med}</span></div>`).join('') :
            '<p style="color: #666; font-style: italic;">No medications registered</p>'
          }
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-clipboard2-pulse"></i>
            Medical Conditions
          </div>
          ${data.conditions && data.conditions.length > 0 ? 
            data.conditions.map(condition => `<div class="array-item"><span class="array-item-text">${condition}</span></div>`).join('') :
            '<p style="color: #666; font-style: italic;">No medical conditions registered</p>'
          }
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-info-circle"></i>
            Additional Information
          </div>
          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-droplet"></i>
            </div>
            <div class="info-content">
              <div class="info-label">Blood Type</div>
              <div class="info-value">${data.bloodType || 'Not specified'}</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-rulers"></i>
            </div>
            <div class="info-content">
              <div class="info-label">Height</div>
              <div class="info-value">${data.height || 'Not specified'}</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">
              <i class="bi bi-speedometer2"></i>
            </div>
            <div class="info-content">
              <div class="info-label">Weight</div>
              <div class="info-value">${data.weight || 'Not specified'}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMedicalInfoForm() {
    const data = this.userProfileData;
    return `
      <div class="medical-grid">
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-exclamation-triangle"></i>
            Allergies
          </div>
          ${data.allergies && data.allergies.length > 0 ? 
            data.allergies.map((allergy, index) => `
              <div class="array-item">
                <span class="array-item-text">${allergy}</span>
                <button class="remove-btn" onclick="this.getRootNode().host.removeArrayItem('allergies', ${index}); this.getRootNode().host.render();">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            `).join('') : ''
          }
          <div class="array-input-container">
            <input type="text" class="array-input" id="allergyInput" placeholder="Add allergy">
            <button class="add-btn" onclick="
              const input = this.getRootNode().host.shadowRoot.getElementById('allergyInput');
              if (input.value.trim()) {
                this.getRootNode().host.addArrayItem('allergies', input.value.trim());
                input.value = '';
                this.getRootNode().host.render();
              }
            ">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-capsule"></i>
            Medications
          </div>
          ${data.medications && data.medications.length > 0 ? 
            data.medications.map((med, index) => `
              <div class="array-item">
                <span class="array-item-text">${med}</span>
                <button class="remove-btn" onclick="this.getRootNode().host.removeArrayItem('medications', ${index}); this.getRootNode().host.render();">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            `).join('') : ''
          }
          <div class="array-input-container">
            <input type="text" class="array-input" id="medicationInput" placeholder="Add medication">
            <button class="add-btn" onclick="
              const input = this.getRootNode().host.shadowRoot.getElementById('medicationInput');
              if (input.value.trim()) {
                this.getRootNode().host.addArrayItem('medications', input.value.trim());
                input.value = '';
                this.getRootNode().host.render();
              }
            ">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-clipboard2-pulse"></i>
            Medical Conditions
          </div>
          ${data.conditions && data.conditions.length > 0 ? 
            data.conditions.map((condition, index) => `
              <div class="array-item">
                <span class="array-item-text">${condition}</span>
                <button class="remove-btn" onclick="this.getRootNode().host.removeArrayItem('conditions', ${index}); this.getRootNode().host.render();">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            `).join('') : ''
          }
          <div class="array-input-container">
            <input type="text" class="array-input" id="conditionInput" placeholder="Add medical condition">
            <button class="add-btn" onclick="
              const input = this.getRootNode().host.shadowRoot.getElementById('conditionInput');
              if (input.value.trim()) {
                this.getRootNode().host.addArrayItem('conditions', input.value.trim());
                input.value = '';
                this.getRootNode().host.render();
              }
            ">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        
        <div class="medical-card">
          <div class="medical-card-title">
            <i class="bi bi-info-circle"></i>
            Additional Information
          </div>
          <div class="form-group">
            <label class="form-label">Blood Type</label>
            <select class="form-select" onchange="this.getRootNode().host.updateField('bloodType', this.value)">
              <option value="">Select blood type</option>
              <option value="A+" ${data.bloodType === 'A+' ? 'selected' : ''}>A+</option>
              <option value="A-" ${data.bloodType === 'A-' ? 'selected' : ''}>A-</option>
              <option value="B+" ${data.bloodType === 'B+' ? 'selected' : ''}>B+</option>
              <option value="B-" ${data.bloodType === 'B-' ? 'selected' : ''}>B-</option>
              <option value="AB+" ${data.bloodType === 'AB+' ? 'selected' : ''}>AB+</option>
              <option value="AB-" ${data.bloodType === 'AB-' ? 'selected' : ''}>AB-</option>
              <option value="O+" ${data.bloodType === 'O+' ? 'selected' : ''}>O+</option>
              <option value="O-" ${data.bloodType === 'O-' ? 'selected' : ''}>O-</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Height (cm)</label>
            <input type="number" class="form-input" value="${data.height}" 
                   onchange="this.getRootNode().host.updateField('height', this.value)" 
                   placeholder="Enter your height in cm">
          </div>
          <div class="form-group">
            <label class="form-label">Weight (kg)</label>
            <input type="number" class="form-input" value="${data.weight}" 
                   onchange="this.getRootNode().host.updateField('weight', this.value)" 
                   placeholder="Enter your weight in kg">
          </div>
        </div>
      </div>
    `;
  }

  renderEmergencyContact() {
    const data = this.userProfileData.emergencyContact;
    return `
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-person-badge"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Contact Name</div>
            <div class="info-value">${data.name || 'Not specified'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-telephone-fill"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Phone</div>
            <div class="info-value">${data.phone || 'Not specified'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-heart"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Relationship</div>
            <div class="info-value">${data.relationship || 'Not specified'}</div>
          </div>
        </div>
      </div>
    `;
  }

  renderEmergencyContactForm() {
    const data = this.userProfileData.emergencyContact;
    return `
      <div class="info-grid">
        <div class="form-group">
          <label class="form-label">Contact Name</label>
          <input type="text" class="form-input" value="${data.name}" 
                 onchange="this.getRootNode().host.updateNestedField('emergencyContact', 'name', this.value)" 
                 placeholder="Full name">
        </div>
        
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" value="${data.phone}" 
                 onchange="this.getRootNode().host.updateNestedField('emergencyContact', 'phone', this.value)" 
                 placeholder="Phone number">
        </div>
        
        <div class="form-group">
          <label class="form-label">Relationship</label>
          <select class="form-select" onchange="this.getRootNode().host.updateNestedField('emergencyContact', 'relationship', this.value)">
            <option value="">Select relationship</option>
            <option value="Cónyuge" ${data.relationship === 'Cónyuge' ? 'selected' : ''}>Spouse</option>
            <option value="Hijo/a" ${data.relationship === 'Hijo/a' ? 'selected' : ''}>Child</option>
            <option value="Padre" ${data.relationship === 'Padre' ? 'selected' : ''}>Father</option>
            <option value="Madre" ${data.relationship === 'Madre' ? 'selected' : ''}>Mother</option>
            <option value="Hermano/a" ${data.relationship === 'Hermano/a' ? 'selected' : ''}>Sibling</option>
            <option value="Amigo/a" ${data.relationship === 'Amigo/a' ? 'selected' : ''}>Friend</option>
            <option value="Otro" ${data.relationship === 'Otro' ? 'selected' : ''}>Other</option>
          </select>
        </div>
      </div>
    `;
  }

  renderPreferences() {
    const data = this.userProfileData.preferences;
    return `
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-translate"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Preferred Language</div>
            <div class="info-value">${data.language}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-bell-fill"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Notifications</div>
            <div class="info-value">${data.notifications ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <i class="bi bi-universal-access-circle"></i>
          </div>
          <div class="info-content">
            <div class="info-label">Accessibility</div>
            <div class="info-value">${data.accessibility ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>
    `;
  }

  renderPreferencesForm() {
    const data = this.userProfileData.preferences;
    return `
      <div class="info-grid">
        <div class="form-group">
          <label class="form-label">Preferred Language</label>
          <select class="form-select" onchange="this.getRootNode().host.updateNestedField('preferences', 'language', this.value)">
            <option value="Español" ${data.language === 'Español' ? 'selected' : ''}>Spanish</option>
            <option value="English" ${data.language === 'English' ? 'selected' : ''}>English</option>
            <option value="Français" ${data.language === 'Français' ? 'selected' : ''}>French</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Notifications</label>
          <select class="form-select" onchange="this.getRootNode().host.updateNestedField('preferences', 'notifications', this.value === 'true')">
            <option value="true" ${data.notifications ? 'selected' : ''}>Enabled</option>
            <option value="false" ${!data.notifications ? 'selected' : ''}>Disabled</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Accessibility</label>
          <select class="form-select" onchange="this.getRootNode().host.updateNestedField('preferences', 'accessibility', this.value === 'true')">
            <option value="true" ${data.accessibility ? 'selected' : ''}>Enabled</option>
            <option value="false" ${!data.accessibility ? 'selected' : ''}>Disabled</option>
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define('user-profile', UserProfile); 