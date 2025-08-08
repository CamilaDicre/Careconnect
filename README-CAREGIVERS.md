# Cuidadores de Prueba - CareConnect

Este documento explica cómo usar los cuidadores de prueba en el sistema CareConnect.

## 📋 Descripción

Los cuidadores de prueba son usuarios ficticios que se pueden agregar al sistema para probar la funcionalidad de búsqueda de cuidadores en el dashboard de pacientes.

## 🚀 Cómo Usar

### Opción 1: Página de Prueba (Recomendado)

1. Abre el archivo `test-caregivers.html` en tu navegador
2. Haz clic en "Agregar Cuidadores de Prueba"
3. Los cuidadores aparecerán automáticamente en la búsqueda del dashboard

### Opción 2: Consola del Navegador

1. Abre cualquier página del proyecto en el navegador
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Console"
4. Ejecuta uno de estos comandos:

```javascript
// Agregar cuidadores de prueba
SampleCaregivers.createSampleCaregivers()

// Eliminar cuidadores de prueba
SampleCaregivers.removeSampleCaregivers()

// Ver todos los cuidadores registrados
SampleCaregivers.listCaregivers()
```

## 👥 Cuidadores Incluidos

El sistema incluye 8 cuidadores de prueba con diferentes especialidades:

1. **María González** - Cuidado de ancianos, Medicina general (4.8⭐)
2. **Carlos Rodríguez** - Fisioterapia, Rehabilitación (4.6⭐)
3. **Ana Martínez** - Cuidado pediátrico, Nutrición (4.9⭐)
4. **Luis Fernández** - Cuidado post-operatorio, Enfermería (4.7⭐)
5. **Carmen López** - Cuidado de demencia, Psicología (4.5⭐)
6. **Javier Moreno** - Cuidado de discapacitados, Terapia ocupacional (4.4⭐)
7. **Isabel Ruiz** - Cuidado paliativo, Enfermería oncológica (4.8⭐)
8. **Roberto Silva** - Cuidado de diabetes, Educación sanitaria (4.6⭐)

## 📊 Datos de los Cuidadores

Cada cuidador incluye:
- **Nombre y email** únicos
- **Especialidades** específicas
- **Calificación** (rating)
- **Años de experiencia**
- **Ubicación** (ciudad, país)
- **Precio por hora**
- **Foto de perfil** generada automáticamente
- **Descripción** profesional

## 🔧 Funcionalidades

### Agregar Cuidadores
- No duplica cuidadores existentes
- Mantiene usuarios existentes
- Agrega solo cuidadores nuevos

### Eliminar Cuidadores
- Solo elimina los cuidadores de prueba
- Mantiene otros usuarios del sistema
- Identifica por email específico

### Ver Cuidadores
- Muestra todos los cuidadores registrados
- Incluye información detallada
- Formato legible en consola

## 🎯 Uso en el Dashboard

Una vez agregados, los cuidadores aparecerán en:
- **Dashboard de Pacientes** → Sección "Search Caregivers"
- **Búsqueda por nombre** o especialidad
- **Filtros** por ubicación y disponibilidad
- **Tarjetas** con información completa

## 🛠️ Archivos Relacionados

- `js/sample-caregivers.js` - Script principal
- `test-caregivers.html` - Página de prueba
- `dashboard/caregiver-search.js` - Componente de búsqueda
- `js/localStorage-utils.js` - Utilidades de almacenamiento

## ⚠️ Notas Importantes

1. **Datos de Prueba**: Los cuidadores son ficticios y solo para pruebas
2. **Almacenamiento Local**: Los datos se guardan en localStorage del navegador
3. **No Persistente**: Los datos se pierden al limpiar el navegador
4. **Seguridad**: No usar en producción, solo para desarrollo

## 🔄 Comandos Útiles

```javascript
// Verificar si hay cuidadores
SampleCaregivers.listCaregivers()

// Limpiar todos los usuarios (cuidado!)
localStorage.removeItem('users')

// Ver espacio usado en localStorage
LocalStorageUtils.getUsedSpace()
```

## 📞 Soporte

Si tienes problemas:
1. Verifica que el archivo `sample-caregivers.js` esté cargado
2. Revisa la consola del navegador para errores
3. Limpia el localStorage si hay conflictos
4. Recarga la página después de agregar cuidadores
