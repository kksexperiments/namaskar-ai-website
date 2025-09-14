-- Add policy to allow viewing all articles (for admin functionality)
CREATE POLICY "Anyone can view all articles" 
ON public.articles 
FOR SELECT 
USING (true);