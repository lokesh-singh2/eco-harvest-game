import React, { useState, useEffect } from 'react';
import { Leaf, TreePine, Droplet, Sun, Flower, Recycle, Trophy, Star, Award, Play, Lock, CheckCircle, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuestNode {
  id: string;
  title: string;
  status: 'recommended' | 'in-progress' | 'completed';
  category: string;
  position: { x: number; y: number };
  progress: number;
  points: number;
  description: string;
}

interface QuestPathViewProps {
  quests: any[];
  onQuestClick: (quest: any) => void;
  activeTab: string;
}

const QuestPathView = ({ quests, onQuestClick, activeTab }: QuestPathViewProps) => {
  const [hoveredQuest, setHoveredQuest] = useState<string | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<Set<string>>(new Set());

  // Generate quest positions in a winding path layout
  const questNodes: QuestNode[] = quests.slice(0, 12).map((quest, index) => {
    // Create a more organic, winding path
    const pathPositions = [
      { x: 15, y: 85 }, // Start bottom left
      { x: 25, y: 70 }, // Up and right
      { x: 40, y: 60 }, // Continue up
      { x: 55, y: 45 }, // Peak area
      { x: 75, y: 35 }, // Top right area
      { x: 85, y: 50 }, // Down right
      { x: 70, y: 65 }, // Back left
      { x: 50, y: 75 }, // Center bottom
      { x: 30, y: 80 }, // Left bottom
      { x: 45, y: 25 }, // Up to peak
      { x: 65, y: 20 }, // Top area
      { x: 80, y: 15 }, // Final peak
    ];

    return {
      id: quest.id,
      title: quest.title,
      status: quest.status,
      category: quest.category,
      position: pathPositions[index] || { x: 50 + (index * 10) % 40, y: 50 + (index * 15) % 30 },
      progress: quest.progress,
      points: quest.points,
      description: quest.description,
    };
  });

  // Animate nodes on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      questNodes.forEach((node, index) => {
        setTimeout(() => {
          setAnimatedNodes(prev => new Set([...prev, node.id]));
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'composting': 
      case 'waste management': return Recycle;
      case 'water management': return Droplet;
      case 'soil health': return TreePine;
      case 'organic farming': return Leaf;
      case 'sustainable practices': return Flower;
      default: return Sun;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-quest-progress border-quest-progress text-white shadow-lg shadow-quest-progress/30';
      case 'in-progress': return 'bg-accent-vibrant border-accent-vibrant text-white shadow-lg shadow-accent-vibrant/30';
      default: return 'bg-background border-border text-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      default: return Target;
    }
  };

  const getNodeSize = (status: string, isHovered: boolean) => {
    if (isHovered) return 'w-16 h-16';
    switch (status) {
      case 'completed': return 'w-14 h-14';
      case 'in-progress': return 'w-12 h-12';
      default: return 'w-10 h-10';
    }
  };

  // Create path between nodes
  const createPath = () => {
    if (questNodes.length < 2) return '';
    
    let pathData = `M ${questNodes[0].position.x}% ${questNodes[0].position.y}%`;
    
    for (let i = 1; i < questNodes.length; i++) {
      const current = questNodes[i];
      const previous = questNodes[i - 1];
      
      // Create smooth curves between points
      const controlX = (previous.position.x + current.position.x) / 2;
      const controlY = (previous.position.y + current.position.y) / 2 - 5;
      
      pathData += ` Q ${controlX}% ${controlY}% ${current.position.x}% ${current.position.y}%`;
    }
    
    return pathData;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-quest-bg via-background to-accent/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-accent-vibrant/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-quest-progress/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Quest Path SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--accent-vibrant))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--quest-progress))" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {questNodes.length > 1 && (
          <path
            d={createPath()}
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="8,4"
            filter="url(#glow)"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Quest Nodes */}
      <div className="relative w-full h-full" style={{ zIndex: 2 }}>
        {questNodes.map((questNode, index) => {
          const quest = quests.find(q => q.id === questNode.id);
          const IconComponent = getIconForCategory(questNode.category);
          const StatusIcon = getStatusIcon(questNode.status);
          const isHovered = hoveredQuest === questNode.id;
          const isAnimated = animatedNodes.has(questNode.id);
          
          return (
            <div key={questNode.id} className="absolute" style={{
              left: `${questNode.position.x}%`,
              top: `${questNode.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}>
              {/* Quest Node */}
              <button
                onClick={() => quest && onQuestClick(quest)}
                onMouseEnter={() => setHoveredQuest(questNode.id)}
                onMouseLeave={() => setHoveredQuest(null)}
                className={`
                  ${getNodeSize(questNode.status, isHovered)} 
                  rounded-full border-3 flex items-center justify-center 
                  transition-all duration-300 transform
                  ${getStatusColor(questNode.status)}
                  ${isAnimated ? 'animate-scale-in' : 'opacity-0'}
                  ${isHovered ? 'scale-110 z-20' : 'hover:scale-105'}
                  relative group
                `}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <IconComponent className="w-6 h-6" />
                
                {/* Status Indicator */}
                <div className="absolute -top-1 -right-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    questNode.status === 'completed' ? 'bg-quest-progress' :
                    questNode.status === 'in-progress' ? 'bg-accent-vibrant' :
                    'bg-muted'
                  }`}>
                    <StatusIcon className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Progress Ring for In-Progress Quests */}
                {questNode.status === 'in-progress' && (
                  <div className="absolute inset-0 rounded-full">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${questNode.progress * 2.83} 283`}
                        className="transition-all duration-500"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Hover Card */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-30 animate-fade-in">
                  <div className="bg-card border border-border rounded-xl p-4 shadow-natural min-w-64 max-w-80">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {questNode.title}
                      </h3>
                      <Badge variant="outline" className="ml-2 text-xs">
                        +{questNode.points} pts
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                      {questNode.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          questNode.status === 'completed' ? 'bg-quest-bg text-quest-progress' :
                          questNode.status === 'in-progress' ? 'bg-accent text-accent-vibrant' :
                          'bg-muted text-muted-foreground'
                        }`}
                      >
                        {questNode.status === 'completed' ? 'Completed' :
                         questNode.status === 'in-progress' ? `${questNode.progress}% Done` :
                         'Available'}
                      </Badge>
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        View Details
                      </Button>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="w-2 h-2 bg-card border-r border-b border-border transform rotate-45" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="flex flex-col space-y-3">
          {/* Legend */}
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-natural">
            <h4 className="font-semibold text-foreground text-sm mb-3">Quest Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-background border-2 border-border" />
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-accent-vibrant border-2 border-accent-vibrant" />
                <span className="text-xs text-muted-foreground">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-quest-progress border-2 border-quest-progress" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Walking Animation (Optional Enhancement) */}
      {activeTab === 'in-progress' && questNodes.some(q => q.status === 'in-progress') && (
        <div className="absolute bottom-10 left-10 z-10">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-bounce">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground font-medium">Keep Going!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestPathView;