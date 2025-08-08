class CalendarView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentDate = new Date(2024, 0, 1); // January 2024
    this.selectedDate = new Date(2024, 0, 1); // January 2024
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
        title: 'Appointment with Dr. Garcia',
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
        title: 'Blood Pressure Check',
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
        title: 'Physical Therapy Session',
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
        title: 'Dermatology Consultation',
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
        title: 'Glucose Check',
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
        title: 'Rehabilitation Session',
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
        title: 'Appointment with Dr. Lopez',
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
        title: 'Appointment with Dr. Rodriguez',
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
        title: 'Blood Pressure Check',
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
        title: 'Physical Therapy Session',
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
        title: 'Cardiology Consultation',
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
        title: 'Glucose Check',
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
        title: 'Rehabilitation Session',
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
        title: 'Appointment with Dr. Martinez',
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
      // February 2024
      {
        id: 81,
        title: 'Appointment with Dr. Garcia',
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
        title: 'Blood Pressure Check',
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
        title: 'Physical Therapy Session',
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
        title: 'Cardiology Consultation',
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
        title: 'Glucose Check',
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
        title: 'Rehabilitation Session',
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
        title: 'Appointment with Dr. Lopez',
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
        title: 'Weight Check',
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
      // March 2024
      {
        id: 97,
        title: 'Appointment with Dr. Rodriguez',
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
        title: 'Blood Pressure Check',
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
        title: 'Physical Therapy Session',
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
        title: 'Ophthalmology Consultation',
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
        title: 'Glucose Check',
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
        title: 'Rehabilitation Session',
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
        title: 'Appointment with Dr. Martinez',
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
        title: 'Weight Check',
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
      // April 2024
      {
        id: 113,
        title: 'Appointment with Dr. Garcia',
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
        title: 'Blood Pressure Check',
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
        title: 'Physical Therapy Session',
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
        title: 'Cardiology Consultation',
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
        title: 'Glucose Check',
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
        title: 'Rehabilitation Session',
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
        title: 'Appointment with Dr. Lopez',
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
        title: 'Weight Check',
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
        title: 'Dermatology Consultation',
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

  getSeasonalIcon(month) {
    // Winter: December, January, February
    if (month === 11 || month === 0 || month === 1) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#87CEEB"/>
        <path d="M12 18L13.09 24.26L20 25L13.09 25.74L12 32L10.91 25.74L4 25L10.91 24.26L12 18Z" fill="#87CEEB"/>
        <path d="M2 12L8.26 13.09L9 20L9.74 13.09L16 12L9.74 10.91L9 4L8.26 10.91L2 12Z" fill="#87CEEB"/>
        <path d="M18 12L24.26 13.09L25 20L25.74 13.09L32 12L25.74 10.91L25 4L24.26 10.91L18 12Z" fill="#87CEEB"/>
      </svg>`;
    }
    // Spring: March, April, May
    else if (month === 2 || month === 3 || month === 4) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#FFB6C1"/>
        <path d="M12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18Z" fill="#FFB6C1"/>
        <path d="M2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12Z" fill="#FFB6C1"/>
        <path d="M18 12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14C18.9 14 18 13.1 18 12Z" fill="#FFB6C1"/>
        <path d="M6.34 6.34C7.44 5.24 9.15 5.24 10.25 6.34C11.35 7.44 11.35 9.15 10.25 10.25C9.15 11.35 7.44 11.35 6.34 10.25C5.24 9.15 5.24 7.44 6.34 6.34Z" fill="#98FB98"/>
        <path d="M13.75 13.75C14.85 12.65 16.56 12.65 17.66 13.75C18.76 14.85 18.76 16.56 17.66 17.66C16.56 18.76 14.85 18.76 13.75 17.66C12.65 16.56 12.65 14.85 13.75 13.75Z" fill="#98FB98"/>
        <path d="M6.34 17.66C7.44 16.56 9.15 16.56 10.25 17.66C11.35 18.76 11.35 20.47 10.25 21.57C9.15 22.67 7.44 22.67 6.34 21.57C5.24 20.47 5.24 18.76 6.34 17.66Z" fill="#98FB98"/>
        <path d="M13.75 6.34C14.85 5.24 16.56 5.24 17.66 6.34C18.76 7.44 18.76 9.15 17.66 10.25C16.56 11.35 14.85 11.35 13.75 10.25C12.65 9.15 12.65 7.44 13.75 6.34Z" fill="#98FB98"/>
      </svg>`;
    }
    // Summer: June, July, August
    else if (month === 5 || month === 6 || month === 7) {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <circle cx="12" cy="12" r="5" fill="#FFD700"/>
        <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7Z" fill="#FFA500"/>
        <path d="M12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13Z" fill="#FFA500"/>
      </svg>`;
    }
    // Fall/Autumn: September, October, November
    else {
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#D2691E"/>
        <path d="M12 18L13.09 24.26L20 25L13.09 25.74L12 32L10.91 25.74L4 25L10.91 24.26L12 18Z" fill="#D2691E"/>
        <path d="M2 12L8.26 13.09L9 20L9.74 13.09L16 12L9.74 10.91L9 4L8.26 10.91L2 12Z" fill="#D2691E"/>
        <path d="M18 12L24.26 13.09L25 20L25.74 13.09L32 12L25.74 10.91L25 4L24.26 10.91L18 12Z" fill="#D2691E"/>
        <path d="M6.34 6.34C7.44 5.24 9.15 5.24 10.25 6.34C11.35 7.44 11.35 9.15 10.25 10.25C9.15 11.35 7.44 11.35 6.34 10.25C5.24 9.15 5.24 7.44 6.34 6.34Z" fill="#8B4513"/>
        <path d="M13.75 13.75C14.85 12.65 16.56 12.65 17.66 13.75C18.76 14.85 18.76 16.56 17.66 17.66C16.56 18.76 14.85 18.76 13.75 17.66C12.65 16.56 12.65 14.85 13.75 13.75Z" fill="#8B4513"/>
        <path d="M6.34 17.66C7.44 16.56 9.15 16.56 10.25 17.66C11.35 18.76 11.35 20.47 10.25 21.57C9.15 22.67 7.44 22.67 6.34 21.57C5.24 20.47 5.24 18.76 6.34 17.66Z" fill="#8B4513"/>
        <path d="M13.75 6.34C14.85 5.24 16.56 5.24 17.66 6.34C18.76 7.44 18.76 9.15 17.66 10.25C16.56 11.35 14.85 11.35 13.75 10.25C12.65 9.15 12.65 7.44 13.75 6.34Z" fill="#8B4513"/>
      </svg>`;
    }
  }

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDay = this.getFirstDayOfMonth(year, month);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    this.shadowRoot.innerHTML = `
      <style>
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        .calendar-container {
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 25px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .calendar-hero {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(25, 118, 210, 0.3);
        }

        .calendar-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .calendar-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .calendar-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 20px;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 20px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 15px 25px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .calendar-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: white;
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .month-navigator {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-btn {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 50px;
          height: 50px;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
        }

        .nav-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(25, 118, 210, 0.4);
        }

        .current-month {
          font-size: 1.8rem;
          font-weight: 700;
          color: #333;
          min-width: 200px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .current-month svg {
          flex-shrink: 0;
        }

        .add-event-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        .add-event-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .calendar-day-header {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          padding: 20px 10px;
          text-align: center;
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .calendar-day {
          background: white;
          min-height: 120px;
          padding: 15px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #f0f0f0;
        }

        .calendar-day:hover {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          transform: scale(1.02);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .calendar-day.today {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          border: 3px solid #1976d2;
          box-shadow: 0 5px 20px rgba(25, 118, 210, 0.3);
        }

        .calendar-day.selected {
          background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
          border: 3px solid #28a745;
          box-shadow: 0 5px 20px rgba(40, 167, 69, 0.3);
        }

        .calendar-day.other-month {
          background: #f8f9fa;
          color: #adb5bd;
        }

        .day-number {
          font-weight: 700;
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 10px;
        }

        .day-number.other-month {
          color: #adb5bd;
        }

        .event-indicators {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 8px;
        }

        .event-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .event-indicator.appointment {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
        }

        .event-indicator.medicine {
          background: linear-gradient(135deg, #28a745, #20c997);
        }

        .event-indicator.checkup {
          background: linear-gradient(135deg, #ffc107, #ff9800);
        }

        .event-indicator.therapy {
          background: linear-gradient(135deg, #dc3545, #e91e63);
        }

        .events-panel {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .events-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .events-title {
          color: #1976d2;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .events-date {
          color: #666;
          font-size: 1rem;
          font-weight: 500;
        }

        .event-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 15px;
          margin-bottom: 15px;
          border-left: 5px solid;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        .event-item:hover {
          transform: translateX(5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .event-time {
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: white;
          padding: 8px 12px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          min-width: 60px;
          text-align: center;
        }

        .event-content {
          flex: 1;
        }

        .event-title {
          font-weight: 700;
          color: #333;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .event-type {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
        }

        .type-appointment { 
          background: linear-gradient(135deg, #e3f2fd, #bbdefb); 
          color: #1976d2; 
        }

        .type-medicine { 
          background: linear-gradient(135deg, #e8f5e8, #c8e6c9); 
          color: #155724; 
        }

        .type-checkup { 
          background: linear-gradient(135deg, #fff3cd, #ffeaa7); 
          color: #856404; 
        }

        .type-therapy { 
          background: linear-gradient(135deg, #f8d7da, #f5c6cb); 
          color: #721c24; 
        }

        .no-events {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 1.1rem;
        }

        .no-events-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .calendar-container {
            padding: 20px;
          }
          
          .calendar-controls {
            flex-direction: column;
            gap: 20px;
          }
          
          .current-month {
            font-size: 1.5rem;
          }
          
          .calendar-day {
            min-height: 80px;
            padding: 10px;
          }
          
          .day-number {
            font-size: 1rem;
          }
          
          .event-indicators {
            gap: 2px;
          }
          
          .event-indicator {
            width: 8px;
            height: 8px;
          }
        }
      </style>
      
      <div class="calendar-container">
        <div class="calendar-hero">
          <div class="hero-content">
            <h1 class="calendar-title">📅 Medical Calendar</h1>
            <p class="calendar-subtitle">Manage your appointments, medications and medical events</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span class="stat-number">${this.getEvents().length}</span>
                <span class="stat-label">Total Events</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${this.getEvents().filter(e => e.type === 'appointment').length}</span>
                <span class="stat-label">Appointments</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${this.getEvents().filter(e => e.type === 'medicine').length}</span>
                <span class="stat-label">Medications</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="calendar-controls">
          <div class="month-navigator">
            <button class="nav-btn" id="prev-month">
              <i class="bi bi-chevron-left"></i>
            </button>
            <span class="current-month">${this.getSeasonalIcon(month)}${monthNames[month]} ${year}</span>
            <button class="nav-btn" id="next-month">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <button class="add-event-btn">
            <i class="bi bi-plus-circle"></i>
            Add Event
          </button>
        </div>
        
        <div class="calendar-grid">
          <div class="calendar-day-header">Sun</div>
          <div class="calendar-day-header">Mon</div>
          <div class="calendar-day-header">Tue</div>
          <div class="calendar-day-header">Wed</div>
          <div class="calendar-day-header">Thu</div>
          <div class="calendar-day-header">Fri</div>
          <div class="calendar-day-header">Sat</div>
          
          ${this.generateCalendarDays(year, month, daysInMonth, firstDay)}
        </div>
        
        <div class="events-panel">
          <div class="events-header">
            <h3 class="events-title">Events for ${this.selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</h3>
            <span class="events-date">${this.getEventsForDate(this.selectedDate).length} events</span>
          </div>
          ${this.renderEventsForSelectedDate()}
        </div>
      </div>
    `;
  }
  generateCalendarDays(year, month, daysInMonth, firstDay) {
    let days = '';
    const today = new Date();
    const selectedDateStr = this.formatDate(this.selectedDate);
    
    // Days from previous month
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
    
    // Days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const isToday = this.formatDate(today) === dateStr;
      const isSelected = selectedDateStr === dateStr;
      const events = this.getEventsForDate(date);
      
      let dayClasses = 'calendar-day';
      if (isToday) dayClasses += ' today';
      if (isSelected) dayClasses += ' selected';
      
      // Create unique event indicators
      const uniqueEventTypes = [...new Set(events.map(e => e.type))];
      const eventIndicators = uniqueEventTypes.map(type => 
        `<div class="event-indicator ${type}"></div>`
      ).join('');
      
      days += `<div class="${dayClasses}" data-date="${dateStr}">
        <div class="day-number">${day}</div>
        ${events.length > 0 ? `<div class="event-indicators">${eventIndicators}</div>` : ''}
      </div>`;
    }
    
    // Days from next month
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
      return `
        <div class="no-events">
          <div class="no-events-icon">📅</div>
          <p>No events scheduled for this day</p>
        </div>
      `;
    }
    
    return events.map(event => `
      <div class="event-item" style="border-left-color: ${event.color}">
        <div class="event-time">${event.time}</div>
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-type type-${event.type}">
            ${event.type === 'medicine' ? '<span class="medicine-icon">💊</span>' : ''}
            ${event.type === 'appointment' ? '<span class="appointment-icon">👨‍⚕️</span>' : ''}
            ${event.type === 'checkup' ? '<span class="checkup-icon">📊</span>' : ''}
            ${event.type === 'therapy' ? '<span class="therapy-icon">🏥</span>' : ''}
            ${event.type}
          </div>
        </div>
      </div>
    `).join('');
  }
  attachEvents() {
    // Month navigation
    const prevBtn = this.shadowRoot.querySelector('#prev-month');
    const nextBtn = this.shadowRoot.querySelector('#next-month');
    
            console.log('Buttons found:', { prevBtn: !!prevBtn, nextBtn: !!nextBtn });
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Previous button clicked');
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
        this.attachEvents();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next button clicked');
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
        this.attachEvents();
      });
    }
    
    // Day selection
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