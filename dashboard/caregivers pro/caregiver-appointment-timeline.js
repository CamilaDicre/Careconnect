// Caregiver Appointment Timeline Component
class CaregiverAppointmentTimeline extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.viewMode = 'today'; // 'today', 'week', 'list'
    this.caregiverId = null;
  }

  connectedCallback() {
    this.loadCaregiverId();
    this.render();
    this.setupEventListeners();
  }

  loadCaregiverId() {
    // Obtener ID del cuidador desde sesión o usuario actual
    const loggedInUser = window.CareConnectSession?.getLoggedInUser() || 'caregiver';
    // En una aplicación real, esto sería del perfil del usuario
    this.caregiverId = loggedInUser;
  }

  async render() {
    const appointments = this.getCaregiverAppointments();
    
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
          color: #ec4899;
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
          color: #ec4899;
          box-shadow: 0 2px 8px rgba(236, 72, 153, 0.15);
        }

        .view-btn:hover {
          color: #ec4899;
          transform: translateY(-2px);
        }

        .timeline-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-box {
          padding: 12px;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%);
          border-radius: 8px;
          border: 1px solid rgba(236, 72, 153, 0.2);
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ec4899;
          font-family: 'Poppins', sans-serif;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
          margin-top: 4px;
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
          border-left: 4px solid #ec4899;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(236, 72, 153, 0.02) 100%);
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
          box-shadow: 0 8px 20px rgba(236, 72, 153, 0.15);
        }

        .appointment-item.completed {
          border-left-color: #10b981;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%);
          opacity: 0.7;
        }

        .appointment-item.cancelled {
          border-left-color: #ef4444;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%);
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
          border: 2px solid rgba(236, 72, 153, 0.2);
        }

        .appointment-item.completed .appointment-time {
          border-color: #10b981;
          color: #10b981;
        }

        .appointment-time-hour {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ec4899;
        }

        .appointment-item.completed .appointment-time-hour {
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

        .appointment-patient {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          font-family: 'Poppins', sans-serif;
        }

        .appointment-service {
          font-size: 0.9rem;
          color: #ec4899;
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
          background: rgba(236, 72, 153, 0.15);
          color: #ec4899;
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .status-cancelled {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .patient-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f472b6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
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

        @media (max-width: 768px) {
          .timeline-container {
            padding: 16px;
          }

          .timeline-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .appointment-item {
            flex-direction: column;
          }

          .appointment-time {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }

          .timeline-stats {
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
          color: #f472b6;
        }

        :host-context(.dark-mode) .appointment-item {
          background: rgba(236, 72, 153, 0.08);
        }

        :host-context(.dark-mode) .appointment-time {
          background: #0f172a;
          border-color: rgba(236, 72, 153, 0.3);
        }

        :host-context(.dark-mode) .appointment-patient {
          color: #e2e8f0;
        }

        :host-context(.dark-mode) .stat-box {
          background: rgba(236, 72, 153, 0.1);
          border-color: rgba(236, 72, 153, 0.2);
        }
      </style>

      <div class="timeline-container">
        <div class="timeline-header">
          <h2 class="timeline-title">
            <i class="bi bi-people-fill"></i>
            Patient Appointments
          </h2>
          <div class="view-controls">
            <button class="view-btn active" data-view="today">Today</button>
            <button class="view-btn" data-view="week">Week</button>
            <button class="view-btn" data-view="list">All</button>
          </div>
        </div>

        <div class="timeline-stats">
          ${this.renderCaregiverStats()}
        </div>

        ${appointments.length > 0 ? this.renderAppointments(appointments) : `
          <div class="empty-state">
            <div class="empty-icon"><i class="bi bi-calendar-x"></i></div>
            <div class="empty-title">No Appointments Scheduled</div>
            <p>You don't have any patient appointments scheduled.</p>
          </div>
        `}
      </div>
    `;
  }

  getCaregiverAppointments() {
    // Obtener todas las citas y filtrar por caregiverId
    const userId = window.CareConnectSession?.getCurrentUserId() || this.caregiverId;
    let allAppointments = [];
    
    // Cargar de localStorage (todas las citas de todos los usuarios)
    for (let key in localStorage) {
      if (key.startsWith('careconnect_appointments_')) {
        try {
          const appointments = JSON.parse(localStorage.getItem(key)) || [];
          allAppointments = allAppointments.concat(appointments);
        } catch (e) {
          console.error('Error loading appointments:', e);
        }
      }
    }

    // Filtrar solo las citas del cuidador actual (por caregiverId)
    const caregiverAppointments = allAppointments.filter(apt => {
      // Mostrar citas donde el cuidador coincida con el cuidador actual
      return apt.caregiverId && apt.status === 'confirmed';
    });

    // Ordenar por fecha y hora
    return caregiverAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    }).slice(0, 10); // Mostrar máximo 10 próximas citas
  }

  renderCaregiverStats() {
    const appointments = this.getCaregiverAppointments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() === today.getTime();
    });

    const thisWeek = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const daysDiff = (aptDate - today) / (1000 * 60 * 60 * 24);
      return daysDiff >= 0 && daysDiff < 7;
    });

    return `
      <div class="stat-box">
        <div class="stat-number">${todayAppointments.length}</div>
        <div class="stat-label">Today</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${thisWeek.length}</div>
        <div class="stat-label">This Week</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${appointments.length}</div>
        <div class="stat-label">Total</div>
      </div>
    `;
  }

  renderAppointments(appointments) {
    return `
      <div class="timeline-list">
        ${appointments.map(apt => {
          const statusClass = apt.status === 'completed' ? 'completed' : 
                             apt.status === 'cancelled' ? 'cancelled' : 'upcoming';
          const statusLabel = apt.status.charAt(0).toUpperCase() + apt.status.slice(1);
          const initials = apt.patientName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'P';

          return `
            <div class="appointment-item ${statusClass}">
              <div class="appointment-time">
                <div class="appointment-time-hour">${apt.time.split(':')[0]}</div>
                <div class="appointment-time-ampm">${apt.time.includes('PM') ? 'PM' : 'AM'}</div>
              </div>
              <div style="display: flex; gap: 12px; flex: 1; align-items: center;">
                <div class="patient-avatar">${initials}</div>
                <div class="appointment-details">
                  <div class="appointment-patient">${apt.patientName || apt.caregiver}</div>
                  <div class="appointment-service">${apt.serviceType}</div>
                  <div class="appointment-meta">
                    <span class="meta-item">
                      <i class="bi bi-calendar-event"></i>
                      ${apt.date}
                    </span>
                    <span class="meta-item">
                      <i class="bi bi-clock"></i>
                      ${apt.duration} min
                    </span>
                    <span class="meta-item">
                      <i class="bi bi-person-check"></i>
                      ${apt.appointmentType}
                    </span>
                  </div>
                </div>
              </div>
              <div class="appointment-status status-${statusClass}">
                <i class="bi bi-${statusClass === 'completed' ? 'check-circle-fill' : statusClass === 'cancelled' ? 'x-circle-fill' : 'clock-history'}"></i>
                ${statusLabel}
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

customElements.define('caregiver-appointment-timeline', CaregiverAppointmentTimeline);
