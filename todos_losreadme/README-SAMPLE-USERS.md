# Sample Users System - Careconnect

This document describes the sample users system for the Careconnect application, which provides pre-loaded patient and caregiver data for testing and development purposes.

## 📋 Overview

The sample users system automatically creates realistic patient and caregiver accounts with complete information that can be used to test the application's features, including:

- User authentication and login
- Profile management
- Dashboard functionality
- Medical information tracking
- Caregiver matching

## 👥 Available Sample Users

### Patients (8 total)

| Username | Name | Age | Key Information |
|----------|------|-----|-----------------|
| `sarah.wilson` | Sarah Wilson Johnson | 72 | Diabetes, Hypertension, Arthritis |
| `robert.martinez` | Robert Martinez Lopez | 68 | Heart disease, Sleep apnea |
| `elizabeth.brown` | Elizabeth Brown Davis | 75 | Osteoporosis, Depression, Dementia |
| `thomas.anderson` | Thomas Anderson Smith | 70 | Parkinson's, Prostate cancer |
| `patricia.garcia` | Patricia Garcia Rodriguez | 73 | Breast cancer survivor, Anxiety |
| `david.miller` | David Miller Johnson | 69 | COPD, Emphysema |
| `nancy.clark` | Nancy Clark Wilson | 76 | Alzheimer's, Hypertension |
| `richard.taylor` | Richard Taylor Moore | 71 | Stroke survivor, Aphasia |

### Caregivers (6 total)

| Username | Name | Age | Specialties | Experience |
|----------|------|-----|-------------|------------|
| `anna.garcia` | Anna Garcia Morales | 35 | Elder care, Diabetes monitoring | 8 years |
| `luis.rodriguez` | Luis Rodriguez Martinez | 42 | Mobility assistance, Personal care | 12 years |
| `patricia.sanchez` | Patricia Sanchez Lopez | 38 | Dementia care, Behavioral management | 10 years |
| `michael.chen` | Michael Chen Wang | 45 | Geriatric assessment, Care planning | 15 years |
| `jennifer.white` | Jennifer White Thompson | 33 | Mental health support, Companionship | 6 years |
| `carlos.mendez` | Carlos Mendez Rodriguez | 40 | Medical procedures, Vital signs | 11 years |

## 🔐 Login Credentials

All sample users use the same password for easy testing:
- **Password**: `password123`

## 🚀 How to Use

### Automatic Loading

The sample users are automatically loaded when you open `index.html`. The system:

1. Checks if `localStorage` is available
2. Loads sample user data
3. Creates complete user profiles
4. Makes users available for login

### Manual Management

Use the test page `test-sample-users.html` to:

- **Load Sample Users**: Manually load the sample data
- **Create Profiles**: Generate complete user profiles
- **Test Login**: Simulate user authentication
- **View Statistics**: See user counts and system status
- **Clear Data**: Remove all stored data

## 📁 File Structure

```
js/
├── sample-users.js          # Sample user data and functions
└── localStorage-utils.js    # Storage utilities

test-sample-users.html       # Test and management interface
README-SAMPLE-USERS.md       # This documentation
```

## 🔧 Available Functions

### Core Functions

- `loadSampleUsers()` - Loads sample users into localStorage
- `createUserProfiles()` - Creates complete user profiles
- `loginAsUser(username)` - Simulates login for a specific user

### Test Functions

- `showPatients()` - Display all patient users
- `showCaregivers()` - Display all caregiver users
- `showAllUsers()` - Display all users
- `checkLocalStorage()` - Check localStorage status
- `clearAllData()` - Clear all stored data

## 📊 User Data Structure

### Patient Information

```javascript
{
  id: "patient_001",
  username: "sarah.wilson",
  email: "sarah.wilson@email.com",
  password: "password123",
  role: "patient",
  name: "Sarah Wilson Johnson",
  age: "72",
  gender: "female",
  phone: "+1 555 123 4567",
  address: "1234 Oak Street, Beverly Hills, CA 90210",
  
  // Medical information
  bloodType: "O+",
  height: "1.65",
  weight: "68",
  insurance: "Blue Cross Blue Shield",
  doctor: "Dr. Michael Chen",
  
  // Medical conditions and medications
  conditions: ["Hypertension", "Type 2 Diabetes", "Rheumatoid Arthritis"],
  medications: [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "After breakfast and dinner"
    }
  ],
  
  // Allergies and emergency contact
  allergies: ["Penicillin", "Tree pollen"],
  emergencyContact: {
    name: "David Wilson",
    phone: "+1 555 987 6543",
    relationship: "Son"
  }
}
```

### Caregiver Information

```javascript
{
  id: "caregiver_001",
  username: "anna.garcia",
  email: "anna.garcia@email.com",
  password: "password123",
  role: "caregiver",
  name: "Anna Garcia Morales",
  age: "35",
  gender: "female",
  phone: "+1 555 111 2222",
  address: "123 Caregiver Street, Los Angeles, CA 90001",
  
  // Professional information
  experience: "8 years",
  education: "Bachelor's in Nursing",
  certifications: "CPR, First Aid, Elder Care Specialist",
  skills: "Home care, Medication administration, Vital signs monitoring",
  languages: "English, Spanish",
  bio: "Professional nurse with extensive experience in elder care...",
  availability: "Full-time",
  
  // Specialties and ratings
  specialties: ["Elder care", "Medication management", "Diabetes monitoring"],
  rating: 4.8,
  reviews: 47,
  hourlyRate: "$25/hour"
}
```

## 🎯 Testing Scenarios

### Patient Testing

1. **Login as Sarah Wilson** (`sarah.wilson`)
   - Test diabetes management features
   - Verify medication tracking
   - Check emergency contact display

2. **Login as Thomas Anderson** (`thomas.anderson`)
   - Test Parkinson's disease support
   - Verify mobility assistance features
   - Check medication timing alerts

### Caregiver Testing

1. **Login as Anna Garcia** (`anna.garcia`)
   - Test professional profile display
   - Verify skills and certifications
   - Check availability management

2. **Login as Michael Chen** (`michael.chen`)
   - Test geriatric assessment tools
   - Verify care planning features
   - Check family consultation options

## 🔄 Data Persistence

- All user data is stored in `localStorage`
- Data persists between browser sessions
- Users can be cleared and reloaded as needed
- Profile data is stored separately for each user

## 🛠️ Development Notes

### Adding New Users

To add new sample users:

1. Edit `js/sample-users.js`
2. Add user data to the appropriate array (`patients` or `caregivers`)
3. Follow the existing data structure
4. Use realistic but fictional information

### Modifying User Data

- Update the user object in the sample data
- Clear localStorage to remove old data
- Reload the page to apply changes

### Testing Different Scenarios

- Use different user types to test role-specific features
- Test with users having various medical conditions
- Verify caregiver-patient matching functionality

## 🚨 Important Notes

- All user data is fictional and for testing purposes only
- Real medical information should never be used in sample data
- The system is designed for development and testing environments
- Production deployments should use real user registration

## 📞 Support

For questions about the sample users system:

1. Check this documentation
2. Review the test page (`test-sample-users.html`)
3. Examine the source code in `js/sample-users.js`
4. Check browser console for error messages

---

**Last Updated**: January 2024  
**Version**: 1.0  
**Compatibility**: Careconnect v1.0+
