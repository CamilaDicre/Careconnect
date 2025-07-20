# 👥 Usuarios Administradores - Careconnect

## Descripción

Este documento contiene las credenciales de acceso para todos los miembros del equipo que tienen permisos de administrador en el sistema Careconnect.

## 🔐 Credenciales de Acceso

### **Super Administradores**

#### **Ameth**
- **Email**: `ameth@careconnect.com`
- **Contraseña**: `ameth123`
- **Nombre**: Ameth
- **Rol**: Super Admin
- **Permisos**: Control total del sistema

#### **Camila**
- **Email**: `camila@careconnect.com`
- **Contraseña**: `camila123`
- **Nombre**: Camila
- **Rol**: Super Admin
- **Permisos**: Control total del sistema

### **Equipo de Desarrollo**

#### **Josué**
- **Email**: `josue@careconnect.com`
- **Contraseña**: `josue123`
- **Nombre**: Josué
- **Rol**: Admin

#### **David**
- **Email**: `david@careconnect.com`
- **Contraseña**: `david123`
- **Nombre**: David
- **Rol**: Admin

#### **Ariel**
- **Email**: `ariel@careconnect.com`
- **Contraseña**: `ariel123`
- **Nombre**: Ariel
- **Rol**: Admin

#### **Nixon**
- **Email**: `nixon@careconnect.com`
- **Contraseña**: `nixon123`
- **Nombre**: Nixon
- **Rol**: Admin

#### **Jenny**
- **Email**: `jenny@careconnect.com`
- **Contraseña**: `jenny123`
- **Nombre**: Jenny
- **Rol**: Admin

## 🎯 Usuarios de Prueba

### **Paciente**
- **Email**: `paciente1@example.com`
- **Contraseña**: `pass123`
- **Nombre**: María González
- **Rol**: Paciente

### **Cuidador**
- **Email**: `cuidador1@example.com`
- **Contraseña**: `pass123`
- **Nombre**: Carlos Rodríguez
- **Rol**: Cuidador

## 🔐 Sistema de Permisos

### **Niveles de Acceso**

#### **Super Admin (Ameth y Camila)**
- ✅ **Control total** del sistema
- ✅ **Gestionar** todos los usuarios
- ✅ **Editar/Eliminar** administradores básicos
- ✅ **Acceso completo** a todas las funciones
- ❌ **No pueden** editarse entre sí

#### **Admin Básico (Josué, David, Ariel, Nixon, Jenny)**
- ✅ **Ver** todos los usuarios
- ✅ **Gestionar** pacientes y cuidadores
- ❌ **No puede** gestionar administradores
- ❌ **No puede** editar otros admins

## 🚀 Cómo Acceder

### **1. Ir al Login**
```
Navegar a: login.html
```

### **2. Ingresar Credenciales**
```
Email: [correo del usuario]
Contraseña: [contraseña correspondiente]
```

### **3. Acceso Automático**
- Todos los usuarios admin serán redirigidos automáticamente al **Panel de Administración**
- Los pacientes irán al **Dashboard Principal**
- Los cuidadores irán al **Registro de Cuidadores**

## 📊 Panel de Administración

### **Funcionalidades Disponibles**
- ✅ **Gestión de Usuarios**: Ver, editar, eliminar usuarios
- ✅ **Estadísticas**: Métricas en tiempo real
- ✅ **Filtros**: Búsqueda y filtrado avanzado
- ✅ **Exportación**: Descarga de datos en CSV
- ✅ **Registros**: Tabla completa de usuarios

### **Acceso al Panel**
```
URL: admin-dashboard.html
```

## 🔧 Gestión de Usuarios

### **Ver Todos los Usuarios**
- Acceder al panel de administración
- La tabla muestra todos los usuarios registrados
- Filtros por tipo: Pacientes, Cuidadores, Administradores

### **Editar Usuario**
- Click en el botón de lápiz (✏️)
- Modificar datos del usuario
- Guardar cambios

### **Eliminar Usuario**
- Click en el botón de basura (🗑️)
- Confirmar eliminación

### **Exportar Datos**
- Click en "Exportar"
- Descarga automática en formato CSV

## 📈 Estadísticas Disponibles

- **Total de Usuarios**: Número total de usuarios registrados
- **Pacientes**: Cantidad de usuarios tipo paciente
- **Cuidadores**: Cantidad de usuarios tipo cuidador
- **Administradores**: Cantidad de usuarios tipo admin
- **Usuarios Activos**: Usuarios que han iniciado sesión hoy

## 📊 **Jerarquía de Permisos**

| Usuario | Rol | Gestionar Admins | Gestionar Usuarios | Editar Super Admins | Auto-eliminación |
|---------|-----|------------------|-------------------|-------------------|------------------|
| **Ameth** | Super Admin | ✅ | ✅ | ❌ | ❌ |
| **Camila** | Super Admin | ✅ | ✅ | ❌ | ❌ |
| **Otros** | Admin Básico | ❌ | ✅ (solo pacientes/cuidadores) | ❌ | ❌ |

## 🔒 Seguridad

### **Recomendaciones**
1. **Cambiar contraseñas**: Los usuarios admin deben cambiar sus contraseñas por defecto
2. **Acceso limitado**: Solo miembros del equipo deben tener acceso admin
3. **Logs de actividad**: El sistema registra todos los inicios de sesión
4. **Backup regular**: Los datos se almacenan en localStorage

### **Contraseñas Seguras**
- Usar combinación de letras, números y símbolos
- Mínimo 8 caracteres
- No compartir credenciales
- Cambiar periódicamente

## 🆘 Soporte

### **Problemas Comunes**
1. **No puedo acceder**: Verificar email y contraseña
2. **No aparece el panel**: Verificar que el usuario sea tipo admin
3. **Datos no se guardan**: Verificar localStorage del navegador

### **Contacto**
Para problemas técnicos o solicitudes de acceso, contactar al equipo de desarrollo.

---

**Última actualización**: Enero 2024  
**Versión del sistema**: 1.0  
**Desarrollado por**: Equipo Careconnect 