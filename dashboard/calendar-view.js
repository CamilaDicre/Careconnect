class CalendarView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentDate = new Date(2024, 0, 1); // Enero 2024
    this.selectedDate = new Date(2024, 0, 1); // Enero 2024
  }
  connectedCallback() {
    this.render();
    this.attachEvents();
  }
  getEvents() {
    return [
      {
        id: 1,
        title: 'Appointment with Dr. Martinez',
        date: '2024-01-15',
        time: '10:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 2,
        title: 'Take Vitamin D',
        date: '2024-01-15',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 3,
        title: 'Blood Pressure Check',
        date: '2024-01-16',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 4,
        title: 'Physical Therapy Session',
        date: '2024-01-18',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 5,
        title: 'Take Metformin',
        date: '2024-01-15',
        time: '12:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 6,
        title: 'Cardiology Consultation',
        date: '2024-01-20',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 7,
        title: 'Take Omeprazole',
        date: '2024-01-20',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 8,
        title: 'Glucose Check',
        date: '2024-01-22',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 9,
        title: 'Rehabilitation Session',
        date: '2024-01-25',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 10,
        title: 'Take Amlodipine',
        date: '2024-01-25',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 11,
        title: 'Ophthalmology Consultation',
        date: '2024-01-28',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 12,
        title: 'Weight Check',
        date: '2024-01-30',
        time: '09:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 13,
        title: 'Take Vitamin C',
        date: '2024-01-30',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 14,
        title: 'Take Acetaminophen',
        date: '2024-01-16',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 15,
        title: 'Take Ibuprofen',
        date: '2024-01-16',
        time: '14:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 16,
        title: 'Take Aspirin',
        date: '2024-01-17',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 17,
        title: 'Take Paracetamol',
        date: '2024-01-17',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 18,
        title: 'Take Omeprazole',
        date: '2024-01-18',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 19,
        title: 'Take Vitamin B12',
        date: '2024-01-19',
        time: '09:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 20,
        title: 'Take Calcium',
        date: '2024-01-19',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 21,
        title: 'Take Acetaminophen',
        date: '2024-01-21',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 22,
        title: 'Take Ibuprofen',
        date: '2024-01-21',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 23,
        title: 'Take Aspirin',
        date: '2024-01-23',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 24,
        title: 'Take Paracetamol',
        date: '2024-01-23',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 25,
        title: 'Take Omeprazole',
        date: '2024-01-24',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 26,
        title: 'Take Vitamin D',
        date: '2024-01-24',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 27,
        title: 'Take Acetaminophen',
        date: '2024-01-26',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 28,
        title: 'Take Ibuprofen',
        date: '2024-01-26',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 29,
        title: 'Take Aspirin',
        date: '2024-01-27',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 30,
        title: 'Take Paracetamol',
        date: '2024-01-27',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 31,
        title: 'Take Omeprazole',
        date: '2024-01-29',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 32,
        title: 'Take Vitamin C',
        date: '2024-01-29',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 33,
        title: 'Take Acetaminophen',
        date: '2024-01-31',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 34,
        title: 'Take Ibuprofen',
        date: '2024-01-31',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 35,
        title: 'Take Aspirin',
        date: '2024-01-31',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 36,
        title: 'Take Paracetamol',
        date: '2024-01-15',
        time: '14:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 37,
        title: 'Take Omeprazole',
        date: '2024-01-16',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 38,
        title: 'Take Vitamin D',
        date: '2024-01-17',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 39,
        title: 'Take Calcium',
        date: '2024-01-18',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 40,
        title: 'Take Vitamin B12',
        date: '2024-01-19',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 41,
        title: 'Take Acetaminophen',
        date: '2024-01-20',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 42,
        title: 'Take Ibuprofen',
        date: '2024-01-21',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 43,
        title: 'Take Aspirin',
        date: '2024-01-22',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 44,
        title: 'Take Paracetamol',
        date: '2024-01-23',
        time: '14:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 45,
        title: 'Take Omeprazole',
        date: '2024-01-24',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 46,
        title: 'Take Vitamin C',
        date: '2024-01-25',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 47,
        title: 'Take Calcium',
        date: '2024-01-26',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 48,
        title: 'Take Vitamin B12',
        date: '2024-01-27',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 49,
        title: 'Take Acetaminophen',
        date: '2024-01-28',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 50,
        title: 'Take Ibuprofen',
        date: '2024-01-29',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 51,
        title: 'Take Aspirin',
        date: '2024-01-30',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 52,
        title: 'Take Paracetamol',
        date: '2024-01-31',
        time: '14:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 53,
        title: 'Cita con Dr. García',
        date: '2024-01-01',
        time: '09:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 54,
        title: 'Take Vitamin D',
        date: '2024-01-01',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 55,
        title: 'Control de presión',
        date: '2024-01-02',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 56,
        title: 'Take Aspirin',
        date: '2024-01-02',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 57,
        title: 'Sesión de fisioterapia',
        date: '2024-01-03',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 58,
        title: 'Take Ibuprofen',
        date: '2024-01-03',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 59,
        title: 'Consulta dermatología',
        date: '2024-01-04',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 60,
        title: 'Take Omeprazole',
        date: '2024-01-04',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 61,
        title: 'Control de glucosa',
        date: '2024-01-05',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 62,
        title: 'Take Acetaminophen',
        date: '2024-01-05',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 63,
        title: 'Sesión de rehabilitación',
        date: '2024-01-06',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 64,
        title: 'Take Vitamin C',
        date: '2024-01-06',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 65,
        title: 'Cita con Dr. López',
        date: '2024-01-07',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 66,
        title: 'Take Calcium',
        date: '2024-01-07',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 67,
        title: 'Cita con Dr. Rodríguez',
        date: '2024-01-08',
        time: '10:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 68,
        title: 'Take Vitamin D',
        date: '2024-01-08',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 69,
        title: 'Control de presión',
        date: '2024-01-10',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 70,
        title: 'Take Aspirin',
        date: '2024-01-10',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 71,
        title: 'Sesión de fisioterapia',
        date: '2024-01-12',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 72,
        title: 'Take Ibuprofen',
        date: '2024-01-12',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 73,
        title: 'Consulta cardiología',
        date: '2024-01-15',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 74,
        title: 'Take Omeprazole',
        date: '2024-01-15',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 75,
        title: 'Control de glucosa',
        date: '2024-01-18',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 76,
        title: 'Take Acetaminophen',
        date: '2024-01-18',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 77,
        title: 'Sesión de rehabilitación',
        date: '2024-01-20',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 78,
        title: 'Take Vitamin C',
        date: '2024-01-20',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 79,
        title: 'Cita con Dr. Martínez',
        date: '2024-01-22',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 80,
        title: 'Take Calcium',
        date: '2024-01-22',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      // Febrero 2024
      {
        id: 81,
        title: 'Cita con Dr. García',
        date: '2024-02-01',
        time: '09:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 82,
        title: 'Take Vitamin D',
        date: '2024-02-01',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 83,
        title: 'Control de presión',
        date: '2024-02-05',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 84,
        title: 'Take Aspirin',
        date: '2024-02-05',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 85,
        title: 'Sesión de fisioterapia',
        date: '2024-02-08',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 86,
        title: 'Take Ibuprofen',
        date: '2024-02-08',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 87,
        title: 'Consulta cardiología',
        date: '2024-02-12',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 88,
        title: 'Take Omeprazole',
        date: '2024-02-12',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 89,
        title: 'Control de glucosa',
        date: '2024-02-15',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 90,
        title: 'Take Acetaminophen',
        date: '2024-02-15',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 91,
        title: 'Sesión de rehabilitación',
        date: '2024-02-19',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 92,
        title: 'Take Vitamin C',
        date: '2024-02-19',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 93,
        title: 'Cita con Dr. López',
        date: '2024-02-22',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 94,
        title: 'Take Calcium',
        date: '2024-02-22',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 95,
        title: 'Control de peso',
        date: '2024-02-26',
        time: '09:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 96,
        title: 'Take Vitamin B12',
        date: '2024-02-26',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      // Marzo 2024
      {
        id: 97,
        title: 'Cita con Dr. Rodríguez',
        date: '2024-03-01',
        time: '10:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 98,
        title: 'Take Vitamin D',
        date: '2024-03-01',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 99,
        title: 'Control de presión',
        date: '2024-03-05',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 100,
        title: 'Take Aspirin',
        date: '2024-03-05',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 101,
        title: 'Sesión de fisioterapia',
        date: '2024-03-08',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 102,
        title: 'Take Ibuprofen',
        date: '2024-03-08',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 103,
        title: 'Consulta oftalmología',
        date: '2024-03-12',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 104,
        title: 'Take Omeprazole',
        date: '2024-03-12',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 105,
        title: 'Control de glucosa',
        date: '2024-03-15',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 106,
        title: 'Take Acetaminophen',
        date: '2024-03-15',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 107,
        title: 'Sesión de rehabilitación',
        date: '2024-03-19',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 108,
        title: 'Take Vitamin C',
        date: '2024-03-19',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 109,
        title: 'Cita con Dr. Martínez',
        date: '2024-03-22',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 110,
        title: 'Take Calcium',
        date: '2024-03-22',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 111,
        title: 'Control de peso',
        date: '2024-03-26',
        time: '09:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 112,
        title: 'Take Vitamin B12',
        date: '2024-03-26',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      // Abril 2024
      {
        id: 113,
        title: 'Cita con Dr. García',
        date: '2024-04-01',
        time: '09:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 114,
        title: 'Take Vitamin D',
        date: '2024-04-01',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 115,
        title: 'Control de presión',
        date: '2024-04-05',
        time: '07:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 116,
        title: 'Take Aspirin',
        date: '2024-04-05',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 117,
        title: 'Sesión de fisioterapia',
        date: '2024-04-08',
        time: '15:30',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 118,
        title: 'Take Ibuprofen',
        date: '2024-04-08',
        time: '10:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 119,
        title: 'Consulta cardiología',
        date: '2024-04-12',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 120,
        title: 'Take Omeprazole',
        date: '2024-04-12',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 121,
        title: 'Control de glucosa',
        date: '2024-04-15',
        time: '07:30',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 122,
        title: 'Take Acetaminophen',
        date: '2024-04-15',
        time: '16:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 123,
        title: 'Sesión de rehabilitación',
        date: '2024-04-19',
        time: '16:00',
        type: 'therapy',
        color: '#dc3545'
      },
      {
        id: 124,
        title: 'Take Vitamin C',
        date: '2024-04-19',
        time: '21:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 125,
        title: 'Cita con Dr. López',
        date: '2024-04-22',
        time: '11:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 126,
        title: 'Take Calcium',
        date: '2024-04-22',
        time: '20:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 127,
        title: 'Control de peso',
        date: '2024-04-26',
        time: '09:00',
        type: 'checkup',
        color: '#ffc107'
      },
      {
        id: 128,
        title: 'Take Vitamin B12',
        date: '2024-04-26',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      },
      {
        id: 129,
        title: 'Consulta dermatología',
        date: '2024-04-29',
        time: '14:00',
        type: 'appointment',
        color: '#1976d2'
      },
      {
        id: 130,
        title: 'Take Omeprazole',
        date: '2024-04-29',
        time: '08:00',
        type: 'medicine',
        color: '#28a745'
      }
    ];
  }
  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
  formatDate(date) {
    return date.toISOString().split('T')[0];
  }
  getEventsForDate(date) {
    const dateStr = this.formatDate(date);
    return this.getEvents().filter(event => event.date === dateStr);
  }
  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDay = this.getFirstDayOfMonth(year, month);
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        section {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .calendar-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .calendar-header h2 {
          color: #f5f5dc;
          margin-bottom: 0.6rem;
          font-family: 'Poppins', sans-serif;
          font-size: 2.2rem;
          font-weight: 600;
        }
        .calendar-header p {
          font-family: 'Poppins', sans-serif;
          color: #f5f5dc;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .calendar-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .month-navigator {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .nav-btn {
          background: transparent;
          color: #1976d2;
          border: 2px solid #1976d2;
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 50px;
          height: 50px;
          position: relative;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          z-index: 100;
        }
        .nav-btn:hover {
          background: #1976d2;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }
        .nav-btn::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border: 2px solid #1976d2;
          border-top: none;
          border-right: none;
          transition: all 0.3s;
          pointer-events: none;
        }
        .nav-btn:hover::before {
          border-color: white;
        }
        .nav-btn#prev-month::before {
          left: 20px;
          transform: rotate(45deg);
        }
        .nav-btn#next-month::before {
          right: 20px;
          transform: rotate(-135deg);
        }
        .nav-btn i {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .current-month {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f5f5dc;
          font-family: 'Poppins', sans-serif;
          min-width: 180px;
          text-align: center;
        }
        .add-event-btn {
          background: transparent;
          color: #28a745;
          border: 2px solid #28a745;
          padding: 0.8rem 1.8rem;
          border-radius: 12px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .add-event-btn:hover {
          background: #28a745;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        .add-event-btn::before {
          content: '+';
          font-size: 1.5rem;
          font-weight: bold;
          color: #28a745;
          transition: all 0.3s;
        }
        .add-event-btn:hover::before {
          color: white;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: #e9ecef;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          max-width: 800px;
          margin: 0 auto;
        }
        .calendar-day-header {
          background: #f8f9fa;
          padding: 0.8rem 0.5rem;
          text-align: center;
          font-weight: 600;
          color: #495057;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
        }
        .calendar-day {
          background: white;
          min-height: 80px;
          padding: 0.5rem;
          position: relative;
          transition: all 0.3s;
          cursor: pointer;
        }
        .calendar-day:hover {
          background: #f8f9fa;
        }
        .calendar-day.today {
          background: #e3f2fd;
          border: 2px solid #1976d2;
        }
        .calendar-day.selected {
          background: #e8f5e8;
          border: 2px solid #28a745;
        }
        .calendar-day.other-month {
          background: #f8f9fa;
          color: #adb5bd;
        }
        .day-number {
          font-weight: 600;
          font-size: 0.9rem;
          color: #212529;
          margin-bottom: 0.3rem;
        }
        .day-number.other-month {
          color: #adb5bd;
        }
        .event-indicator {
          position: absolute;
          bottom: 6px;
          right: 6px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1976d2;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);
          z-index: 10;
        }
        .event-indicator.appointment {
          background: #28a745;
          box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
        }
        .event-indicator.medicine {
          background: #1976d2;
          box-shadow: 0 2px 4px rgba(25, 118, 210, 0.3);
        }
        .event-indicator.checkup {
          background: #ffc107;
          box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
        }
        .event-indicator.therapy {
          background: #6f42c1;
          box-shadow: 0 2px 4px rgba(111, 66, 193, 0.3);
        }
        .events-panel {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          margin-top: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .events-panel h3 {
          color: #1976d2;
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .event-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 0.4rem;
          border-left: 3px solid;
          transition: all 0.3s;
        }
        .event-item:hover {
          transform: translateX(3px);
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .event-time {
          font-weight: 600;
          color: #495057;
          font-size: 0.75rem;
          min-width: 45px;
        }
        .event-title {
          font-weight: 600;
          color: #212529;
          flex: 1;
          font-size: 0.8rem;
        }
        .event-type {
          padding: 0.15rem 0.5rem;
          border-radius: 12px;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .medicine-icon {
          font-size: 0.8rem;
          color: #155724;
        }
        .type-appointment { background: #e3f2fd; color: #1976d2; }
        .type-medicine { background: #d4edda; color: #155724; }
        .type-checkup { background: #fff3cd; color: #856404; }
        .type-therapy { background: #f8d7da; color: #721c24; }
      </style>
      
      <section>
        <div class="calendar-header">
                      <h2>Medical Calendar</h2>
          <p>Manage your appointments, medications and medical events</p>
        </div>
        
        <div class="calendar-controls">
          <div class="month-navigator">
            <button class="nav-btn" id="prev-month"></button>
            <span class="current-month">${monthNames[month]} ${year}</span>
            <button class="nav-btn" id="next-month"></button>
          </div>
          <button class="add-event-btn">
            Agregar Evento
          </button>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-day-header">Dom</div>
          <div class="calendar-day-header">Lun</div>
          <div class="calendar-day-header">Mar</div>
          <div class="calendar-day-header">Mié</div>
          <div class="calendar-day-header">Jue</div>
          <div class="calendar-day-header">Vie</div>
          <div class="calendar-day-header">Sáb</div>
          
          ${this.generateCalendarDays(year, month, daysInMonth, firstDay)}
        </div>
        
        <div class="events-panel">
          <h3>Eventos del ${this.selectedDate.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h3>
          ${this.renderEventsForSelectedDate()}
        </div>
      </section>
    `;
  }
  generateCalendarDays(year, month, daysInMonth, firstDay) {
    let days = '';
    const today = new Date();
    const selectedDateStr = this.formatDate(this.selectedDate);
    
    // Días del mes anterior
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = this.getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      days += `<div class="calendar-day other-month" data-date="${this.formatDate(date)}">
        <div class="day-number other-month">${day}</div>
      </div>`;
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const isToday = this.formatDate(today) === dateStr;
      const isSelected = selectedDateStr === dateStr;
      const events = this.getEventsForDate(date);
      
      let dayClasses = 'calendar-day';
      if (isToday) dayClasses += ' today';
      if (isSelected) dayClasses += ' selected';
      
      let indicatorClass = '';
      if (events.length > 0) {
        const eventType = events[0].type; // Usar el primer evento para determinar el color
        indicatorClass = `event-indicator ${eventType}`;
      }
      
      days += `<div class="${dayClasses}" data-date="${dateStr}">
        <div class="day-number">${day}</div>
        ${events.length > 0 ? `<div class="${indicatorClass}"></div>` : ''}
      </div>`;
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(nextYear, nextMonth, day);
      days += `<div class="calendar-day other-month" data-date="${this.formatDate(date)}">
        <div class="day-number other-month">${day}</div>
      </div>`;
    }
    
    return days;
  }
  renderEventsForSelectedDate() {
    const events = this.getEventsForDate(this.selectedDate);
    
    if (events.length === 0) {
      return '<p style="color: #6c757d; text-align: center; padding: 1.5rem; font-size: 0.9rem;">No hay eventos programados para este día</p>';
    }
    
    return events.map(event => `
      <div class="event-item" style="border-left-color: ${event.color}">
        <div class="event-time">${event.time}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-type type-${event.type}">
          ${event.type === 'medicine' ? '<span class="medicine-icon">💊</span>' : ''}
          ${event.type}
        </div>
      </div>
    `).join('');
  }
  attachEvents() {
    // Navegación de meses
    const prevBtn = this.shadowRoot.querySelector('#prev-month');
    const nextBtn = this.shadowRoot.querySelector('#next-month');
    
    console.log('Botones encontrados:', { prevBtn: !!prevBtn, nextBtn: !!nextBtn });
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botón anterior clickeado');
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
        this.attachEvents();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Botón siguiente clickeado');
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
        this.attachEvents();
      });
    }
    
    // Selección de días
    const calendarDays = this.shadowRoot.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.dataset.date;
        if (dateStr) {
          this.selectedDate = new Date(dateStr);
          this.render();
          this.attachEvents();
        }
      });
    });
  }
}
customElements.define('calendar-view', CalendarView); 