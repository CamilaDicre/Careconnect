-- ============================================================
-- CareConnect: Medicamentos por usuario
-- Ejecutar después de 01_profiles.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  time TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_medicines_user_id ON public.medicines (user_id);

DROP TRIGGER IF EXISTS medicines_updated_at ON public.medicines;
CREATE TRIGGER medicines_updated_at
  BEFORE UPDATE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "medicines_select_all" ON public.medicines;
CREATE POLICY "medicines_select_all" ON public.medicines
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "medicines_insert_all" ON public.medicines;
CREATE POLICY "medicines_insert_all" ON public.medicines
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "medicines_update_all" ON public.medicines;
CREATE POLICY "medicines_update_all" ON public.medicines
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "medicines_delete_all" ON public.medicines;
CREATE POLICY "medicines_delete_all" ON public.medicines
  FOR DELETE USING (true);
