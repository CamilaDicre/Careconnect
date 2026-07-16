/**
 * Gestión de sesión del usuario.
 * Usa sessionStorage y localStorage para mantener la sesión entre páginas.
 */
if (typeof CareConnectSession === 'undefined') {
  const SESSION_KEYS = ['loggedInUser', 'userRole', 'currentUserId'];

  class CareConnectSession {
    static _read(key) {
      try {
        let value = sessionStorage.getItem(key);
        if (value === null) value = localStorage.getItem(key);
        if (value === null) return null;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      } catch {
        return null;
      }
    }

    static _write(key, value) {
      const stored =
        typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, stored);
      localStorage.setItem(key, stored);
    }

    static get(key) {
      return this._read(key);
    }

    static set(key, value) {
      try {
        this._write(key, value);
        return true;
      } catch (error) {
        console.error(`Error saving session (${key}):`, error);
        return false;
      }
    }

    static remove(key) {
      try {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }

    static clear() {
      SESSION_KEYS.forEach((key) => this.remove(key));
    }

    static isLoggedIn() {
      return !!this.get('loggedInUser');
    }

    static setUserSession(user) {
      if (!user) return false;
      const role =
        window.CareConnectDB?.normalizeRole?.(user.role) ?? user.role;
      this.set('loggedInUser', user.username);
      this.set('userRole', role);
      if (user.id) this.set('currentUserId', user.id);
      return true;
    }

    static getCurrentUserId() {
      return this.get('currentUserId');
    }

    static getLoggedInUser() {
      return this.get('loggedInUser');
    }

    static getUserRole() {
      return this.get('userRole');
    }
  }

  window.CareConnectSession = CareConnectSession;
}
