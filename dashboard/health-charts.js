class HealthCharts extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        section {
          padding: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .charts-header {
          margin-bottom: 2.5rem;
        }
        .charts-header h2 {
          color: #1976d2;
          margin-bottom: 0.8rem;
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 600;
        }
        .charts-header p {
          font-family: 'Poppins', sans-serif;
          color: #6c757d;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
        }
        .chart-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }
        .chart-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .chart-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Poppins', sans-serif;
        }
        .chart-icon {
          color: #1976d2;
          font-size: 1.6rem;
        }
        .chart-container {
          height: 200px;
          background: #f8f9fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
          border: 2px solid #e9ecef;
        }
        .chart-placeholder {
          text-align: center;
          color: #6c757d;
          font-family: 'Poppins', sans-serif;
        }
        .chart-placeholder i {
          font-size: 3.5rem;
          color: #dee2e6;
          margin-bottom: 0.8rem;
          display: block;
        }
        .chart-placeholder p {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0.4rem 0;
        }
        .chart-placeholder small {
          font-size: 0.9rem;
          color: #adb5bd;
        }
        .chart-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        .stat-item {
          text-align: center;
          padding: 0.8rem;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: all 0.3s;
        }
        .stat-item:hover {
          background: #e3eafc;
          transform: translateY(-2px);
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1976d2;
          font-family: 'Poppins', sans-serif;
          margin-bottom: 0.4rem;
        }
        .stat-label {
          font-size: 0.9rem;
          color: #6c757d;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        .trend-up { color: #28a745; }
        .trend-down { color: #dc3545; }
        .trend-stable { color: #ffc107; }
      </style>
      <section>
        <div class="charts-header">
          <h2>Health Charts</h2>
          <p>Monitoring your health indicators</p>
        </div>
        
        <div class="charts-grid">
          <!-- Blood Pressure -->
          <div class="chart-card">
            <div class="chart-title">
              <i class="bi bi-heart-pulse chart-icon"></i>
              Blood Pressure
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-bar-chart"></i>
                <p>Blood Pressure Chart</p>
                <small>Last 7 days</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <div class="stat-value">120/80</div>
                <div class="stat-label">Current</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-stable">Normal</div>
                <div class="stat-label">Status</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-down">↓2%</div>
                <div class="stat-label">Trend</div>
              </div>
            </div>
          </div>
          
          <!-- Glucose -->
          <div class="chart-card">
            <div class="chart-title">
              <i class="bi bi-droplet chart-icon"></i>
              Glucose Level
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <p>Glucose Chart</p>
                <small>Last 7 days</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <div class="stat-value">95</div>
                <div class="stat-label">mg/dL</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-stable">Normal</div>
                <div class="stat-label">Status</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-up">↑1%</div>
                <div class="stat-label">Trend</div>
              </div>
            </div>
          </div>
          
          <!-- Weight -->
          <div class="chart-card">
            <div class="chart-title">
              <i class="bi bi-speedometer2 chart-icon"></i>
              Body Weight
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-down"></i>
                <p>Weight Chart</p>
                <small>Last 30 days</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <div class="stat-value">68.5</div>
                <div class="stat-label">kg</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-down">Healthy</div>
                <div class="stat-label">Status</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-down">↓0.5kg</div>
                <div class="stat-label">Trend</div>
              </div>
            </div>
          </div>
          
          <!-- Physical Activity -->
          <div class="chart-card">
            <div class="chart-title">
              <i class="bi bi-activity chart-icon"></i>
              Physical Activity
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-pie-chart"></i>
                <p>Activity Chart</p>
                <small>This week</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <div class="stat-value">85%</div>
                <div class="stat-label">Meta</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-up">Excelente</div>
                <div class="stat-label">Estado</div>
              </div>
              <div class="stat-item">
                <div class="stat-value trend-up">↑5%</div>
                <div class="stat-label">Tendencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define('health-charts', HealthCharts); 