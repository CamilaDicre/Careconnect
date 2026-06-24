/**
 * Gestión de sesión del usuario (sessionStorage, no localStorage)
 */
if (typeof CareConnectSession === 'undefined') {
  const SESSION_KEYS = ['loggedInUser', 'userRole', 'currentUserId'];

  class CareConnectSession {
    static get(key) {
      try {
        const value = sessionStorage.getItem(key);
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

    static set(key, value) {
      try {
        sessionStorage.setItem(
          key,
          typeof value === 'string' ? value : JSON.stringify(value)
        );
        return true;
      } catch (error) {
        console.error(`Error saving session (${key}):`, error);
        return false;
      }
    }

    static remove(key) {
      try {
        sessionStorage.removeItem(key);
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
      this.set('loggedInUser', user.username);
      this.set('userRole', user.role);
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
