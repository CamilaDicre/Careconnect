class CaregiverDocuments extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  getDocuments() {
    return [
      {
        id: 1,
        name: 'Certified Nursing Assistant License',
        type: 'License',
        status: 'verified',
        uploadDate: '2023-01-15',
        expiryDate: '2025-01-15',
        fileSize: '2.3 MB',
        notes: 'Active CNA license from Florida Board of Nursing'
      },
      {
        id: 2,
        name: 'First Aid & CPR Certification',
        type: 'Certification',
        status: 'verified',
        uploadDate: '2023-03-20',
        expiryDate: '2024-03-20',
        fileSize: '1.8 MB',
        notes: 'American Red Cross certification'
      },
      {
        id: 3,
        name: 'Background Check Report',
        type: 'Background Check',
        status: 'pending',
        uploadDate: '2023-12-01',
        expiryDate: '2024-12-01',
        fileSize: '3.1 MB',
        notes: 'FBI background check - under review'
      },
      {
        id: 4,
        name: 'Alzheimer\'s Care Certification',
        type: 'Certification',
        status: 'verified',
        uploadDate: '2023-06-10',
        expiryDate: '2026-06-10',
        fileSize: '1.5 MB',
        notes: 'Specialized dementia care training'
      },
      {
        id: 5,
        name: 'Medication Management Certificate',
        type: 'Certification',
        status: 'verified',
        uploadDate: '2023-08-05',
        expiryDate: '2025-08-05',
        fileSize: '2.0 MB',
        notes: 'State-approved medication administration training'
      }
    ];
  }
  
  render() {
    const documents = this.getDocuments();
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .documents-container {
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
        
        .upload-btn {
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
        
        .upload-btn:hover {
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
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
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
        
        .documents-section {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
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
        
        .document-item {
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
        
        .document-item:hover {
          background: #e3f2fd;
          transform: translateX(5px);
        }
        
        .document-item.verified {
          border-left-color: #28a745;
          background: #d4edda;
        }
        
        .document-item.pending {
          border-left-color: #ffc107;
          background: #fff3cd;
        }
        
        .document-item.expired {
          border-left-color: #dc3545;
          background: #f8d7da;
        }
        
        .document-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: #1976d2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        
        .document-content {
          flex: 1;
        }
        
        .document-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 5px;
        }
        
        .document-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        
        .document-details {
          display: flex;
          gap: 20px;
          margin-bottom: 8px;
        }
        
        .detail-item {
          font-size: 12px;
          color: #666;
        }
        
        .detail-label {
          font-weight: 600;
          color: #333;
        }
        
        .document-notes {
          font-size: 12px;
          color: #888;
          font-style: italic;
        }
        
        .document-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }
        
        .status-verified {
          background: #d4edda;
          color: #155724;
        }
        
        .status-pending {
          background: #fff3cd;
          color: #856404;
        }
        
        .status-expired {
          background: #f8d7da;
          color: #721c24;
        }
        
        .document-actions {
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
        
        .btn-view {
          background: #1976d2;
          color: white;
        }
        
        .btn-view:hover {
          background: #1565c0;
        }
        
        .btn-download {
          background: #28a745;
          color: white;
        }
        
        .btn-download:hover {
          background: #218838;
        }
        
        .btn-edit {
          background: #6c757d;
          color: white;
        }
        
        .btn-edit:hover {
          background: #5a6268;
        }
        
        .tools-section {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
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
        
        .upload-area {
          border: 2px dashed #1976d2;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          margin-bottom: 20px;
          background: #f8f9fa;
          transition: all 0.3s;
        }
        
        .upload-area:hover {
          background: #e3f2fd;
          border-color: #1565c0;
        }
        
        .upload-icon {
          font-size: 48px;
          color: #1976d2;
          margin-bottom: 15px;
        }
        
        .upload-text {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
        }
        
        .upload-subtext {
          font-size: 14px;
          color: #666;
        }
        
        .quick-actions {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          margin-top: 30px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
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
          
          .document-item {
            flex-direction: column;
            text-align: center;
          }
          
          .document-actions {
            justify-content: center;
            margin-top: 10px;
          }
          
          .document-details {
            flex-direction: column;
            gap: 5px;
          }
        }
      </style>
      
      <div class="documents-container">
        <div class="header">
          <h2>
            <i class="bi bi-file-earmark-text"></i>
            Documents & Certifications
          </h2>
          <button class="upload-btn" id="upload-document-btn">
            <i class="bi bi-cloud-upload"></i>
            Upload Document
          </button>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">Total Documents</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Verified</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">1</div>
            <div class="stat-label">Pending Review</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Expired</div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Documents List -->
          <div class="documents-section">
            <h3 class="section-title">
              <i class="bi bi-folder"></i>
              My Documents
            </h3>
            
            ${documents.map(doc => `
              <div class="document-item ${doc.status}">
                <div class="document-icon">
                  <i class="bi bi-file-earmark-text"></i>
                </div>
                
                <div class="document-content">
                  <div class="document-title">${doc.name}</div>
                  <div class="document-subtitle">${doc.type}</div>
                  <div class="document-details">
                    <div class="detail-item">
                      <span class="detail-label">Uploaded:</span> ${doc.uploadDate}
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Expires:</span> ${doc.expiryDate}
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Size:</span> ${doc.fileSize}
                    </div>
                  </div>
                  <div class="document-notes">${doc.notes}</div>
                </div>
                
                <div class="document-status status-${doc.status}">
                  ${doc.status === 'verified' ? 'Verified' : 
                    doc.status === 'pending' ? 'Pending' : 'Expired'}
                </div>
                
                <div class="document-actions">
                  <button class="action-btn btn-view">View</button>
                  <button class="action-btn btn-download">Download</button>
                  <button class="action-btn btn-edit">Edit</button>
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Upload & Tools -->
          <div class="tools-section">
            <h3 class="section-title">
              <i class="bi bi-tools"></i>
              Document Tools
            </h3>
            
            <div class="upload-area">
              <div class="upload-icon">
                <i class="bi bi-cloud-upload"></i>
              </div>
              <div class="upload-text">Upload New Document</div>
              <div class="upload-subtext">Drag & drop or click to browse</div>
            </div>
            
            <button class="tool-item">
              <i class="bi bi-calendar-check"></i>
              Document Expiry Tracker
            </button>
            
            <button class="tool-item">
              <i class="bi bi-shield-check"></i>
              Verification Status
            </button>
            
            <button class="tool-item">
              <i class="bi bi-download"></i>
              Download All Documents
            </button>
            
            <button class="tool-item">
              <i class="bi bi-printer"></i>
              Print Certificates
            </button>
            
            <button class="tool-item">
              <i class="bi bi-gear"></i>
              Document Settings
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
              <div class="action-title">Renew License</div>
              <div class="action-desc">Renew expiring documents</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <div class="action-title">Verify Documents</div>
              <div class="action-desc">Check verification status</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-graph-up"></i>
              </div>
              <div class="action-title">Document History</div>
              <div class="action-desc">View document timeline</div>
            </div>
            
            <div class="action-card">
              <div class="action-icon">
                <i class="bi bi-gear"></i>
              </div>
              <div class="action-title">Settings</div>
              <div class="action-desc">Configure document alerts</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('caregiver-documents', CaregiverDocuments); 