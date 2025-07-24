class MedicationManagement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getMedications() {
    return [
      {
        id: 1,
        patient: 'Maria Gonzalez',
        medication: 'Lisinopril 10mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        time: '8:00 AM',
        status: 'administered',
        notes: 'Blood pressure medication',
        prescribedBy: 'Dr. Smith',
        lastAdministered: 'Today 8:00 AM'
      },
      {
        id: 2,
        patient: 'Robert Wilson',
        medication: 'Metformin 500mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        time: '8:00 AM & 8:00 PM',
        status: 'pending',
        notes: 'Diabetes medication - take with food',
        prescribedBy: 'Dr. Johnson',
        lastAdministered: 'Yesterday 8:00 PM'
      },
      {
        id: 3,
        patient: 'Linda Martinez',
        medication: 'Atorvastatin 20mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        time: '9:00 PM',
        status: 'overdue',
        notes: 'Cholesterol medication',
        prescribedBy: 'Dr. Williams',
        lastAdministered: 'Yesterday 9:00 PM'
      },
      {
        id: 4,
        patient: 'Maria Gonzalez',
        medication: 'Aspirin 81mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        time: '8:00 AM',
        status: 'administered',
        notes: 'Blood thinner - take with food',
        prescribedBy: 'Dr. Smith',
        lastAdministered: 'Today 8:00 AM'
      }
    ];
  }
  
  render() {
    const medications = this.getMedications();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .medication-container {
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
        
        .add-medication-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
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
        
        .add-medication-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
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
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .medications-section {
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
        
        .medication-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 15px;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }
        
        .medication-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .medication-item.administered {
          border-left-color: #28a745;
          background: #d4edda;
        }
        
        .medication-item.pending {
          border-left-color: #1976d2;
          background: #e3f2fd;
        }
        
        .medication-item.overdue {
          border-left-color: #dc3545;
          background: #f8d7da;
        }
        
        .medication-avatar {
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
        
        .medication-content {
          flex: 1;
        }
        
        .medication-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .medication-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .medication-details {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }
        
        .detail-item {
          font-size: 12px;
          color: #666;
        }
        
        .detail-label {
          font-weight: 600;
          color: #333;
        }
        
        .medication-notes {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        
        .medication-time {
          text-align: center;
          min-width: 80px;
        }
        
        .time-main {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin-bottom: 2px;
        }
        
        .time-frequency {
          font-size: 12px;
          color: #666;
        }
        
        .medication-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        
        .status-administered {
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
        
        .medication-actions {
          display: flex;
          gap: 10px;
        }
        
        .action-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
        }
        
        .btn-administer {
          background: #28a745;
          color: white;
        }
        
        .btn-administer:hover {
          background: #218838;
        }
        
        .btn-skip {
          background: #6c757d;
          color: white;
        }
        
        .btn-skip:hover {
          background: #5a6268;
        }
        
        .btn-edit {
          background: #1976d2;
          color: white;
        }
        
        .btn-edit:hover {
          background: #1565c0;
        }
        
        .tools-section {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .tool-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
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
        
        .tool-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .tool-item i {
          font-size: 20px;
          color: #1976d2;
        }
        
        .quick-actions {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-top: 30px;
        }
        
        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .action-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .action-card:hover {
          background: #e3f2fd;
          transform: translateY(-2px);
        }
        
        .action-icon {
          font-size: 32px;
          color: #1976d2;
          margin-bottom: 10px;
        }
        
        .action-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .action-desc {
          font-size: 12px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .medication-item {
            flex-direction: column;
            text-align: center;
          }
          
          .medication-actions {
            justify-content: center;
            margin-top: 10px;
          }
          
          .medication-details {
            flex-direction: column;
            gap: 5px;
          }
        }
      </style>
      
      <div class="medication-container">
        <div class="header">
          <h2>
            <i class="bi bi-capsule"></i>
            Medication Management
          </h2>
          <button class="add-medication-btn" id="add-medication-btn">
            <i class="bi bi-plus"></i>
            Add Medication
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Total Medications</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Administered Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Overdue</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Medications List -->
          <div class="medications-section">
            <h3 class="section-title">
              <i class="bi bi-clock"></i>
              Today's Medications
            </h3>
            
            ${medications.map(med => `
              <div class="medication-item ${med.status}">
                <div class="medication-avatar">${med.patient.split(' ').map(n => n[0]).join('')}</div>
                
                <div class="medication-content">
                  <div class="medication-title">${med.medication}</div>
                  <div class="medication-subtitle">${med.patient}</div>
                  <div class="medication-details">
                    <div class="detail-item">
                      <span class="detail-label">Dosage:</span> ${med.dosage}
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Prescribed by:</span> ${med.prescribedBy}
                    </div>
                  </div>
                  <div class="medication-notes">${med.notes}</div>
                </div>
                
                <div class="medication-time">
                  <div class="time-main">${med.time}</div>
                  <div class="time-frequency">${med.frequency}</div>
                </div>
                
                <div class="medication-status status-${med.status}">
                  ${med.status === 'administered' ? 'Administered' : 
                    med.status === 'pending' ? 'Pending' : 'Overdue'}
                </div>
                
                <div class="medication-actions">
                  ${med.status === 'administered' ? 
                    `<button class="action-btn btn-edit">Edit</button>` :
                    med.status === 'pending' ? 
                    `<button class="action-btn btn-administer">Administer</button>
                     <button class="action-btn btn-skip">Skip</button>` :
                    `<button class="action-btn btn-administer">Administer Now</button>
                     <button class="action-btn btn-edit">Edit</button>`
                  }
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Medication Tools -->
          <div class="tools-section">
            <h3 class="section-title">
              <i class="bi bi-tools"></i>
              Medication Tools
            </h3>
            
            <button class="tool-item">
              <i class="bi bi-plus-circle"></i>
              Add New Medication
            </button>
            
            <button class="tool-item">
              <i class="bi bi-calendar-check"></i>
              Medication Schedule
            </button>
            
            <button class="tool-item">
              <i class="bi bi-graph-up"></i>
              Compliance Reports
            </button>
            
            <button class="tool-item">
              <i class="bi bi-exclamation-triangle"></i>
              Drug Interactions
            </button>
            
            <button class="tool-item">
              <i class="bi bi-file-earmark-text"></i>
              Prescription History
            </button>
            
            <button class="tool-item">
              <i class="bi bi-bell"></i>
              Medication Reminders
            </button>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="quick-actions">
          <h3 class="section-title">
            <i class="bi bi-lightning"></i>
            Quick Actions
          </h3>
          
          <div class="action-grid">
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-calendar-plus"></i>
              </div>
              <div class="action-title">Schedule Medication</div>
              <div class="action-desc">Set up new medication schedule</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-people"></i>
              </div>
              <div class="action-title">Patient Medications</div>
              <div class="action-desc">View all patient medications</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="action-title">Compliance Report</div>
              <div class="action-desc">View medication compliance</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure medication alerts</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('medication-management', MedicationManagement); 