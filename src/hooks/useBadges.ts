import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_type: string;
  created_at: string;
  isEarned?: boolean;
  earned_at?: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge: Badge;
}

export const useBadges = () => {
  const { user } = useAuth();

  // Fetch all available badges
  const { data: allBadgesData = [], isLoading: allBadgesLoading } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Badge[];
    },
  });

  // Fetch user's earned badges
  const { data: userBadges = [], isLoading: userBadgesLoading } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserBadge[];
    },
    enabled: !!user?.id,
  });

  // Combine all badges with earned status
  const allBadges = allBadgesData.map(badge => ({
    ...badge,
    isEarned: userBadges.some(ub => ub.badge_id === badge.id),
    earned_at: userBadges.find(ub => ub.badge_id === badge.id)?.earned_at
  }));

  return {
    allBadges,
    userBadges,
    isLoading: allBadgesLoading || userBadgesLoading,
  };
};