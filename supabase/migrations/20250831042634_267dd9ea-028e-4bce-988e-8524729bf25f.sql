-- Enable Row Level Security on tools table
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view tools
CREATE POLICY "Anyone can view tools" 
ON public.tools 
FOR SELECT 
USING (true);