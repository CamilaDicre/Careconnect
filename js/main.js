// Dashboard Popup logic
const profileToggle = document.getElementById('profileToggle');
const dashboardPopup = document.getElementById('dashboardPopup');
const dashboardOverlay = document.getElementById('dashboardOverlay');
const closeDashboardBtn = document.getElementById('closeDashboardBtn');

function openDashboardPopup() {
    dashboardPopup.classList.remove('d-none');
    dashboardOverlay.classList.remove('d-none');
}
function closeDashboardPopup() {
    dashboardPopup.classList.add('d-none');
    dashboardOverlay.classList.add('d-none');
}
if (profileToggle && dashboardPopup && dashboardOverlay) {
    profileToggle.addEventListener('click', openDashboardPopup);
    dashboardOverlay.addEventListener('click', closeDashboardPopup);
}
if (closeDashboardBtn) {
    closeDashboardBtn.addEventListener('click', closeDashboardPopup);
} 