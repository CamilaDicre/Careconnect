# CareConnect + Supabase

Esta carpeta contiene las plantillas SQL para crear las tablas de CareConnect en tu proyecto Supabase.

**URL del proyecto:** `https://sbhonyfcchufsthadcyg.supabase.co`

## Configuración rápida

### 1. Obtener la clave anon

1. Entra a [Supabase Dashboard](https://supabase.com/dashboard)
2. Abre tu proyecto → **Settings** → **API**
3. Copia la clave **anon public**
4. Pégala en `js/supabase-config.js` (campo `anonKey`)

### 2. Crear las tablas

En el panel de Supabase, ve a **SQL Editor** y ejecuta los archivos en este orden:

| Orden | Archivo | Descripción |
|-------|---------|-------------|
| 1 | `01_profiles.sql` | Usuarios y perfiles |
| 2 | `02_medicines.sql` | Medicamentos por usuario |
| 3 | `03_virtual_care_sessions.sql` | Sesiones de cuidado virtual |
| 4 | `04_seed_data.sql` | *(Opcional)* Usuarios de prueba |

### 3. Políticas RLS

Los archivos SQL incluyen políticas básicas de Row Level Security. Para desarrollo puedes usar la clave `anon` con acceso público controlado. En producción, configura Supabase Auth y ajusta las políticas.

## Estructura de tablas

```
profiles
├── id (UUID)
├── username, email, password, role
├── profile_data (JSONB) → datos médicos, contacto, preferencias
└── campos de cuidador (experience, bio, etc.)

medicines
├── user_id → profiles.id
└── name, dosage, frequency, time

virtual_care_sessions
├── user_id → profiles.id
└── caregiver, type, status, date, notes, etc.
```

## Migración desde localStorage

Los datos que antes se guardaban en `localStorage` (`users`, `userProfile_*`, `medicines_*`, `virtualCareSessions`) ahora se almacenan en Supabase.

La sesión activa (`loggedInUser`, `userRole`, `currentUserId`) usa **sessionStorage** (se borra al cerrar el navegador).

Las preferencias de interfaz (tema, sidebar, cookies) siguen en **localStorage** porque no son datos de base de datos.

## Scripts del proyecto

| Archivo | Función |
|---------|---------|
| `js/supabase-config.js` | URL y clave anon |
| `js/supabase-client.js` | Cliente Supabase (CDN) |
| `js/careconnect-session.js` | Sesión del usuario (sessionStorage) |
| `js/careconnect-db.js` | Operaciones CRUD con Supabase |
| `js/validation-utils.js` | Sanitización y validación (sin almacenamiento) |
| `js/ui-preferences.js` | Tema, sidebar, cookies (localStorage UI) |
