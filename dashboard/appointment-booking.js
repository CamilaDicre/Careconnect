class AppointmentBooking extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getAvailableCaregivers() {
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        rating: 4.8,
        experience: '5 years',
        specializations: ['Elderly Care', 'Medication Management'],
        availability: 'Mon-Fri 8AM-6PM',
        hourlyRate: 25,
        photo: 'SJ'
      },
      {
        id: 2,
        name: 'Maria Rodriguez',
        rating: 4.9,
        experience: '7 years',
        specializations: ['Dementia Care', 'Physical Therapy'],
        availability: 'Mon-Sat 9AM-7PM',
        hourlyRate: 30,
        photo: 'MR'
      },
      {
        id: 3,
        name: 'Robert Wilson',
        rating: 4.7,
        experience: '4 years',
        specializations: ['Medical Care', 'Emergency Response'],
        availability: 'Mon-Fri 7AM-5PM',
        hourlyRate: 28,
        photo: 'RW'
      }
    ];
  }
  
  render() {
    const caregivers = this.getAvailableCaregivers();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .booking-container {
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
        
        .booking-steps {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        
        .step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: #f8f9fa;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
        }
        
        .step.active {
          background: #1976d2;
          color: white;
        }
        
        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #e3f2fd;
          color: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }
        
        .step.active .step-number {
          background: white;
          color: #1976d2;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .caregivers-section {
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
        
        .caregiver-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 15px;
          transition: all 0.3s;
          border: 2px solid transparent;
          cursor: pointer;
        }
        
        .caregiver-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .caregiver-item.selected {
          border-color: #1976d2;
          background: #e3f2fd;
        }
        
        .caregiver-avatar {
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
        
        .caregiver-content {
          flex: 1;
        }
        
        .caregiver-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .caregiver-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 8px;
        }
        
        .star {
          color: #ffc107;
          font-size: 14px;
        }
        
        .rating-text {
          font-size: 14px;
          color: #666;
        }
        
        .caregiver-specializations {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        
        .specialization-tag {
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }
        
        .caregiver-details {
          display: flex;
          gap: 20px;
          font-size: 12px;
          color: #666;
        }
        
        .caregiver-price {
          font-size: 18px;
          font-weight: 700;
          color: #28a745;
          margin-left: auto;
        }
        
        .booking-form {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          display: block;
        }
        
        .form-select, .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 16px;
          font-family: 'Poppins', sans-serif;
          transition: border-color 0.3s;
        }
        
        .form-select:focus, .form-input:focus {
          outline: none;
          border-color: #1976d2;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .book-btn {
          width: 100%;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          margin-top: 20px;
        }
        
        .book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
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
          
          .booking-steps {
            flex-direction: column;
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .caregiver-item {
            flex-direction: column;
            text-align: center;
          }
          
          .caregiver-price {
            margin-left: 0;
            margin-top: 10px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="booking-container">
        <div class="header">
          <h2>
            <i class="bi bi-calendar-plus"></i>
            Book Appointment
          </h2>
        </div>
        
        <div class="booking-steps">
          <div class="step active">
            <div class="step-number">1</div>
            <span>Choose Caregiver</span>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <span>Select Service</span>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <span>Schedule Time</span>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <span>Confirm Booking</span>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Available Caregivers -->
          <div class="caregivers-section">
            <h3 class="section-title">
              <i class="bi bi-people"></i>
              Available Caregivers
            </h3>
            
            ${caregivers.map(caregiver => `
              <div class="caregiver-item" data-caregiver-id="${caregiver.id}">
                <div class="caregiver-avatar">${caregiver.photo}</div>
                
                <div class="caregiver-content">
                  <div class="caregiver-name">${caregiver.name}</div>
                  <div class="caregiver-rating">
                    <i class="bi bi-star-fill star"></i>
                    <span class="rating-text">${caregiver.rating} (${caregiver.experience})</span>
                  </div>
                  <div class="caregiver-specializations">
                    ${caregiver.specializations.map(spec => `
                      <span class="specialization-tag">${spec}</span>
                    `).join('')}
                  </div>
                  <div class="caregiver-details">
                    <span>Available: ${caregiver.availability}</span>
                  </div>
                </div>
                
                <div class="caregiver-price">
                  $${caregiver.hourlyRate}/hr
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Booking Form -->
          <div class="booking-form">
            <h3 class="section-title">
              <i class="bi bi-calendar-check"></i>
              Appointment Details
            </h3>
            
            <div class="form-group">
              <label class="form-label">Service Type</label>
              <select class="form-select">
                <option>Select service type</option>
                <option>In-Person Care</option>
                <option>Virtual Consultation</option>
                <option>Home Care Visit</option>
                <option>Medical Check-up</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" class="form-input">
              </div>
              <div class="form-group">
                <label class="form-label">Time</label>
                <select class="form-select">
                  <option>Select time</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Duration</label>
              <select class="form-select">
                <option>Select duration</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Special Instructions</label>
              <textarea class="form-input" rows="3" placeholder="Any special requirements or notes..."></textarea>
            </div>
            
            <button class="book-btn">
              <i class="bi bi-calendar-check"></i>
              Book Appointment
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
                <i class="bi bi-search"></i>
              </div>
              <div class="action-title">Find Caregivers</div>
              <div class="action-desc">Search by location & specialty</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-clock-history"></i>
              </div>
              <div class="action-title">Recent Bookings</div>
              <div class="action-desc">View past appointments</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-star"></i>
              </div>
              <div class="action-title">Favorites</div>
              <div class="action-desc">Your preferred caregivers</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Booking preferences</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('appointment-booking', AppointmentBooking); 