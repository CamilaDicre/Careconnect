class VirtualCare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentFilter = 'all';
    this.sessions = [];
  }
  
  connectedCallback() {
    this.loadSessions();
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    // Clean up event listeners when component is removed
    this.removeEventListeners();
  }
  
  loadSessions() {
    // Try to get sessions from localStorage first, then fall back to default data
    if (typeof LocalStorageUtils !== 'undefined') {
      const savedSessions = LocalStorageUtils.getItem('virtualCareSessions');
      if (savedSessions && savedSessions.length > 0) {
        this.sessions = savedSessions;
        return;
      }
    }
    
    // Default sessions with more realistic data
    this.sessions = [
      {
        id: 1,
        caregiver: 'Dr. Sarah Johnson',
        type: 'Video Consultation',
        status: 'scheduled',
        time: '10:00 AM',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(), // Tomorrow
        duration: '30 min',
        notes: 'Blood pressure check and medication review',
        connection: 'pending',
        roomId: 'vc_001'
      },
      {
        id: 2,
        caregiver: 'Dr. Michael Smith',
        type: 'Medical Consultation',
        status: 'completed',
        time: '02:00 PM',
        date: new Date().toLocaleDateString(), // Today
        duration: '45 min',
        notes: 'Health monitoring and medication adjustment',
        connection: 'completed',
        roomId: 'vc_002'
      },
      {
        id: 3,
        caregiver: 'Nurse Maria Garcia',
        type: 'Virtual Check-in',
        status: 'upcoming',
        time: '09:00 AM',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Day after tomorrow
        duration: '20 min',
        notes: 'Daily wellness check and vital signs review',
        connection: 'pending',
        roomId: 'vc_003'
      },
      {
        id: 4,
        caregiver: 'Dr. Robert Chen',
        type: 'Follow-up Consultation',
        status: 'scheduled',
        time: '11:30 AM',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        duration: '40 min',
        notes: 'Review of treatment progress and adjust care plan',
        connection: 'pending',
        roomId: 'vc_004'
      }
    ];
    
    // Save to localStorage for persistence
    if (typeof LocalStorageUtils !== 'undefined') {
      LocalStorageUtils.setItem('virtualCareSessions', this.sessions);
    }
  }

  saveSessions() {
    if (typeof LocalStorageUtils !== 'undefined') {
      LocalStorageUtils.setItem('virtualCareSessions', this.sessions);
    }
  }

  getFilteredSessions() {
    if (this.currentFilter === 'all') {
      return this.sessions;
    }
    return this.sessions.filter(session => session.status === this.currentFilter);
  }

  attachEventListeners() {
    const shadowRoot = this.shadowRoot;
    
    // Filter buttons
    const filterButtons = shadowRoot.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilterChange(e.target.dataset.filter);
      });
    });

    // Start session button
    const startSessionBtn = shadowRoot.querySelector('#startSessionBtn');
    if (startSessionBtn) {
      startSessionBtn.addEventListener('click', () => {
        this.startNewSession();
      });
    }

    // Quick action cards
    const quickActionCards = shadowRoot.querySelectorAll('.quick-action-card');
    quickActionCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.handleQuickAction(index);
      });
    });

    // Session action buttons
    shadowRoot.addEventListener('click', (e) => {
      if (e.target.closest('.action-btn')) {
        const sessionCard = e.target.closest('.session-card');
        const sessionId = parseInt(sessionCard.dataset.id);
        const action = e.target.closest('.action-btn').classList.contains('join-btn') ? 'join' :
                      e.target.closest('.action-btn').classList.contains('reschedule-btn') ? 'reschedule' :
                      e.target.closest('.action-btn').classList.contains('cancel-btn') ? 'cancel' : 'view';
        
        this.handleSessionAction(sessionId, action);
      }
    });
  }

  removeEventListeners() {
    // Event listeners will be automatically cleaned up when the component is removed
    // since we're using event delegation and the shadow DOM will be destroyed
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    
    // Update active filter button
    const filterButtons = this.shadowRoot.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Re-render with filtered sessions
    this.renderSessions();
  }

  handleQuickAction(index) {
    const actions = [
      () => this.emergencyCall(),
      () => this.scheduleSession(),
      () => this.quickCheckin(),
      () => this.healthReport()
    ];
    
    if (actions[index]) {
      actions[index]();
    }
  }

  handleSessionAction(sessionId, action) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return;

    switch (action) {
      case 'join':
        this.joinSession(session);
        break;
      case 'reschedule':
        this.rescheduleSession(session);
        break;
      case 'cancel':
        this.cancelSession(session);
        break;
      case 'view':
        this.viewSessionDetails(session);
        break;
    }
  }

  startNewSession() {
    // Create a new session
    const newSession = {
      id: Date.now(),
      caregiver: 'Available Caregiver',
      type: 'New Consultation',
      status: 'scheduled',
      time: 'TBD',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
      duration: '30 min',
      notes: 'New virtual care session',
      connection: 'pending',
      roomId: `vc_${Date.now()}`
    };
    
    this.sessions.unshift(newSession);
    this.saveSessions();
    this.renderSessions();
    
    // Show notification
    this.showNotification('New session scheduled successfully!', 'success');
  }

  emergencyCall() {
    this.showNotification('Connecting to emergency caregiver...', 'info');
    // Simulate emergency call
    setTimeout(() => {
      this.showNotification('Emergency call connected!', 'success');
    }, 2000);
  }

  scheduleSession() {
    this.showNotification('Opening session scheduler...', 'info');
    // Here you would typically open a modal or navigate to scheduling
  }

  quickCheckin() {
    this.showNotification('Sending quick check-in message...', 'info');
    // Simulate sending message
    setTimeout(() => {
      this.showNotification('Check-in message sent!', 'success');
    }, 1500);
  }

  healthReport() {
    this.showNotification('Generating health report...', 'info');
    // Simulate report generation
    setTimeout(() => {
      this.showNotification('Health report ready for sharing!', 'success');
    }, 2000);
  }

  joinSession(session) {
    this.showNotification(`Joining session with ${session.caregiver}...`, 'info');
    // Simulate joining session
    setTimeout(() => {
      this.showNotification(`Connected to ${session.caregiver}!`, 'success');
    }, 1500);
  }

  rescheduleSession(session) {
    this.showNotification(`Rescheduling session with ${session.caregiver}...`, 'info');
    // Here you would typically open a rescheduling modal
  }

  cancelSession(session) {
    if (confirm(`Are you sure you want to cancel your session with ${session.caregiver}?`)) {
      session.status = 'cancelled';
      this.saveSessions();
      this.renderSessions();
      this.showNotification('Session cancelled successfully!', 'success');
    }
  }

  viewSessionDetails(session) {
    this.showNotification(`Viewing details for session with ${session.caregiver}...`, 'info');
    // Here you would typically open a details modal
  }

  showNotification(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 300);
    }, 3000);
  }

  renderSessions() {
    const sessionsGrid = this.shadowRoot.querySelector('.sessions-grid');
    if (!sessionsGrid) return;

    const filteredSessions = this.getFilteredSessions();
    
    if (filteredSessions.length === 0) {
      sessionsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📹</div>
          <div class="empty-title">No Virtual Sessions</div>
          <div class="empty-description">Start by scheduling your first virtual care session</div>
          <button class="start-session-btn" onclick="this.parentElement.parentElement.parentElement.shadowRoot.querySelector('#startSessionBtn').click()">
            <i class="bi bi-camera-video"></i>
            Schedule Your First Session
          </button>
        </div>
      `;
      return;
    }

    sessionsGrid.innerHTML = filteredSessions.map(session => `
      <div class="session-card" data-id="${session.id}">
        <div class="session-header">
          <div class="session-info">
            <div class="session-type">${session.type}</div>
            <div class="session-caregiver">${session.caregiver}</div>
            <div class="session-time">${session.time} - ${session.date}</div>
          </div>
          <div class="session-status status-${session.status}">
            ${session.status}
          </div>
        </div>
        
        <div class="session-details">
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">${session.duration}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Notes:</span>
            <span class="detail-value">${session.notes}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Connection:</span>
            <span class="detail-value">${session.connection}</span>
          </div>
        </div>
        
        <div class="session-actions">
          ${session.status === 'scheduled' ? `
            <button class="action-btn join-btn">
              <i class="bi bi-camera-video"></i>
              Join
            </button>
            <button class="action-btn reschedule-btn">
              <i class="bi bi-calendar"></i>
              Reschedule
            </button>
          ` : session.status === 'upcoming' ? `
            <button class="action-btn view-btn">
              <i class="bi bi-eye"></i>
              View
            </button>
            <button class="action-btn cancel-btn">
              <i class="bi bi-x-circle"></i>
              Cancel
            </button>
          ` : session.status === 'cancelled' ? `
            <button class="action-btn view-btn">
              <i class="bi bi-eye"></i>
              View Details
            </button>
            <button class="action-btn join-btn">
              <i class="bi bi-calendar-plus"></i>
              Reschedule
            </button>
          ` : `
            <button class="action-btn view-btn">
              <i class="bi bi-eye"></i>
              View Details
            </button>
            <button class="action-btn join-btn">
              <i class="bi bi-camera-video"></i>
              Reconnect
            </button>
          `}
        </div>
      </div>
    `).join('');
  }
  
  render() {
    const sessions = this.getFilteredSessions();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .virtual-care-container {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .virtual-care-hero {
          background: linear-gradient(135deg, #6f42c1 0%, #8e44ad 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(111, 66, 193, 0.3);
        }

        .virtual-care-hero::before {
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

        .virtual-care-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .virtual-care-subtitle {
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

        .start-session-btn {
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

        .start-session-btn:hover {
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
          background: linear-gradient(135deg, #6f42c1, #8e44ad);
          color: white;
        }

        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .session-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .session-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #6f42c1, #8e44ad);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .session-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(111, 66, 193, 0.15);
          border-color: #6f42c1;
        }

        .session-card:hover::before {
          transform: scaleX(1);
        }

        .session-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .session-info {
          flex: 1;
        }

        .session-type {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }

        .session-caregiver {
          font-size: 1rem;
          color: #666;
          margin-bottom: 5px;
        }

        .session-time {
          font-size: 0.9rem;
          color: #6f42c1;
          font-weight: 600;
        }

        .session-status {
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-scheduled {
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          color: #856404;
        }

        .status-completed {
          background: linear-gradient(135deg, #d4edda, #c3e6cb);
          color: #155724;
        }

        .status-upcoming {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          color: #1976d2;
        }

        .status-cancelled {
          background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          color: #721c24;
        }

        .session-details {
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

        .session-actions {
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

        .join-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }

        .reschedule-btn {
          background: linear-gradient(135deg, #ffc107, #ff9800);
          color: white;
        }

        .reschedule-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
        }

        .cancel-btn {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
        }

        .cancel-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 53, 69, 0.3);
        }

        .view-btn {
          background: linear-gradient(135deg, #17a2b8, #138496);
          color: white;
        }

        .view-btn:hover {
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

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .quick-action-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .quick-action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .quick-action-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          display: block;
        }

        .quick-action-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
        }

        .quick-action-description {
          font-size: 0.9rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .virtual-care-container {
            padding: 20px;
          }
          
          .virtual-care-title {
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
          
          .sessions-grid {
            grid-template-columns: 1fr;
          }
          
          .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="virtual-care-container">
        <div class="virtual-care-hero">
          <div class="hero-content">
            <h1 class="virtual-care-title">📹 Virtual Care</h1>
            <p class="virtual-care-subtitle">Connect with your caregivers remotely for consultations and check-ins</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">${this.sessions.length}</span>
                <span class="stat-label">Total Sessions</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${this.sessions.filter(s => s.status === 'completed').length}</span>
                <span class="stat-label">Completed</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${this.sessions.filter(s => s.status === 'scheduled').length}</span>
                <span class="stat-label">Scheduled</span>
              </div>
            </div>
          </div>
        </div>

        <div class="quick-actions">
          <div class="quick-action-card">
            <span class="quick-action-icon">📞</span>
            <div class="quick-action-title">Emergency Call</div>
            <div class="quick-action-description">Connect immediately with your caregiver</div>
          </div>
          <div class="quick-action-card">
            <span class="quick-action-icon">📋</span>
            <div class="quick-action-title">Schedule Session</div>
            <div class="quick-action-description">Book a new virtual consultation</div>
          </div>
          <div class="quick-action-card">
            <span class="quick-action-icon">📱</span>
            <div class="quick-action-title">Quick Check-in</div>
            <div class="quick-action-description">Send a quick message to your caregiver</div>
          </div>
          <div class="quick-action-card">
            <span class="quick-action-icon">📊</span>
            <div class="quick-action-title">Health Report</div>
            <div class="quick-action-description">Share your health metrics</div>
          </div>
        </div>
        
        <div class="controls-section">
          <button class="start-session-btn" id="startSessionBtn">
            <i class="bi bi-camera-video"></i>
            Start New Session
          </button>
          <div class="filter-controls">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="scheduled">Scheduled</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
            <button class="filter-btn" data-filter="upcoming">Upcoming</button>
          </div>
        </div>
        
        <div class="sessions-grid">
          ${sessions.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📹</div>
              <div class="empty-title">No Virtual Sessions</div>
              <div class="empty-description">Start by scheduling your first virtual care session</div>
              <button class="start-session-btn" onclick="this.parentElement.parentElement.parentElement.shadowRoot.querySelector('#startSessionBtn').click()">
                <i class="bi bi-camera-video"></i>
                Schedule Your First Session
              </button>
            </div>
          ` : sessions.map(session => `
            <div class="session-card" data-id="${session.id}">
              <div class="session-header">
                <div class="session-info">
                  <div class="session-type">${session.type}</div>
                  <div class="session-caregiver">${session.caregiver}</div>
                  <div class="session-time">${session.time} - ${session.date}</div>
                </div>
                <div class="session-status status-${session.status}">
                  ${session.status}
                </div>
              </div>
              
              <div class="session-details">
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span class="detail-value">${session.duration}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Notes:</span>
                  <span class="detail-value">${session.notes}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Connection:</span>
                  <span class="detail-value">${session.connection}</span>
                </div>
              </div>
              
              <div class="session-actions">
                ${session.status === 'scheduled' ? `
                  <button class="action-btn join-btn">
                    <i class="bi bi-camera-video"></i>
                    Join
                  </button>
                  <button class="action-btn reschedule-btn">
                    <i class="bi bi-calendar"></i>
                    Reschedule
                  </button>
                ` : session.status === 'upcoming' ? `
                  <button class="action-btn view-btn">
                    <i class="bi bi-eye"></i>
                    View
                  </button>
                  <button class="action-btn cancel-btn">
                    <i class="bi bi-x-circle"></i>
                    Cancel
                  </button>
                ` : session.status === 'cancelled' ? `
                  <button class="action-btn view-btn">
                    <i class="bi bi-eye"></i>
                    View Details
                  </button>
                  <button class="action-btn join-btn">
                    <i class="bi bi-calendar-plus"></i>
                    Reschedule
                  </button>
                ` : `
                  <button class="action-btn view-btn">
                    <i class="bi bi-eye"></i>
                    View Details
                  </button>
                  <button class="action-btn join-btn">
                    <i class="bi bi-camera-video"></i>
                    Reconnect
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('virtual-care', VirtualCare); 