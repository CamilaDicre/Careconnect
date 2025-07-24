class CaregiverSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  getCaregivers() {
    // Obtener cuidadores reales del sistema
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Solo usuarios con rol cuidador
    return users.filter(u => u.role === 'cuidador').map(u => ({
      name: u.username || '-',
      specialty: u.skills || '-',
      rating: u.rating || 4.5,
      experience: u.experience || '-',
      location: u.address || '-',
      photo: u.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(u.username || '-') + '&background=1976d2&color=fff&size=128&rounded=true',
      available: true,
      price: u.price || '$20/hora'
    }));
  }
  render() {
    let caregivers = this.getCaregivers();
    // Filtro por nombre o especialidad
    const filterInput = this.filterValue || '';
    if (filterInput) {
      caregivers = caregivers.filter(c =>
        c.name.toLowerCase().includes(filterInput.toLowerCase()) ||
        c.specialty.toLowerCase().includes(filterInput.toLowerCase())
      );
    }
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
        <h1 style="color:#1976d2;font-size:2.2rem;font-weight:700;margin-bottom:1.5rem;text-align:center;">Buscar Cuidadores</h1>
        <div class="search-header">
          <h2 style="font-size:1.3rem;font-weight:600;">Encuentra cuidadores profesionales registrados</h2>
          <input type="text" class="filter-input" id="filterInput" placeholder="Buscar por nombre o especialidad" value="${filterInput}">
        </div>
        
        <div class="caregiver-list">
          ${caregivers.length === 0 ? `<div style='color:#888;text-align:center;margin:2rem 0;'>No hay cuidadores registrados. Usa el buscador para intentar con otro término.</div>` : ''}
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
    this.attachEvents();
  }
  attachEvents() {
    const filterInput = this.shadowRoot.getElementById('filterInput');
    if (filterInput) {
      filterInput.oninput = (e) => {
        this.filterValue = e.target.value;
        this.render();
      };
    }
  }
}
customElements.define('caregiver-search', CaregiverSearch); 