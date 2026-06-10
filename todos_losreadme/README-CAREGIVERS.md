# 🏥 Cuidadores de Prueba - CareConnect

Este documento describe la funcionalidad de cuidadores de prueba para el sistema CareConnect.

## 📋 Descripción

Los cuidadores de prueba son usuarios simulados que se crean en el `localStorage` para probar la funcionalidad de búsqueda de cuidadores en el dashboard de pacientes. Estos cuidadores aparecen en la sección "Find caregiver" del dashboard.

## 🚀 Funcionalidades

### 1. Creación de Cuidadores de Prueba
- **8 cuidadores profesionales** con diferentes especialidades
- **Datos completos**: nombre, email, especialidad, experiencia, ubicación, precio, calificación
- **Fotos generadas automáticamente** usando UI Avatars
- **Roles específicos**: `caregiver` o `cuidador`

### 2. Gestión de Cuidadores
- ✅ **Agregar**: Crear nuevos cuidadores de prueba
- ✅ **Listar**: Ver todos los cuidadores registrados
- ✅ **Eliminar**: Remover cuidadores de prueba del sistema
- ✅ **Verificar**: Comprobar el estado del sistema

### 3. Búsqueda Mejorada
- 🔍 **Búsqueda por nombre o especialidad**
- 📍 **Filtro por ubicación**
- 🏥 **Filtro por especialidad médica**
- 📊 **Ordenamiento**: por nombre, calificación, experiencia, precio
- 📱 **Diseño responsive** y moderno
- 🎨 **UI mejorada** con gradientes y animaciones

## 📁 Archivos Principales

### Core Files
- `js/sample-caregivers.js` - Clase principal para gestionar cuidadores de prueba
- `dashboard/caregiver-search.js` - Componente de búsqueda mejorado
- `test-caregivers.html` - Página de gestión de cuidadores de prueba
- `test-caregiver-search.html` - Página de prueba del componente de búsqueda

### Dependencias
- `js/localStorage-utils.js` - Utilidades para localStorage
- `dashboard/dashboard.html` - Dashboard principal donde se usa el componente

## 🛠️ Uso

### Opción 1: Página de Gestión (`test-caregivers.html`)
1. Abrir `test-caregivers.html` en el navegador
2. Usar los botones para gestionar cuidadores:
   - **Agregar Cuidadores**: Crea 8 cuidadores de prueba
   - **Listar Cuidadores**: Muestra información en consola
   - **Eliminar Cuidadores**: Remueve cuidadores de prueba
   - **Limpiar Todo**: Limpia localStorage

### Opción 2: Página de Prueba (`test-caregiver-search.html`)
1. Abrir `test-caregiver-search.html` en el navegador
2. **Agregar cuidadores** usando el botón correspondiente
3. **Probar la búsqueda** con los filtros mejorados
4. **Ver resultados** en tiempo real

### Opción 3: Consola del Navegador
```javascript
// Agregar cuidadores de prueba
SampleCaregivers.createSampleCaregivers();

// Listar todos los cuidadores
SampleCaregivers.listCaregivers();

// Eliminar cuidadores de prueba
SampleCaregivers.removeSampleCaregivers();
```

## 👥 Cuidadores de Prueba Incluidos

| Nombre | Especialidad | Experiencia | Ubicación | Precio | Calificación |
|--------|--------------|-------------|-----------|--------|--------------|
| María González | Cuidado de ancianos, Medicina general | 8 años | Madrid, España | $25/hora | 4.8 |
| Carlos Rodríguez | Fisioterapia, Rehabilitación | 5 años | Barcelona, España | $30/hora | 4.6 |
| Ana Martínez | Cuidado pediátrico, Nutrición | 12 años | Valencia, España | $28/hora | 4.9 |
| Luis Fernández | Cuidado post-operatorio, Enfermería | 10 años | Sevilla, España | $32/hora | 4.7 |
| Carmen López | Cuidado de demencia, Psicología | 15 años | Bilbao, España | $35/hora | 4.5 |
| Javier Moreno | Cuidado de discapacitados, Terapia ocupacional | 7 años | Málaga, España | $27/hora | 4.4 |
| Isabel Ruiz | Cuidado paliativo, Enfermería oncológica | 18 años | Zaragoza, España | $40/hora | 4.8 |
| Roberto Silva | Cuidado de diabetes, Educación sanitaria | 9 años | Granada, España | $29/hora | 4.6 |

## 🎨 Mejoras en el Componente de Búsqueda

### Características Nuevas
- **Diseño moderno** con gradientes y sombras
- **Filtros avanzados**: nombre, ubicación, especialidad
- **Ordenamiento inteligente**: por múltiples criterios
- **Responsive design** para móviles y tablets
- **Animaciones suaves** y efectos hover
- **Búsqueda en tiempo real** sin necesidad de botón
- **Contador de resultados** dinámico
- **Mensajes informativos** cuando no hay resultados

### Filtros Disponibles
- 🔍 **Búsqueda general**: nombre, especialidad, descripción
- 📍 **Ubicación**: filtrar por ciudad o región
- 🏥 **Especialidad**: cuidado de ancianos, fisioterapia, enfermería, etc.
- 📊 **Ordenamiento**: nombre, calificación, experiencia, precio

### Interfaz de Usuario
- **Cards modernas** con información completa
- **Fotos de perfil** generadas automáticamente
- **Badges de disponibilidad** con colores distintivos
- **Botones de contacto** con estados interactivos
- **Información detallada** de cada cuidador

## 🔧 Integración con el Dashboard

### En el Dashboard de Pacientes
1. Navegar a la sección "Find caregiver"
2. Los cuidadores aparecen automáticamente si están registrados
3. Usar los filtros para encontrar cuidadores específicos
4. Hacer clic en "Contactar" para iniciar comunicación

### Scripts Requeridos
```html
<!-- En dashboard/dashboard.html -->
<script src="../js/localStorage-utils.js"></script>
<script src="caregiver-search.js"></script>
```

## 🐛 Solución de Problemas

### Los cuidadores no aparecen
1. Verificar que `localStorage` esté habilitado
2. Ejecutar `SampleCaregivers.createSampleCaregivers()`
3. Recargar la página del dashboard
4. Verificar la consola para errores

### Errores de consola
- **LocalStorageUtils not defined**: Asegurar que `localStorage-utils.js` se cargue antes
- **CaregiverSearch not defined**: Verificar que `caregiver-search.js` esté incluido

### Problemas de filtrado
- Verificar que los roles sean `caregiver` o `cuidador`
- Comprobar que los campos de datos estén completos
- Revisar la consola para errores de JavaScript

## 📊 Estado del Sistema

### Verificar Cuidadores Registrados
```javascript
// En la consola del navegador
const users = JSON.parse(localStorage.getItem('users') || '[]');
const caregivers = users.filter(u => u.role === 'caregiver' || u.role === 'cuidador');
console.log(`Cuidadores registrados: ${caregivers.length}`);
```

### Limpiar Sistema
```javascript
// Eliminar solo cuidadores de prueba
SampleCaregivers.removeSampleCaregivers();

// Limpiar todo el localStorage (¡CUIDADO!)
localStorage.clear();
```

## 🎯 Próximas Mejoras

- [ ] **Sistema de mensajería** entre pacientes y cuidadores
- [ ] **Calificaciones y reseñas** de cuidadores
- [ ] **Sistema de citas** y programación
- [ ] **Filtros avanzados** por disponibilidad horaria
- [ ] **Mapa de ubicaciones** de cuidadores
- [ ] **Chat en tiempo real** con cuidadores
- [ ] **Sistema de pagos** integrado
- [ ] **Notificaciones push** para nuevas solicitudes

## 📞 Contacto

Para soporte técnico o preguntas sobre esta funcionalidad, consultar la documentación del proyecto o contactar al equipo de desarrollo.

---

**Versión**: 2.0  
**Última actualización**: Diciembre 2024  
**Estado**: ✅ Funcional y probado
