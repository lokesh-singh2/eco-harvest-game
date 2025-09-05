import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Reward {
  id: string;
  title: string;
  description: string;
  points_cost: number;
  category: string;
  created_at: string;
}

export const useRewards = () => {
  const { data: rewards = [], isLoading } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('points_cost', { ascending: true });
      
      if (error) throw error;
      return data as Reward[];
    },
  });

  return {
    rewards,
    isLoading,
  };
};