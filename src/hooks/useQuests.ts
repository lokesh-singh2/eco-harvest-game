import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  difficulty: string;
  created_at: string;
}

export interface UserQuest {
  id: string;
  user_id: string;
  quest_id: string;
  status: 'recommended' | 'in-progress' | 'completed';
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  quest: Quest;
}

export const useQuests = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: allQuests = [], isLoading: questsLoading } = useQuery({
    queryKey: ['quests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Quest[];
    },
  });

  const { data: userQuests = [], isLoading: userQuestsLoading } = useQuery({
    queryKey: ['user-quests', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_quests')
        .select(`
          *,
          quest:quests(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserQuest[];
    },
    enabled: !!user?.id,
  });

  const startQuest = useMutation({
    mutationFn: async (questId: string) => {
      if (!user?.id) throw new Error('No user');
      
      const { data, error } = await supabase
        .from('user_quests')
        .upsert({
          user_id: user.id,
          quest_id: questId,
          status: 'in-progress',
          progress: 10,
          started_at: new Date().toISOString(),
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-quests'] });
    },
  });

  const updateQuestProgress = useMutation({
    mutationFn: async ({ questId, progress, status }: { questId: string; progress: number; status?: 'in-progress' | 'completed' }) => {
      if (!user?.id) throw new Error('No user');
      
      const updates: any = { progress };
      if (status === 'completed') {
        updates.status = 'completed';
        updates.completed_at = new Date().toISOString();
      }
      
      const { data, error } = await supabase
        .from('user_quests')
        .update(updates)
        .eq('user_id', user.id)
        .eq('quest_id', questId)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-quests'] });
    },
  });

  // Combine quests with user progress
  const questsWithProgress = allQuests.map(quest => {
    const userQuest = userQuests.find(uq => uq.quest_id === quest.id);
    return {
      ...quest,
      status: userQuest?.status || 'recommended',
      progress: userQuest?.progress || 0,
      userQuestId: userQuest?.id,
    };
  });

  const activeQuests = questsWithProgress.filter(quest => quest.status === 'in-progress');

  return {
    allQuests: questsWithProgress,
    activeQuests,
    userQuests,
    isLoading: questsLoading || userQuestsLoading,
    startQuest,
    updateQuestProgress,
  };
};