class PatientManagement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getPatients() {
    return [
      {
        id: 1,
        name: 'Maria Gonzalez',
        age: 72,
        photo: 'MG',
        status: 'active',
        careType: 'Morning care',
        healthStatus: 'Good',
        lastVisit: 'Today 8:00 AM',
        nextAppointment: 'Tomorrow 8:00 AM',
        medications: ['Blood pressure', 'Diabetes'],
        notes: 'Responds well to morning routine. Blood pressure stable.'
      },
      {
        id: 2,
        name: 'Robert Wilson',
        age: 68,
        photo: 'RW',
        status: 'active',
        careType: 'Afternoon care',
        healthStatus: 'Stable',
        lastVisit: 'Today 2:00 PM',
        nextAppointment: 'Tomorrow 2:00 PM',
        medications: ['Heart medication', 'Pain relief'],
        notes: 'Requires assistance with mobility. Medication compliance good.'
      },
      {
        id: 3,
        name: 'Linda Martinez',
        age: 75,
        photo: 'LM',
        status: 'pending',
        careType: 'Evening care',
        healthStatus: 'Monitoring',
        lastVisit: 'Yesterday 6:00 PM',
        nextAppointment: 'Today 6:00 PM',
        medications: ['Blood pressure', 'Sleep aid'],
        notes: 'Recent blood pressure fluctuations. Monitor closely.'
      }
    ];
  }
  
  render() {
    const patients = this.getPatients();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .patient-management-container {
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
        
        .add-btn {
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
        
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
        }
        
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .patients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }
        
        .patient-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 5px solid #1976d2;
          transition: all 0.3s;
          position: relative;
        }
        
        .patient-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .patient-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .patient-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 600;
        }
        
        .patient-info h3 {
          margin: 0 0 5px 0;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 600;
        }
        
        .patient-info p {
          margin: 0;
          color: #6c757d;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        
        .status-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 6px 12px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        
        .status-active {
          background: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        
        .patient-details {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .detail-row:last-child {
          margin-bottom: 0;
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
        
        .medications-list {
          margin: 15px 0;
        }
        
        .medication-tag {
          display: inline-block;
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 5px;
        }
        
        .patient-notes {
          margin: 15px 0;
          padding: 15px;
          background: #fff3cd;
          border-radius: 8px;
          border-left: 4px solid #ffc107;
        }
        
        .notes-title {
          font-size: 14px;
          font-weight: 600;
          color: #856404;
          margin-bottom: 8px;
        }
        
        .notes-text {
          font-size: 14px;
          color: #856404;
          line-height: 1.4;
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        .action-btn {
          flex: 1;
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
        }
        
        .btn-view {
          background: #1976d2;
          color: white;
        }
        
        .btn-view:hover {
          background: #1565c0;
        }
        
        .btn-edit {
          background: #28a745;
          color: white;
        }
        
        .btn-edit:hover {
          background: #218838;
        }
        
        .btn-report {
          background: #ffc107;
          color: #333;
        }
        
        .btn-report:hover {
          background: #e0a800;
        }
        
        @media (max-width: 768px) {
          .patient-management-container {
            padding: 15px;
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .patients-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      </style>
      
      <div class="patient-management-container">
        <div class="header">
          <h2>
            <i class="bi bi-people"></i>
            Patient Management
          </h2>
          <button class="add-btn" id="add-patient-btn">
            <i class="bi bi-plus"></i>
            Add Patient
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Total Patients</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Active Patients</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Pending Care</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">8</div>
            <div class="stat-label">This Week's Visits</div>
          </div>
        </div>
        
        <div class="patients-grid">
          ${patients.map(patient => `
            <div class="patient-card">
              <div class="status-badge status-${patient.status}">
                ${patient.status === 'active' ? 'Active' : 'Pending'}
              </div>
              
              <div class="patient-header">
                <div class="patient-avatar">${patient.photo}</div>
                <div class="patient-info">
                  <h3>${patient.name}</h3>
                  <p>${patient.age} years old • ${patient.careType}</p>
                </div>
              </div>
              
              <div class="patient-details">
                <div class="detail-row">
                  <span class="detail-label">Health Status:</span>
                  <span class="detail-value">${patient.healthStatus}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Last Visit:</span>
                  <span class="detail-value">${patient.lastVisit}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Next Appointment:</span>
                  <span class="detail-value">${patient.nextAppointment}</span>
                </div>
              </div>
              
              <div class="medications-list">
                <div class="detail-label">Medications:</div>
                ${patient.medications.map(med => `
                  <span class="medication-tag">${med}</span>
                `).join('')}
              </div>
              
              <div class="patient-notes">
                <div class="notes-title">Care Notes:</div>
                <div class="notes-text">${patient.notes}</div>
              </div>
              
              <div class="action-buttons">
                <button class="action-btn btn-view" data-patient-id="${patient.id}">
                  <i class="bi bi-eye"></i> View Details
                </button>
                <button class="action-btn btn-edit" data-patient-id="${patient.id}">
                  <i class="bi bi-pencil"></i> Edit Care Plan
                </button>
                <button class="action-btn btn-report" data-patient-id="${patient.id}">
                  <i class="bi bi-clipboard-data"></i> Create Report
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('patient-management', PatientManagement); 