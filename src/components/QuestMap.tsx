import React from 'react';
import { Leaf, TreePine, Droplet, Sun, Flower, Recycle } from 'lucide-react';

interface QuestNode {
  id: string;
  title: string;
  status: 'recommended' | 'in-progress' | 'completed';
  category: string;
  position: { x: number; y: number };
  progress: number;
}

interface QuestMapProps {
  quests: any[];
  onQuestClick: (quest: any) => void;
}

const QuestMap = ({ quests, onQuestClick }: QuestMapProps) => {
  // Generate quest positions in a path-like layout
  const questNodes: QuestNode[] = quests.slice(0, 8).map((quest, index) => {
    const pathPositions = [
      { x: 15, y: 75 }, // Bottom left
      { x: 30, y: 45 }, // Up-right
      { x: 50, y: 25 }, // Top center-left
      { x: 75, y: 15 }, // Top right
      { x: 85, y: 40 }, // Right center
      { x: 70, y: 65 }, // Down-left
      { x: 45, y: 80 }, // Bottom center
      { x: 20, y: 60 }, // Left-center
    ];

    return {
      id: quest.id,
      title: quest.title,
      status: quest.status,
      category: quest.category,
      position: pathPositions[index] || { x: 50, y: 50 },
      progress: quest.progress,
    };
  });

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'composting': return Recycle;
      case 'watering': return Droplet;
      case 'planting': return Leaf;
      case 'gardening': return Flower;
      case 'soil': return TreePine;
      default: return Sun;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-quest-progress border-quest-progress text-primary-foreground';
      case 'in-progress': return 'bg-accent-vibrant border-accent-vibrant text-accent-foreground';
      default: return 'bg-background border-border text-foreground hover:border-primary';
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-quest-bg via-background to-accent/10 rounded-2xl overflow-hidden">
      {/* Path visualization */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent-vibrant))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--quest-progress))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <path
          d={questNodes.reduce((path, node, index) => {
            if (index === 0) return `M ${node.position.x}% ${node.position.y}%`;
            return `${path} Q ${(questNodes[index-1].position.x + node.position.x) / 2}% ${(questNodes[index-1].position.y + node.position.y) / 2 - 5}% ${node.position.x}% ${node.position.y}%`;
          }, '')}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
      </svg>

      {/* Quest nodes */}
      {questNodes.map((questNode, index) => {
        const quest = quests.find(q => q.id === questNode.id);
        const IconComponent = getIconForCategory(questNode.category);
        
        return (
          <button
            key={questNode.id}
            onClick={() => quest && onQuestClick(quest)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-natural ${getStatusColor(questNode.status)}`}
            style={{
              left: `${questNode.position.x}%`,
              top: `${questNode.position.y}%`,
              zIndex: 2,
            }}
          >
            <IconComponent className="w-6 h-6" />
            
            {/* Progress indicator */}
            {questNode.status === 'in-progress' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-vibrant border-2 border-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
              </div>
            )}
            
            {/* Completion indicator */}
            {questNode.status === 'completed' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-quest-progress border-2 border-background" />
            )}
          </button>
        );
      })}

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-6 right-8 w-6 h-6 rounded-full bg-accent-vibrant/30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-4 w-4 h-4 rounded-full bg-quest-progress/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default QuestMap;