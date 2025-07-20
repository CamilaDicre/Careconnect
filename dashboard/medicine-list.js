class MedicineList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  getMedicines() {
    return [
      {
        name: 'Vitamina D',
        dosage: '1 cápsula',
        time: '08:00',
        status: 'completed',
        icon: 'bi-capsule',
        color: '#28a745'
      },
      {
        name: 'Omeprazol',
        dosage: '1 tableta',
        time: '08:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107'
      },
      {
        name: 'Metformina',
        dosage: '1 tableta',
        time: '12:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107'
      },
      {
        name: 'Amlodipino',
        dosage: '1 tableta',
        time: '20:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107'
      },
      {
        name: 'Vitamina C',
        dosage: '1 tableta',
        time: '20:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107'
      }
    ];
  }
  render() {
    const medicines = this.getMedicines();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        section {
          padding: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .header h2 {
          color: #1976d2;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 600;
        }
        .add-btn {
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
        .add-btn:hover {
          background: #1565c0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }
        .add-btn i {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }
        .medicine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .medicine-card {
          background: white;
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 5px solid;
          transition: all 0.3s;
        }
        .medicine-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .medicine-header {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .medicine-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: white;
        }
        .medicine-info h3 {
          margin: 0 0 0.4rem 0;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .medicine-dosage {
          color: #6c757d;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .medicine-time {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1.2rem;
          padding: 0.8rem;
          background: #f8f9fa;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 500;
        }
        .medicine-time i {
          font-size: 1.1rem;
          color: #1976d2;
        }
        .status-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          margin-left: auto;
        }
        .status-completed {
          background: #d4edda;
          color: #155724;
        }
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        .status-overdue {
          background: #f8d7da;
          color: #721c24;
        }
      </style>
      <section>
        <div class="header">
          <h2>Mis Medicinas</h2>
          <button class="add-btn">
            <i class="bi bi-plus"></i> Agregar Medicina
          </button>
        </div>
        
        <div class="medicine-grid">
          ${medicines.map(medicine => `
            <div class="medicine-card" style="border-left-color: ${medicine.color}">
              <div class="medicine-header">
                <div class="medicine-icon" style="background: ${medicine.color}">
                  <i class="bi ${medicine.icon}"></i>
                </div>
                <div class="medicine-info">
                  <h3>${medicine.name}</h3>
                  <div class="medicine-dosage">${medicine.dosage}</div>
                </div>
              </div>
              
              <div class="medicine-time">
                <i class="bi bi-clock"></i>
                <span>${medicine.time}</span>
                <span class="status-badge status-${medicine.status}">
                  ${medicine.status === 'completed' ? 'Completado' : 
                    medicine.status === 'pending' ? 'Pendiente' : 'Atrasado'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}
customElements.define('medicine-list', MedicineList); 