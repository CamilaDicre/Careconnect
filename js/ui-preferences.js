/**
 * Preferencias de interfaz (tema, sidebar, cookies)
 * Estas NO son datos de base de datos — solo preferencias locales de UI.
 */
if (typeof UIPreferences === 'undefined') {
  class UIPreferences {
    static get(key, defaultValue = null) {
      try {
        const data = localStorage.getItem(key);
        if (data === null) return defaultValue;
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      } catch {
        return defaultValue;
      }
    }

    static set(key, value) {
      try {
        localStorage.setItem(
          key,
          typeof value === 'string' ? value : JSON.stringify(value)
        );
        return true;
      } catch {
        return false;
      }
    }

    static remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }

    static getSidebarCollapsed() {
      return this.get('sidebarCollapsed', false);
    }

    static setSidebarCollapsed(collapsed) {
      return this.set('sidebarCollapsed', collapsed);
    }

    static getTheme() {
      return this.get('careconnect-theme');
    }

    static setTheme(theme) {
      return this.set('careconnect-theme', theme);
    }
  }

  window.UIPreferences = UIPreferences;
}
