class BookingApp {
  constructor() {
    this.caregivers = [];
    this.selectedCaregiver = null;
    this.selectedTime = null;
    this.selectedDate = null;
    this.availableTimeSlots = [
      '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
      '04:00 PM', '04:30 PM', '05:00 PM'
    ];
  }

  async initialize() {
    this.loadCaregivers();
    this.renderCaregivers();
    this.setupEventListeners();
    this.setMinDate();
    this.preloadCaregiver();
  }

  loadCaregivers() {
    this.caregivers = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Primary Care Physician',
        rating: 4.9,
        experience: '12 years',
        avatar: 'SJ'
      },
      {
        id: 2,
        name: 'Dr. Michael Smith',
        specialty: 'Medical Specialist',
        rating: 4.8,
        experience: '15 years',
        avatar: 'MS'
      },
      {
        id: 3,
        name: 'Nurse Maria Garcia',
        specialty: 'Registered Nurse',
        rating: 4.9,
        experience: '10 years',
        avatar: 'MG'
      },
      {
        id: 4,
        name: 'Dr. Robert Chen',
        specialty: 'Health Consultant',
        rating: 4.7,
        experience: '8 years',
        avatar: 'RC'
      },
      {
        id: 5,
        name: 'Linda Martinez',
        specialty: 'Care Coordinator',
        rating: 4.8,
        experience: '7 years',
        avatar: 'LM'
      }
    ];
  }

  renderCaregivers() {
    const container = document.getElementById('caregiversList');
    container.innerHTML = this.caregivers.map(caregiver => `
      <div class="caregiver-card ${this.selectedCaregiver?.id === caregiver.id ? 'selected' : ''}" 
           onclick="window.bookingApp.selectCaregiver(${caregiver.id})">
        <div class="caregiver-avatar">${caregiver.avatar}</div>
        <div class="caregiver-info">
          <h4>${caregiver.name}</h4>
          <p>${caregiver.specialty}</p>
          <p style="font-size: 0.75rem; color: #94a3b8;">
            <i class="bi bi-star-fill" style="color: #f59e0b;"></i> ${caregiver.rating} · ${caregiver.experience} exp.
          </p>
        </div>
      </div>
    `).join('');
  }

  selectCaregiver(id) {
    this.selectedCaregiver = this.caregivers.find(c => c.id === id);
    this.renderCaregivers();
    this.updateSummary();
  }

  preloadCaregiver() {
    const params = new URLSearchParams(window.location.search);
    const caregiverName = params.get('caregiver');
    
    if (caregiverName) {
      const caregiver = this.caregivers.find(c => 
        c.name.toLowerCase() === decodeURIComponent(caregiverName).toLowerCase()
      );
      if (caregiver) {
        this.selectCaregiver(caregiver.id);
      }
    }
  }

  setMinDate() {
    const dateInput = document.getElementById('appointmentDate');
    const today = new Date();
    today.setDate(today.getDate() + 1); // Mínimo mañana
    const minDate = today.toISOString().split('T')[0];
    dateInput.min = minDate;
    dateInput.value = minDate;
    
    this.selectedDate = new Date(minDate);
    this.renderTimeSlots();
  }

  setupEventListeners() {
    const dateInput = document.getElementById('appointmentDate');
    dateInput.addEventListener('change', (e) => {
      this.selectedDate = new Date(e.target.value);
      this.renderTimeSlots();
      this.updateSummary();
    });

    const serviceType = document.getElementById('serviceType');
    serviceType.addEventListener('change', () => this.updateSummary());

    const duration = document.getElementById('duration');
    duration.addEventListener('change', () => this.updateSummary());

    // Cargar datos preexistentes si existen
    const user = CareConnectSession.getLoggedInUser();
    if (user) {
      document.getElementById('patientName').value = user;
    }
  }

  renderTimeSlots() {
    const container = document.getElementById('timeSlots');
    container.innerHTML = this.availableTimeSlots.map((time, index) => `
      <div class="time-slot ${this.selectedTime === time ? 'selected' : ''}" 
           onclick="window.bookingApp.selectTime('${time}')"
           style="animation-delay: ${index * 30}ms;">
        ${time}
      </div>
    `).join('');
  }

  selectTime(time) {
    this.selectedTime = time;
    this.renderTimeSlots();
    this.updateSummary();
  }

  updateSummary() {
    const summaryCaregiver = document.getElementById('summaryCaregiver');
    const summaryService = document.getElementById('summaryService');
    const summaryDateTime = document.getElementById('summaryDateTime');
    const summaryDuration = document.getElementById('summaryDuration');

    summaryCaregiver.textContent = this.selectedCaregiver?.name || 'Not selected';

    const service = document.getElementById('serviceType').value;
    const serviceText = service ? document.querySelector(`#serviceType option[value="${service}"]`).textContent : 'Not selected';
    summaryService.textContent = serviceText;

    const dateStr = this.selectedDate ? this.selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '-';
    const timeStr = this.selectedTime || '-';
    summaryDateTime.textContent = `${dateStr} at ${timeStr}`;

    const duration = document.getElementById('duration').value;
    summaryDuration.textContent = duration ? `${duration} minutes` : '-';
  }

  async confirmBooking() {
    // Validar campos obligatorios
    const errors = [];

    if (!this.selectedCaregiver) {
      errors.push('Please select a caregiver');
    }

    if (!document.getElementById('serviceType').value) {
      errors.push('Please select a service type');
    }

    if (!this.selectedDate) {
      errors.push('Please select an appointment date');
    }

    if (!this.selectedTime) {
      errors.push('Please select an appointment time');
    }

    const patientName = document.getElementById('patientName').value.trim();
    if (!patientName) {
      errors.push('Please enter your name');
    }

    const patientEmail = document.getElementById('patientEmail').value.trim();
    if (!patientEmail || !this.isValidEmail(patientEmail)) {
      errors.push('Please enter a valid email');
    }

    const patientPhone = document.getElementById('patientPhone').value.trim();
    if (!patientPhone) {
      errors.push('Please enter your phone number');
    }

    if (errors.length > 0) {
      alert('Please fix the following issues:\n\n' + errors.join('\n'));
      return;
    }

    // Crear objeto de cita
    const appointment = {
      id: Date.now(),
      caregiver: this.selectedCaregiver.name,
      caregiverId: this.selectedCaregiver.id,
      serviceType: document.getElementById('serviceType').value,
      appointmentType: document.getElementById('appointmentType').value,
      date: this.selectedDate.toISOString().split('T')[0],
      time: this.selectedTime,
      duration: document.getElementById('duration').value,
      patientName: patientName,
      patientEmail: patientEmail,
      patientPhone: patientPhone,
      insurance: document.getElementById('insurance').value,
      notes: document.getElementById('notes').value,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage
    await this.saveAppointment(appointment);

    // Mostrar mensaje de éxito
    this.showSuccessMessage();

    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = 'careers.html';
    }, 3000);
  }

  async saveAppointment(appointment) {
    try {
      const userId = CareConnectSession.getCurrentUserId() || CareConnectSession.getLoggedInUser();
      let appointments = JSON.parse(localStorage.getItem(`careconnect_appointments_${userId}`)) || [];
      
      // Agregar campos de recordatorio
      appointment.reminder_1h_sent = false;
      appointment.reminder_15m_sent = false;
      appointment.reminder_5m_sent = false;
      
      appointments.push(appointment);
      localStorage.setItem(`careconnect_appointments_${userId}`, JSON.stringify(appointments));
      
      // Notificar al sistema de recordatorios
      if (window.appointmentReminderSystem) {
        window.appointmentReminderSystem.appointments = appointments;
      }

      // También guardar en el dashboard si existe
      if (window.CareConnectDB) {
        await CareConnectDB.saveAppointment(appointment);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  }

  showSuccessMessage() {
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');

    form.style.display = 'none';
    successMessage.style.display = 'block';
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
