import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isCurrentUser: boolean;
  userId: string;
}

export const useLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Fetch all profiles ordered by sustainability_score
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('user_id, display_name, sustainability_score')
        .order('sustainability_score', { ascending: false });

      if (error) {
        throw error;
      }

      if (!profiles || profiles.length === 0) {
        setLeaderboardData([]);
        setCurrentUser(null);
        return;
      }

      // Transform profiles to leaderboard format
      const leaderboard: LeaderboardEntry[] = profiles.map((profile, index) => {
        const initials = profile.display_name
          .split(' ')
          .map(name => name.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2);

        return {
          rank: index + 1,
          name: profile.display_name,
          score: profile.sustainability_score,
          avatar: initials,
          isCurrentUser: user?.id === profile.user_id,
          userId: profile.user_id
        };
      });

      setLeaderboardData(leaderboard);

      // Find current user in the leaderboard
      const currentUserEntry = leaderboard.find(entry => entry.isCurrentUser);
      setCurrentUser(currentUserEntry || null);

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error loading leaderboard",
        description: "Failed to fetch leaderboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return {
    leaderboardData,
    currentUser,
    isLoading,
    refetch: fetchLeaderboardData
  };
};