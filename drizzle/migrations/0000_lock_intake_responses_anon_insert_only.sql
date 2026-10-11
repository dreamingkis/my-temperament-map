REVOKE ALL ON public.intake_responses FROM anon;
GRANT INSERT ON public.intake_responses TO anon;
REVOKE UPDATE, DELETE ON public.intake_responses FROM authenticated;
GRANT SELECT, INSERT ON public.intake_responses TO authenticated;
GRANT ALL ON public.intake_responses TO service_role;
ALTER TABLE public.intake_responses ENABLE ROW LEVEL SECURITY;