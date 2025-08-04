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
          box-sizing: border-box;
        }
        
        .charts-container {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .charts-hero {
          background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(23, 162, 184, 0.3);
        }

        .charts-hero::before {
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

        .charts-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .charts-subtitle {
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

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .chart-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .chart-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #17a2b8, #138496);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .chart-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(23, 162, 184, 0.15);
          border-color: #17a2b8;
        }

        .chart-card:hover::before {
          transform: scaleX(1);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .chart-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chart-icon {
          font-size: 1.8rem;
          color: #17a2b8;
        }

        .chart-period {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          color: #495057;
          padding: 8px 15px;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .chart-container {
          height: 250px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 2px solid #e9ecef;
          position: relative;
          overflow: hidden;
        }

        .chart-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(23, 162, 184, 0.05) 0%, rgba(23, 162, 184, 0.02) 50%, rgba(23, 162, 184, 0.05) 100%);
          pointer-events: none;
        }

        .chart-placeholder {
          text-align: center;
          color: #6c757d;
          position: relative;
          z-index: 2;
        }

        .chart-placeholder i {
          font-size: 4rem;
          color: #17a2b8;
          margin-bottom: 15px;
          display: block;
          opacity: 0.7;
        }

        .chart-placeholder h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 10px 0;
          color: #333;
        }

        .chart-placeholder p {
          font-size: 1rem;
          margin: 8px 0;
          color: #666;
        }

        .chart-placeholder small {
          font-size: 0.9rem;
          color: #adb5bd;
          display: block;
          margin-top: 10px;
        }

        .chart-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .stat-card {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e9ecef;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #17a2b8;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
        }

        .chart-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .action-btn {
          flex: 1;
          padding: 10px 15px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .view-btn {
          background: linear-gradient(135deg, #17a2b8, #138496);
          color: white;
        }

        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(23, 162, 184, 0.3);
        }

        .export-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }

        .share-btn {
          background: linear-gradient(135deg, #ffc107, #ff9800);
          color: white;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .quick-stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: all 0.3s ease;
        }

        .quick-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .quick-stat-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          display: block;
        }

        .quick-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #17a2b8;
          margin-bottom: 5px;
        }

        .quick-stat-label {
          font-size: 1rem;
          color: #666;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .charts-container {
            padding: 20px;
          }
          
          .charts-title {
            font-size: 2rem;
          }
          
          .stats-bar {
            flex-direction: column;
            gap: 15px;
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
          }
          
          .chart-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .quick-stats {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="charts-container">
        <div class="charts-hero">
          <div class="hero-content">
            <h1 class="charts-title">📊 Health Analytics</h1>
            <p class="charts-subtitle">Track your health metrics and visualize your progress</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">6</span>
                <span class="stat-label">Health Metrics</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">30</span>
                <span class="stat-label">Days Tracked</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">95%</span>
                <span class="stat-label">Data Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        <div class="quick-stats">
          <div class="quick-stat-card">
            <span class="quick-stat-icon">❤️</span>
            <div class="quick-stat-value">120/80</div>
            <div class="quick-stat-label">Blood Pressure</div>
          </div>
          <div class="quick-stat-card">
            <span class="quick-stat-icon">🩸</span>
            <div class="quick-stat-value">95</div>
            <div class="quick-stat-label">Heart Rate (bpm)</div>
          </div>
          <div class="quick-stat-card">
            <span class="quick-stat-icon">🌡️</span>
            <div class="quick-stat-value">98.6°F</div>
            <div class="quick-stat-label">Body Temperature</div>
          </div>
          <div class="quick-stat-card">
            <span class="quick-stat-icon">💪</span>
            <div class="quick-stat-value">72 kg</div>
            <div class="quick-stat-label">Weight</div>
          </div>
        </div>
        
        <div class="charts-grid">
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-heart-pulse chart-icon"></i>
                Blood Pressure
              </div>
              <div class="chart-period">Last 7 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Blood Pressure Chart</h3>
                <p>Track your systolic and diastolic pressure</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">120</div>
                <div class="stat-label">Systolic</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">80</div>
                <div class="stat-label">Diastolic</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Normal</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-activity chart-icon"></i>
                Heart Rate
              </div>
              <div class="chart-period">Last 7 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Heart Rate Chart</h3>
                <p>Monitor your heart rate throughout the day</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">95</div>
                <div class="stat-label">Current</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">72</div>
                <div class="stat-label">Resting</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Normal</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-speedometer2 chart-icon"></i>
                Blood Sugar
              </div>
              <div class="chart-period">Last 7 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Blood Sugar Chart</h3>
                <p>Track your glucose levels</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">95</div>
                <div class="stat-label">Fasting</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">140</div>
                <div class="stat-label">Post-meal</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Normal</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-thermometer-half chart-icon"></i>
                Temperature
              </div>
              <div class="chart-period">Last 7 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Temperature Chart</h3>
                <p>Monitor your body temperature</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">98.6°F</div>
                <div class="stat-label">Current</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Normal</div>
                <div class="stat-label">Range</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Stable</div>
                <div class="stat-label">Trend</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-weight chart-icon"></i>
                Weight
              </div>
              <div class="chart-period">Last 30 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Weight Chart</h3>
                <p>Track your weight changes over time</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">72 kg</div>
                <div class="stat-label">Current</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">-2 kg</div>
                <div class="stat-label">Change</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Healthy</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title">
                <i class="bi bi-activity chart-icon"></i>
                Sleep Quality
              </div>
              <div class="chart-period">Last 7 days</div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <i class="bi bi-graph-up"></i>
                <h3>Sleep Chart</h3>
                <p>Monitor your sleep patterns and quality</p>
                <small>Interactive chart coming soon</small>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-card">
                <div class="stat-value">7.5h</div>
                <div class="stat-label">Average</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">85%</div>
                <div class="stat-label">Quality</div>
              </div>
              <div class="stat-card">
                <div class="stat-value">Good</div>
                <div class="stat-label">Status</div>
              </div>
            </div>
            <div class="chart-actions">
              <button class="action-btn view-btn">
                <i class="bi bi-eye"></i>
                View Details
              </button>
              <button class="action-btn export-btn">
                <i class="bi bi-download"></i>
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('health-charts', HealthCharts); 