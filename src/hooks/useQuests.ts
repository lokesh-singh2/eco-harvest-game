import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface QuestTask {
  id: string;
  quest_id: string;
  title: string;
  description: string | null;
  order_index: number;
  is_required: boolean;
  created_at: string;
}

export interface UserTaskProgress {
  id: string;
  user_id: string;
  task_id: string;
  quest_id: string;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  difficulty: string;
  created_at: string;
  tasks?: QuestTask[];
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
        .select(`
          *,
          tasks:quest_tasks(*)
        `)
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

  const { data: userTaskProgress = [], isLoading: taskProgressLoading } = useQuery({
    queryKey: ['user-task-progress', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_task_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserTaskProgress[];
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
      queryClient.invalidateQueries({ queryKey: ['user-task-progress'] });
    },
  });

  const updateTaskProgress = useMutation({
    mutationFn: async ({ taskId, questId, isCompleted }: { taskId: string; questId: string; isCompleted: boolean }) => {
      if (!user?.id) throw new Error('No user');
      
      const { data, error } = await supabase
        .from('user_task_progress')
        .upsert({
          user_id: user.id,
          task_id: taskId,
          quest_id: questId,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-task-progress'] });
      queryClient.invalidateQueries({ queryKey: ['user-quests'] });
    },
  });

  // Combine quests with user progress and task completion
  const questsWithProgress = allQuests.map(quest => {
    const userQuest = userQuests.find(uq => uq.quest_id === quest.id);
    const questTaskProgress = userTaskProgress.filter(tp => tp.quest_id === quest.id);
    
    // Calculate progress based on completed tasks if quest has tasks
    let calculatedProgress = userQuest?.progress || 0;
    if (quest.tasks && quest.tasks.length > 0) {
      const completedTasks = questTaskProgress.filter(tp => tp.is_completed).length;
      calculatedProgress = Math.round((completedTasks / quest.tasks.length) * 100);
    }
    
    return {
      ...quest,
      status: userQuest?.status || 'recommended',
      progress: calculatedProgress,
      userQuestId: userQuest?.id,
      taskProgress: questTaskProgress,
    };
  });

  const activeQuests = questsWithProgress.filter(quest => quest.status === 'in-progress');

  return {
    allQuests: questsWithProgress,
    activeQuests,
    userQuests,
    userTaskProgress,
    isLoading: questsLoading || userQuestsLoading || taskProgressLoading,
    startQuest,
    updateQuestProgress,
    updateTaskProgress,
  };
};