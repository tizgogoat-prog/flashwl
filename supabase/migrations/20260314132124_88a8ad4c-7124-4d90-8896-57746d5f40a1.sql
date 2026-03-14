
CREATE TABLE public.whitelist_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_message_id text,
  prenom text NOT NULL,
  age text NOT NULL,
  pays text NOT NULL,
  disponibilites text NOT NULL,
  pseudo_discord text NOT NULL,
  id_discord text NOT NULL,
  experience_temps text NOT NULL,
  experience_serveurs text NOT NULL,
  perso_nom text NOT NULL,
  perso_age text NOT NULL,
  perso_histoire text NOT NULL,
  motivation text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- No RLS needed - only accessed by edge functions with service role
ALTER TABLE public.whitelist_applications ENABLE ROW LEVEL SECURITY;
