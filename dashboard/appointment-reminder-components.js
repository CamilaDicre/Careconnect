// Notification Badge Component for Appointment Reminders
class NotificationBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.unreadCount = 0;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('appointmentReminder', () => {
      this.updateBadge();
    });

    // Actualizar cada minuto
    setInterval(() => this.updateBadge(), 60000);
  }

  updateBadge() {
    const reminders = window.appointmentReminderSystem?.getReminderNotifications() || [];
    this.unreadCount = reminders.filter(r => !r.read).length;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notification-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-icon {
          font-size: 1.3rem;
          color: #2563eb;
          transition: all 0.3s ease;
        }

        .notification-badge:hover .notification-icon {
          transform: scale(1.1);
          color: #1d4ed8;
        }

        .unread-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .notification-popup {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 1000;
          min-width: 300px;
          max-width: 400px;
          display: none;
          flex-direction: column;
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-popup.show {
          display: flex;
          animation: popupSlideIn 0.3s ease;
        }

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notification-header {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notification-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .notification-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: background 0.3s ease;
          background: white;
        }

        .notification-item:hover {
          background: #f8fafc;
        }

        .notification-item.unread {
          background: rgba(37, 99, 235, 0.05);
          border-left: 4px solid #2563eb;
        }

        .notification-text {
          font-size: 0.9rem;
          color: #0f172a;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .notification-meta {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          gap: 8px;
        }

        .empty-state {
          padding: 24px 16px;
          text-align: center;
          color: #94a3b8;
        }

        .empty-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }
      </style>

      <div class="notification-badge" onclick="this.togglePopup(event)">
        <i class="bi bi-bell notification-icon"></i>
        ${this.unreadCount > 0 ? `<div class="unread-badge">${Math.min(this.unreadCount, 9)}${this.unreadCount > 9 ? '+' : ''}</div>` : ''}
        
        <div class="notification-popup" id="popup">
          <div class="notification-header">
            <span>Appointment Reminders</span>
            ${this.unreadCount > 0 ? `<span style="font-size: 0.8rem; color: #2563eb; font-weight: 600;">${this.unreadCount} new</span>` : ''}
          </div>
          <ul class="notification-list">
            ${this.renderNotifications()}
          </ul>
        </div>
      </div>
    `;
  }

  renderNotifications() {
    const reminders = window.appointmentReminderSystem?.getReminderNotifications(5) || [];
    
    if (reminders.length === 0) {
      return `<div class="empty-state">
        <div class="empty-icon"><i class="bi bi-inbox"></i></div>
        <div style="font-size: 0.9rem; font-weight: 600;">No reminders yet</div>
      </div>`;
    }

    return reminders.map(reminder => `
      <li class="notification-item ${reminder.read ? '' : 'unread'}" onclick="window.appointmentReminderSystem.markReminderAsRead('${reminder.id}'); this.parentElement.parentElement.parentElement.updateBadge();">
        <div class="notification-text">${reminder.message}</div>
        <div class="notification-meta">
          <span>${reminder.serviceType}</span>
          <span>•</span>
          <span>${reminder.timeframe}</span>
        </div>
      </li>
    `).join('');
  }

  togglePopup(event) {
    event.stopPropagation();
    const popup = this.shadowRoot.getElementById('popup');
    popup.classList.toggle('show');
  }
}

customElements.define('notification-badge', NotificationBadge);

// Appointment Reminders Header Component
class AppointmentRemindersHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('appointmentReminder', () => {
      this.render();
    });
  }

  render() {
    const upcoming = window.appointmentReminderSystem?.getUpcomingAppointments(1) || [];
    const nextAppointment = upcoming[0];

    this.shadowRoot.innerHTML = `
      <style>
        .reminder-header {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .reminder-content {
          flex: 1;
        }

        .reminder-icon {
          font-size: 2rem;
          color: #2563eb;
        }

        .reminder-title {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .reminder-text {
          font-size: 1rem;
          color: #0f172a;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
        }

        .reminder-time {
          font-size: 0.85rem;
          color: #2563eb;
          font-weight: 600;
          padding: 6px 12px;
          background: white;
          border-radius: 8px;
          white-space: nowrap;
        }

        .empty-reminder {
          text-align: center;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .reminder-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .reminder-time {
            width: 100%;
            text-align: center;
          }
        }
      </style>

      ${nextAppointment ? `
        <div class="reminder-header">
          <div style="display: flex; gap: 12px; flex: 1; align-items: center;">
            <div class="reminder-icon"><i class="bi bi-exclamation-circle-fill"></i></div>
            <div class="reminder-content">
              <div class="reminder-title">Next Appointment</div>
              <div class="reminder-text">${nextAppointment.caregiver} - ${nextAppointment.serviceType}</div>
            </div>
          </div>
          <div class="reminder-time">
            <i class="bi bi-clock"></i> ${window.appointmentReminderSystem?.getTimeUntilAppointment(nextAppointment) || 'Soon'}
          </div>
        </div>
      ` : `
        <div class="reminder-header empty-reminder">
          <i class="bi bi-calendar-check" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
          <div>No upcoming appointments scheduled</div>
        </div>
      `}
    `;
  }
}

customElements.define('appointment-reminders-header', AppointmentRemindersHeader);
