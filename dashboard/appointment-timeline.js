class AppointmentTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.viewMode = 'week'; // 'day', 'week', 'list'
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  async render() {
    const appointments = window.appointmentReminderSystem?.getThisWeekAppointments() || [];
    
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Josefin Sans', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif !important;
          font-weight: 700;
        }

        :host {
          display: block;
          width: 100%;
        }

        .timeline-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .timeline-container:hover {
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .timeline-title {
          font-size: 1.5rem;
          color: #0f172a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .timeline-title i {
          color: #2563eb;
          font-size: 1.8rem;
        }

        .view-controls {
          display: flex;
          gap: 8px;
          background: #f1f5f9;
          padding: 6px;
          border-radius: 10px;
        }

        .view-btn {
          padding: 8px 14px;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          border-radius: 8px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .view-btn.active {
          background: white;
          color: #2563eb;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
        }

        .view-btn:hover {
          color: #2563eb;
          transform: translateY(-2px);
        }

        .timeline-content {
          display: flex;
          gap: 20px;
        }

        .timeline-days {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .day-badge {
          padding: 12px 16px;
          border-radius: 10px;
          border: 2px solid rgba(37, 99, 235, 0.2);
          background: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-align: center;
        }

        .day-badge:hover {
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
          transform: translateY(-3px);
        }

        .day-badge.active {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-color: #2563eb;
          color: white;
        }

        .day-badge-day {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .day-badge.active .day-badge-day {
          color: rgba(255, 255, 255, 0.8);
        }

        .day-badge-date {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 4px;
        }

        .day-badge.active .day-badge-date {
          color: white;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .appointment-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          border-left: 4px solid #2563eb;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .appointment-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: translateX(-100%);
        }

        .appointment-item:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
        }

        .appointment-item.upcoming {
          border-left-color: #10b981;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%);
        }

        .appointment-item.completed {
          border-left-color: #8b5cf6;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%);
          opacity: 0.7;
        }

        .appointment-item.cancelled {
          border-left-color: #ef4444;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%);
          text-decoration: line-through;
          opacity: 0.6;
        }

        .appointment-time {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 2px solid rgba(37, 99, 235, 0.2);
        }

        .appointment-item.upcoming .appointment-time {
          border-color: #10b981;
          color: #10b981;
        }

        .appointment-time-hour {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2563eb;
        }

        .appointment-item.upcoming .appointment-time-hour {
          color: #10b981;
        }

        .appointment-time-ampm {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #94a3b8;
          margin-top: 2px;
        }

        .appointment-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }

        .appointment-caregiver {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          font-family: 'Poppins', sans-serif;
        }

        .appointment-service {
          font-size: 0.9rem;
          color: #2563eb;
          font-weight: 600;
        }

        .appointment-meta {
          display: flex;
          gap: 12px;
          font-size: 0.85rem;
          color: #64748b;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .appointment-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Poppins', sans-serif;
        }

        .status-upcoming {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .status-completed {
          background: rgba(139, 92, 246, 0.15);
          color: #8b5cf6;
        }

        .status-cancelled {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .appointment-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 12px;
          border: none;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: #2563eb;
          color: white;
          transform: scale(1.05);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 12px;
          opacity: 0.3;
        }

        .empty-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0f172a;
          font-family: 'Poppins', sans-serif;
        }

        .timeline-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-box {
          padding: 12px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%);
          border-radius: 8px;
          border: 1px solid rgba(37, 99, 235, 0.2);
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2563eb;
          font-family: 'Poppins', sans-serif;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .timeline-container {
            padding: 16px;
          }

          .timeline-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .timeline-content {
            flex-direction: column;
          }

          .appointment-item {
            flex-direction: column;
          }

          .appointment-time {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }

          .timeline-days {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          }
        }

        :host-context(.dark-mode) .timeline-container {
          background: #1e293b;
          color: #e2e8f0;
        }

        :host-context(.dark-mode) .timeline-title {
          color: #e2e8f0;
        }

        :host-context(.dark-mode) .view-controls {
          background: #0f172a;
        }

        :host-context(.dark-mode) .view-btn {
          color: #cbd5e1;
        }

        :host-context(.dark-mode) .view-btn.active {
          background: #0f172a;
          color: #60a5fa;
        }

        :host-context(.dark-mode) .day-badge {
          background: #0f172a;
          border-color: rgba(37, 99, 235, 0.3);
        }

        :host-context(.dark-mode) .day-badge-day {
          color: #cbd5e1;
        }

        :host-context(.dark-mode) .day-badge-date {
          color: #e2e8f0;
        }

        :host-context(.dark-mode) .appointment-item {
          background: rgba(37, 99, 235, 0.08);
        }

        :host-context(.dark-mode) .appointment-time {
          background: #0f172a;
          border-color: rgba(37, 99, 235, 0.3);
        }

        :host-context(.dark-mode) .appointment-caregiver {
          color: #e2e8f0;
        }

        :host-context(.dark-mode) .stat-box {
          background: rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.2);
        }
      </style>

      <div class="timeline-container">
        <div class="timeline-header">
          <h2 class="timeline-title">
            <i class="bi bi-calendar3-week"></i>
            Appointment Timeline
          </h2>
          <div class="view-controls">
            <button class="view-btn active" data-view="week">Week</button>
            <button class="view-btn" data-view="list">List</button>
          </div>
        </div>

        <div class="timeline-stats">
          ${this.renderStats()}
        </div>

        ${appointments.length > 0 ? this.renderAppointments(appointments) : `
          <div class="empty-state">
            <div class="empty-icon"><i class="bi bi-calendar-x"></i></div>
            <div class="empty-title">No Appointments Scheduled</div>
            <p>You don't have any appointments scheduled for this week.</p>
          </div>
        `}
      </div>
    `;
  }

  renderStats() {
    const stats = window.appointmentReminderSystem?.getAppointmentStats() || {};
    return `
      <div class="stat-box">
        <div class="stat-number">${stats.upcoming || 0}</div>
        <div class="stat-label">Upcoming</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${stats.confirmed || 0}</div>
        <div class="stat-label">Confirmed</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${stats.completed || 0}</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${stats.cancelled || 0}</div>
        <div class="stat-label">Cancelled</div>
      </div>
    `;
  }

  renderAppointments(appointments) {
    const reminderSystem = window.appointmentReminderSystem;
    
    return `
      <div class="timeline-list">
        ${appointments.map(apt => {
          const timeUntil = reminderSystem?.getTimeUntilAppointment(apt);
          const statusClass = apt.status === 'completed' ? 'completed' : 
                             apt.status === 'cancelled' ? 'cancelled' : 'upcoming';
          const statusLabel = apt.status.charAt(0).toUpperCase() + apt.status.slice(1);

          return `
            <div class="appointment-item ${statusClass}">
              <div class="appointment-time">
                <div class="appointment-time-hour">${apt.time.split(':')[0]}</div>
                <div class="appointment-time-ampm">${apt.time.includes('PM') ? 'PM' : 'AM'}</div>
              </div>
              <div class="appointment-details">
                <div class="appointment-caregiver">${apt.caregiver}</div>
                <div class="appointment-service">${apt.serviceType}</div>
                <div class="appointment-meta">
                  <span class="meta-item">
                    <i class="bi bi-calendar-event"></i>
                    ${apt.date}
                  </span>
                  <span class="meta-item">
                    <i class="bi bi-clock"></i>
                    ${timeUntil}
                  </span>
                  <span class="meta-item">
                    <i class="bi bi-clock-history"></i>
                    ${apt.duration} min
                  </span>
                </div>
              </div>
              <div class="appointment-status status-${statusClass}">
                <i class="bi bi-${statusClass === 'completed' ? 'check-circle-fill' : statusClass === 'cancelled' ? 'x-circle-fill' : 'clock-history'}"></i>
                ${statusLabel}
              </div>
              <div class="appointment-actions">
                ${apt.status === 'confirmed' ? `
                  <button class="action-btn" onclick="this.parentElement.parentElement.style.opacity='0.5'; window.appointmentReminderSystem.rescheduleAppointment(${apt.id}, '', ''); this.parentElement.parentElement.parentElement.render();">
                    <i class="bi bi-arrow-repeat"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  setupEventListeners() {
    const viewBtns = this.shadowRoot.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.viewMode = e.target.dataset.view;
        this.render();
      });
    });

    // Escuchar cambios en las citas
    window.addEventListener('appointmentReminder', () => {
      this.render();
    });
  }
}

customElements.define('appointment-timeline', AppointmentTimeline);
