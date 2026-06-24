-- ============================================================
-- CareConnect: Sesiones de cuidado virtual
-- Ejecutar después de 01_profiles.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS public.virtual_care_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  caregiver TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  session_time TEXT,
  session_date TEXT,
  duration TEXT,
  notes TEXT,
  connection TEXT DEFAULT 'pending',
  room_id TEXT,
  session_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_virtual_care_user_id ON public.virtual_care_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_care_status ON public.virtual_care_sessions (status);

DROP TRIGGER IF EXISTS virtual_care_sessions_updated_at ON public.virtual_care_sessions;
CREATE TRIGGER virtual_care_sessions_updated_at
  BEFORE UPDATE ON public.virtual_care_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.virtual_care_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "virtual_care_select_all" ON public.virtual_care_sessions;
CREATE POLICY "virtual_care_select_all" ON public.virtual_care_sessions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "virtual_care_insert_all" ON public.virtual_care_sessions;
CREATE POLICY "virtual_care_insert_all" ON public.virtual_care_sessions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "virtual_care_update_all" ON public.virtual_care_sessions;
CREATE POLICY "virtual_care_update_all" ON public.virtual_care_sessions
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "virtual_care_delete_all" ON public.virtual_care_sessions;
CREATE POLICY "virtual_care_delete_all" ON public.virtual_care_sessions
  FOR DELETE USING (true);
