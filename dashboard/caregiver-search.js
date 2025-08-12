class CaregiverSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.filterValue = '';
    this.sortBy = 'name';
    this.locationFilter = '';
    this.specialtyFilter = '';
  }

  connectedCallback() {
    this.render();
  }

  getCaregivers() {
    try {
      // Get real caregivers from the system
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Only users with caregiver role
      const caregivers = users.filter(u => u.role === 'caregiver' || u.role === 'cuidador').map(u => ({
        name: u.username || '-',
        specialty: u.skills || u.specialty || 'Cuidado general',
        rating: u.rating || 4.5,
        experience: u.experience || '5 años',
        location: u.address || u.location || 'Ubicación no especificada',
        photo: u.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.username || '-')}&background=1976d2&color=fff&size=128&rounded=true`,
        available: u.available !== false, // Default to true if not specified
        price: u.price || '$25/hora',
        description: u.description || 'Cuidador profesional con experiencia en atención domiciliaria.',
        email: u.email || '',
        id: u.id || u.username
      }));

      console.log(`Found ${caregivers.length} caregivers in the system`);
      return caregivers;
    } catch (error) {
      console.error('Error getting caregivers:', error);
      return [];
    }
  }

  render() {
    let caregivers = this.getCaregivers();
    
    // Apply filters
    if (this.filterValue) {
      caregivers = caregivers.filter(c =>
        c.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        c.specialty.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        c.description.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }

    if (this.locationFilter) {
      caregivers = caregivers.filter(c =>
        c.location.toLowerCase().includes(this.locationFilter.toLowerCase())
      );
    }

    if (this.specialtyFilter) {
      caregivers = caregivers.filter(c =>
        c.specialty.toLowerCase().includes(this.specialtyFilter.toLowerCase())
      );
    }

    // Apply sorting
    caregivers.sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price':
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        default:
          return a.name.localeCompare(b.name);
      }
    });

    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        section {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          background: #f8f9fa;
          min-height: 100vh;
        }

        .search-container {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .search-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .search-header h1 {
          color: #1976d2;
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-header p {
          color: #6c757d;
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }

        .search-filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-weight: 600;
          color: #495057;
          font-size: 0.9rem;
        }

        .filter-input, .filter-select {
          padding: 0.8rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          background: white;
        }

        .filter-input:focus, .filter-select:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
          transform: translateY(-1px);
        }

        .search-btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          align-self: end;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
        }

        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #e3f2fd;
          border-radius: 12px;
          border-left: 4px solid #1976d2;
        }

        .results-count {
          font-weight: 600;
          color: #1976d2;
        }

        .sort-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .sort-label {
          font-weight: 600;
          color: #495057;
          font-size: 0.9rem;
        }

        .caregivers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .caregiver-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .caregiver-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
        }

        .caregiver-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        .caregiver-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .caregiver-photo {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e3f2fd;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .caregiver-info h3 {
          margin: 0 0 0.3rem 0;
          color: #212529;
          font-size: 1.3rem;
          font-weight: 700;
        }

        .caregiver-specialty {
          color: #6c757d;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 0.3rem;
        }

        .caregiver-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #ffc107;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .caregiver-rating i {
          font-size: 1rem;
        }

        .caregiver-details {
          margin-bottom: 1.2rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          padding: 0.3rem 0;
          border-bottom: 1px solid #f8f9fa;
        }

        .detail-label {
          color: #6c757d;
          font-weight: 500;
        }

        .detail-value {
          font-weight: 600;
          color: #212529;
        }

        .availability-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 25px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .available {
          background: #d4edda;
          color: #155724;
        }

        .unavailable {
          background: #f8d7da;
          color: #721c24;
        }

        .contact-btn {
          width: 100%;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 0.8rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .contact-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
        }

        .contact-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
          font-size: 1.1rem;
        }

        .no-results i {
          font-size: 3rem;
          color: #dee2e6;
          margin-bottom: 1rem;
          display: block;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #1976d2;
        }

        .loading i {
          font-size: 2rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          section {
            padding: 1rem;
          }
          
          .search-filters {
            grid-template-columns: 1fr;
          }
          
          .caregivers-grid {
            grid-template-columns: 1fr;
          }
          
          .results-info {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      </style>

      <section>
        <div class="search-container">
          <div class="search-header">
            <h1>🔍 Find caregivers </h1>
            <p>Find professional caregivers registered on our platform</p>
          </div>
          
          <div class="search-filters">
            <div class="filter-group">
              <label class="filter-label">Search by name or specialty</label>
              <input type="text" class="filter-input" id="filterInput" placeholder="Ex: Maria, physiotherapy..." value="${this.filterValue}">
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Location</label>
              <input type="text" class="filter-input" id="locationFilter" placeholder="Ex: Madrid, Barcelona..." value="${this.locationFilter}">
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Specialty</label>
              <select class="filter-select" id="specialtyFilter">
                <option value="">All specialties</option>
                <option value="elderly care" ${this.specialtyFilter === 'elderly care' ? 'selected' : ''}>Elderly Care</option>
                <option value="physiotherapy" ${this.specialtyFilter === 'physiotherapy' ? 'selected' : ''}>Physiotherapy</option>
                <option value="nursing" ${this.specialtyFilter === 'nursing' ? 'selected' : ''}>Nursing</option>
                <option value="psychology" ${this.specialtyFilter === 'psychology' ? 'selected' : ''}>Psychology</option>
                <option value="nutrition" ${this.specialtyFilter === 'nutrition' ? 'selected' : ''}>Nutrition</option>
                <option value="occupational therapy" ${this.specialtyFilter === 'occupational therapy' ? 'selected' : ''}>Occupational Therapy</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">Sort by</label>
              <select class="filter-select" id="sortBy">
                <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Name</option>
                <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Rating</option>
                <option value="experience" ${this.sortBy === 'experience' ? 'selected' : ''}>Experience</option>
                <option value="price" ${this.sortBy === 'price' ? 'selected' : ''}>Price</option>
              </select>
            </div>
            
            <button class="search-btn" id="searchBtn">
              <i class="bi bi-search"></i> Search
            </button>
          </div>
        </div>

        <div class="results-info">
          <div class="results-count">
            <i class="bi bi-people-fill"></i>
            ${caregivers.length} caregiver${caregivers.length !== 1 ? 's' : ''} found
          </div>
          <div class="sort-controls">
            <span class="sort-label">Sorted by: ${this.getSortLabel()}</span>
          </div>
        </div>
        
        <div class="caregivers-grid">
          ${caregivers.length === 0 ? `
            <div class="no-results">
              <i class="bi bi-search"></i>
              <h3>No caregivers found</h3>
              <p>Try different search terms or filters.</p>
            </div>
          ` : caregivers.map(caregiver => `
            <div class="caregiver-card">
              <div class="caregiver-header">
                <img src="${caregiver.photo}" alt="${caregiver.name}" class="caregiver-photo">
                <div class="caregiver-info">
                  <h3>${caregiver.name}</h3>
                  <div class="caregiver-specialty">${caregiver.specialty}</div>
                  <div class="caregiver-rating">
                    <i class="bi bi-star-fill"></i>
                    <span>${caregiver.rating}</span>
                  </div>
                </div>
              </div>
              
              <div class="caregiver-details">
                <div class="detail-row">
                  <span class="detail-label">Experience:</span>
                  <span class="detail-value">${caregiver.experience}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Location:</span>
                  <span class="detail-value">${caregiver.location}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Price:</span>
                  <span class="detail-value">${caregiver.price}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="availability-badge ${caregiver.available ? 'available' : 'unavailable'}">
                    ${caregiver.available ? 'Available' : 'Not available'}
                  </span>
                </div>
              </div>
              
                             <button class="contact-btn" ${!caregiver.available ? 'disabled' : ''} onclick="contactCaregiver('${caregiver.id}', '${caregiver.name}')">
                 ${caregiver.available ? 'Contact' : 'Not available'}
               </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    
    this.attachEvents();
  }

  getSortLabel() {
    const labels = {
      'name': 'Name',
      'rating': 'Rating',
      'experience': 'Experience',
      'price': 'Price'
    };
    return labels[this.sortBy] || 'Name';
  }

  attachEvents() {
    const filterInput = this.shadowRoot.getElementById('filterInput');
    const locationFilter = this.shadowRoot.getElementById('locationFilter');
    const specialtyFilter = this.shadowRoot.getElementById('specialtyFilter');
    const sortBy = this.shadowRoot.getElementById('sortBy');
    const searchBtn = this.shadowRoot.getElementById('searchBtn');

    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        this.filterValue = e.target.value;
        this.render();
      });
    }

    if (locationFilter) {
      locationFilter.addEventListener('input', (e) => {
        this.locationFilter = e.target.value;
        this.render();
      });
    }

    if (specialtyFilter) {
      specialtyFilter.addEventListener('change', (e) => {
        this.specialtyFilter = e.target.value;
        this.render();
      });
    }

    if (sortBy) {
      sortBy.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.render();
      });
    }
  }
}

// Global function to contact caregivers
window.contactCaregiver = function(caregiverId, caregiverName) {
  alert(`Contacting ${caregiverName}...\n\nThis functionality will be implemented soon.\n\nFor now, you can use the caregiver's contact information to communicate directly.`);
};

customElements.define('caregiver-search', CaregiverSearch); 