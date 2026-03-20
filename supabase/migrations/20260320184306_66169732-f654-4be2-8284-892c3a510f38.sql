
-- Citizens table
CREATE TABLE public.citizens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  weight TEXT DEFAULT 'N/A',
  height TEXT DEFAULT 'N/A',
  ethnicity TEXT DEFAULT 'Non renseigné',
  hair_color TEXT DEFAULT 'N/A',
  job TEXT DEFAULT 'N/A',
  drivers_license TEXT DEFAULT 'N/A',
  ppa_civil BOOLEAN DEFAULT false,
  is_wanted BOOLEAN DEFAULT false,
  wanted_reason TEXT,
  wanted_by TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Citizen records/reports table
CREATE TABLE public.citizen_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citizen_id UUID REFERENCES public.citizens(id) ON DELETE CASCADE NOT NULL,
  record_type TEXT NOT NULL, -- 'casier', 'ticket', 'arrestation', 'plainte', 'deposition', 'bracelet'
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_records ENABLE ROW LEVEL SECURITY;

-- RLS: authenticated users with MDT role can read/write citizens
CREATE POLICY "MDT users can view citizens" ON public.citizens FOR SELECT TO authenticated USING (public.has_any_mdt_role(auth.uid()));
CREATE POLICY "MDT users can insert citizens" ON public.citizens FOR INSERT TO authenticated WITH CHECK (public.has_any_mdt_role(auth.uid()));
CREATE POLICY "MDT users can update citizens" ON public.citizens FOR UPDATE TO authenticated USING (public.has_any_mdt_role(auth.uid()));

CREATE POLICY "MDT users can view records" ON public.citizen_records FOR SELECT TO authenticated USING (public.has_any_mdt_role(auth.uid()));
CREATE POLICY "MDT users can insert records" ON public.citizen_records FOR INSERT TO authenticated WITH CHECK (public.has_any_mdt_role(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER handle_citizens_updated_at BEFORE UPDATE ON public.citizens FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
