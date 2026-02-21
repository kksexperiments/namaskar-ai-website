CREATE TABLE IF NOT EXISTS public.waitlist_fallback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT '',
  page TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone_raw TEXT NOT NULL DEFAULT '',
  phone_e164 TEXT NOT NULL DEFAULT '',
  course_interest TEXT NOT NULL DEFAULT '',
  course_interest_label TEXT NOT NULL DEFAULT '',
  consent BOOLEAN NOT NULL DEFAULT false,
  user_agent TEXT NOT NULL DEFAULT '',
  referrer TEXT NOT NULL DEFAULT '',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS waitlist_fallback_submissions_created_at_idx
  ON public.waitlist_fallback_submissions (created_at DESC);

ALTER TABLE public.waitlist_fallback_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert waitlist fallback submissions"
ON public.waitlist_fallback_submissions;

DROP POLICY IF EXISTS "Admins can view waitlist fallback submissions"
ON public.waitlist_fallback_submissions;

CREATE POLICY "Anyone can insert waitlist fallback submissions"
ON public.waitlist_fallback_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view waitlist fallback submissions"
ON public.waitlist_fallback_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());
