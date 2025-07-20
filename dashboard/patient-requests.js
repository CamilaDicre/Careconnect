class PatientRequests extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  getRequests() {
    return [
      {
        name: 'Sra. Elena Torres',
        age: 72,
        location: 'Panamá Centro',
        service: 'Cuidado Domiciliario',
        urgency: 'Alta',
        date: '2024-01-15',
        photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3',
        status: 'pending'
      },
      {
        name: 'Sr. Roberto Méndez',
        age: 68,
        location: 'San Francisco',
        service: 'Acompañamiento Médico',
        urgency: 'Media',
        date: '2024-01-14',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        status: 'accepted'
      },
      {
        name: 'Sra. Carmen Ruiz',
        age: 75,
        location: 'Bella Vista',
        service: 'Control de Medicamentos',
        urgency: 'Baja',
        date: '2024-01-13',
        photo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3',
        status: 'pending'
      },
      {
        name: 'Sr. José González',
        age: 70,
        location: 'El Cangrejo',
        service: 'Cuidado Domiciliario',
        urgency: 'Alta',
        date: '2024-01-12',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        status: 'rejected'
      }
    ];
  }
  render() {
    const requests = this.getRequests();
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
        .requests-header {
          margin-bottom: 2.5rem;
        }
        .requests-header h2 {
          color: #1976d2;
          margin-bottom: 0.8rem;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 600;
        }
        .requests-header p {
          font-family: 'Poppins', sans-serif;
          color: #6c757d;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .requests-filters {
          display: flex;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
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
        .requests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }
        .request-card {
          background: white;
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
          transition: all 0.3s;
        }
        .request-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .request-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .request-photo {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e3eafc;
        }
        .request-info h3 {
          margin: 0 0 0.4rem 0;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .request-age {
          color: #6c757d;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .request-details {
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
        .urgency-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        .urgency-high {
          background: #f8d7da;
          color: #721c24;
        }
        .urgency-medium {
          background: #fff3cd;
          color: #856404;
        }
        .urgency-low {
          background: #d4edda;
          color: #155724;
        }
        .status-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        .status-accepted {
          background: #d4edda;
          color: #155724;
        }
        .status-rejected {
          background: #f8d7da;
          color: #721c24;
        }
        .action-buttons {
          display: flex;
          gap: 0.8rem;
        }
        .btn {
          flex: 1;
          padding: 0.8rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn-accept {
          background: #28a745;
          color: white;
        }
        .btn-accept:hover {
          background: #218838;
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        .btn-reject {
          background: #dc3545;
          color: white;
        }
        .btn-reject:hover {
          background: #c82333;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }
        .btn-view {
          background: #17a2b8;
          color: white;
        }
        .btn-view:hover {
          background: #138496;
          box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
        }
      </style>
      <section>
        <div class="requests-header">
          <h2>Solicitudes de Pacientes</h2>
          <p>Gestiona las solicitudes de cuidado de pacientes</p>
        </div>
        
        <div class="requests-filters">
          <select class="filter-select">
            <option value="">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="accepted">Aceptadas</option>
            <option value="rejected">Rechazadas</option>
          </select>
          <select class="filter-select">
            <option value="">Todas las urgencias</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <select class="filter-select">
            <option value="">Todos los servicios</option>
            <option value="homecare">Cuidado Domiciliario</option>
            <option value="medical">Acompañamiento Médico</option>
            <option value="medication">Control de Medicamentos</option>
          </select>
        </div>
        
        <div class="requests-grid">
          ${requests.map(request => `
            <div class="request-card">
              <div class="request-header">
                <img src="${request.photo}" alt="${request.name}" class="request-photo">
                <div class="request-info">
                  <h3>${request.name}</h3>
                  <div class="request-age">${request.age} años</div>
                </div>
              </div>
              
              <div class="request-details">
                <div class="detail-row">
                  <span class="detail-label">Servicio:</span>
                  <span class="detail-value">${request.service}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Ubicación:</span>
                  <span class="detail-value">${request.location}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Fecha:</span>
                  <span class="detail-value">${request.date}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Urgencia:</span>
                  <span class="urgency-badge urgency-${request.urgency.toLowerCase()}">${request.urgency}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Estado:</span>
                  <span class="status-badge status-${request.status}">
                    ${request.status === 'pending' ? 'Pendiente' : 
                      request.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                  </span>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="btn btn-view">
                  <i class="bi bi-eye"></i> Ver Detalles
                </button>
                ${request.status === 'pending' ? `
                  <button class="btn btn-accept">
                    <i class="bi bi-check"></i> Aceptar
                  </button>
                  <button class="btn btn-reject">
                    <i class="bi bi-x"></i> Rechazar
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}
customElements.define('patient-requests', PatientRequests); 