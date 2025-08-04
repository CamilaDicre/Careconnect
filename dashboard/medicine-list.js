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
    // Get logged in user
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return [];
    // Read user-specific medications
    const meds = JSON.parse(localStorage.getItem('medicines_' + loggedInUser) || '[]');
    return meds;
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
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .medicine-hero {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(40, 167, 69, 0.3);
        }

        .medicine-hero::before {
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
          position: relative;
          z-index: 2;
        }

        .medicine-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .medicine-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 20px;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .controls-section {
          background: white;
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .add-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        .add-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        }

        .filter-controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .filter-btn {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          color: #495057;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .medicine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .medicine-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .medicine-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #28a745, #20c997);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .medicine-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(40, 167, 69, 0.15);
          border-color: #28a745;
        }

        .medicine-card:hover::before {
          transform: scaleX(1);
        }

        .medicine-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .medicine-info {
          flex: 1;
        }

        .medicine-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }

        .medicine-dosage {
          font-size: 1rem;
          color: #666;
          margin-bottom: 5px;
        }

        .medicine-time {
          font-size: 0.9rem;
          color: #28a745;
          font-weight: 600;
        }

        .medicine-status {
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-pending {
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          color: #856404;
        }

        .status-taken {
          background: linear-gradient(135deg, #d4edda, #c3e6cb);
          color: #155724;
        }

        .status-skipped {
          background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          color: #721c24;
        }

        .medicine-details {
          margin-bottom: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .detail-label {
          font-weight: 600;
          color: #666;
          font-size: 0.9rem;
        }

        .detail-value {
          color: #333;
          font-weight: 500;
        }

        .medicine-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .take-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .take-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }

        .skip-btn {
          background: linear-gradient(135deg, #ffc107, #ff9800);
          color: white;
        }

        .skip-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
        }

        .edit-btn {
          background: linear-gradient(135deg, #17a2b8, #138496);
          color: white;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(23, 162, 184, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 10px;
          color: #333;
        }

        .empty-description {
          font-size: 1rem;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .medicine-container {
            padding: 20px;
          }
          
          .medicine-title {
            font-size: 2rem;
          }
          
          .stats-bar {
            flex-direction: column;
            gap: 15px;
          }
          
          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-controls {
            justify-content: center;
          }
          
          .medicine-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="medicine-container">
        <div class="medicine-hero">
          <div class="hero-content">
            <h1 class="medicine-title">💊 Medication Management</h1>
            <p class="medicine-subtitle">Track your medications and never miss a dose</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">${medicines.length}</span>
                <span class="stat-label">Total Medications</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${medicines.filter(m => m.status === 'taken').length}</span>
                <span class="stat-label">Taken Today</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${medicines.filter(m => m.status === 'pending').length}</span>
                <span class="stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="controls-section">
          <button class="add-btn" id="addMedicineBtn">
            <i class="bi bi-plus-circle"></i>
            Add Medication
          </button>
          <div class="filter-controls">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="pending">Pending</button>
            <button class="filter-btn" data-filter="taken">Taken</button>
            <button class="filter-btn" data-filter="skipped">Skipped</button>
          </div>
        </div>
        
        <div class="medicine-grid">
          ${medicines.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">💊</div>
              <div class="empty-title">No Medications Added</div>
              <div class="empty-description">Start by adding your first medication to track your health</div>
              <button class="add-btn" onclick="this.parentElement.parentElement.parentElement.shadowRoot.querySelector('#addMedicineBtn').click()">
                <i class="bi bi-plus-circle"></i>
                Add Your First Medication
              </button>
            </div>
          ` : medicines.map(medicine => `
            <div class="medicine-card" data-id="${medicine.id}">
              <div class="medicine-header">
                <div class="medicine-info">
                  <div class="medicine-name">${medicine.name}</div>
                  <div class="medicine-dosage">${medicine.dosage}</div>
                  <div class="medicine-time">${medicine.time}</div>
                </div>
                <div class="medicine-status status-${medicine.status || 'pending'}">
                  ${medicine.status || 'pending'}
                </div>
              </div>
              
              <div class="medicine-details">
                <div class="detail-row">
                  <span class="detail-label">Frequency:</span>
                  <span class="detail-value">${medicine.frequency}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${medicine.duration}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Instructions:</span>
                  <span class="detail-value">${medicine.instructions}</span>
                </div>
              </div>
              
              <div class="medicine-actions">
                ${medicine.status !== 'taken' ? `
                  <button class="action-btn take-btn" onclick="this.parentElement.parentElement.parentElement.shadowRoot.querySelector('.medicine-card[data-id=\\'${medicine.id}\\']').shadowRoot.querySelector('.take-btn').click()">
                    <i class="bi bi-check-circle"></i>
                    Take
                  </button>
                ` : ''}
                ${medicine.status !== 'skipped' ? `
                  <button class="action-btn skip-btn" onclick="this.parentElement.parentElement.parentElement.shadowRoot.querySelector('.medicine-card[data-id=\\'${medicine.id}\\']').shadowRoot.querySelector('.skip-btn').click()">
                    <i class="bi bi-x-circle"></i>
                    Skip
                  </button>
                ` : ''}
                <button class="action-btn edit-btn">
                  <i class="bi bi-pencil"></i>
                  Edit
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  attachEvents() {
    const addBtn = this.shadowRoot.getElementById('addMedicineBtn');
    if (addBtn) {
      addBtn.onclick = () => {
        this.showAddMedicineModal();
      };
    }
  }
  
  markAsTaken(medicineId) {
    // Update the medicine status
    const medicineCard = this.shadowRoot.querySelector(`[data-id="${medicineId}"]`).closest('.medicine-card');
    const statusBadge = medicineCard.querySelector('.medicine-status');
    const actionButtons = medicineCard.querySelector('.medicine-actions');
    
    statusBadge.className = 'medicine-status status-taken';
    statusBadge.textContent = 'Taken';
    
    if (actionButtons) {
      actionButtons.remove();
    }
    
    // Show success notification
    this.showNotification('Medication marked as taken!', 'success');
  }
  
  skipMedicine(medicineId) {
    // Update the medicine status
    const medicineCard = this.shadowRoot.querySelector(`[data-id="${medicineId}"]`).closest('.medicine-card');
    const statusBadge = medicineCard.querySelector('.medicine-status');
    const actionButtons = medicineCard.querySelector('.medicine-actions');
    
    statusBadge.className = 'medicine-status status-skipped';
    statusBadge.textContent = 'Skipped';
    
    if (actionButtons) {
      actionButtons.remove();
    }
    
    // Show notification
    this.showNotification('Medication skipped', 'warning');
  }
  
  showAddMedicineModal() {
    // Simple prompt to add medication (you can improve this with a real modal)
    const name = prompt('Medication name:');
    if (!name) return;
    const dosage = prompt('Dosage:');
    const time = prompt('Time (e.g.: 08:00):');
    const frequency = prompt('Frequency:');
    const instructions = prompt('Instructions:');
    const color = '#ffc107';
    const icon = 'bi-capsule';
    const status = 'pending';
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    const medicines = JSON.parse(localStorage.getItem('medicines_' + loggedInUser) || '[]');
    medicines.push({
      id: Date.now(),
      name,
      dosage,
      time,
      frequency,
      instructions,
      color,
      icon,
      status
    });
    localStorage.setItem('medicines_' + loggedInUser, JSON.stringify(medicines));
    this.render();
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