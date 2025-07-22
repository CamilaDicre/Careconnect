class CaregiverSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  getCaregivers() {
    return [
      {
        name: 'Dr. Ana Martínez',
        specialty: 'Medicina General',
        rating: 4.8,
        experience: '15 años',
        location: 'Panamá Centro',
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3',
        available: true,
        price: '$25/hora'
      },
      {
        name: 'Lic. Carlos López',
        specialty: 'Enfermería Geriátrica',
        rating: 4.9,
        experience: '12 años',
        location: 'San Francisco',
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3',
        available: true,
        price: '$20/hora'
      },
      {
        name: 'Dra. María Rodríguez',
        specialty: 'Geriatría',
        rating: 4.7,
        experience: '20 años',
        location: 'Bella Vista',
        photo: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3',
        available: false,
        price: '$30/hora'
      },
      {
        name: 'Lic. Pedro Sánchez',
        specialty: 'Cuidado Domiciliario',
        rating: 4.6,
        experience: '8 años',
        location: 'El Cangrejo',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        available: true,
        price: '$18/hora'
      }
    ];
  }
  render() {
    const caregivers = this.getCaregivers();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        section {
          padding: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .search-header {
          margin-bottom: 2.5rem;
        }
        .search-header h2 {
          color: #1976d2;
          margin-bottom: 0.8rem;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 600;
        }
        .search-header p {
          font-family: 'Poppins', sans-serif;
          color: #6c757d;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .search-filters {
          display: flex;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .filter-input {
          padding: 0.8rem 1.2rem;
          border: 2px solid #dee2e6;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          min-width: 180px;
          transition: all 0.3s;
        }
        .filter-input:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
        }
        .filter-select {
          padding: 0.8rem 1.2rem;
          border: 2px solid #dee2e6;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          min-width: 160px;
          transition: all 0.3s;
        }
        .filter-select:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
        }
        .search-btn {
          background: #1976d2;
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
        }
        .search-btn:hover {
          background: #1565c0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }
        .caregivers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .caregiver-card {
          background: white;
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
          transition: all 0.3s;
        }
        .caregiver-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .caregiver-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .caregiver-photo {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e3eafc;
        }
        .caregiver-info h3 {
          margin: 0 0 0.4rem 0;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .caregiver-specialty {
          color: #6c757d;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          margin-bottom: 0.4rem;
        }
        .caregiver-rating {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #ffc107;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        .caregiver-rating i {
          font-size: 1.1rem;
        }
        .caregiver-details {
          margin-bottom: 1.2rem;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.6rem;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          padding: 0.4rem 0;
          border-bottom: 1px solid #f8f9fa;
        }
        .detail-label {
          color: #6c757d;
          font-weight: 500;
        }
        .detail-value {
          font-weight: 600;
          color: #212529;
        }
        .availability-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        .available {
          background: #d4edda;
          color: #155724;
        }
        .unavailable {
          background: #f8d7da;
          color: #721c24;
        }
        .contact-btn {
          width: 100%;
          background: #28a745;
          color: white;
          border: none;
          padding: 0.8rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          transition: all 0.3s;
        }
        .contact-btn:hover:not(:disabled) {
          background: #218838;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        .contact-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
      </style>
      <section>
        <div class="search-header">
          <h2>Buscar Cuidadores</h2>
          <p>Encuentra cuidadores profesionales cerca de ti</p>
        </div>
        
        <div class="search-filters">
          <input type="text" placeholder="Buscar por nombre..." class="filter-input">
          <select class="filter-select">
            <option value="">Todas las especialidades</option>
            <option value="general">Medicina General</option>
            <option value="geriatric">Geriatría</option>
            <option value="nursing">Enfermería</option>
            <option value="homecare">Cuidado Domiciliario</option>
          </select>
          <select class="filter-select">
            <option value="">Todas las ubicaciones</option>
            <option value="centro">Panamá Centro</option>
            <option value="sanfrancisco">San Francisco</option>
            <option value="bellavista">Bella Vista</option>
            <option value="cangrejo">El Cangrejo</option>
          </select>
          <button class="search-btn">
            <i class="bi bi-search"></i> Buscar
          </button>
        </div>
        
        <div class="caregivers-grid">
          ${caregivers.map(caregiver => `
            <div class="caregiver-card">
              <div class="caregiver-header">
                <img src="${caregiver.photo}" alt="${caregiver.name}" class="caregiver-photo">
                <div class="caregiver-info">
                  <h3>${caregiver.name}</h3>
                  <div class="caregiver-specialty">${caregiver.specialty}</div>
                  <div class="caregiver-rating">
                    <i class="bi bi-star-fill"></i>
                    <span>${caregiver.rating}</span>
                  </div>
                </div>
              </div>
              
              <div class="caregiver-details">
                <div class="detail-row">
                  <span class="detail-label">Experiencia:</span>
                  <span class="detail-value">${caregiver.experience}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Ubicación:</span>
                  <span class="detail-value">${caregiver.location}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Precio:</span>
                  <span class="detail-value">${caregiver.price}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Estado:</span>
                  <span class="availability-badge ${caregiver.available ? 'available' : 'unavailable'}">
                    ${caregiver.available ? 'Disponible' : 'No disponible'}
                  </span>
                </div>
              </div>
              
              <button class="contact-btn" ${!caregiver.available ? 'disabled' : ''}>
                ${caregiver.available ? 'Contactar' : 'No disponible'}
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}
customElements.define('caregiver-search', CaregiverSearch); 