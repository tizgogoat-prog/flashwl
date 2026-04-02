-- 1. Activer RLS sur whitelist_applications
ALTER TABLE public.whitelist_applications ENABLE ROW LEVEL SECURITY;

-- 2. Politique : seuls les admins MDT peuvent voir les candidatures
CREATE POLICY "Admins can view all applications"
ON public.whitelist_applications
FOR SELECT
TO authenticated
USING (public.is_mdt_admin(auth.uid()));

-- 3. Politique : tout le monde peut insérer (soumettre une candidature)
CREATE POLICY "Anyone can submit an application"
ON public.whitelist_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Politique : seuls les admins peuvent modifier (changer le statut)
CREATE POLICY "Admins can update applications"
ON public.whitelist_applications
FOR UPDATE
TO authenticated
USING (public.is_mdt_admin(auth.uid()));

-- 5. Politique : seuls les admins peuvent supprimer
CREATE POLICY "Admins can delete applications"
ON public.whitelist_applications
FOR DELETE
TO authenticated
USING (public.is_mdt_admin(auth.uid()));

-- 6. Ajouter des politiques manquantes sur citizen_records
CREATE POLICY "MDT users can update records"
ON public.citizen_records
FOR UPDATE
TO authenticated
USING (has_any_mdt_role(auth.uid()));

CREATE POLICY "MDT users can delete records"
ON public.citizen_records
FOR DELETE
TO authenticated
USING (has_any_mdt_role(auth.uid()));

-- 7. Politique de suppression pour citizens
CREATE POLICY "MDT users can delete citizens"
ON public.citizens
FOR DELETE
TO authenticated
USING (has_any_mdt_role(auth.uid()));
