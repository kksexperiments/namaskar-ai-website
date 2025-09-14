-- Add INSERT policy for articles (allowing anyone to create articles)
CREATE POLICY "Anyone can create articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (true);

-- Add UPDATE policy for articles (allowing anyone to update articles)
CREATE POLICY "Anyone can update articles" 
ON public.articles 
FOR UPDATE 
USING (true);

-- Add DELETE policy for articles (allowing anyone to delete articles)
CREATE POLICY "Anyone can delete articles" 
ON public.articles 
FOR DELETE 
USING (true);