/**
 * Utilidades para sincronizar el estado del sidebar entre páginas
 */

class SidebarUtils {
  
  /**
   * Obtiene el estado actual del sidebar desde localStorage
   * @returns {boolean} - true si está colapsado, false si está expandido
   */
  static getSidebarState() {
    try {
      if (typeof LocalStorageUtils !== 'undefined') {
        return LocalStorageUtils.getItem('sidebarCollapsed', false);
      } else {
        const savedState = localStorage.getItem('sidebarCollapsed');
        return savedState ? JSON.parse(savedState) : false;
      }
    } catch (error) {
      console.error('Error getting sidebar state:', error);
      return false;
    }
  }

  /**
   * Guarda el estado del sidebar en localStorage
   * @param {boolean} collapsed - true si está colapsado, false si está expandido
   */
  static setSidebarState(collapsed) {
    try {
      if (typeof LocalStorageUtils !== 'undefined') {
        LocalStorageUtils.setItem('sidebarCollapsed', collapsed);
      } else {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
      }
    } catch (error) {
      console.error('Error saving sidebar state:', error);
    }
  }

  /**
   * Aplica el estado del sidebar al contenido principal
   * @param {boolean} collapsed - true si está colapsado, false si está expandido
   */
  static applySidebarState(collapsed) {
    const main = document.getElementById('dashboard-content');
    if (!main) return;

    if (collapsed) {
      main.classList.add('sidebar-collapsed');
      main.style.marginLeft = '90px';
    } else {
      main.classList.remove('sidebar-collapsed');
      main.style.marginLeft = '350px';
    }
  }

  /**
   * Aplica el estado del sidebar al header
   * @param {boolean} collapsed - true si está colapsado, false si está expandido
   */
  static applyHeaderState(collapsed) {
    const header = document.querySelector('dashboard-header');
    if (header && typeof header.adjustHeader === 'function') {
      header.adjustHeader(collapsed);
    }
  }

  /**
   * Aplica el estado del sidebar al componente sidebar
   * @param {boolean} collapsed - true si está colapsado, false si está expandido
   */
  static applySidebarComponentState(collapsed) {
    const sidebar = document.querySelector('care-sidebar');
    if (!sidebar || !sidebar.shadowRoot) return;

    const nav = sidebar.shadowRoot.querySelector('nav');
    if (!nav) return;

    if (collapsed) {
      nav.classList.add('minimized');
    } else {
      nav.classList.remove('minimized');
    }
  }

  /**
   * Inicializa el estado del sidebar en la página actual
   */
  static initializeSidebarState() {
    const collapsed = this.getSidebarState();
    
    // Aplicar estado al contenido principal
    this.applySidebarState(collapsed);
    
    // Aplicar estado al header
    this.applyHeaderState(collapsed);
    
    // Aplicar estado al componente sidebar
    this.applySidebarComponentState(collapsed);
    
    console.log('Sidebar state initialized:', collapsed ? 'collapsed' : 'expanded');
  }

  /**
   * Escucha cambios en el estado del sidebar y los sincroniza
   */
  static listenForSidebarChanges() {
    document.addEventListener('sidebarToggle', (event) => {
      const collapsed = event.detail.collapsed;
      
      // Guardar el nuevo estado
      this.setSidebarState(collapsed);
      
      // Aplicar el estado a todos los componentes
      this.applySidebarState(collapsed);
      this.applyHeaderState(collapsed);
      
      console.log('Sidebar state changed:', collapsed ? 'collapsed' : 'expanded');
    });
  }

  /**
   * Configura la sincronización completa del sidebar
   */
  static setupSidebarSync() {
    // Inicializar estado al cargar la página
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeSidebarState();
      });
    } else {
      this.initializeSidebarState();
    }
    
    // Escuchar cambios futuros
    this.listenForSidebarChanges();
    
    console.log('Sidebar synchronization setup complete');
  }
}

// Configurar sincronización automáticamente
SidebarUtils.setupSidebarSync();

// Exportar para uso global
window.SidebarUtils = SidebarUtils; 