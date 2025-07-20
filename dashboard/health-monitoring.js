class HealthMonitoring extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getHealthData() {
    return {
      vitals: [
        { name: 'Blood Pressure', value: '120/80', status: 'normal', trend: 'stable' },
        { name: 'Heart Rate', value: '72 bpm', status: 'normal', trend: 'stable' },
        { name: 'Temperature', value: '98.6°F', status: 'normal', trend: 'stable' },
        { name: 'Blood Sugar', value: '95 mg/dL', status: 'normal', trend: 'stable' }
      ],
      recentReadings: [
        { date: '2024-12-25', time: '8:00 AM', type: 'Blood Pressure', value: '120/80', status: 'normal' },
        { date: '2024-12-25', time: '8:00 AM', type: 'Heart Rate', value: '72 bpm', status: 'normal' },
        { date: '2024-12-24', time: '8:00 PM', type: 'Blood Sugar', value: '95 mg/dL', status: 'normal' },
        { date: '2024-12-24', time: '8:00 AM', type: 'Blood Pressure', value: '118/78', status: 'normal' }
      ],
      alerts: [
        { type: 'medication', message: 'Time to take blood pressure medication', time: '2 hours ago', priority: 'medium' },
        { type: 'appointment', message: 'Upcoming doctor appointment tomorrow', time: '1 day ago', priority: 'low' }
      ]
    };
  }
  
  render() {
    const data = this.getHealthData();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .health-container {
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
        
        .add-reading-btn {
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
        
        .add-reading-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
        }
        
        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .vital-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }
        
        .vital-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .vital-card.normal {
          border-left-color: #28a745;
        }
        
        .vital-card.warning {
          border-left-color: #ffc107;
        }
        
        .vital-card.alert {
          border-left-color: #dc3545;
        }
        
        .vital-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 24px;
          color: white;
        }
        
        .vital-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        
        .vital-value {
          font-size: 28px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 5px;
        }
        
        .vital-status {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .readings-section {
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
        
        .reading-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 10px;
          transition: all 0.3s;
        }
        
        .reading-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .reading-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
        
        .reading-content {
          flex: 1;
        }
        
        .reading-type {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }
        
        .reading-details {
          font-size: 12px;
          color: #666;
        }
        
        .reading-value {
          font-size: 18px;
          font-weight: 700;
          color: #28a745;
        }
        
        .reading-status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }
        
        .status-normal {
          background: #d4edda;
          color: #155724;
        }
        
        .alerts-section {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .alert-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 10px;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }
        
        .alert-item.medium {
          border-left-color: #ffc107;
          background: #fff3cd;
        }
        
        .alert-item.low {
          border-left-color: #6c757d;
          background: #f8f9fa;
        }
        
        .alert-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffc107;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
        
        .alert-content {
          flex: 1;
        }
        
        .alert-message {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }
        
        .alert-time {
          font-size: 12px;
          color: #666;
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
          
          .vitals-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .reading-item {
            flex-direction: column;
            text-align: center;
          }
          
          .alert-item {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
      
      <div class="health-container">
        <div class="header">
          <h2>
            <i class="bi bi-heart-pulse"></i>
            Health Monitoring
          </h2>
          <button class="add-reading-btn" id="add-reading-btn">
            <i class="bi bi-plus"></i>
            Add Reading
          </button>
        </div>
        
        <!-- Vital Signs Grid -->
        <div class="vitals-grid">
          ${data.vitals.map(vital => `
            <div class="vital-card ${vital.status}">
              <div class="vital-icon">
                <i class="bi bi-heart-pulse"></i>
              </div>
              <div class="vital-name">${vital.name}</div>
              <div class="vital-value">${vital.value}</div>
              <div class="vital-status">${vital.status} • ${vital.trend}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="content-grid">
          <!-- Recent Readings -->
          <div class="readings-section">
            <h3 class="section-title">
              <i class="bi bi-clock-history"></i>
              Recent Readings
            </h3>
            
            ${data.recentReadings.map(reading => `
              <div class="reading-item">
                <div class="reading-icon">
                  <i class="bi bi-activity"></i>
                </div>
                
                <div class="reading-content">
                  <div class="reading-type">${reading.type}</div>
                  <div class="reading-details">${reading.date} at ${reading.time}</div>
                </div>
                
                <div class="reading-value">${reading.value}</div>
                
                <div class="reading-status status-${reading.status}">
                  ${reading.status}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Health Alerts -->
          <div class="alerts-section">
            <h3 class="section-title">
              <i class="bi bi-bell"></i>
              Health Alerts
            </h3>
            
            ${data.alerts.map(alert => `
              <div class="alert-item ${alert.priority}">
                <div class="alert-icon">
                  <i class="bi bi-bell"></i>
                </div>
                
                <div class="alert-content">
                  <div class="alert-message">${alert.message}</div>
                  <div class="alert-time">${alert.time}</div>
                </div>
              </div>
            `).join('')}
            
            <div style="text-align: center; margin-top: 20px;">
              <button style="background: #1976d2; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer;">
                View All Alerts
              </button>
            </div>
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
              <div class="action-title">Add Reading</div>
              <div class="action-desc">Record new health data</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="action-title">View Trends</div>
              <div class="action-desc">Health data over time</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-share"></i>
              </div>
              <div class="action-title">Share with Doctor</div>
              <div class="action-desc">Send health reports</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure monitoring</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('health-monitoring', HealthMonitoring); 