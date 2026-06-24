/**
 * Utilidades de validación y sanitización (sin almacenamiento)
 * Reemplaza las funciones de utilidad que antes estaban en localStorage-utils.js
 */
if (typeof ValidationUtils === 'undefined') {
  class ValidationUtils {
    static sanitizeText(text) {
      if (typeof text !== 'string') return '';
      return text
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/data:/gi, '')
        .replace(/vbscript:/gi, '')
        .trim();
    }

    static isValidEmail(email) {
      if (typeof email !== 'string') return false;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    static normalizeDate(dateStr) {
      if (typeof dateStr !== 'string') return '';

      const datePatterns = [
        /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/,
        /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/
      ];

      for (const pattern of datePatterns) {
        const match = dateStr.match(pattern);
        if (match) {
          let day, month, year;
          if (match[1].length === 4) {
            year = match[1];
            month = match[2].padStart(2, '0');
            day = match[3].padStart(2, '0');
          } else {
            day = match[1].padStart(2, '0');
            month = match[2].padStart(2, '0');
            year = match[3];
          }
          const date = new Date(`${year}-${month}-${day}`);
          if (
            date.getFullYear() == year &&
            date.getMonth() == month - 1 &&
            date.getDate() == day
          ) {
            return `${day}-${month}-${year}`;
          }
        }
      }
      return '';
    }
  }

  window.ValidationUtils = ValidationUtils;

  // Compatibilidad con código que aún usa LocalStorageUtils.sanitizeText
  if (typeof LocalStorageUtils === 'undefined') {
    window.LocalStorageUtils = {
      sanitizeText: ValidationUtils.sanitizeText.bind(ValidationUtils),
      isValidEmail: ValidationUtils.isValidEmail.bind(ValidationUtils),
      normalizeDate: ValidationUtils.normalizeDate.bind(ValidationUtils)
    };
  }
}
