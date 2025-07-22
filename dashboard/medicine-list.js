class MedicineList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.attachEvents();
  }
  
  getMedicines() {
    return [
      {
        id: 1,
        name: 'Vitamin D',
        dosage: '1 capsule',
        time: '08:00',
        status: 'completed',
        icon: 'bi-capsule',
        color: '#28a745',
        frequency: 'Daily',
        instructions: 'Take with breakfast'
      },
      {
        id: 2,
        name: 'Omeprazole',
        dosage: '1 tablet',
        time: '08:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107',
        frequency: 'Daily',
        instructions: 'Take 30 minutes before breakfast'
      },
      {
        id: 3,
        name: 'Metformin',
        dosage: '1 tablet',
        time: '12:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107',
        frequency: 'Twice daily',
        instructions: 'Take with lunch'
      },
      {
        id: 4,
        name: 'Amlodipine',
        dosage: '1 tablet',
        time: '20:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107',
        frequency: 'Daily',
        instructions: 'Take in the evening'
      },
      {
        id: 5,
        name: 'Vitamin C',
        dosage: '1 tablet',
        time: '20:00',
        status: 'pending',
        icon: 'bi-capsule',
        color: '#ffc107',
        frequency: 'Daily',
        instructions: 'Take with dinner'
      }
    ];
  }
  
  render() {
    const medicines = this.getMedicines();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .medicine-container {
          padding: 30px;
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
        
        .medicine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }
        
        .medicine-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-left: 5px solid;
          transition: all 0.3s;
          position: relative;
        }
        
        .medicine-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .medicine-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .medicine-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }
        
        .medicine-info h3 {
          margin: 0 0 5px 0;
          color: #212529;
          font-family: 'Poppins', sans-serif;
          font-size: 18px;
          font-weight: 600;
        }
        
        .medicine-dosage {
          color: #6c757d;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        
        .medicine-details {
          margin: 15px 0;
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
        
        .medicine-time {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          padding: 12px;
          background: #e3f2fd;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #1976d2;
        }
        
        .medicine-time i {
          font-size: 18px;
        }
        
        .status-badge {
          padding: 6px 12px;
          border-radius: 25px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          position: absolute;
          top: 20px;
          right: 20px;
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
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        
        .action-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
        }
        
        .btn-taken {
          background: #28a745;
          color: white;
        }
        
        .btn-taken:hover {
          background: #218838;
        }
        
        .btn-skip {
          background: #6c757d;
          color: white;
        }
        
        .btn-skip:hover {
          background: #5a6268;
        }
        
        @media (max-width: 768px) {
          .medicine-container {
            padding: 20px;
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .medicine-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      
      <div class="medicine-container">
        <div class="header">
          <h2>
            <i class="bi bi-capsule"></i>
            My Medications
          </h2>
          <button class="add-btn" id="add-medicine-btn">
            <i class="bi bi-plus"></i>
            Add Medication
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">Total Medications</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Taken Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Overdue</div>
          </div>
        </div>
        
        <div class="medicine-grid">
          ${medicines.map(medicine => `
            <div class="medicine-card" style="border-left-color: ${medicine.color}">
              <div class="status-badge status-${medicine.status}">
                ${medicine.status === 'completed' ? 'Taken' : medicine.status === 'pending' ? 'Pending' : 'Overdue'}
              </div>
              
              <div class="medicine-header">
                <div class="medicine-icon" style="background: ${medicine.color}">
                  <i class="bi ${medicine.icon}"></i>
                </div>
                <div class="medicine-info">
                  <h3>${medicine.name}</h3>
                  <div class="medicine-dosage">${medicine.dosage}</div>
                </div>
              </div>
              
              <div class="medicine-details">
                <div class="detail-row">
                  <span class="detail-label">Frequency:</span>
                  <span class="detail-value">${medicine.frequency}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Instructions:</span>
                  <span class="detail-value">${medicine.instructions}</span>
                </div>
              </div>
              
              <div class="medicine-time">
                <i class="bi bi-clock"></i>
                <span>${medicine.time}</span>
              </div>
              
              ${medicine.status === 'pending' ? `
                <div class="action-buttons">
                  <button class="action-btn btn-taken" data-medicine-id="${medicine.id}">
                    Mark as Taken
                  </button>
                  <button class="action-btn btn-skip" data-medicine-id="${medicine.id}">
                    Skip
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  attachEvents() {
    // Add medicine button
    const addBtn = this.shadowRoot.querySelector('#add-medicine-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.showAddMedicineModal();
      });
    }
    
    // Mark as taken buttons
    this.shadowRoot.querySelectorAll('.btn-taken').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const medicineId = e.target.dataset.medicineId;
        this.markAsTaken(medicineId);
      });
    });
    
    // Skip buttons
    this.shadowRoot.querySelectorAll('.btn-skip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const medicineId = e.target.dataset.medicineId;
        this.skipMedicine(medicineId);
      });
    });
  }
  
  markAsTaken(medicineId) {
    // Update the medicine status
    const medicineCard = this.shadowRoot.querySelector(`[data-medicine-id="${medicineId}"]`).closest('.medicine-card');
    const statusBadge = medicineCard.querySelector('.status-badge');
    const actionButtons = medicineCard.querySelector('.action-buttons');
    
    statusBadge.className = 'status-badge status-completed';
    statusBadge.textContent = 'Taken';
    
    if (actionButtons) {
      actionButtons.remove();
    }
    
    // Show success notification
    this.showNotification('Medication marked as taken!', 'success');
  }
  
  skipMedicine(medicineId) {
    // Update the medicine status
    const medicineCard = this.shadowRoot.querySelector(`[data-medicine-id="${medicineId}"]`).closest('.medicine-card');
    const statusBadge = medicineCard.querySelector('.status-badge');
    const actionButtons = medicineCard.querySelector('.action-buttons');
    
    statusBadge.className = 'status-badge status-overdue';
    statusBadge.textContent = 'Skipped';
    
    if (actionButtons) {
      actionButtons.remove();
    }
    
    // Show notification
    this.showNotification('Medication skipped', 'warning');
  }
  
  showAddMedicineModal() {
    // Simple alert for now - could be expanded to a proper modal
    alert('Add Medication feature coming soon!');
  }
  
  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#ffc107'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

customElements.define('medicine-list', MedicineList); 