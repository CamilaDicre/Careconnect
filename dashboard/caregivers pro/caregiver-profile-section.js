class CaregiverProfileSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    let users = LocalStorageUtils.getItem('users', []);
    let user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
    let profilePic = user && user.photo ? user.photo : 'https://ui-avatars.com/api/?name=' + (user ? encodeURIComponent(user.username) : 'C') + '&background=1976d2&color=fff&size=128&rounded=true';
    let displayName = user ? (user.name || user.username) : 'Caregiver';
    let displayEmail = user ? (user.email || '-') : '-';
    let displayPhone = user ? (user.phone || '-') : '-';
    let displayTitles = user ? (user.titles || 'Not specified') : 'Not specified';

    this.innerHTML = `
      <style>
        .profile-section-container {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(25,118,210,0.10);
          padding: 48px 48px 36px 48px;
          margin-top: 32px;
          animation: fadeInUp 0.7s cubic-bezier(.4,2,.6,1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .profile-header {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 18px;
        }
        .profile-header-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .profile-svg {
          width: 54px;
          height: 54px;
          margin-bottom: 8px;
        }
        .profile-section-container h2 {
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-align: center;
        }
        .personal-info-section {
          text-align: center;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .personal-info-section h3 {
          color: #1976d2;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }
        #profileForm {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        .profile-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          width: 100%;
          justify-content: center;
        }
        .profile-photo {
          width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #1976d2; background: #f8f9fa; display: block; margin-bottom: 18px;
        }
        .profile-actions {
          display: flex;
          gap: 12px;
          margin: 12px 0 0 0;
          justify-content: center;
        }
        .profile-actions button {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(25,118,210,0.08);
          transition: background 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profile-actions button:hover {
          background: #1565c0;
        }
        .profile-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .profile-label {
          min-width: 36px;
          font-weight: 600;
          color: #1976d2;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .profile-value {
          font-size: 1.1rem;
          color: #333;
        }
        .profile-value input {
          font-size: 1.1rem;
          color: #333;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 4px 8px;
          width: 200px;
        }
        .save-btn {
          background: #28a745;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 2px 8px rgba(40,167,69,0.08);
          transition: background 0.2s, color 0.2s;
        }
        .save-btn:hover {
          background: #218838;
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
        @media (max-width: 900px) {
          .profile-section-container { padding: 18px 6px; }
          .profile-header { flex-direction: column; align-items: center; gap: 18px; }
          .profile-header-info { align-items: center; text-align: center; }
          .profile-section-container h2 { text-align: center; }
          .profile-photo { margin: 0 auto 18px auto; }
          .profile-value input { width: 100px; }
        }
      </style>
      <div class="profile-section-container">
        <div class="profile-header">
          <img class="profile-photo" src="${profilePic}" alt="Profile photo" />
          <div class="profile-header-info">
            <span class="profile-svg" aria-hidden="true">
              <!-- SVG usuario/doctor -->
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>
            </span>
            <h2>Caregiver Profile</h2>
            <div class="profile-actions">
              <button id="editProfileBtn" title="Edit profile"><svg width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg> Edit Profile</button>
              <button id="logoutBtn" title="Log out"><svg width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Log Out</button>
            </div>
          </div>
        </div>
        <div class="personal-info-section">
          <h3>Personal Information</h3>
        </div>
        <form id="profileForm">
          <div class="profile-row"><span class="profile-label"><svg width="18" height="18" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/></svg> Name:</span><span class="profile-value" id="nameValue">${displayName}</span></div>
          <div class="profile-row"><span class="profile-label"><svg width="18" height="18" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 2v4h8V2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg> Email:</span><span class="profile-value" id="emailValue">${displayEmail}</span></div>
          <div class="profile-row"><span class="profile-label"><svg width="18" height="18" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2.08"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M2 10h20"/></svg> Phone:</span><span class="profile-value" id="phoneValue">${displayPhone}</span></div>
          <div class="profile-row"><span class="profile-label"><svg width="18" height="18" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="8" height="8" rx="4"/><rect x="13" y="3" width="8" height="8" rx="4"/><line x1="8" y1="16" x2="16" y2="8"/></svg> Titles:</span><span class="profile-value" id="titlesValue">${displayTitles}</span></div>
          <div class="profile-row"><span class="profile-label"><svg width="18" height="18" fill="none" stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" text-anchor="middle" font-size="10" fill="#1976d2">U</text></svg> Username:</span><span class="profile-value">${loggedInUser}</span></div>
          <button type="submit" class="save-btn" id="saveProfileBtn" style="display:none;">Save</button>
        </form>
      </div>
    `;

    // Edit profile button
    this.querySelector('#editProfileBtn').addEventListener('click', () => {
      this.enableEdit();
    });
    // Logout button
    this.querySelector('#logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = '../../pages/login.html';
    });
    // Save changes
    this.querySelector('#profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProfile();
    });
  }

  enableEdit() {
    // Convierte los valores en inputs
    const name = this.querySelector('#nameValue');
    const email = this.querySelector('#emailValue');
    const phone = this.querySelector('#phoneValue');
    const titles = this.querySelector('#titlesValue');
    name.innerHTML = `<input type="text" value="${name.textContent}" required />`;
    email.innerHTML = `<input type="email" value="${email.textContent}" required />`;
    phone.innerHTML = `<input type="text" value="${phone.textContent}" required />`;
    titles.innerHTML = `<input type="text" value="${titles.textContent}" required />`;
    this.querySelector('#saveProfileBtn').style.display = 'block';
  }

  saveProfile() {
    let loggedInUser = LocalStorageUtils.getItem('loggedInUser');
    let users = LocalStorageUtils.getItem('users', []);
    let idx = users.findIndex(u => u.username === loggedInUser && u.role === 'cuidador');
    if (idx !== -1) {
      const name = this.querySelector('#nameValue input').value.trim();
      const email = this.querySelector('#emailValue input').value.trim();
      const phone = this.querySelector('#phoneValue input').value.trim();
      const titles = this.querySelector('#titlesValue input').value.trim();
      users[idx].name = name;
      users[idx].email = email;
      users[idx].phone = phone;
      users[idx].titles = titles;
      LocalStorageUtils.setItem('users', users);
    }
    this.render();
  }
}
customElements.define('caregiver-profile-section', CaregiverProfileSection); 