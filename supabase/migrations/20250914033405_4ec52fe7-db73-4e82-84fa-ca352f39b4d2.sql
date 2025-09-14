-- Remove the restrictive policy that only shows published articles
DROP POLICY "Anyone can view published articles" ON public.articles;