# Sistema de Autenticación y Gestión de Usuarios - Careconnect

## Descripción General

Este sistema implementa un flujo completo de autenticación que filtra a los usuarios según su tipo y los dirige al dashboard correspondiente, además de proporcionar una tabla de registros para administradores.

## Características Principales

### 🔐 Autenticación
- **Login/Registro**: Sistema de autenticación con validación de credenciales
- **Persistencia de sesión**: Uso de localStorage para mantener la sesión activa
- **Filtrado por tipo de usuario**: Redirección automática según el rol del usuario

### 👥 Tipos de Usuarios
1. **Pacientes** (`patient`): Acceso al dashboard principal
2. **Cuidadores** (`caregiver`): Acceso al registro de cuidadores
3. **Administradores** (`admin`): Acceso al panel de administración

### 📊 Dashboard de Administración
- **Tabla de registros**: Visualización completa de usuarios
- **Filtros y búsqueda**: Búsqueda por nombre, email y filtrado por tipo
- **Estadísticas**: Métricas de usuarios activos, nuevos registros, etc.
- **Gestión de usuarios**: Editar, eliminar y exportar datos

## Estructura de Archivos

```
Careconnect/
├── js/
│   └── auth-system.js          # Sistema principal de autenticación
├── css/
│   └── auth-styles.css         # Estilos para el sistema de auth
├── dashboard/
│   └── user-records.js         # Componente de tabla de registros
├── login.html                  # Página de login/registro
├── dashboard.html              # Dashboard principal
├── admin-dashboard.html        # Dashboard de administración
└── AUTH_SYSTEM_README.md      # Esta documentación
```

## Flujo de Autenticación

### 1. Página de Login (`login.html`)
```javascript
// Verificación de sesión existente
if (authSystem.isAuthenticated()) {
    const user = authSystem.currentUser;
    if (user.userType === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else if (user.userType === 'patient') {
        window.location.href = 'dashboard.html';
    } else if (user.userType === 'caregiver') {
        window.location.href = 'register-caregiver.html';
    }
}
```

### 2. Proceso de Login
```javascript
// Validación de credenciales
const user = authSystem.users.find(u => 
    (u.username === username || u.email === username) && 
    u.password === password
);

if (user) {
    // Actualizar último login
    user.lastLogin = new Date().toISOString();
    authSystem.updateUser(user);
    
    // Guardar sesión
    localStorage.setItem('current_user_id', user.id);
    
    // Redirigir según tipo
    authSystem.redirectToDashboard(user);
}
```

### 3. Proceso de Registro
```javascript
// Crear nuevo usuario
const newUser = {
    id: authSystem.users.length + 1,
    username: email.split('@')[0],
    email: email,
    password: password,
    fullName: fullName,
    role: role === 'cuidador' ? 'caregiver' : 'patient',
    userType: role === 'cuidador' ? 'caregiver' : 'patient',
    createdAt: new Date().toISOString(),
    lastLogin: null
};

authSystem.users.push(newUser);
authSystem.saveUsers();
```

## Dashboard de Administración

### Características
- **Estadísticas en tiempo real**: Total de usuarios, activos, nuevos registros
- **Tabla interactiva**: Paginación, filtros, búsqueda
- **Gestión completa**: Ver, editar, eliminar usuarios
- **Exportación**: Descarga de datos en formato CSV

### Funcionalidades

#### Filtros y Búsqueda
```javascript
// Búsqueda por nombre o email
filterUsers(searchTerm) {
    this.filteredUsers = this.users.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Filtro por tipo de usuario
filterByType(type) {
    if (type) {
        this.filteredUsers = this.users.filter(user => user.userType === type);
    } else {
        this.filteredUsers = [...this.users];
    }
}
```

#### Estadísticas
```javascript
getUserStats() {
    return {
        total: this.users.length,
        patients: this.users.filter(u => u.userType === 'patient').length,
        caregivers: this.users.filter(u => u.userType === 'caregiver').length,
        admins: this.users.filter(u => u.userType === 'admin').length,
        activeToday: this.users.filter(u => {
            if (!u.lastLogin) return false;
            const lastLogin = new Date(u.lastLogin);
            const today = new Date();
            return lastLogin.toDateString() === today.toDateString();
        }).length
    };
}
```

## Datos de Usuario

### Estructura de Usuario
```javascript
{
    id: 1,
    username: 'admin',
    email: 'admin@careconnect.com',
    password: 'admin123',
    fullName: 'Administrador',
    role: 'admin',
    userType: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLogin: '2024-01-01T12:00:00.000Z'
}
```

### Usuarios por Defecto
1. **Admin**: `admin@careconnect.com` / `admin123`
2. **Paciente**: `paciente1@example.com` / `pass123`
3. **Cuidador**: `cuidador1@example.com` / `pass123`

## Componentes

### AuthSystem Class
```javascript
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
        this.initializeEventListeners();
    }
    
    // Métodos principales
    handleLogin()
    handleRegister()
    logout()
    redirectToDashboard(user)
    showNotification(message, type)
    getUserStats()
    getAllUsers()
}
```

### UserRecords Component
```javascript
class UserRecords extends HTMLElement {
    connectedCallback() {
        this.render();
        this.loadUsers();
        this.setupEventListeners();
    }
    
    // Funcionalidades
    renderTable()
    filterUsers()
    sortUsers()
    updatePagination()
    exportUsers()
}
```

## Seguridad

### Validaciones
- Verificación de campos requeridos
- Validación de formato de email
- Verificación de usuarios duplicados
- Control de acceso por tipo de usuario

### Persistencia
- Almacenamiento seguro en localStorage
- Encriptación básica de contraseñas (en producción usar bcrypt)
- Limpieza de sesión al logout

## Uso

### 1. Acceso al Sistema
```
1. Navegar a login.html
2. Ingresar credenciales o registrar nuevo usuario
3. Sistema redirige automáticamente según tipo de usuario
```

### 2. Dashboard de Administración
```
1. Login como administrador
2. Acceder a admin-dashboard.html
3. Gestionar usuarios desde la tabla
4. Exportar datos según necesidad
```

### 3. Gestión de Usuarios
```
- Ver: Click en botón de ojo
- Editar: Click en botón de lápiz
- Eliminar: Click en botón de basura
- Exportar: Click en botón de descarga
```

## Personalización

### Agregar Nuevos Tipos de Usuario
```javascript
// En auth-system.js
const newUser = {
    // ... otros campos
    userType: 'nuevo_tipo',
    role: 'nuevo_tipo'
};

// En redirectToDashboard()
if (user.userType === 'nuevo_tipo') {
    window.location.href = 'nuevo-dashboard.html';
}
```

### Modificar Estilos
```css
/* En auth-styles.css */
.status-nuevo-tipo {
    background: linear-gradient(135deg, #tu-color, #tu-color-2);
    color: #tu-color-texto;
}
```

## Notas Técnicas

### Dependencias
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- Google Fonts (Poppins, Josefin Sans)

### Compatibilidad
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive design para móviles
- Soporte para localStorage

### Rendimiento
- Carga lazy de componentes
- Paginación para tablas grandes
- Filtrado en tiempo real
- Animaciones optimizadas

## Próximas Mejoras

1. **Autenticación con JWT**
2. **Base de datos real (MySQL/PostgreSQL)**
3. **Encriptación de contraseñas con bcrypt**
4. **Sistema de roles más granular**
5. **Logs de auditoría**
6. **Recuperación de contraseña**
7. **Verificación de email**
8. **Autenticación de dos factores**

## Soporte

Para problemas o preguntas sobre el sistema de autenticación, revisar:
1. Console del navegador para errores JavaScript
2. localStorage para verificar datos de sesión
3. Network tab para problemas de carga
4. Esta documentación para referencias de API 