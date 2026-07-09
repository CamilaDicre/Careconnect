/**
 * Shared in-page navigation for patient and caregiver dashboards.
 */
const DashboardNavigation = {
  navigate(section, type = 'patient') {
    const selector = type === 'caregiver' ? 'caregiver-sidebar' : 'care-sidebar';
    const sidebar = document.querySelector(selector);
    if (!sidebar || typeof sidebar.navigateToSection !== 'function') return false;
    return sidebar.navigateToSection(section);
  },

  navigatePatient(section) {
    return this.navigate(section, 'patient');
  },

  navigateCaregiver(section) {
    return this.navigate(section, 'caregiver');
  }
};

window.DashboardNavigation = DashboardNavigation;
