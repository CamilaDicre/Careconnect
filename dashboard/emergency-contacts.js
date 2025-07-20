class EmergencyContacts extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getContacts() {
    return [
      {
        id: 1,
        name: 'Maria Gonzalez',
        relationship: 'Daughter',
        phone: '+1 (555) 123-4567',
        email: 'maria.gonzalez@email.com',
        isEmergency: true,
        isPrimary: true,
        photo: 'MG'
      },
      {
        id: 2,
        name: 'Carlos Gonzalez',
        relationship: 'Son',
        phone: '+1 (555) 234-5678',
        email: 'carlos.gonzalez@email.com',
        isEmergency: true,
        isPrimary: false,
        photo: 'CG'
      },
      {
        id: 3,
        name: 'Dr. Sarah Johnson',
        relationship: 'Primary Caregiver',
        phone: '+1 (555) 345-6789',
        email: 'sarah.johnson@careconnect.com',
        isEmergency: true,
        isPrimary: false,
        photo: 'SJ'
      },
      {
        id: 4,
        name: 'Dr. Michael Smith',
        relationship: 'Family Doctor',
        phone: '+1 (555) 456-7890',
        email: 'michael.smith@medical.com',
        isEmergency: true,
        isPrimary: false,
        photo: 'MS'
      }
    ];
  }
  
  render() {
    const contacts = this.getContacts();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .emergency-container {
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
        
        .add-contact-btn {
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
        
        .add-contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
        }
        
        .emergency-alert {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
        }
        
        .emergency-icon {
          font-size: 32px;
        }
        
        .emergency-text {
          flex: 1;
        }
        
        .emergency-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .emergency-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .emergency-call-btn {
          background: white;
          color: #dc3545;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .emergency-call-btn:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .contacts-section {
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
        
        .contact-item {
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
        
        .contact-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .contact-item.primary {
          border-left-color: #28a745;
          background: #d4edda;
        }
        
        .contact-item.emergency {
          border-left-color: #dc3545;
          background: #f8d7da;
        }
        
        .contact-avatar {
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
        
        .contact-content {
          flex: 1;
        }
        
        .contact-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .contact-relationship {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .contact-details {
          display: flex;
          gap: 20px;
          font-size: 12px;
          color: #666;
        }
        
        .contact-actions {
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
        
        .btn-call {
          background: #28a745;
          color: white;
        }
        
        .btn-call:hover {
          background: #218838;
        }
        
        .btn-message {
          background: #1976d2;
          color: white;
        }
        
        .btn-message:hover {
          background: #1565c0;
        }
        
        .btn-edit {
          background: #6c757d;
          color: white;
        }
        
        .btn-edit:hover {
          background: #5a6268;
        }
        
        .quick-access {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .quick-item {
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
        
        .quick-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .quick-item.emergency {
          background: #f8d7da;
          color: #721c24;
        }
        
        .quick-item.emergency:hover {
          background: #f5c6cb;
        }
        
        .quick-item i {
          font-size: 20px;
          color: #1976d2;
        }
        
        .quick-item.emergency i {
          color: #dc3545;
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
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .contact-item {
            flex-direction: column;
            text-align: center;
          }
          
          .contact-actions {
            justify-content: center;
            margin-top: 10px;
          }
          
          .contact-details {
            flex-direction: column;
            gap: 5px;
          }
          
          .emergency-alert {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
      
      <div class="emergency-container">
        <div class="header">
          <h2>
            <i class="bi bi-telephone"></i>
            Emergency Contacts
          </h2>
          <button class="add-contact-btn" id="add-contact-btn">
            <i class="bi bi-plus"></i>
            Add Contact
          </button>
        </div>
        
        <!-- Emergency Alert -->
        <div class="emergency-alert">
          <div class="emergency-icon">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div class="emergency-text">
            <div class="emergency-title">Emergency Services</div>
            <div class="emergency-subtitle">Quick access to emergency help</div>
          </div>
          <button class="emergency-call-btn">
            <i class="bi bi-telephone-fill"></i>
            Call 911
          </button>
        </div>
        
        <div class="content-grid">
          <!-- Emergency Contacts -->
          <div class="contacts-section">
            <h3 class="section-title">
              <i class="bi bi-people"></i>
              Emergency Contacts
            </h3>
            
            ${contacts.map(contact => `
              <div class="contact-item ${contact.isPrimary ? 'primary' : contact.isEmergency ? 'emergency' : ''}">
                <div class="contact-avatar">${contact.photo}</div>
                
                <div class="contact-content">
                  <div class="contact-name">${contact.name}</div>
                  <div class="contact-relationship">${contact.relationship}</div>
                  <div class="contact-details">
                    <span><i class="bi bi-telephone"></i> ${contact.phone}</span>
                    <span><i class="bi bi-envelope"></i> ${contact.email}</span>
                  </div>
                </div>
                
                <div class="contact-actions">
                  <button class="action-btn btn-call">
                    <i class="bi bi-telephone"></i>
                    Call
                  </button>
                  <button class="action-btn btn-message">
                    <i class="bi bi-chat"></i>
                    Message
                  </button>
                  <button class="action-btn btn-edit">
                    <i class="bi bi-pencil"></i>
                    Edit
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Quick Access -->
          <div class="quick-access">
            <h3 class="section-title">
              <i class="bi bi-lightning"></i>
              Quick Access
            </h3>
            
            <button class="quick-item emergency">
              <i class="bi bi-telephone-fill"></i>
              Emergency Services (911)
            </button>
            
            <button class="quick-item">
              <i class="bi bi-heart-pulse"></i>
              Medical Emergency
            </button>
            
            <button class="quick-item">
              <i class="bi bi-shield-check"></i>
              Police Department
            </button>
            
            <button class="quick-item">
              <i class="bi bi-fire"></i>
              Fire Department
            </button>
            
            <button class="quick-item">
              <i class="bi bi-building"></i>
              Local Hospital
            </button>
            
            <button class="quick-item">
              <i class="bi bi-gear"></i>
              Emergency Settings
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
                <i class="bi bi-plus-circle"></i>
              </div>
              <div class="action-title">Add Contact</div>
              <div class="action-desc">Add new emergency contact</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-share"></i>
              </div>
              <div class="action-title">Share Contacts</div>
              <div class="action-desc">Share with caregivers</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure emergency alerts</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-file-earmark-text"></i>
              </div>
              <div class="action-title">Emergency Plan</div>
              <div class="action-desc">View emergency procedures</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('emergency-contacts', EmergencyContacts); 