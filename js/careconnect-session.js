/**
 * Gestión de sesión del usuario.
 * Usa sessionStorage y localStorage para mantener la sesión entre páginas.
 */
if (typeof CareConnectSession === 'undefined') {
  const SESSION_KEYS = ['loggedInUser', 'userRole', 'currentUserId'];
  const MEMORY_SESSION = {};

  class CareConnectSession {
    static _read(key) {
      try {
        const value = sessionStorage.getItem(key);
        if (value !== null) {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
      } catch {
        // fall through to memory store
      }

      if (Object.prototype.hasOwnProperty.call(MEMORY_SESSION, key)) {
        return MEMORY_SESSION[key];
      }

      return null;
    }

    static _write(key, value) {
      const stored = typeof value === 'string' ? value : JSON.stringify(value);
      try {
        sessionStorage.setItem(key, stored);
      } catch {
        // ignore storage errors
      }
      MEMORY_SESSION[key] = stored;
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
      } catch {
        // ignore storage errors
      }
      delete MEMORY_SESSION[key];
      return true;
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
