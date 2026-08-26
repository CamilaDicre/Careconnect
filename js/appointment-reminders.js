// Sistema de recordatorios y gestión de citas
class AppointmentReminderSystem {
  constructor() {
    this.appointments = [];
    this.reminders = [];
    this.notificationInterval = null;
    this.currentUser = null;
  }

  async initialize() {
    this.currentUser = CareConnectSession.getLoggedInUser() || 'Guest';
    await this.loadAppointments();
    this.startReminderSystem();
    this.setupNotificationPermission();
  }

  async loadAppointments() {
    try {
      const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
      const stored = localStorage.getItem(`careconnect_appointments_${userId}`);
      this.appointments = stored ? JSON.parse(stored) : [];
      
      // Cargar citas de Supabase si está disponible
      if (window.CareConnectDB && window.CareConnectDB.getAppointments) {
        const dbAppointments = await CareConnectDB.getAppointments(userId);
        if (dbAppointments && dbAppointments.length > 0) {
          this.appointments = [...this.appointments, ...dbAppointments];
        }
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  }

  startReminderSystem() {
    // Verificar recordatorios cada minuto
    this.notificationInterval = setInterval(() => {
      this.checkForUpcomingAppointments();
      this.checkForOverdueAppointments();
    }, 60000); // Cada minuto

    // Verificación inicial
    this.checkForUpcomingAppointments();
  }

  checkForUpcomingAppointments() {
    const now = new Date();
    
    this.appointments.forEach(appointment => {
      if (appointment.status !== 'confirmed') return;

      // Parsear fecha y hora
      const appointmentDateTime = this.parseAppointmentDateTime(appointment);
      if (!appointmentDateTime) return;

      // Calcular diferencia en minutos
      const diffMinutes = (appointmentDateTime - now) / (1000 * 60);

      // Recordatorio 1 hora antes
      if (diffMinutes > 59 && diffMinutes <= 61 && !appointment.reminder_1h_sent) {
        this.sendReminder(appointment, '1 hour');
        appointment.reminder_1h_sent = true;
        this.saveAppointments();
      }

      // Recordatorio 15 minutos antes
      if (diffMinutes > 14 && diffMinutes <= 16 && !appointment.reminder_15m_sent) {
        this.sendReminder(appointment, '15 minutes');
        appointment.reminder_15m_sent = true;
        this.saveAppointments();
      }

      // Recordatorio 5 minutos antes
      if (diffMinutes > 4 && diffMinutes <= 6 && !appointment.reminder_5m_sent) {
        this.sendReminder(appointment, '5 minutes');
        appointment.reminder_5m_sent = true;
        this.saveAppointments();
      }
    });
  }

  checkForOverdueAppointments() {
    const now = new Date();
    
    this.appointments.forEach(appointment => {
      if (appointment.status !== 'confirmed') return;

      const appointmentDateTime = this.parseAppointmentDateTime(appointment);
      if (!appointmentDateTime) return;

      // Si la cita pasó hace más de 15 minutos, marcarla como completada
      const diffMinutes = (now - appointmentDateTime) / (1000 * 60);
      if (diffMinutes > 15 && appointment.status === 'confirmed') {
        appointment.status = 'completed';
        this.saveAppointments();
      }
    });
  }

  sendReminder(appointment, timeframe) {
    // Notificación del navegador
    this.sendBrowserNotification(appointment, timeframe);
    
    // Agregar a recordatorios locales
    this.addReminderNotification(appointment, timeframe);
    
    // Emitir evento para actualizar UI
    window.dispatchEvent(new CustomEvent('appointmentReminder', {
      detail: { appointment, timeframe }
    }));
  }

  sendBrowserNotification(appointment, timeframe) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = `Upcoming Appointment in ${timeframe}`;
      const options = {
        body: `${appointment.caregiver} - ${appointment.serviceType}`,
        icon: '../assets/carefavicon.png',
        badge: '../assets/carefavicon.png',
        tag: `appointment_${appointment.id}`,
        requireInteraction: timeframe === '5 minutes'
      };

      new Notification(title, options);
    }
  }

  addReminderNotification(appointment, timeframe) {
    const reminder = {
      id: `${appointment.id}_${timeframe}`,
      appointmentId: appointment.id,
      message: `Appointment with ${appointment.caregiver} in ${timeframe}`,
      serviceType: appointment.serviceType,
      timeframe: timeframe,
      timestamp: new Date(),
      read: false
    };

    this.reminders.unshift(reminder);
    
    // Mantener solo los últimos 50 recordatorios
    if (this.reminders.length > 50) {
      this.reminders = this.reminders.slice(0, 50);
    }

    this.saveReminders();
  }

  setupNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      // Solicitar permiso de notificaciones de forma pasiva
      Notification.requestPermission().catch(() => {
        // Silenciar errores de rechazo
      });
    }
  }

  getUpcomingAppointments(limit = 5) {
    const now = new Date();
    return this.appointments
      .filter(a => a.status === 'confirmed')
      .filter(a => {
        const time = this.parseAppointmentDateTime(a);
        return time && time > now;
      })
      .sort((a, b) => {
        const timeA = this.parseAppointmentDateTime(a);
        const timeB = this.parseAppointmentDateTime(b);
        return timeA - timeB;
      })
      .slice(0, limit);
  }

  getTodayAppointments() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.appointments.filter(a => {
      const time = this.parseAppointmentDateTime(a);
      return time && time >= today && time < tomorrow;
    });
  }

  getThisWeekAppointments() {
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return this.appointments.filter(a => {
      const time = this.parseAppointmentDateTime(a);
      return time && time >= now && time <= weekEnd;
    });
  }

  parseAppointmentDateTime(appointment) {
    try {
      if (!appointment.date || !appointment.time) return null;

      // Parse date and time
      const dateStr = appointment.date; // "2026-08-27"
      const timeStr = appointment.time; // "10:00 AM" or "10:00"

      // Convert 12-hour format to 24-hour if needed
      let hours = parseInt(timeStr);
      const minutes = parseInt(timeStr.split(':')[1]);
      
      if (timeStr.includes('PM') && hours !== 12) {
        hours += 12;
      } else if (timeStr.includes('AM') && hours === 12) {
        hours = 0;
      }

      const dateTime = new Date(dateStr);
      dateTime.setHours(hours, minutes, 0, 0);

      return dateTime;
    } catch (error) {
      console.error('Error parsing appointment datetime:', error);
      return null;
    }
  }

  formatAppointmentTime(appointment) {
    const dateTime = this.parseAppointmentDateTime(appointment);
    if (!dateTime) return 'Invalid date';

    return dateTime.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  getTimeUntilAppointment(appointment) {
    const now = new Date();
    const appointmentTime = this.parseAppointmentDateTime(appointment);
    
    if (!appointmentTime) return null;

    const diffMs = appointmentTime - now;
    
    if (diffMs < 0) return 'Passed';

    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `In ${diffDays}d ${diffHours % 24}h`;
    } else if (diffHours > 0) {
      return `In ${diffHours}h ${diffMinutes % 60}m`;
    } else if (diffMinutes > 0) {
      return `In ${diffMinutes}m`;
    } else {
      return 'Starting now!';
    }
  }

  getReminderNotifications(limit = 10) {
    return this.reminders.slice(0, limit);
  }

  markReminderAsRead(reminderId) {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.read = true;
      this.saveReminders();
    }
  }

  saveAppointments() {
    try {
      const userId = CareConnectSession.getCurrentUserId() || this.currentUser;
      localStorage.setItem(
        `careconnect_appointments_${userId}`,
        JSON.stringify(this.appointments)
      );
    } catch (error) {
      console.error('Error saving appointments:', error);
    }
  }

  saveReminders() {
    try {
      localStorage.setItem(
        'careconnect_reminders',
        JSON.stringify(this.reminders)
      );
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  }

  cancelAppointment(appointmentId) {
    const appointment = this.appointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.status = 'cancelled';
      this.saveAppointments();
      return true;
    }
    return false;
  }

  rescheduleAppointment(appointmentId, newDate, newTime) {
    const appointment = this.appointments.find(a => a.id === appointmentId);
    if (appointment) {
      appointment.date = newDate;
      appointment.time = newTime;
      appointment.reminder_1h_sent = false;
      appointment.reminder_15m_sent = false;
      appointment.reminder_5m_sent = false;
      this.saveAppointments();
      return true;
    }
    return false;
  }

  getAppointmentStats() {
    const confirmed = this.appointments.filter(a => a.status === 'confirmed').length;
    const completed = this.appointments.filter(a => a.status === 'completed').length;
    const cancelled = this.appointments.filter(a => a.status === 'cancelled').length;
    const upcoming = this.getUpcomingAppointments(100).length;

    return {
      total: this.appointments.length,
      confirmed,
      completed,
      cancelled,
      upcoming
    };
  }

  destroy() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
}

// Inicializar globalmente
if (typeof window !== 'undefined') {
  window.AppointmentReminders = AppointmentReminderSystem;
  
  // Inicializar automáticamente cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.appointmentReminderSystem) {
        window.appointmentReminderSystem = new AppointmentReminderSystem();
        window.appointmentReminderSystem.initialize();
      }
    });
  } else {
    if (!window.appointmentReminderSystem) {
      window.appointmentReminderSystem = new AppointmentReminderSystem();
      window.appointmentReminderSystem.initialize();
    }
  }
}
