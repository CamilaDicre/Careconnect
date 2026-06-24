-- ============================================================
-- CareConnect: Datos de prueba (opcional)
-- Ejecutar después de crear las tablas
-- ============================================================

INSERT INTO public.profiles (id, username, email, password, role, name, is_permanent, permissions)
VALUES
  (
    'a0000000-0000-4000-8000-000000000001',
    'Ameth',
    'ameth@careconnect.com',
    'Ameth2024!',
    'admin',
    'Ameth Admin',
    TRUE,
    '["all"]'::jsonb
  ),
  (
    'a0000000-0000-4000-8000-000000000002',
    'admin',
    'admin@careconnect.com',
    'admin123',
    'admin',
    'Administrator',
    FALSE,
    '[]'::jsonb
  ),
  (
    'a0000000-0000-4000-8000-000000000003',
    'usuario',
    'usuario@careconnect.com',
    'pass123',
    'paciente',
    'Usuario Demo',
    FALSE,
    '[]'::jsonb
  ),
  (
    'a0000000-0000-4000-8000-000000000004',
    'Josue',
    'josue@careconnect.com',
    'testpass456',
    'cuidador',
    'Josue Caregiver',
    FALSE,
    '[]'::jsonb
  )
ON CONFLICT (email) DO NOTHING;
