-- Restrict article reads to published content for public users
DROP POLICY IF EXISTS "Anyone can view all articles" ON public.articles;
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;

CREATE POLICY "Anyone can view published articles"
ON public.articles
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can view all articles"
ON public.articles
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Lock down storage writes to admins only
DROP POLICY IF EXISTS "Anyone can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update article images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete article images" ON storage.objects;

CREATE POLICY "Only admins can upload article images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images' AND public.is_admin());

CREATE POLICY "Only admins can update article images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images' AND public.is_admin());

CREATE POLICY "Only admins can delete article images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'article-images' AND public.is_admin());

-- Add newsletter subscribers table for production-ready newsletter signups
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view newsletter subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (position('@' in email) > 1);

CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.is_admin());
