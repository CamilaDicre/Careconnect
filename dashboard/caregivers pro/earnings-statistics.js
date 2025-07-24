class EarningsStatistics extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getEarningsData() {
    return {
      currentMonth: {
        totalEarnings: 2840,
        hoursWorked: 156,
        patientsServed: 3,
        sessionsCompleted: 45
      },
      previousMonth: {
        totalEarnings: 2650,
        hoursWorked: 142,
        patientsServed: 3,
        sessionsCompleted: 42
      },
      weeklyData: [
        { week: 'Week 1', earnings: 720, hours: 40 },
        { week: 'Week 2', earnings: 680, hours: 38 },
        { week: 'Week 3', earnings: 740, hours: 42 },
        { week: 'Week 4', earnings: 700, hours: 36 }
      ],
      recentTransactions: [
        {
          id: 1,
          patient: 'Maria Gonzalez',
          service: 'Morning Care',
          amount: 85,
          date: '2024-12-25',
          status: 'completed'
        },
        {
          id: 2,
          patient: 'Robert Wilson',
          service: 'Afternoon Care',
          amount: 95,
          date: '2024-12-25',
          status: 'completed'
        },
        {
          id: 3,
          patient: 'Linda Martinez',
          service: 'Evening Care',
          amount: 75,
          date: '2024-12-24',
          status: 'completed'
        },
        {
          id: 4,
          patient: 'Maria Gonzalez',
          service: 'Virtual Consultation',
          amount: 60,
          date: '2024-12-24',
          status: 'pending'
        }
      ]
    };
  }
  
  render() {
    const data = this.getEarningsData();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .earnings-container {
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
        
        .export-btn {
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
        
        .export-btn:hover {
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
        
        .earnings-section {
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
        
        .earnings-overview {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .overview-card {
          background: linear-gradient(135deg, #1976d2, #1565c0);
          color: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
        }
        
        .overview-card.secondary {
          background: linear-gradient(135deg, #28a745, #20c997);
        }
        
        .overview-number {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .overview-label {
          font-size: 16px;
          opacity: 0.9;
        }
        
        .weekly-chart {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
        }
        
        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
        }
        
        .chart-bars {
          display: flex;
          align-items: end;
          gap: 15px;
          height: 120px;
        }
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #1976d2, #42a5f5);
          border-radius: 6px 6px 0 0;
          position: relative;
          min-height: 20px;
        }
        
        .chart-bar.secondary {
          background: linear-gradient(to top, #28a745, #66bb6a);
        }
        
        .bar-label {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }
        
        .bar-value {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: #333;
          font-weight: 600;
        }
        
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8f9fa;
          margin-bottom: 10px;
          transition: all 0.3s;
        }
        
        .transaction-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .transaction-icon {
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
        
        .transaction-content {
          flex: 1;
        }
        
        .transaction-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 2px;
        }
        
        .transaction-subtitle {
          font-size: 12px;
          color: #666;
        }
        
        .transaction-amount {
          font-size: 16px;
          font-weight: 700;
          color: #28a745;
        }
        
        .transaction-status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }
        
        .status-completed {
          background: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background: #fff3cd;
          color: #856404;
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
          
          .earnings-overview {
            grid-template-columns: 1fr;
          }
          
          .chart-bars {
            gap: 10px;
          }
          
          .transaction-item {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
      
      <div class="earnings-container">
        <div class="header">
          <h2>
            <i class="bi bi-graph-up"></i>
            Earnings & Statistics
          </h2>
          <button class="export-btn" id="export-report-btn">
            <i class="bi bi-download"></i>
            Export Report
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">$${data.currentMonth.totalEarnings}</div>
            <div class="stat-label">This Month's Earnings</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.currentMonth.hoursWorked}</div>
            <div class="stat-label">Hours Worked</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.currentMonth.patientsServed}</div>
            <div class="stat-label">Patients Served</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.currentMonth.sessionsCompleted}</div>
            <div class="stat-label">Sessions Completed</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Earnings Overview -->
          <div class="earnings-section">
            <h3 class="section-title">
              <i class="bi bi-cash-stack"></i>
              Earnings Overview
            </h3>
            
            <div class="earnings-overview">
              <div class="overview-card">
                <div class="overview-number">$${data.currentMonth.totalEarnings}</div>
                <div class="overview-label">Current Month</div>
              </div>
              <div class="overview-card secondary">
                <div class="overview-number">$${data.previousMonth.totalEarnings}</div>
                <div class="overview-label">Previous Month</div>
              </div>
            </div>
            
            <div class="weekly-chart">
              <div class="chart-title">Weekly Earnings</div>
              <div class="chart-bars">
                ${data.weeklyData.map(week => `
                  <div class="chart-bar" style="height: ${(week.earnings / 800) * 100}%">
                    <div class="bar-value">$${week.earnings}</div>
                    <div class="bar-label">${week.week}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="weekly-chart">
              <div class="chart-title">Weekly Hours</div>
              <div class="chart-bars">
                ${data.weeklyData.map(week => `
                  <div class="chart-bar secondary" style="height: ${(week.hours / 50) * 100}%">
                    <div class="bar-value">${week.hours}h</div>
                    <div class="bar-label">${week.week}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Recent Transactions -->
          <div class="tools-section">
            <h3 class="section-title">
              <i class="bi bi-clock-history"></i>
              Recent Transactions
            </h3>
            
            ${data.recentTransactions.map(transaction => `
              <div class="transaction-item">
                <div class="transaction-icon">
                  <i class="bi bi-cash"></i>
                </div>
                
                <div class="transaction-content">
                  <div class="transaction-title">${transaction.patient}</div>
                  <div class="transaction-subtitle">${transaction.service} • ${transaction.date}</div>
                </div>
                
                <div class="transaction-amount">$${transaction.amount}</div>
                
                <div class="transaction-status status-${transaction.status}">
                  ${transaction.status === 'completed' ? 'Paid' : 'Pending'}
                </div>
              </div>
            `).join('')}
            
            <button class="tool-item">
              <i class="bi bi-calendar-check"></i>
              View All Transactions
            </button>
            
            <button class="tool-item">
              <i class="bi bi-graph-up"></i>
              Performance Analytics
            </button>
            
            <button class="tool-item">
              <i class="bi bi-download"></i>
              Download Reports
            </button>
            
            <button class="tool-item">
              <i class="bi bi-gear"></i>
              Payment Settings
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
              <div class="action-title">Request Payment</div>
              <div class="action-desc">Request payment for services</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="action-title">View Analytics</div>
              <div class="action-desc">Detailed performance metrics</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-file-earmark-text"></i>
              </div>
              <div class="action-title">Tax Reports</div>
              <div class="action-desc">Generate tax documents</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure payment preferences</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('earnings-statistics', EarningsStatistics); 