/**
 * Utilidades para sincronizar el estado del sidebar entre páginas
 */

class SidebarUtils {
  static WIDTH = { expanded: 350, collapsed: 90 };
  static CONTENT_GAP = 24;

  static isMobile() {
    return window.innerWidth <= 768;
  }

  static isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  static isCaregiverDashboard() {
    return !!document.querySelector('caregiver-sidebar');
  }

  /**
   * Obtiene el estado actual del sidebar desde localStorage
   * @returns {boolean} - true si está colapsado, false si está expandido
   */
  static getSidebarState() {
    try {
      if (typeof UIPreferences !== 'undefined') {
        return UIPreferences.getSidebarCollapsed();
      }
      return false;
    } catch (error) {
      console.error('Error getting sidebar state:', error);
      return false;
    }
  }

  static setSidebarState(collapsed) {
    try {
      if (typeof UIPreferences !== 'undefined') {
        UIPreferences.setSidebarCollapsed(collapsed);
      }
    } catch (error) {
      console.error('Error saving sidebar state:', error);
    }
  }

  /**
   * Sincroniza sidebar, contenido principal y headers
   * @param {boolean|null} collapsed
   */
  static syncLayout(collapsed = null) {
    if (collapsed === null) {
      collapsed = this.getSidebarState();
    }

    this.applySidebarComponentState(collapsed);

    if (this.isCaregiverDashboard()) {
      this.syncCaregiverLayout(collapsed);
    } else {
      this.syncPatientLayout(collapsed);
    }

    this.applyHeaderState(collapsed);
  }

  static syncPatientLayout(collapsed) {
    const main = document.getElementById('dashboard-content');
    if (!main) return;

    main.style.marginLeft = '';

    if (this.isMobile()) {
      main.classList.remove('sidebar-collapsed');
      return;
    }

    main.classList.toggle('sidebar-collapsed', collapsed);
  }

  static syncCaregiverLayout(collapsed) {
    const mainContent = document.getElementById('mainContent');
    const contentArea = document.querySelector('.content-area');

    if (contentArea) {
      contentArea.style.marginLeft = '';
    }

    if (this.isMobile()) {
      mainContent?.classList.remove('sidebar-collapsed');
      return;
    }

    mainContent?.classList.toggle('sidebar-collapsed', collapsed);
  }

  /**
   * @deprecated Usar syncLayout()
   */
  static applySidebarState(collapsed) {
    this.syncPatientLayout(collapsed);
  }

  static applyHeaderState(collapsed) {
    const isMobile = this.isMobile();

    document.querySelectorAll('dashboard-header').forEach((header) => {
      if (typeof header.adjustHeader === 'function') {
        header.adjustHeader(isMobile ? false : collapsed);
      }
    });

    document.querySelectorAll('caregiver-header').forEach((header) => {
      if (typeof header.adjustHeader === 'function') {
        header.adjustHeader(isMobile ? false : collapsed);
      }
    });
  }

  static applySidebarComponentState(collapsed) {
    const patientSidebar = document.querySelector('care-sidebar');
    if (patientSidebar?.shadowRoot) {
      const nav = patientSidebar.shadowRoot.querySelector('nav');
      if (nav) {
        nav.classList.toggle('minimized', collapsed);
      }
      patientSidebar.isCollapsed = collapsed;
    }

    const caregiverSidebar = document.querySelector('caregiver-sidebar');
    if (caregiverSidebar?.shadowRoot) {
      const nav = caregiverSidebar.shadowRoot.querySelector('nav');
      if (nav) {
        nav.classList.toggle('minimized', collapsed);
      }
      caregiverSidebar.isCollapsed = collapsed;
    }
  }

  static initializeSidebarState() {
    this.syncLayout(this.getSidebarState());
  }

  static listenForSidebarChanges() {
    document.addEventListener('sidebarToggle', (event) => {
      const collapsed = event.detail.collapsed;
      this.setSidebarState(collapsed);
      this.syncLayout(collapsed);
    });

    window.addEventListener('resize', () => {
      this.syncLayout(this.getSidebarState());
    });
  }

  static setupSidebarSync() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeSidebarState();
      });
    } else {
      this.initializeSidebarState();
    }

    this.listenForSidebarChanges();
  }
}

SidebarUtils.setupSidebarSync();
window.SidebarUtils = SidebarUtils;
