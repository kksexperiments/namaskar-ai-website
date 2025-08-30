-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for categories (public read access)
CREATE POLICY "Anyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- Enable RLS on prompts table if not already enabled
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for prompts (public read access)
CREATE POLICY "Anyone can view prompts" 
ON public.prompts 
FOR SELECT 
USING (true);

-- Insert the Assam-specific categories
INSERT INTO public.categories (name) VALUES
  ('Government Schemes & Opportunities'),
  ('Content Creation & Cultural Promotion'),
  ('Local Business & Trade'),
  ('Education & Career Growth'),
  ('Personal Development & Life Skills'),
  ('Assam-Specific AI Applications');