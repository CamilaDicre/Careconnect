class VirtualCare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getVirtualSessions() {
    return [
      {
        id: 1,
        caregiver: 'Sarah Johnson',
        type: 'Video Consultation',
        status: 'scheduled',
        time: '10:00 AM',
        duration: '30 min',
        notes: 'Blood pressure check and medication review',
        connection: 'pending'
      },
      {
        id: 2,
        caregiver: 'Dr. Michael Smith',
        type: 'Medical Consultation',
        status: 'completed',
        time: '02:00 PM',
        duration: '45 min',
        notes: 'Health monitoring and medication adjustment',
        connection: 'completed'
      },
      {
        id: 3,
        caregiver: 'Sarah Johnson',
        type: 'Virtual Check-in',
        status: 'upcoming',
        time: '09:00 AM',
        duration: '20 min',
        notes: 'Daily wellness check',
        connection: 'pending'
      }
    ];
  }
  
  render() {
    const sessions = this.getVirtualSessions();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .virtual-care-container {
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
        
        .start-session-btn {
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
        
        .start-session-btn:hover {
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
        
        .sessions-section {
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
        
        .session-item {
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
        
        .session-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .session-item.scheduled {
          border-left-color: #1976d2;
          background: #e3f2fd;
        }
        
        .session-item.completed {
          border-left-color: #28a745;
          background: #d4edda;
        }
        
        .session-item.upcoming {
          border-left-color: #ffc107;
          background: #fff3cd;
        }
        
        .session-avatar {
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
        
        .session-content {
          flex: 1;
        }
        
        .session-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .session-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .session-notes {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        
        .session-time {
          text-align: center;
          min-width: 80px;
        }
        
        .time-main {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin-bottom: 2px;
        }
        
        .time-duration {
          font-size: 12px;
          color: #666;
        }
        
        .session-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        
        .status-scheduled {
          background: #e3f2fd;
          color: #1976d2;
        }
        
        .status-completed {
          background: #d4edda;
          color: #155724;
        }
        
        .status-upcoming {
          background: #fff3cd;
          color: #856404;
        }
        
        .session-actions {
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
        
        .btn-join {
          background: #28a745;
          color: white;
        }
        
        .btn-join:hover {
          background: #218838;
        }
        
        .btn-view {
          background: #1976d2;
          color: white;
        }
        
        .btn-view:hover {
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
          
          .session-item {
            flex-direction: column;
            text-align: center;
          }
          
          .session-actions {
            justify-content: center;
            margin-top: 10px;
          }
        }
      </style>
      
      <div class="virtual-care-container">
        <div class="header">
          <h2>
            <i class="bi bi-camera-video"></i>
            Virtual Care
          </h2>
          <button class="start-session-btn" id="start-session-btn">
            <i class="bi bi-play-circle"></i>
            Start New Session
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Today's Sessions</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Upcoming</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">98%</div>
            <div class="stat-label">Connection Quality</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Sessions List -->
          <div class="sessions-section">
            <h3 class="section-title">
              <i class="bi bi-clock"></i>
              Virtual Sessions
            </h3>
            
            ${sessions.map(session => `
              <div class="session-item ${session.status}">
                <div class="session-avatar">${session.caregiver.split(' ').map(n => n[0]).join('')}</div>
                
                <div class="session-content">
                  <div class="session-title">${session.caregiver}</div>
                  <div class="session-subtitle">${session.type}</div>
                  <div class="session-notes">${session.notes}</div>
                </div>
                
                <div class="session-time">
                  <div class="time-main">${session.time}</div>
                  <div class="time-duration">${session.duration}</div>
                </div>
                
                <div class="session-status status-${session.status}">
                  ${session.status === 'scheduled' ? 'Scheduled' : 
                    session.status === 'completed' ? 'Completed' : 'Upcoming'}
                </div>
                
                <div class="session-actions">
                  ${session.status === 'scheduled' ? 
                    `<button class="action-btn btn-join">Join</button>` :
                    session.status === 'completed' ? 
                    `<button class="action-btn btn-view">View Report</button>` :
                    `<button class="action-btn btn-view">View Details</button>`
                  }
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Virtual Care Tools -->
          <div class="tools-section">
            <h3 class="section-title">
              <i class="bi bi-tools"></i>
              Virtual Care Tools
            </h3>
            
            <button class="tool-item">
              <i class="bi bi-camera-video"></i>
              Video Call
            </button>
            
            <button class="tool-item">
              <i class="bi bi-mic"></i>
              Voice Call
            </button>
            
            <button class="tool-item">
              <i class="bi bi-chat-dots"></i>
              Text Chat
            </button>
            
            <button class="tool-item">
              <i class="bi bi-share"></i>
              Screen Share
            </button>
            
            <button class="tool-item">
              <i class="bi bi-record-circle"></i>
              Session Recording
            </button>
            
            <button class="tool-item">
              <i class="bi bi-file-earmark-text"></i>
              Health Notes
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
              <div class="action-title">Schedule Session</div>
              <div class="action-desc">Book a virtual appointment</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-people"></i>
              </div>
              <div class="action-title">Find Caregiver</div>
              <div class="action-desc">Search for available caregivers</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="action-title">Session History</div>
              <div class="action-desc">View past sessions</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure virtual care</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('virtual-care', VirtualCare); 