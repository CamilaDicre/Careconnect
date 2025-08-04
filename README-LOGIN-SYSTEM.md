# Sistema de Login y Registro - Careconnect

## Descripción
Este sistema permite a los usuarios registrarse e iniciar sesión usando localStorage para almacenar los datos de manera segura.

## Características

### ✅ Funcionalidades Implementadas
- **Registro de usuarios**: Tanto pacientes como cuidadores
- **Login con username o email**: Flexibilidad en el campo de identificación
- **Validación de datos**: Sanitización y validación de entradas
- **Almacenamiento seguro**: Uso de localStorage con utilidades de seguridad
- **Manejo de errores**: Validación y mensajes de error claros
- **Sesiones persistentes**: Los datos de sesión se mantienen entre páginas

### 🔧 Archivos Principales

#### 1. `js/localStorage-utils.js`
Utilidades para manejar localStorage de manera segura:
- `setItem()`: Guarda datos con validación
- `getItem()`: Recupera datos con valor por defecto
- `removeItem()`: Elimina elementos específicos
- `isAvailable()`: Verifica disponibilidad de localStorage
- `sanitizeText()`: Sanitiza texto para evitar XSS
- `isValidEmail()`: Valida formato de email
- `normalizeDate()`: Normaliza fechas a formato DD-MM-YYYY

#### 2. `pages/login.html` + `js/login.js`
Sistema de login y registro básico:
- Login con username/email y contraseña
- Registro de pacientes y cuidadores básicos
- Validación de campos
- Redirección según rol de usuario

#### 3. `pages/register-caregiver.html`
Registro completo de cuidadores:
- Formulario detallado con información profesional
- Validación de campos requeridos
- Sanitización de datos
- Guardado en localStorage

## 🚀 Cómo Usar

### 1. Registro de Usuario Básico
1. Ve a `pages/login.html`
2. Haz clic en "Register"
3. Completa el formulario básico
4. Selecciona tu rol (paciente o cuidador)

### 2. Registro Completo de Cuidador
1. Ve a `pages/register-caregiver.html`
2. Completa todos los campos requeridos
3. Incluye información profesional detallada
4. El sistema guardará automáticamente en localStorage

### 3. Inicio de Sesión
1. Ve a `pages/login.html`
2. Usa tu username o email
3. Ingresa tu contraseña
4. Serás redirigido según tu rol

## 📊 Estructura de Datos

### Usuario en localStorage
```javascript
{
  username: "Nombre del usuario",
  email: "usuario@email.com",
  password: "contraseña",
  role: "cuidador" | "paciente" | "admin",
  gender: "masculino" | "femenino",
  registrationDate: "2024-01-01T00:00:00.000Z",
  id: "unique_id",
  
  // Campos adicionales para cuidadores
  phone: "123-456-7890",
  birthdate: "15-03-1990",
  address: "Dirección completa",
  experience: "5 years",
  education: "Nursing Degree",
  certifications: "CPR, First Aid",
  skills: "Patient care, medication management",
  languages: "English, Spanish",
  bio: "Experiencia profesional",
  availability: "Full-time"
}
```

### Datos de Sesión
```javascript
{
  loggedInUser: "username",
  userRole: "cuidador",
  currentUserId: "user_id"
}
```

## 🧪 Archivos de Prueba

### `test-login.html`
Sistema de pruebas completo:
- Test de localStorage
- Creación de usuarios de prueba
- Simulación de login
- Visualización de usuarios
- Test de logout
- Limpieza de datos

### `test-registration.html`
Pruebas específicas del sistema de registro:
- Test de utilidades de localStorage
- Creación de usuarios de prueba
- Validación de datos
- Simulación de login

## 🔒 Seguridad

### Validaciones Implementadas
- ✅ Sanitización de texto para evitar XSS
- ✅ Validación de formato de email
- ✅ Validación de longitud de campos
- ✅ Normalización de fechas
- ✅ Verificación de duplicados por email
- ✅ Validación de campos requeridos

### Límites de Seguridad
- Máximo 100 caracteres para nombres y emails
- Máximo 50 caracteres para contraseñas
- Máximo 200 caracteres para direcciones
- Máximo 500 caracteres para biografías
- Máximo 300 caracteres para habilidades

## 🎯 Flujos de Usuario

### Paciente
1. Registro → `pages/login.html`
2. Login → Dashboard principal → `dashboard/dashboard.html`

### Cuidador
1. Registro básico → `pages/login.html`
2. Registro completo → `pages/register-caregiver.html`
3. Login → Dashboard de cuidador → `dashboard/caregivers pro/Caregiver-pro.html`

### Admin
1. Login con credenciales de admin
2. Dashboard de administración → `dashboard/admin-dashboard.html`

## 🐛 Solución de Problemas

### localStorage no disponible
- Verifica que el navegador soporte localStorage
- Asegúrate de que no esté en modo privado
- Prueba en otro navegador

### Error de registro
- Verifica que todos los campos requeridos estén completos
- Asegúrate de que el email no esté duplicado
- Verifica el formato de la fecha (DD-MM-YYYY)

### Error de login
- Verifica que el username/email y contraseña sean correctos
- Asegúrate de que el usuario esté registrado
- Prueba con el email en lugar del username

## 📝 Notas Técnicas

- El sistema usa localStorage para persistencia de datos
- Los datos se sanitizan antes de guardar
- Las contraseñas se almacenan en texto plano (no recomendado para producción)
- El sistema incluye usuarios por defecto para pruebas
- Todos los errores se manejan con try-catch

## 🔄 Próximas Mejoras

- [ ] Encriptación de contraseñas
- [ ] Validación de contraseñas más robusta
- [ ] Recuperación de contraseña
- [ ] Verificación de email
- [ ] Integración con base de datos real
- [ ] Autenticación con tokens JWT 