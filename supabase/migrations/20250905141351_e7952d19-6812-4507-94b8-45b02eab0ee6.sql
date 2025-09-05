-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  sustainability_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quests table
CREATE TABLE public.quests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_quests table to track user progress
CREATE TABLE public.user_quests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'recommended' CHECK (status IN ('recommended', 'in-progress', 'completed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, quest_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  category TEXT DEFAULT 'training',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public profiles viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Create RLS policies for quests (public read)
CREATE POLICY "Anyone can view quests" 
ON public.quests FOR SELECT 
USING (true);

-- Create RLS policies for user_quests
CREATE POLICY "Users can view their own quest progress" 
ON public.user_quests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quest progress" 
ON public.user_quests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quest progress" 
ON public.user_quests FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for badges (public read)
CREATE POLICY "Anyone can view badges" 
ON public.badges FOR SELECT 
USING (true);

-- Create RLS policies for user_badges
CREATE POLICY "Users can view their own badges" 
ON public.user_badges FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" 
ON public.user_badges FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public user badges viewable by everyone" 
ON public.user_badges FOR SELECT 
USING (true);

-- Create RLS policies for rewards (public read)
CREATE POLICY "Anyone can view rewards" 
ON public.rewards FOR SELECT 
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_quests_updated_at
  BEFORE UPDATE ON public.user_quests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'display_name', new.email, 'New Farmer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.quests (title, description, points, category) VALUES
('Mulching Master', 'Complete 3 weeks of mulching on your banana fields to improve soil moisture retention and reduce weed growth.', 75, 'Soil Health'),
('Water Conservation Champion', 'Reduce water usage by 15% this month using drip irrigation and water harvesting techniques.', 100, 'Water Management'),
('Organic Pest Controller', 'Switch to bio-pesticides for the monsoon season and document pest control effectiveness.', 90, 'Organic Farming'),
('Mixed Cropping Pioneer', 'Introduce mixed cropping with legumes on 1 acre to improve soil nitrogen and increase biodiversity.', 120, 'Sustainable Practices'),
('Soil Health Analyst', 'Complete a comprehensive soil health test and apply recommendations for optimal nutrient management.', 85, 'Soil Health'),
('Composting Expert', 'Create and maintain a composting system for farm waste, producing organic fertilizer for crops.', 70, 'Waste Management'),
('Crop Rotation Specialist', 'Implement a 3-crop rotation cycle to maintain soil health and reduce pest and disease pressure.', 110, 'Sustainable Practices'),
('Green Manure Champion', 'Cultivate and incorporate green manure crops to enhance soil fertility naturally.', 95, 'Soil Health');

INSERT INTO public.badges (name, description, icon_type) VALUES
('Water Saver', 'Reduced water consumption by 20% through efficient irrigation practices', 'water-saver'),
('Organic Champion', 'Successfully transitioned to 100% organic pest management', 'organic-champion'),
('Soil Guardian', 'Maintained healthy soil through composting and organic matter', 'soil-guardian'),
('Eco Warrior', 'Completed 10+ sustainability quests', 'eco-warrior'),
('Innovation Leader', 'First to adopt new sustainable farming techniques in the village', 'innovation-leader');

INSERT INTO public.rewards (title, description, points_cost, category) VALUES
('Advanced Organic Inputs Training', 'Access to comprehensive online training on organic farming inputs and techniques', 500, 'training'),
('Krishi Karman Scheme Bonus', '+10 points boost towards Krishi Karman scheme eligibility evaluation', 1000, 'government'),
('Progressive Farmer Spotlight', 'Featured profile in the monthly Progressive Farmer Spotlight newsletter', 2500, 'recognition'),
('Sustainable Agriculture Certification', 'Official certification in sustainable agriculture practices', 1500, 'certification'),
('Premium Weather Advisory', '6-month access to premium weather and crop advisory services', 800, 'services'),
('Eco-Friendly Equipment Discount', '15% discount on eco-friendly farming equipment purchases', 3000, 'equipment');