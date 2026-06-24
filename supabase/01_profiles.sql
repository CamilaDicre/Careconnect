-- ============================================================
-- CareConnect: Tabla de perfiles / usuarios
-- Ejecutar en Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'paciente', 'cuidador', 'patient', 'caregiver')),
  gender TEXT,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  phone TEXT,
  address TEXT,
  birthdate TEXT,
  age TEXT,
  photo TEXT,
  avatar_color TEXT DEFAULT 'linear-gradient(135deg, #667eea, #764ba2)',
  is_permanent BOOLEAN DEFAULT FALSE,
  permissions JSONB DEFAULT '[]'::jsonb,
  profile_data JSONB DEFAULT '{}'::jsonb,
  -- Campos específicos de cuidador
  experience TEXT,
  education TEXT,
  certifications TEXT,
  skills TEXT,
  languages TEXT,
  bio TEXT,
  availability TEXT,
  specialties JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  hourly_rate TEXT,
  work_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles (username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_insert_all" ON public.profiles;
CREATE POLICY "profiles_insert_all" ON public.profiles
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "profiles_update_all" ON public.profiles;
CREATE POLICY "profiles_update_all" ON public.profiles
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "profiles_delete_all" ON public.profiles;
CREATE POLICY "profiles_delete_all" ON public.profiles
  FOR DELETE USING (true);
