import { useState } from "react";
import { X, CheckCircle, Circle, Play, Trophy, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuests } from "@/hooks/useQuests";
import { toast } from "sonner";

interface QuestDetailModalProps {
  quest: any;
  onClose: () => void;
}

const QuestDetailModal = ({ quest, onClose }: QuestDetailModalProps) => {
  const { startQuest, updateTaskProgress, updateQuestProgress } = useQuests();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleTaskToggle = async (taskId: string, isCompleted: boolean) => {
    try {
      await updateTaskProgress.mutateAsync({
        taskId,
        questId: quest.id,
        isCompleted: !isCompleted,
      });
      toast.success(`Task ${!isCompleted ? 'completed' : 'reopened'}!`);
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleStartQuest = async () => {
    try {
      await startQuest.mutateAsync(quest.id);
      toast.success('Quest started!');
    } catch (error) {
      toast.error('Failed to start quest');
    }
  };

  const handleCompleteQuest = async () => {
    setIsCompleting(true);
    try {
      await updateQuestProgress.mutateAsync({
        questId: quest.id,
        progress: 100,
        status: 'completed',
      });
      toast.success('Quest completed! 🎉');
      onClose();
    } catch (error) {
      toast.error('Failed to complete quest');
    } finally {
      setIsCompleting(false);
    }
  };

  const completedTasks = quest.taskProgress?.filter((tp: any) => tp.is_completed).length || 0;
  const totalTasks = quest.tasks?.length || 0;
  const canComplete = completedTasks === totalTasks && totalTasks > 0 && quest.status === 'in-progress';

  const getTaskStatus = (taskId: string) => {
    return quest.taskProgress?.find((tp: any) => tp.task_id === taskId)?.is_completed || false;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-natural max-w-md w-full max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-eco">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-background">{quest.title}</h3>
                <p className="text-background/80 text-sm">{quest.points} points • {quest.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <p className="text-muted-foreground">{quest.description}</p>

          {/* Tasks */}
          {quest.tasks && quest.tasks.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Tasks</h4>
              <div className="space-y-3">
                {quest.tasks.map((task: any, index: number) => {
                  const isCompleted = getTaskStatus(task.id);
                  const isDisabled = quest.status === 'recommended';

                  return (
                    <div
                      key={task.id}
                      className={`flex items-start space-x-3 p-3 rounded-xl border transition-all ${
                        isCompleted
                          ? 'bg-quest-bg border-quest-progress'
                          : 'bg-muted/30 border-border hover:bg-muted/50'
                      }`}
                    >
                      <button
                        onClick={() => handleTaskToggle(task.id, isCompleted)}
                        disabled={isDisabled}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                          isCompleted
                            ? 'bg-quest-progress border-quest-progress text-background'
                            : 'border-muted-foreground hover:border-primary'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {isCompleted && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h5 className={`font-medium ${isCompleted ? 'text-quest-progress' : 'text-foreground'}`}>
                          Task {index + 1}: {task.title}
                        </h5>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        )}
                      </div>
                      {isCompleted && (
                        <div className="text-xs px-2 py-1 bg-quest-progress/20 text-quest-progress rounded-full">
                          Completed
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Progress */}
              <div className="text-center text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="flex justify-center">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              quest.status === 'completed'
                ? 'bg-quest-bg text-quest-progress'
                : quest.status === 'in-progress'
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {quest.status === 'completed' ? 'Completed' :
               quest.status === 'in-progress' ? 'In Progress' :
               'Recommended'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          {quest.status === 'recommended' ? (
            <Button
              onClick={handleStartQuest}
              className="w-full bg-primary hover:bg-primary-glow"
              disabled={startQuest.isPending}
            >
              <Play className="w-4 h-4 mr-2" />
              {startQuest.isPending ? 'Starting...' : 'Start Quest'}
            </Button>
          ) : quest.status === 'in-progress' ? (
            <Button
              onClick={handleCompleteQuest}
              disabled={!canComplete || isCompleting}
              className="w-full bg-quest-progress hover:bg-quest-progress/90 disabled:opacity-50"
            >
              <Trophy className="w-4 h-4 mr-2" />
              {isCompleting ? 'Completing...' : 'Complete Quest'}
            </Button>
          ) : (
            <div className="text-center text-quest-progress font-medium">
              <Trophy className="w-5 h-5 mx-auto mb-2" />
              Quest Completed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestDetailModal;