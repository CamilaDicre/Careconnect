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
    // Leer nombre y rol desde localStorage si existen
    const storedName = localStorage.getItem('careconnectUserName');
    const storedRole = localStorage.getItem('careconnectUserRole');
    const userType = this.getUserType();
    if (storedName && storedRole) {
      return {
        name: storedName,
        age: userType === 'patient' ? 68 : 45,
        gender: userType === 'patient' ? 'Femenino' : 'Masculino',
        photo: userType === 'patient' ? 'assets/people/woman-whiteshirt.png' : 'assets/people/man-yellowshirt.png',
        type: storedRole === 'paciente' ? 'Paciente' : 'Cuidador',
        areas: userType === 'patient' ? null : ['Medicina General', 'Geriatría', 'Cuidado Domiciliario']
      };
    } else {
      return {
        name: 'Dr. Carlos Rodríguez',
        age: 45,
        gender: 'Masculino',
        photo: 'assets/people/man-yellowshirt.png',
        type: 'Cuidador',
        areas: ['Medicina General', 'Geriatría', 'Cuidado Domiciliario']
      };
    }
  }
  render() {
    const data = this.getProfileData();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        section {
          padding: 2.5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .profile-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          padding: 2.5rem;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e3eafc;
        }
        .profile-info h2 {
          color: #1976d2;
          margin-bottom: 0.75rem;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 600;
        }
        .profile-badge {
          display: inline-block;
          background: #e3eafc;
          color: #1976d2;
          padding: 0.4rem 1.2rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        .profile-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }
        .detail-item {
          padding: 1.2rem;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #1976d2;
        }
        .detail-label {
          font-size: 1rem;
          color: #6c757d;
          margin-bottom: 0.4rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .detail-value {
          font-weight: 600;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
        }
        .areas-section {
          margin-top: 1.5rem;
        }
        .areas-section h3 {
          font-family: 'Poppins', sans-serif;
          color: #212529;
          margin-bottom: 1.2rem;
          font-size: 1.5rem;
          font-weight: 600;
        }
        .areas-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        .area-tag {
          background: #d1ecf1;
          color: #0c5460;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .logout-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          margin-top: 1.5rem;
        }
        .logout-btn:hover {
          background: #c82333;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .logout-btn i {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }
      </style>
      <section>
        <div class="profile-card">
          <div class="profile-header">
            <img src="${data.photo}" alt="Foto de perfil" class="profile-photo">
            <div class="profile-info">
              <h2>${data.name}</h2>
              <span class="profile-badge">${data.type}</span>
            </div>
          </div>
          
          <div class="profile-details">
            <div class="detail-item">
              <div class="detail-label">Edad</div>
              <div class="detail-value">${data.age} años</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Género</div>
              <div class="detail-value">${data.gender}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Tipo de Usuario</div>
              <div class="detail-value">${data.type}</div>
            </div>
          </div>
          
          ${data.areas ? `
            <div class="areas-section">
              <h3>Áreas de Estudio</h3>
              <div class="areas-list">
                ${data.areas.map(area => `<span class="area-tag">${area}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          <button class="logout-btn" onclick="logout()">
            <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
          </button>
        </div>
      </section>
    `;
  }
}
customElements.define('user-profile', UserProfile); 