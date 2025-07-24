class CaregiverProfileSection extends HTMLElement {
  connectedCallback() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === loggedInUser && u.role === 'cuidador');
    let profilePic = user && user.photo ? user.photo : 'https://ui-avatars.com/api/?name=' + (user ? encodeURIComponent(user.username) : 'C') + '&background=1976d2&color=fff&size=128&rounded=true';
    let displayName = user ? (user.name || user.username) : 'Cuidador';
    let displayEmail = user ? (user.email || '-') : '-';
    let displayPhone = user ? (user.phone || '-') : '-';
    let displayTitles = user ? (user.titles || 'No especificado') : 'No especificado';

    this.innerHTML = `
      <style>
        .profile-section-container {
          max-width: 480px;
          margin: 0 auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(25,118,210,0.10);
          padding: 36px 32px 28px 32px;
          margin-top: 32px;
          animation: fadeInUp 0.7s cubic-bezier(.4,2,.6,1);
        }
        .profile-section-container h2 {
          color: #1976d2;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 18px;
          text-align: center;
        }
        .profile-section-container .profile-photo {
          width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid #1976d2; background: #f8f9fa; display: block; margin: 0 auto 18px auto;
        }
        .profile-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }
        .profile-label {
          min-width: 90px;
          font-weight: 600;
          color: #1976d2;
        }
        .profile-value {
          font-size: 1.1rem;
          color: #333;
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      </style>
      <div class="profile-section-container">
        <h2>Perfil del cuidador</h2>
        <img class="profile-photo" src="${profilePic}" alt="Foto de perfil" />
        <div class="profile-row"><span class="profile-label">Nombre:</span><span class="profile-value">${displayName}</span></div>
        <div class="profile-row"><span class="profile-label">Email:</span><span class="profile-value">${displayEmail}</span></div>
        <div class="profile-row"><span class="profile-label">Teléfono:</span><span class="profile-value">${displayPhone}</span></div>
        <div class="profile-row"><span class="profile-label">Títulos:</span><span class="profile-value">${displayTitles}</span></div>
        <div class="profile-row"><span class="profile-label">Usuario:</span><span class="profile-value">${loggedInUser}</span></div>
      </div>
    `;
  }
}
customElements.define('caregiver-profile-section', CaregiverProfileSection); 