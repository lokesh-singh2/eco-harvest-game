-- Add tasks table for quest subtasks
CREATE TABLE public.quest_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_required BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quest_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view quest tasks" 
ON public.quest_tasks 
FOR SELECT 
USING (true);

-- Add user task progress table
CREATE TABLE public.user_task_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  task_id UUID NOT NULL REFERENCES public.quest_tasks(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, task_id)
);

-- Enable RLS
ALTER TABLE public.user_task_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user task progress
CREATE POLICY "Users can view their own task progress" 
ON public.user_task_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own task progress" 
ON public.user_task_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own task progress" 
ON public.user_task_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add some sample tasks for existing quests
INSERT INTO public.quest_tasks (quest_id, title, description, order_index) VALUES
  ((SELECT id FROM public.quests LIMIT 1), 'Prepare the soil', 'Remove weeds and debris from the planting area', 1),
  ((SELECT id FROM public.quests LIMIT 1), 'Apply a 3-inch layer', 'Spread organic mulch evenly around plants', 2),
  ((SELECT id FROM public.quests LIMIT 1), 'Water thoroughly', 'Ensure mulch is properly moistened', 3),
  ((SELECT id FROM public.quests LIMIT 1), 'Monitor moisture growth', 'Check weekly for proper moisture retention', 4);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_user_task_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_task_progress_updated_at
  BEFORE UPDATE ON public.user_task_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_task_progress_updated_at();