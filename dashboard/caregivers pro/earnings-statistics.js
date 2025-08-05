class EarningsStatistics extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = this.getEarningsData();
    this.currentPeriod = 'month';
  }
  
  connectedCallback() {
    this.render();
    this.initializeCharts();
    this.addEventListeners();
  }
  
  getEarningsData() {
    return {
      currentMonth: {
        totalEarnings: 2840,
        hoursWorked: 156,
        patientsServed: 3,
        sessionsCompleted: 45,
        averagePerSession: 63.11,
        growthRate: 7.2
      },
      previousMonth: {
        totalEarnings: 2650,
        hoursWorked: 142,
        patientsServed: 3,
        sessionsCompleted: 42,
        averagePerSession: 63.10,
        growthRate: 5.8
      },
      weeklyData: [
        { week: 'Semana 1', earnings: 720, hours: 40, sessions: 12 },
        { week: 'Semana 2', earnings: 680, hours: 38, sessions: 11 },
        { week: 'Semana 3', earnings: 740, hours: 42, sessions: 13 },
        { week: 'Semana 4', earnings: 700, hours: 36, sessions: 9 }
      ],
      monthlyData: [
        { month: 'Ene', earnings: 2400, hours: 140, sessions: 38 },
        { month: 'Feb', earnings: 2200, hours: 130, sessions: 35 },
        { month: 'Mar', earnings: 2600, hours: 150, sessions: 40 },
        { month: 'Abr', earnings: 2800, hours: 160, sessions: 42 },
        { month: 'May', earnings: 2700, hours: 155, sessions: 41 },
        { month: 'Jun', earnings: 2900, hours: 165, sessions: 44 },
        { month: 'Jul', earnings: 3100, hours: 170, sessions: 46 },
        { month: 'Ago', earnings: 2950, hours: 168, sessions: 45 },
        { month: 'Sep', earnings: 3200, hours: 175, sessions: 48 },
        { month: 'Oct', earnings: 3400, hours: 180, sessions: 50 },
        { month: 'Nov', earnings: 3300, hours: 178, sessions: 49 },
        { month: 'Dic', earnings: 2840, hours: 156, sessions: 45 }
      ],
      recentTransactions: [
        {
          id: 1,
          patient: 'Maria Gonzalez',
          service: 'Cuidado Matutino',
          amount: 85,
          date: '2024-12-25',
          status: 'completed',
          duration: '2 horas',
          type: 'in-person'
        },
        {
          id: 2,
          patient: 'Robert Wilson',
          service: 'Cuidado Vespertino',
          amount: 95,
          date: '2024-12-25',
          status: 'completed',
          duration: '2.5 horas',
          type: 'in-person'
        },
        {
          id: 3,
          patient: 'Linda Martinez',
          service: 'Cuidado Nocturno',
          amount: 75,
          date: '2024-12-24',
          status: 'completed',
          duration: '1.5 horas',
          type: 'virtual'
        },
        {
          id: 4,
          patient: 'Maria Gonzalez',
          service: 'Consulta Virtual',
          amount: 60,
          date: '2024-12-24',
          status: 'pending',
          duration: '1 hora',
          type: 'virtual'
        },
        {
          id: 5,
          patient: 'Carlos Rodriguez',
          service: 'Cuidado Especializado',
          amount: 120,
          date: '2024-12-23',
          status: 'completed',
          duration: '3 horas',
          type: 'in-person'
        }
      ],
      earningsByService: [
        { service: 'Cuidado Matutino', earnings: 850, percentage: 30 },
        { service: 'Cuidado Vespertino', earnings: 680, percentage: 24 },
        { service: 'Cuidado Nocturno', earnings: 570, percentage: 20 },
        { service: 'Consulta Virtual', earnings: 480, percentage: 17 },
        { service: 'Cuidado Especializado', earnings: 260, percentage: 9 }
      ]
    };
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .earnings-container {
          padding: 0;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .header h2 {
          color: #1f2937;
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .header-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #10b981, #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }
        
        .period-selector {
          display: flex;
          gap: 8px;
          background: #f8fafc;
          border-radius: 12px;
          padding: 4px;
          border: 1px solid #e5e7eb;
        }
        
        .period-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #6b7280;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .period-btn.active {
          background: #10b981;
          color: white;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }
        
        /* Métricas principales */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .metric-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        
        .metric-icon.earnings { background: linear-gradient(135deg, #10b981, #34d399); }
        .metric-icon.hours { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
        .metric-icon.patients { background: linear-gradient(135deg, #8b5cf6, #a855f7); }
        .metric-icon.sessions { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        
        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .metric-label {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 12px;
        }
        
        .metric-change {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .metric-change.positive { color: #10b981; }
        .metric-change.negative { color: #ef4444; }
        
        /* Contenido principal */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Gráficos */
        .chart-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .chart-container {
          position: relative;
          height: 400px;
        }
        
        /* Distribución de servicios */
        .services-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .services-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .services-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .service-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
        }
        
        .service-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }
        
        .service-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: white;
          flex-shrink: 0;
        }
        
        .service-icon.morning { background: linear-gradient(135deg, #10b981, #34d399); }
        .service-icon.afternoon { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
        .service-icon.night { background: linear-gradient(135deg, #8b5cf6, #a855f7); }
        .service-icon.virtual { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        .service-icon.specialized { background: linear-gradient(135deg, #ef4444, #f87171); }
        
        .service-info {
          flex: 1;
        }
        
        .service-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .service-earnings {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .service-percentage {
          font-weight: 600;
          color: #10b981;
          font-size: 1rem;
        }
        
        /* Transacciones recientes */
        .transactions-section {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
        }
        
        .transactions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .transactions-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }
        
        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .transaction-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: #f8fafc;
          transition: all 0.3s ease;
          border-left: 4px solid #10b981;
        }
        
        .transaction-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }
        
        .transaction-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        
        .transaction-info {
          flex: 1;
        }
        
        .transaction-patient {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .transaction-details {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .transaction-service {
          font-weight: 500;
          color: #10b981;
        }
        
        .transaction-amount {
          font-weight: 700;
          color: #10b981;
          font-size: 1.1rem;
        }
        
        .transaction-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .transaction-status.completed {
          background: #dcfce7;
          color: #166534;
        }
        
        .transaction-status.pending {
          background: #fef3c7;
          color: #92400e;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .content-grid {
            gap: 24px;
          }
          
          .metric-value {
            font-size: 2rem;
          }
        }
      </style>

      <div class="earnings-container">
        <!-- Header -->
        <div class="header">
          <h2>
            <div class="header-icon">
              <i class="bi bi-graph-up"></i>
            </div>
            Estadísticas de Ganancias
          </h2>
          <div class="period-selector">
            <button class="period-btn ${this.currentPeriod === 'week' ? 'active' : ''}" data-period="week">Semana</button>
            <button class="period-btn ${this.currentPeriod === 'month' ? 'active' : ''}" data-period="month">Mes</button>
            <button class="period-btn ${this.currentPeriod === 'year' ? 'active' : ''}" data-period="year">Año</button>
          </div>
        </div>

        <!-- Métricas principales -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon earnings">
                <i class="bi bi-currency-dollar"></i>
              </div>
            </div>
            <div class="metric-value">$${this.data.currentMonth.totalEarnings.toLocaleString()}</div>
            <div class="metric-label">Ganancias Totales</div>
            <div class="metric-change positive">
              <i class="bi bi-arrow-up"></i>
              +${this.data.currentMonth.growthRate}% vs mes anterior
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon hours">
                <i class="bi bi-clock"></i>
              </div>
            </div>
            <div class="metric-value">${this.data.currentMonth.hoursWorked}h</div>
            <div class="metric-label">Horas Trabajadas</div>
            <div class="metric-change positive">
              <i class="bi bi-arrow-up"></i>
              +${this.data.currentMonth.hoursWorked - this.data.previousMonth.hoursWorked}h vs mes anterior
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon patients">
                <i class="bi bi-people"></i>
              </div>
            </div>
            <div class="metric-value">${this.data.currentMonth.patientsServed}</div>
            <div class="metric-label">Pacientes Atendidos</div>
            <div class="metric-change positive">
              <i class="bi bi-arrow-up"></i>
              +${this.data.currentMonth.patientsServed - this.data.previousMonth.patientsServed} vs mes anterior
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <div class="metric-icon sessions">
                <i class="bi bi-check-circle"></i>
              </div>
            </div>
            <div class="metric-value">${this.data.currentMonth.sessionsCompleted}</div>
            <div class="metric-label">Sesiones Completadas</div>
            <div class="metric-change positive">
              <i class="bi bi-arrow-up"></i>
              +${this.data.currentMonth.sessionsCompleted - this.data.previousMonth.sessionsCompleted} vs mes anterior
            </div>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="content-grid">
          <!-- Gráfico de ganancias -->
          <div class="chart-section">
            <div class="chart-header">
              <div class="chart-title">Evolución de Ganancias</div>
            </div>
            <div class="chart-container">
              <canvas id="earningsChart"></canvas>
            </div>
          </div>

          <!-- Distribución por servicios -->
          <div class="services-section">
            <div class="services-header">
              <div class="services-title">Distribución por Servicios</div>
            </div>
            <div class="services-list">
              ${this.data.earningsByService.map((service, index) => {
                const icons = ['morning', 'afternoon', 'night', 'virtual', 'specialized'];
                const iconClasses = ['bi-sunrise', 'bi-sun', 'bi-moon', 'bi-camera-video', 'bi-star'];
                return `
                  <div class="service-item">
                    <div class="service-icon ${icons[index]}">
                      <i class="bi ${iconClasses[index]}"></i>
                    </div>
                    <div class="service-info">
                      <div class="service-name">${service.service}</div>
                      <div class="service-earnings">$${service.earnings.toLocaleString()}</div>
                    </div>
                    <div class="service-percentage">${service.percentage}%</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Transacciones recientes -->
        <div class="transactions-section">
          <div class="transactions-header">
            <div class="transactions-title">Transacciones Recientes</div>
            <button style="background: none; border: none; color: #10b981; font-size: 0.875rem; cursor: pointer;">Ver todas</button>
          </div>
          <div class="transactions-list">
            ${this.data.recentTransactions.map(transaction => `
              <div class="transaction-item">
                <div class="transaction-avatar">
                  ${transaction.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="transaction-info">
                  <div class="transaction-patient">${transaction.patient}</div>
                  <div class="transaction-details">
                    <span class="transaction-service">${transaction.service}</span>
                    <span>•</span>
                    <span>${transaction.duration}</span>
                    <span>•</span>
                    <span>${transaction.date}</span>
                  </div>
                </div>
                <div class="transaction-amount">$${transaction.amount}</div>
                <div class="transaction-status ${transaction.status}">${transaction.status}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  initializeCharts() {
    const canvas = this.shadowRoot.getElementById('earningsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Configurar el tamaño del canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear gráfico con Chart.js
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.monthlyData.map(d => d.month),
        datasets: [
          {
            label: 'Ganancias ($)',
            data: this.data.monthlyData.map(d => d.earnings),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Horas Trabajadas',
            data: this.data.monthlyData.map(d => d.hours),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.datasetIndex === 0) {
                  label += '$' + context.parsed.y.toLocaleString();
                } else {
                  label += context.parsed.y + 'h';
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              },
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12
              },
              callback: function(value) {
                return value + 'h';
              }
            }
          }
        }
      }
    });
  }

  addEventListeners() {
    const periodButtons = this.shadowRoot.querySelectorAll('.period-btn');
    periodButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const period = btn.dataset.period;
        this.currentPeriod = period;
        
        // Actualizar botones activos
        periodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar gráfico según el período
        this.updateChart(period);
      });
    });
  }

  updateChart(period) {
    if (!this.chart) return;

    let labels, earningsData, hoursData;
    
    switch(period) {
      case 'week':
        labels = this.data.weeklyData.map(d => d.week);
        earningsData = this.data.weeklyData.map(d => d.earnings);
        hoursData = this.data.weeklyData.map(d => d.hours);
        break;
      case 'month':
        labels = this.data.monthlyData.slice(-6).map(d => d.month);
        earningsData = this.data.monthlyData.slice(-6).map(d => d.earnings);
        hoursData = this.data.monthlyData.slice(-6).map(d => d.hours);
        break;
      case 'year':
        labels = this.data.monthlyData.map(d => d.month);
        earningsData = this.data.monthlyData.map(d => d.earnings);
        hoursData = this.data.monthlyData.map(d => d.hours);
        break;
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = earningsData;
    this.chart.data.datasets[1].data = hoursData;
    this.chart.update('active');
  }
}

customElements.define('earnings-statistics', EarningsStatistics); 