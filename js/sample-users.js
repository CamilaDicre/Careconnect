// Sample users for Careconnect
// This file contains patient and caregiver data with complete information

const sampleUsers = {
  // ===== PATIENTS =====
  patients: [
    {
      // Basic data
      id: "patient_001",
      username: "sarah.wilson",
      email: "sarah.wilson@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-01-15T10:30:00.000Z",
      
      // Personal information
      name: "Sarah Wilson Johnson",
      age: "72",
      gender: "female",
      phone: "+1 555 123 4567",
      birthdate: "15-03-1952",
      address: "1234 Oak Street, Beverly Hills, CA 90210",
      
      // Medical information
      bloodType: "O+",
      height: "1.65",
      weight: "68",
      insurance: "Blue Cross Blue Shield",
      doctor: "Dr. Michael Chen",
      
      // Medical conditions
      conditions: [
        "Hypertension",
        "Type 2 Diabetes",
        "Rheumatoid Arthritis"
      ],
      
      // Medications
      medications: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          time: "After breakfast and dinner"
        },
        {
          name: "Losartan",
          dosage: "50mg",
          frequency: "Once daily",
          time: "In the morning"
        },
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "As needed",
          time: "For joint pain"
        }
      ],
      
      // Allergies
      allergies: [
        "Penicillin",
        "Tree pollen"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "David Wilson",
        phone: "+1 555 987 6543",
        relationship: "Son"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: false
      },
      
      // Additional notes
      notes: "Sarah needs help with medication administration and glucose monitoring. Prefers caregivers who speak English.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #667eea, #764ba2)"
    },
    
    {
      // Basic data
      id: "patient_002",
      username: "robert.martinez",
      email: "robert.martinez@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-02-20T14:15:00.000Z",
      
      // Personal information
      name: "Robert Martinez Lopez",
      age: "68",
      gender: "male",
      phone: "+1 555 234 5678",
      birthdate: "22-07-1956",
      address: "5678 Pine Avenue, Miami, FL 33101",
      
      // Medical information
      bloodType: "A-",
      height: "1.78",
      weight: "82",
      insurance: "Medicare",
      doctor: "Dr. Jennifer Rodriguez",
      
      // Medical conditions
      conditions: [
        "Heart disease",
        "High cholesterol",
        "Sleep apnea"
      ],
      
      // Medications
      medications: [
        {
          name: "Atorvastatin",
          dosage: "20mg",
          frequency: "Once daily",
          time: "At bedtime"
        },
        {
          name: "Metoprolol",
          dosage: "25mg",
          frequency: "Twice daily",
          time: "Morning and evening"
        },
        {
          name: "Aspirin",
          dosage: "81mg",
          frequency: "Once daily",
          time: "In the morning"
        }
      ],
      
      // Allergies
      allergies: [
        "Sulfa drugs",
        "Shellfish"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Maria Martinez",
        phone: "+1 555 876 5432",
        relationship: "Daughter"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "Robert uses a CPAP machine at night. Needs assistance with mobility and medication reminders.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #f093fb, #f5576c)"
    },
    
    {
      // Basic data
      id: "patient_003",
      username: "elizabeth.brown",
      email: "elizabeth.brown@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-03-10T09:45:00.000Z",
      
      // Personal information
      name: "Elizabeth Brown Davis",
      age: "75",
      gender: "female",
      phone: "+1 555 345 6789",
      birthdate: "08-12-1949",
      address: "9012 Maple Drive, Seattle, WA 98101",
      
      // Medical information
      bloodType: "B+",
      height: "1.60",
      weight: "65",
      insurance: "Aetna",
      doctor: "Dr. William Thompson",
      
      // Medical conditions
      conditions: [
        "Osteoporosis",
        "Depression",
        "Mild dementia"
      ],
      
      // Medications
      medications: [
        {
          name: "Alendronate",
          dosage: "70mg",
          frequency: "Once weekly",
          time: "Monday morning"
        },
        {
          name: "Sertraline",
          dosage: "50mg",
          frequency: "Once daily",
          time: "In the morning"
        },
        {
          name: "Vitamin D",
          dosage: "1000 IU",
          frequency: "Once daily",
          time: "With breakfast"
        }
      ],
      
      // Allergies
      allergies: [
        "Latex",
        "Dairy products"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "James Brown",
        phone: "+1 555 765 4321",
        relationship: "Son"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "Elizabeth has memory issues and needs constant supervision. Enjoys reading and classical music.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #4facfe, #00f2fe)"
    },
    
    {
      // Basic data
      id: "patient_004",
      username: "thomas.anderson",
      email: "thomas.anderson@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-01-28T16:20:00.000Z",
      
      // Personal information
      name: "Thomas Anderson Smith",
      age: "70",
      gender: "male",
      phone: "+1 555 456 7890",
      birthdate: "14-09-1954",
      address: "3456 Elm Street, Chicago, IL 60601",
      
      // Medical information
      bloodType: "AB+",
      height: "1.75",
      weight: "78",
      insurance: "UnitedHealth",
      doctor: "Dr. Lisa Johnson",
      
      // Medical conditions
      conditions: [
        "Parkinson's disease",
        "Prostate cancer (in remission)",
        "Glaucoma"
      ],
      
      // Medications
      medications: [
        {
          name: "Levodopa",
          dosage: "100mg",
          frequency: "Three times daily",
          time: "Every 4 hours"
        },
        {
          name: "Timolol",
          dosage: "0.5%",
          frequency: "Twice daily",
          time: "Morning and evening"
        },
        {
          name: "Vitamin B12",
          dosage: "1000mcg",
          frequency: "Once daily",
          time: "With breakfast"
        }
      ],
      
      // Allergies
      allergies: [
        "Codeine",
        "Dust mites"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Jennifer Anderson",
        phone: "+1 555 654 3210",
        relationship: "Daughter"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "Thomas has mobility issues due to Parkinson's. Needs assistance with daily activities and medication timing.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #43e97b, #38f9d7)"
    },
    
    {
      // Basic data
      id: "patient_005",
      username: "patricia.garcia",
      email: "patricia.garcia@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-02-15T11:30:00.000Z",
      
      // Personal information
      name: "Patricia Garcia Rodriguez",
      age: "73",
      gender: "female",
      phone: "+1 555 567 8901",
      birthdate: "03-05-1951",
      address: "7890 Cedar Lane, San Antonio, TX 78201",
      
      // Medical information
      bloodType: "O-",
      height: "1.58",
      weight: "62",
      insurance: "Humana",
      doctor: "Dr. Carlos Mendez",
      
      // Medical conditions
      conditions: [
        "Breast cancer (survivor)",
        "Osteoarthritis",
        "Anxiety"
      ],
      
      // Medications
      medications: [
        {
          name: "Tamoxifen",
          dosage: "20mg",
          frequency: "Once daily",
          time: "In the evening"
        },
        {
          name: "Acetaminophen",
          dosage: "500mg",
          frequency: "As needed",
          time: "For pain"
        },
        {
          name: "Lorazepam",
          dosage: "0.5mg",
          frequency: "As needed",
          time: "For anxiety"
        }
      ],
      
      // Allergies
      allergies: [
        "Iodine",
        "Nuts"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Miguel Garcia",
        phone: "+1 555 543 2109",
        relationship: "Son"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: false
      },
      
      // Additional notes
      notes: "Patricia is a cancer survivor and needs emotional support. Enjoys gardening and cooking.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #fa709a, #fee140)"
    },
    
    {
      // Basic data
      id: "patient_006",
      username: "david.miller",
      email: "david.miller@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-03-05T13:15:00.000Z",
      
      // Personal information
      name: "David Miller Johnson",
      age: "69",
      gender: "male",
      phone: "+1 555 678 9012",
      birthdate: "18-11-1955",
      address: "2345 Birch Road, Denver, CO 80201",
      
      // Medical information
      bloodType: "A+",
      height: "1.80",
      weight: "85",
      insurance: "Kaiser Permanente",
      doctor: "Dr. Sarah Williams",
      
      // Medical conditions
      conditions: [
        "COPD",
        "Emphysema",
        "Chronic bronchitis"
      ],
      
      // Medications
      medications: [
        {
          name: "Albuterol",
          dosage: "90mcg",
          frequency: "As needed",
          time: "For breathing difficulties"
        },
        {
          name: "Tiotropium",
          dosage: "18mcg",
          frequency: "Once daily",
          time: "In the morning"
        },
        {
          name: "Prednisone",
          dosage: "10mg",
          frequency: "As needed",
          time: "During flare-ups"
        }
      ],
      
      // Allergies
      allergies: [
        "Mold",
        "Pet dander"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Lisa Miller",
        phone: "+1 555 432 1098",
        relationship: "Daughter"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "David needs oxygen therapy and assistance with breathing exercises. Avoids smoke and strong odors.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #a8edea, #fed6e3)"
    },
    
    {
      // Basic data
      id: "patient_007",
      username: "nancy.clark",
      email: "nancy.clark@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-01-10T08:45:00.000Z",
      
      // Personal information
      name: "Nancy Clark Wilson",
      age: "76",
      gender: "female",
      phone: "+1 555 789 0123",
      birthdate: "25-06-1948",
      address: "4567 Spruce Street, Portland, OR 97201",
      
      // Medical information
      bloodType: "B-",
      height: "1.63",
      weight: "70",
      insurance: "Providence",
      doctor: "Dr. Robert Davis",
      
      // Medical conditions
      conditions: [
        "Alzheimer's disease",
        "Hypertension",
        "Urinary incontinence"
      ],
      
      // Medications
      medications: [
        {
          name: "Donepezil",
          dosage: "10mg",
          frequency: "Once daily",
          time: "At bedtime"
        },
        {
          name: "Amlodipine",
          dosage: "5mg",
          frequency: "Once daily",
          time: "In the morning"
        },
        {
          name: "Oxybutynin",
          dosage: "5mg",
          frequency: "Twice daily",
          time: "Morning and evening"
        }
      ],
      
      // Allergies
      allergies: [
        "Sulfa drugs",
        "Eggs"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Michael Clark",
        phone: "+1 555 321 0987",
        relationship: "Son"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "Nancy has advanced Alzheimer's and requires 24/7 supervision. Responds well to familiar faces and routines.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #ffecd2, #fcb69f)"
    },
    
    {
      // Basic data
      id: "patient_008",
      username: "richard.taylor",
      email: "richard.taylor@email.com",
      password: "password123",
      role: "patient",
      registrationDate: "2024-02-25T15:30:00.000Z",
      
      // Personal information
      name: "Richard Taylor Moore",
      age: "71",
      gender: "male",
      phone: "+1 555 890 1234",
      birthdate: "12-08-1953",
      address: "6789 Willow Way, Atlanta, GA 30301",
      
      // Medical information
      bloodType: "O+",
      height: "1.77",
      weight: "80",
      insurance: "Cigna",
      doctor: "Dr. Amanda Lee",
      
      // Medical conditions
      conditions: [
        "Stroke survivor",
        "Aphasia",
        "Right-side weakness"
      ],
      
      // Medications
      medications: [
        {
          name: "Warfarin",
          dosage: "5mg",
          frequency: "Once daily",
          time: "In the evening"
        },
        {
          name: "Aspirin",
          dosage: "81mg",
          frequency: "Once daily",
          time: "In the morning"
        },
        {
          name: "Atorvastatin",
          dosage: "40mg",
          frequency: "Once daily",
          time: "At bedtime"
        }
      ],
      
      // Allergies
      allergies: [
        "Heparin",
        "Latex"
      ],
      
      // Emergency contact
      emergencyContact: {
        name: "Susan Taylor",
        phone: "+1 555 210 9876",
        relationship: "Wife"
      },
      
      // Preferences
      preferences: {
        language: "English",
        notifications: true,
        accessibility: true
      },
      
      // Additional notes
      notes: "Richard is a stroke survivor with speech difficulties. Needs physical therapy and speech therapy support.",
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #ff9a9e, #fecfef)"
    }
  ],
  
  // ===== CAREGIVERS =====
  caregivers: [
    {
      // Basic data
      id: "caregiver_001",
      username: "anna.garcia",
      email: "anna.garcia@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-01-05T08:00:00.000Z",
      
      // Personal information
      name: "Anna Garcia Morales",
      age: "35",
      gender: "female",
      phone: "+1 555 111 2222",
      birthdate: "12-04-1989",
      address: "123 Caregiver Street, Los Angeles, CA 90001",
      
      // Professional information
      experience: "8 years",
      education: "Bachelor's in Nursing",
      certifications: "CPR, First Aid, Elder Care Specialist",
      skills: "Home care, Medication administration, Vital signs monitoring, Wound care",
      languages: "English, Spanish",
      bio: "Professional nurse with extensive experience in elder care. Specialized in patients with diabetes and chronic conditions.",
      availability: "Full-time",
      
      // Specialties and ratings
      specialties: ["Elder care", "Medication management", "Diabetes monitoring", "Post-operative care"],
      rating: 4.8,
      reviews: 47,
      hourlyRate: "$25/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 2,
        preferredShifts: ["Morning", "Afternoon"],
        travelRadius: "10 miles",
        emergencyAvailability: true
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #43e97b, #38f9d7)"
    },
    
    {
      // Basic data
      id: "caregiver_002",
      username: "luis.rodriguez",
      email: "luis.rodriguez@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-01-12T09:30:00.000Z",
      
      // Personal information
      name: "Luis Rodriguez Martinez",
      age: "42",
      gender: "male",
      phone: "+1 555 222 3333",
      birthdate: "08-09-1982",
      address: "456 Care Avenue, Miami, FL 33101",
      
      // Professional information
      experience: "12 years",
      education: "Associate's in Health Sciences",
      certifications: "CPR, First Aid, Certified Nursing Assistant",
      skills: "Personal care, Mobility assistance, Meal preparation, Companionship",
      languages: "English, Spanish, Portuguese",
      bio: "Experienced caregiver specializing in mobility assistance and personal care. Patient and compassionate with elderly clients.",
      availability: "Part-time",
      
      // Specialties and ratings
      specialties: ["Mobility assistance", "Personal care", "Companionship", "Meal preparation"],
      rating: 4.9,
      reviews: 63,
      hourlyRate: "$22/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 3,
        preferredShifts: ["Evening", "Night"],
        travelRadius: "15 miles",
        emergencyAvailability: true
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #667eea, #764ba2)"
    },
    
    {
      // Basic data
      id: "caregiver_003",
      username: "patricia.sanchez",
      email: "patricia.sanchez@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-01-20T10:15:00.000Z",
      
      // Personal information
      name: "Patricia Sanchez Lopez",
      age: "38",
      gender: "female",
      phone: "+1 555 333 4444",
      birthdate: "15-03-1986",
      address: "789 Care Lane, Chicago, IL 60601",
      
      // Professional information
      experience: "10 years",
      education: "Bachelor's in Social Work",
      certifications: "CPR, First Aid, Dementia Care Specialist",
      skills: "Dementia care, Behavioral management, Family support, Activity planning",
      languages: "English, Spanish",
      bio: "Social worker turned caregiver with expertise in dementia care and family support. Creates engaging activities for cognitive stimulation.",
      availability: "Full-time",
      
      // Specialties and ratings
      specialties: ["Dementia care", "Behavioral management", "Family support", "Activity planning"],
      rating: 4.7,
      reviews: 38,
      hourlyRate: "$28/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 2,
        preferredShifts: ["Morning", "Afternoon"],
        travelRadius: "12 miles",
        emergencyAvailability: false
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #fa709a, #fee140)"
    },
    
    {
      // Basic data
      id: "caregiver_004",
      username: "michael.chen",
      email: "michael.chen@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-02-01T11:00:00.000Z",
      
      // Personal information
      name: "Michael Chen Wang",
      age: "45",
      gender: "male",
      phone: "+1 555 444 5555",
      birthdate: "22-11-1979",
      address: "321 Care Circle, San Francisco, CA 94101",
      
      // Professional information
      experience: "15 years",
      education: "Master's in Gerontology",
      certifications: "CPR, First Aid, Geriatric Care Manager",
      skills: "Geriatric assessment, Care planning, Medication management, Family consultation",
      languages: "English, Mandarin, Cantonese",
      bio: "Gerontologist with extensive experience in comprehensive elder care. Specializes in care planning and family consultation.",
      availability: "Full-time",
      
      // Specialties and ratings
      specialties: ["Geriatric assessment", "Care planning", "Medication management", "Family consultation"],
      rating: 4.9,
      reviews: 52,
      hourlyRate: "$35/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 1,
        preferredShifts: ["Flexible"],
        travelRadius: "20 miles",
        emergencyAvailability: true
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #a8edea, #fed6e3)"
    },
    
    {
      // Basic data
      id: "caregiver_005",
      username: "jennifer.white",
      email: "jennifer.white@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-02-10T12:30:00.000Z",
      
      // Personal information
      name: "Jennifer White Thompson",
      age: "33",
      gender: "female",
      phone: "+1 555 555 6666",
      birthdate: "05-07-1991",
      address: "654 Care Court, Seattle, WA 98101",
      
      // Professional information
      experience: "6 years",
      education: "Bachelor's in Psychology",
      certifications: "CPR, First Aid, Mental Health First Aid",
      skills: "Mental health support, Companionship, Medication reminders, Light housekeeping",
      languages: "English",
      bio: "Psychology graduate with focus on mental health support for elderly. Provides compassionate companionship and emotional support.",
      availability: "Part-time",
      
      // Specialties and ratings
      specialties: ["Mental health support", "Companionship", "Medication reminders", "Light housekeeping"],
      rating: 4.6,
      reviews: 29,
      hourlyRate: "$20/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 2,
        preferredShifts: ["Afternoon", "Evening"],
        travelRadius: "8 miles",
        emergencyAvailability: false
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #ffecd2, #fcb69f)"
    },
    
    {
      // Basic data
      id: "caregiver_006",
      username: "carlos.mendez",
      email: "carlos.mendez@email.com",
      password: "password123",
      role: "caregiver",
      registrationDate: "2024-02-18T13:45:00.000Z",
      
      // Personal information
      name: "Carlos Mendez Rodriguez",
      age: "40",
      gender: "male",
      phone: "+1 555 666 7777",
      birthdate: "18-12-1984",
      address: "987 Care Drive, Houston, TX 77001",
      
      // Professional information
      experience: "11 years",
      education: "Associate's in Medical Assisting",
      certifications: "CPR, First Aid, Medical Assistant Certification",
      skills: "Medical procedures, Vital signs, Wound care, Patient monitoring",
      languages: "English, Spanish",
      bio: "Medical assistant with strong clinical skills. Experienced in medical procedures and patient monitoring for elderly clients.",
      availability: "Full-time",
      
      // Specialties and ratings
      specialties: ["Medical procedures", "Vital signs monitoring", "Wound care", "Patient monitoring"],
      rating: 4.8,
      reviews: 41,
      hourlyRate: "$26/hour",
      
      // Work preferences
      workPreferences: {
        maxPatients: 2,
        preferredShifts: ["Morning", "Night"],
        travelRadius: "15 miles",
        emergencyAvailability: true
      },
      
      // Avatar
      photo: null,
      avatarColor: "linear-gradient(135deg, #ff9a9e, #fecfef)"
    }
  ]
};

// Function to load sample users into localStorage
function loadSampleUsers() {
  try {
    if (typeof LocalStorageUtils === 'undefined') {
      console.warn('LocalStorageUtils is not available');
      return false;
    }
    
    const existingUsers = LocalStorageUtils.getItem('users', []);
    const allUsers = [...sampleUsers.patients, ...sampleUsers.caregivers];
    
    // Add new users without duplicates
    allUsers.forEach(newUser => {
      const exists = existingUsers.some(existingUser => 
        existingUser.username === newUser.username || 
        existingUser.email === newUser.email
      );
      
      if (!exists) {
        existingUsers.push(newUser);
      }
    });
    
    LocalStorageUtils.setItem('users', existingUsers);
    
    console.log('✅ Sample users loaded successfully');
    console.log(`📊 Total users: ${existingUsers.length}`);
    console.log(`👥 Patients: ${sampleUsers.patients.length}`);
    console.log(`👨‍⚕️ Caregivers: ${sampleUsers.caregivers.length}`);
    
    return true;
    
  } catch (error) {
    console.error('Error loading sample users:', error);
    return false;
  }
}

// Function to create complete user profiles
function createUserProfiles() {
  try {
    if (typeof LocalStorageUtils === 'undefined') {
      console.warn('LocalStorageUtils is not available');
      return false;
    }
    
    const users = LocalStorageUtils.getItem('users', []);
    
    users.forEach(user => {
      const userProfileKey = `userProfile_${user.username}`;
      
      // Check if profile already exists
      const existingProfile = LocalStorageUtils.getItem(userProfileKey, null);
      
      if (!existingProfile) {
        const profileData = {
          // Basic user data
          name: user.name || user.username || 'User',
          email: user.email || '-',
          username: user.username || '-',
          role: user.role || 'patient',
          
          // Additional profile data
          age: user.age || '',
          gender: user.gender || '',
          phone: user.phone || '',
          address: user.address || '',
          
          // Medical information (patients only)
          allergies: user.allergies || [],
          medications: user.medications || [],
          conditions: user.conditions || [],
          emergencyContact: user.emergencyContact || {
            name: '',
            phone: '',
            relationship: ''
          },
          bloodType: user.bloodType || '',
          height: user.height || '',
          weight: user.weight || '',
          insurance: user.insurance || '',
          doctor: user.doctor || '',
          
          // Professional information (caregivers only)
          experience: user.experience || '',
          education: user.education || '',
          certifications: user.certifications || '',
          skills: user.skills || '',
          languages: user.languages || '',
          bio: user.bio || '',
          availability: user.availability || '',
          specialties: user.specialties || [],
          rating: user.rating || 0,
          reviews: user.reviews || 0,
          hourlyRate: user.hourlyRate || '',
          workPreferences: user.workPreferences || {},
          
          // Preferences
          preferences: {
            language: 'English',
            notifications: true,
            accessibility: false
          },
          
          // Notes
          notes: user.notes || '',
          
          // Avatar
          photo: user.photo || null,
          avatarColor: user.avatarColor || 'linear-gradient(135deg, #667eea, #764ba2)'
        };
        
        LocalStorageUtils.setItem(userProfileKey, profileData);
      }
    });
    
    console.log('✅ User profiles created/updated');
    return true;
    
  } catch (error) {
    console.error('Error creating user profiles:', error);
    return false;
  }
}

// Function to simulate login for a specific user
function loginAsUser(username) {
  try {
    if (typeof LocalStorageUtils === 'undefined') {
      console.warn('LocalStorageUtils is not available');
      return false;
    }
    
    const users = LocalStorageUtils.getItem('users', []);
    const user = users.find(u => u.username === username || u.email === username);
    
    if (user) {
      LocalStorageUtils.setItem('loggedInUser', user.username);
      LocalStorageUtils.setItem('userRole', user.role);
      LocalStorageUtils.setItem('currentUserId', user.id);
      
      console.log(`✅ Login successful as: ${user.name} (${user.role})`);
      return true;
    } else {
      console.error(`❌ User not found: ${username}`);
      return false;
    }
    
  } catch (error) {
    console.error('Error in login:', error);
    return false;
  }
}

// Export functions for global use
window.SampleUsers = {
  loadSampleUsers,
  createUserProfiles,
  loginAsUser,
  sampleUsers
};

// Auto-load users when script is imported
if (typeof LocalStorageUtils !== 'undefined' && LocalStorageUtils.isAvailable()) {
  loadSampleUsers();
  createUserProfiles();
}
