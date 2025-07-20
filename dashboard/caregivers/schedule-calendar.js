class ScheduleCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getSchedule() {
    return [
      {
        id: 1,
        patient: 'Maria Gonzalez',
        time: '08:00 AM',
        duration: '2 hours',
        type: 'Morning Care',
        status: 'completed',
        location: 'Home Visit',
        notes: 'Blood pressure check, medication administration'
      },
      {
        id: 2,
        patient: 'Robert Wilson',
        time: '02:00 PM',
        duration: '3 hours',
        type: 'Afternoon Care',
        status: 'completed',
        location: 'Home Visit',
        notes: 'Mobility assistance, medication management'
      },
      {
        id: 3,
        patient: 'Linda Martinez',
        time: '06:00 PM',
        duration: '2 hours',
        type: 'Evening Care',
        status: 'upcoming',
        location: 'Home Visit',
        notes: 'Evening medication, health monitoring'
      },
      {
        id: 4,
        patient: 'Dr. Smith Consultation',
        time: '10:00 AM',
        duration: '1 hour',
        type: 'Medical Consultation',
        status: 'upcoming',
        location: 'Medical Center',
        notes: 'Patient health review and care plan update'
      }
    ];
  }
  
  render() {
    const schedule = this.getSchedule();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .schedule-container {
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
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .calendar-section {
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
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .calendar-nav {
          display: flex;
          gap: 10px;
        }
        
        .nav-btn {
          background: #f8f9fa;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }
        
        .nav-btn:hover {
          background: #e3f2fd;
        }
        
        .current-date {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          margin-bottom: 20px;
        }
        
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .calendar-day.header {
          background: #f8f9fa;
          color: #666;
          font-weight: 600;
          cursor: default;
        }
        
        .calendar-day.today {
          background: #1976d2;
          color: white;
          font-weight: 600;
        }
        
        .calendar-day.has-event {
          background: #e3f2fd;
          color: #1976d2;
          font-weight: 600;
        }
        
        .calendar-day:hover:not(.header) {
          background: #e3f2fd;
          transform: scale(1.05);
        }
        
        .schedule-list {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .schedule-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 15px;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }
        
        .schedule-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .schedule-item.completed {
          border-left-color: #28a745;
          background: #d4edda;
        }
        
        .schedule-item.upcoming {
          border-left-color: #1976d2;
          background: #e3f2fd;
        }
        
        .schedule-time {
          text-align: center;
          min-width: 80px;
        }
        
        .time-main {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin-bottom: 2px;
        }
        
        .time-duration {
          font-size: 12px;
          color: #666;
        }
        
        .schedule-content {
          flex: 1;
        }
        
        .schedule-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .schedule-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        
        .schedule-notes {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        
        .schedule-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        
        .status-completed {
          background: #d4edda;
          color: #155724;
        }
        
        .status-upcoming {
          background: #fff3cd;
          color: #856404;
        }
        
        .quick-actions {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-top: 30px;
        }
        
        .action-btn {
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
        
        .action-btn:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .action-btn i {
          font-size: 20px;
          color: #1976d2;
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
          
          .calendar-grid {
            grid-template-columns: repeat(7, 1fr);
            font-size: 12px;
          }
        }
      </style>
      
      <div class="schedule-container">
        <div class="header">
          <h2>
            <i class="bi bi-calendar-event"></i>
            Schedule & Calendar
          </h2>
          <button class="add-btn" id="add-appointment-btn">
            <i class="bi bi-plus"></i>
            Add Appointment
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Today's Appointments</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Upcoming</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">8</div>
            <div class="stat-label">This Week</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Calendar Section -->
          <div class="calendar-section">
            <div class="calendar-header">
              <div class="calendar-nav">
                <button class="nav-btn">
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button class="nav-btn">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
              <div class="current-date">December 2024</div>
            </div>
            
            <div class="calendar-grid">
              <div class="calendar-day header">Sun</div>
              <div class="calendar-day header">Mon</div>
              <div class="calendar-day header">Tue</div>
              <div class="calendar-day header">Wed</div>
              <div class="calendar-day header">Thu</div>
              <div class="calendar-day header">Fri</div>
              <div class="calendar-day header">Sat</div>
              
              <div class="calendar-day">1</div>
              <div class="calendar-day">2</div>
              <div class="calendar-day">3</div>
              <div class="calendar-day">4</div>
              <div class="calendar-day">5</div>
              <div class="calendar-day">6</div>
              <div class="calendar-day">7</div>
              
              <div class="calendar-day">8</div>
              <div class="calendar-day">9</div>
              <div class="calendar-day">10</div>
              <div class="calendar-day">11</div>
              <div class="calendar-day">12</div>
              <div class="calendar-day">13</div>
              <div class="calendar-day">14</div>
              
              <div class="calendar-day">15</div>
              <div class="calendar-day">16</div>
              <div class="calendar-day">17</div>
              <div class="calendar-day">18</div>
              <div class="calendar-day">19</div>
              <div class="calendar-day">20</div>
              <div class="calendar-day">21</div>
              
              <div class="calendar-day">22</div>
              <div class="calendar-day">23</div>
              <div class="calendar-day">24</div>
              <div class="calendar-day today has-event">25</div>
              <div class="calendar-day has-event">26</div>
              <div class="calendar-day">27</div>
              <div class="calendar-day">28</div>
              
              <div class="calendar-day">29</div>
              <div class="calendar-day">30</div>
              <div class="calendar-day">31</div>
            </div>
          </div>
          
          <!-- Schedule List -->
          <div class="schedule-list">
            <h2 class="section-title">
              <i class="bi bi-clock"></i>
              Today's Schedule
            </h2>
            
            ${schedule.map(item => `
              <div class="schedule-item ${item.status}">
                <div class="schedule-time">
                  <div class="time-main">${item.time}</div>
                  <div class="time-duration">${item.duration}</div>
                </div>
                
                <div class="schedule-content">
                  <div class="schedule-title">${item.patient}</div>
                  <div class="schedule-subtitle">${item.type} • ${item.location}</div>
                  <div class="schedule-notes">${item.notes}</div>
                </div>
                
                <div class="schedule-status status-${item.status}">
                  ${item.status === 'completed' ? 'Completed' : 'Upcoming'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2 class="section-title">
            <i class="bi bi-lightning"></i>
            Quick Actions
          </h2>
          
          <button class="action-btn">
            <i class="bi bi-calendar-plus"></i>
            Schedule New Appointment
          </button>
          
          <button class="action-btn">
            <i class="bi bi-clock"></i>
            View Weekly Schedule
          </button>
          
          <button class="action-btn">
            <i class="bi bi-people"></i>
            Patient Availability
          </button>
          
          <button class="action-btn">
            <i class="bi bi-bell"></i>
            Set Reminders
          </button>
          
          <button class="action-btn">
            <i class="bi bi-download"></i>
            Export Schedule
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('schedule-calendar', ScheduleCalendar); 