CREATE TYPE public.application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected');

CREATE TABLE public.player_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  date_of_birth date,
  position text,
  location text,
  current_club text,
  message text,
  video_url text,
  status public.application_status NOT NULL DEFAULT 'pending',
  admin_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.player_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.player_applications TO authenticated;
GRANT ALL ON public.player_applications TO service_role;

ALTER TABLE public.player_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
ON public.player_applications FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending' AND reviewed_by IS NULL AND reviewed_at IS NULL AND admin_notes IS NULL);

CREATE POLICY "Admins and editors can view applications"
ON public.player_applications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can update applications"
ON public.player_applications FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete applications"
ON public.player_applications FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_player_applications_updated_at
BEFORE UPDATE ON public.player_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();