/**
 * @deprecated Los datos ahora se guardan en Supabase.
 * Este archivo solo mantiene compatibilidad con utilidades de validación.
 * Usa: ValidationUtils, CareConnectDB, CareConnectSession, UIPreferences
 */
if (typeof LocalStorageUtils === 'undefined') {
  class LocalStorageUtils {
    static sanitizeText(text) {
      return ValidationUtils.sanitizeText(text);
    }

    static isValidEmail(email) {
      return ValidationUtils.isValidEmail(email);
    }

    static normalizeDate(dateStr) {
      return ValidationUtils.normalizeDate(dateStr);
    }

    /** @deprecated Usa CareConnectDB */
    static isAvailable() {
      return CareConnectDB?.isReady?.() ?? false;
    }

    /** @deprecated Usa CareConnectDB / CareConnectSession / UIPreferences */
    static setItem(key, data) {
      const sessionKeys = ['loggedInUser', 'userRole', 'currentUserId'];
      const uiKeys = ['sidebarCollapsed', 'careconnect-theme', 'careconnect_cookie_choice', 'careconnect_cookie_show_toast'];

      if (sessionKeys.includes(key)) {
        return CareConnectSession.set(key, data);
      }
      if (uiKeys.includes(key) || key.startsWith('careconnect_')) {
        return UIPreferences.set(key, data);
      }
      console.warn(`LocalStorageUtils.setItem('${key}') deprecado — usa CareConnectDB`);
      return false;
    }

    /** @deprecated Usa CareConnectDB / CareConnectSession / UIPreferences */
    static getItem(key, defaultValue = null) {
      const sessionKeys = ['loggedInUser', 'userRole', 'currentUserId'];
      const uiKeys = ['sidebarCollapsed', 'careconnect-theme', 'careconnect_cookie_choice', 'careconnect_cookie_show_toast'];

      if (sessionKeys.includes(key)) {
        const val = CareConnectSession.get(key);
        return val !== null ? val : defaultValue;
      }
      if (uiKeys.includes(key) || key.startsWith('careconnect_')) {
        return UIPreferences.get(key, defaultValue);
      }
      console.warn(`LocalStorageUtils.getItem('${key}') deprecado — usa CareConnectDB`);
      return defaultValue;
    }

    /** @deprecated Usa CareConnectSession.clear() o UIPreferences.remove() */
    static removeItem(key) {
      const sessionKeys = ['loggedInUser', 'userRole', 'currentUserId'];
      if (sessionKeys.includes(key)) return CareConnectSession.remove(key);
      return UIPreferences.remove(key);
    }

    static clear() {
      CareConnectSession.clear();
      return true;
    }

    static getUsedSpace() {
      return 0;
    }
  }

  window.LocalStorageUtils = LocalStorageUtils;
}
