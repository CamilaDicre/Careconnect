/**
 * Script para crear usuarios cuidadores de prueba
 * Ejecutar en la consola del navegador para agregar cuidadores de muestra
 */

class SampleCaregivers {
  static createSampleCaregivers() {
    const sampleCaregivers = [
      {
        username: "María González",
        email: "maria.gonzalez@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado de ancianos, Medicina general",
        rating: 4.8,
        experience: "8 años",
        address: "Madrid, España",
        photo: "https://ui-avatars.com/api/?name=María+González&background=1976d2&color=fff&size=128&rounded=true",
        price: "$25/hora",
        available: true,
        description: "Enfermera especializada en geriatría con amplia experiencia en cuidado domiciliario."
      },
      {
        username: "Carlos Rodríguez",
        email: "carlos.rodriguez@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Fisioterapia, Rehabilitación",
        rating: 4.6,
        experience: "5 años",
        address: "Barcelona, España",
        photo: "https://ui-avatars.com/api/?name=Carlos+Rodríguez&background=28a745&color=fff&size=128&rounded=true",
        price: "$30/hora",
        available: true,
        description: "Fisioterapeuta especializado en rehabilitación de pacientes mayores."
      },
      {
        username: "Ana Martínez",
        email: "ana.martinez@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado pediátrico, Nutrición",
        rating: 4.9,
        experience: "12 años",
        address: "Valencia, España",
        photo: "https://ui-avatars.com/api/?name=Ana+Martínez&background=ff6b35&color=fff&size=128&rounded=true",
        price: "$28/hora",
        available: true,
        description: "Nutricionista y cuidadora especializada en cuidado infantil y nutrición."
      },
      {
        username: "Luis Fernández",
        email: "luis.fernandez@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado post-operatorio, Enfermería",
        rating: 4.7,
        experience: "10 años",
        address: "Sevilla, España",
        photo: "https://ui-avatars.com/api/?name=Luis+Fernández&background=6f42c1&color=fff&size=128&rounded=true",
        price: "$32/hora",
        available: true,
        description: "Enfermero especializado en cuidados post-operatorios y atención domiciliaria."
      },
      {
        username: "Carmen López",
        email: "carmen.lopez@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado de demencia, Psicología",
        rating: 4.5,
        experience: "15 años",
        address: "Bilbao, España",
        photo: "https://ui-avatars.com/api/?name=Carmen+López&background=dc3545&color=fff&size=128&rounded=true",
        price: "$35/hora",
        available: true,
        description: "Psicóloga especializada en cuidado de pacientes con demencia y Alzheimer."
      },
      {
        username: "Javier Moreno",
        email: "javier.moreno@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado de discapacitados, Terapia ocupacional",
        rating: 4.4,
        experience: "7 años",
        address: "Málaga, España",
        photo: "https://ui-avatars.com/api/?name=Javier+Moreno&background=fd7e14&color=fff&size=128&rounded=true",
        price: "$27/hora",
        available: true,
        description: "Terapeuta ocupacional especializado en cuidado de personas con discapacidad."
      },
      {
        username: "Isabel Ruiz",
        email: "isabel.ruiz@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado paliativo, Enfermería oncológica",
        rating: 4.8,
        experience: "18 años",
        address: "Zaragoza, España",
        photo: "https://ui-avatars.com/api/?name=Isabel+Ruiz&background=20c997&color=fff&size=128&rounded=true",
        price: "$40/hora",
        available: true,
        description: "Enfermera especializada en cuidados paliativos y atención oncológica."
      },
      {
        username: "Roberto Silva",
        email: "roberto.silva@careconnect.com",
        password: "password123",
        role: "caregiver",
        skills: "Cuidado de diabetes, Educación sanitaria",
        rating: 4.6,
        experience: "9 años",
        address: "Granada, España",
        photo: "https://ui-avatars.com/api/?name=Roberto+Silva&background=6610f2&color=fff&size=128&rounded=true",
        price: "$29/hora",
        available: true,
        description: "Educador sanitario especializado en cuidado de pacientes diabéticos."
      }
    ];

    // Obtener usuarios existentes
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Filtrar para no duplicar cuidadores existentes
    const existingEmails = existingUsers.map(user => user.email);
    const newCaregivers = sampleCaregivers.filter(caregiver => 
      !existingEmails.includes(caregiver.email)
    );

    if (newCaregivers.length === 0) {
      console.log('Todos los cuidadores de prueba ya existen en el sistema.');
      return;
    }

    // Agregar nuevos cuidadores
    const updatedUsers = [...existingUsers, ...newCaregivers];
    
    // Guardar en localStorage
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      console.log(`✅ Se agregaron ${newCaregivers.length} cuidadores de prueba al sistema:`);
      newCaregivers.forEach(caregiver => {
        console.log(`   - ${caregiver.username} (${caregiver.skills})`);
      });
      console.log('\nLos cuidadores ahora aparecerán en la búsqueda del dashboard.');
    } catch (error) {
      console.error('❌ Error al guardar los cuidadores:', error);
    }
  }

  static removeSampleCaregivers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const sampleEmails = [
      "maria.gonzalez@careconnect.com",
      "carlos.rodriguez@careconnect.com",
      "ana.martinez@careconnect.com",
      "luis.fernandez@careconnect.com",
      "carmen.lopez@careconnect.com",
      "javier.moreno@careconnect.com",
      "isabel.ruiz@careconnect.com",
      "roberto.silva@careconnect.com"
    ];

    const filteredUsers = users.filter(user => !sampleEmails.includes(user.email));
    
    try {
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      console.log('✅ Cuidadores de prueba eliminados del sistema.');
    } catch (error) {
      console.error('❌ Error al eliminar los cuidadores:', error);
    }
  }

  static listCaregivers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const caregivers = users.filter(user => user.role === 'caregiver');
    
    console.log(`📋 Cuidadores registrados en el sistema (${caregivers.length}):`);
    caregivers.forEach((caregiver, index) => {
      console.log(`${index + 1}. ${caregiver.username}`);
      console.log(`   Email: ${caregiver.email}`);
      console.log(`   Especialidad: ${caregiver.skills || 'No especificada'}`);
      console.log(`   Experiencia: ${caregiver.experience || 'No especificada'}`);
      console.log(`   Ubicación: ${caregiver.address || 'No especificada'}`);
      console.log(`   Precio: ${caregiver.price || 'No especificado'}`);
      console.log(`   Calificación: ${caregiver.rating || 'No especificada'}`);
      console.log('---');
    });
  }
}

// Hacer disponible globalmente
window.SampleCaregivers = SampleCaregivers;

// Instrucciones de uso
console.log(`
🎯 CUIDADORES DE PRUEBA - INSTRUCCIONES DE USO

Para agregar cuidadores de prueba:
   SampleCaregivers.createSampleCaregivers()

Para eliminar cuidadores de prueba:
   SampleCaregivers.removeSampleCaregivers()

Para ver todos los cuidadores registrados:
   SampleCaregivers.listCaregivers()

Los cuidadores aparecerán automáticamente en la búsqueda del dashboard de pacientes.
`);
