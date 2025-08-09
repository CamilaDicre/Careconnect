/**
 * Utilidades para manejar localStorage de manera segura
 */

// Prevenir redeclaración
if (typeof LocalStorageUtils === 'undefined') {
class LocalStorageUtils {
  
  /**
   * Guarda datos en localStorage con validación y manejo de errores
   * @param {string} key - Clave del localStorage
   * @param {any} data - Datos a guardar
   * @param {number} maxSize - Tamaño máximo en bytes (por defecto 1MB)
   * @returns {boolean} - true si se guardó correctamente
   */
  static setItem(key, data, maxSize = 1000000) {
    try {
      // Validar parámetros
      if (!key || typeof key !== 'string') {
        throw new Error('Key must be a valid string');
      }
      
      // Convertir a string y verificar tamaño
      const dataString = JSON.stringify(data);
      if (dataString.length > maxSize) {
        throw new Error(`Data size (${dataString.length} bytes) exceeds maximum allowed size (${maxSize} bytes)`);
      }
      
      // Guardar en localStorage
      localStorage.setItem(key, dataString);
      return true;
      
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  }
  
  /**
   * Obtiene datos de localStorage con validación y manejo de errores
   * @param {string} key - Clave del localStorage
   * @param {any} defaultValue - Valor por defecto si no existe
   * @returns {any} - Datos recuperados o valor por defecto
   */
  static getItem(key, defaultValue = null) {
    try {
      // Validar parámetros
      if (!key || typeof key !== 'string') {
        return defaultValue;
      }
      
      // Obtener datos
      const data = localStorage.getItem(key);
      if (data === null) {
        return defaultValue;
      }
      
      // Parsear JSON
      return JSON.parse(data);
      
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }
  
  /**
   * Elimina un elemento de localStorage
   * @param {string} key - Clave del localStorage
   * @returns {boolean} - true si se eliminó correctamente
   */
  static removeItem(key) {
    try {
      if (!key || typeof key !== 'string') {
        return false;
      }
      
      localStorage.removeItem(key);
      return true;
      
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }
  
  /**
   * Verifica si localStorage está disponible
   * @returns {boolean} - true si localStorage está disponible
   */
  static isAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.error('localStorage is not available:', error);
      return false;
    }
  }
  
  /**
   * Obtiene el espacio usado en localStorage
   * @returns {number} - Tamaño en bytes
   */
  static getUsedSpace() {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating localStorage space:', error);
      return 0;
    }
  }
  
  /**
   * Limpia todos los datos de localStorage
   * @returns {boolean} - true si se limpió correctamente
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
  
  /**
   * Sanitiza texto para evitar XSS y problemas de seguridad
   * @param {string} text - Texto a sanitizar
   * @returns {string} - Texto sanitizado
   */
  static sanitizeText(text) {
    if (typeof text !== 'string') {
      return '';
    }
    
    return text
      .replace(/[<>]/g, '') // Remover < y >
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+=/gi, '') // Remover event handlers
      .replace(/data:/gi, '') // Remover data URLs
      .replace(/vbscript:/gi, '') // Remover vbscript
      .trim();
  }
  
  /**
   * Valida formato de email
   * @param {string} email - Email a validar
   * @returns {boolean} - true si el email es válido
   */
  static isValidEmail(email) {
    if (typeof email !== 'string') {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
  
  /**
   * Normaliza fecha a formato DD-MM-YYYY
   * @param {string} dateStr - Fecha en cualquier formato
   * @returns {string} - Fecha normalizada o string vacío si no es válida
   */
  static normalizeDate(dateStr) {
    if (typeof dateStr !== 'string') {
      return '';
    }
    
    // Patrón para detectar fechas en varios formatos
    const datePatterns = [
      /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/, // DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY
      /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/, // YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
    ];
    
    for (let pattern of datePatterns) {
      const match = dateStr.match(pattern);
      if (match) {
        let day, month, year;
        
        if (match[1].length === 4) {
          // Formato YYYY-MM-DD
          year = match[1];
          month = match[2].padStart(2, '0');
          day = match[3].padStart(2, '0');
        } else {
          // Formato DD-MM-YYYY
          day = match[1].padStart(2, '0');
          month = match[2].padStart(2, '0');
          year = match[3];
        }
        
        // Validar que la fecha sea real
        const date = new Date(`${year}-${month}-${day}`);
        if (date.getFullYear() == year && 
            date.getMonth() == month - 1 && 
            date.getDate() == day) {
          return `${day}-${month}-${year}`;
        }
      }
    }
    
    return '';
  }
}
  // Exportar para uso global
  window.LocalStorageUtils = LocalStorageUtils;
} // Cierre del if para prevenir redeclaración 