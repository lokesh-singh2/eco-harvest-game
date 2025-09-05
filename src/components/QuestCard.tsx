import { useState } from "react";
import { CheckCircle, Clock, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuests } from "@/hooks/useQuests";
import { toast } from "@/hooks/use-toast";

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  points: number;
  status: 'recommended' | 'in-progress' | 'completed';
  category?: string;
}

const QuestCard = ({ 
  id, 
  title, 
  description, 
  progress, 
  points, 
  status, 
  category 
}: QuestCardProps) => {
  const { startQuest, updateQuestProgress } = useQuests();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuest = async () => {
    setIsLoading(true);
    try {
      await startQuest.mutateAsync(id);
      toast({
        title: "Quest Started!",
        description: `You've started the "${title}" quest. Good luck!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start quest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteQuest = async () => {
    setIsLoading(true);
    try {
      await updateQuestProgress.mutateAsync({
        questId: id,
        progress: 100,
        status: 'completed'
      });
      toast({
        title: "Quest Completed!",
        description: `Congratulations! You've earned ${points} points.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete quest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-quest-progress" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-accent-vibrant" />;
      default:
        return <Play className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-quest-progress/10 border-quest-progress/30';
      case 'in-progress':
        return 'bg-accent/10 border-accent-vibrant/30';
      default:
        return 'bg-background border-border';
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 transition-all hover:shadow-card ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-foreground text-lg">{title}</h3>
            {category && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-gradient-growth text-white px-3 py-1 rounded-full">
          <Trophy className="w-4 h-4" />
          <span className="font-semibold text-sm">+{points} pts</span>
        </div>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

      {status !== 'completed' && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-growth transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {status === 'recommended' && (
          <Button 
            onClick={handleStartQuest}
            disabled={isLoading}
            className="bg-primary hover:bg-primary-glow text-primary-foreground font-medium"
          >
            {isLoading ? 'Starting...' : 'Start Quest'}
          </Button>
        )}
        {status === 'in-progress' && progress === 100 && (
          <Button 
            onClick={handleCompleteQuest}
            disabled={isLoading}
            className="bg-quest-progress hover:bg-primary-glow text-primary-foreground font-medium"
          >
            {isLoading ? 'Completing...' : 'Complete Quest'}
          </Button>
        )}
        {status === 'completed' && (
          <div className="flex items-center space-x-2 text-quest-progress font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Completed</span>
          </div>
        )}
        {status === 'in-progress' && progress < 100 && (
          <span className="text-accent-vibrant font-medium">In Progress...</span>
        )}
      </div>
    </div>
  );
};

export default QuestCard;