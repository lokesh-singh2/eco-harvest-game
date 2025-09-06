import React from 'react';
import { X, Check, Plus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useQuests } from '@/hooks/useQuests';

interface QuestModalProps {
  quest: any;
  isOpen: boolean;
  onClose: () => void;
}

const QuestModal = ({ quest, isOpen, onClose }: QuestModalProps) => {
  const { updateTaskProgress, updateQuestProgress } = useQuests();

  const handleTaskToggle = async (taskId: string) => {
    const currentTaskProgress = quest.taskProgress?.find((tp: any) => tp.task_id === taskId);
    const isCompleted = !currentTaskProgress?.is_completed;
    
    await updateTaskProgress.mutateAsync({
      taskId,
      questId: quest.id,
      isCompleted
    });
  };

  const handleCompleteQuest = async () => {
    await updateQuestProgress.mutateAsync({
      questId: quest.id,
      progress: 100,
      status: 'completed'
    });
    onClose();
  };

  const getTaskCompletion = (taskId: string) => {
    return quest.taskProgress?.find((tp: any) => tp.task_id === taskId)?.is_completed || false;
  };

  const completedTasks = quest.tasks?.filter((task: any) => getTaskCompletion(task.id)).length || 0;
  const totalTasks = quest.tasks?.length || 0;
  const allTasksCompleted = completedTasks === totalTasks && totalTasks > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{quest.title}</h2>
              <p className="text-muted-foreground">{quest.description}</p>
            </div>

            {quest.tasks && quest.tasks.length > 0 && (
              <div className="space-y-3">
                {quest.tasks.map((task: any, index: number) => {
                  const isCompleted = getTaskCompletion(task.id);
                  
                  return (
                    <div key={task.id} className="flex items-center space-x-3">
                      <button
                        onClick={() => handleTaskToggle(task.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-quest-progress border-quest-progress text-primary-foreground'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        {isCompleted && <Check className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}>
                          Task {index + 1}: {task.title}
                        </p>
                        {isCompleted && (
                          <span className="text-xs text-quest-progress font-medium">
                            (Completed)
                          </span>
                        )}
                        {quest.status === 'in-progress' && !isCompleted && index === completedTasks && (
                          <span className="text-xs text-accent-vibrant font-medium">
                            (In Progress)
                          </span>
                        )}
                      </div>

                      {index === completedTasks && !isCompleted && (
                        <Plus className="w-4 h-4 text-accent-vibrant" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <Button
              onClick={handleCompleteQuest}
              disabled={!allTasksCompleted}
              className={`w-full py-3 font-semibold transition-all ${
                allTasksCompleted
                  ? 'bg-quest-progress hover:bg-quest-progress/90 text-primary-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Complete Quest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestModal;