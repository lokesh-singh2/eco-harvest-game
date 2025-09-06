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
      case 'completed': return 'bg-gradient-to-br from-badge-gold to-badge-bronze border-badge-gold text-white shadow-xl shadow-badge-gold/40';
      case 'in-progress': return 'bg-gradient-to-br from-path-glow to-path-primary border-path-glow text-white shadow-xl shadow-path-glow/50';
      default: return 'bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30 text-foreground hover:border-path-glow hover:shadow-xl hover:shadow-path-glow/30';
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
    <div className="relative w-full h-full bg-gradient-to-br from-path-primary/20 via-path-glow/10 to-path-secondary/20 overflow-hidden">
      {/* Animated Background with Glowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/20 to-purple-600/10" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-path-glow/60 rounded-full animate-float blur-sm" />
        <div className="absolute top-40 right-32 w-6 h-6 bg-path-primary/70 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-path-secondary/80 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 left-1/2 w-5 h-5 bg-path-glow/50 rounded-full animate-float blur-sm" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-48 right-24 w-7 h-7 bg-path-primary/40 rounded-full animate-float blur-sm" style={{ animationDelay: '1.5s' }} />
        
        {/* Large glowing orbs */}
        <div className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-path-glow/20 to-path-primary/10 rounded-full animate-glow-pulse blur-xl" />
        <div className="absolute bottom-16 left-20 w-40 h-40 bg-gradient-to-br from-path-secondary/15 to-path-glow/20 rounded-full animate-glow-pulse blur-2xl" style={{ animationDelay: '1s' }} />
      </div>

      {/* Enhanced Quest Path SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--path-glow))" stopOpacity="0.8" />
            <stop offset="30%" stopColor="hsl(var(--path-primary))" stopOpacity="0.9" />
            <stop offset="70%" stopColor="hsl(var(--path-secondary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--path-glow))" stopOpacity="0.7" />
          </linearGradient>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="innerBlur"/>
            <feMerge> 
              <feMergeNode in="innerBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {questNodes.length > 1 && (
          <>
            {/* Outer glow path */}
            <path
              d={createPath()}
              stroke="url(#pathGradient)"
              strokeWidth="12"
              fill="none"
              filter="url(#pathGlow)"
              className="animate-glow-pulse"
              opacity="0.6"
            />
            {/* Main glowing path */}
            <path
              d={createPath()}
              stroke="url(#pathGradient)"
              strokeWidth="6"
              fill="none"
              filter="url(#innerGlow)"
              className="animate-pulse"
            />
            {/* Inner bright path */}
            <path
              d={createPath()}
              stroke="hsl(var(--path-glow))"
              strokeWidth="2"
              fill="none"
              className="animate-glow-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </>
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
              {/* Enhanced Quest Node */}
              <div className="relative">
                {/* Node glow effect */}
                <div className={`absolute inset-0 rounded-full animate-glow-pulse ${
                  questNode.status === 'completed' ? 'bg-badge-gold/30' :
                  questNode.status === 'in-progress' ? 'bg-path-glow/40' :
                  'bg-primary/20'
                } blur-lg transform scale-150`} />
                
                <button
                  onClick={() => quest && onQuestClick(quest)}
                  onMouseEnter={() => setHoveredQuest(questNode.id)}
                  onMouseLeave={() => setHoveredQuest(null)}
                  className={`
                    ${getNodeSize(questNode.status, isHovered)} 
                    rounded-full border-3 flex items-center justify-center 
                    transition-all duration-500 transform relative z-10
                    ${getStatusColor(questNode.status)}
                    ${isAnimated ? 'animate-scale-in animate-float' : 'opacity-0'}
                    ${isHovered ? 'scale-125 z-20' : 'hover:scale-110'}
                    group backdrop-blur-sm
                  `}
                  style={{ 
                    animationDelay: `${index * 300}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <IconComponent className="w-6 h-6" />
                </button>
                
                {/* Enhanced Status Indicator */}
                <div className="absolute -top-2 -right-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-background shadow-lg ${
                    questNode.status === 'completed' ? 'bg-badge-gold animate-glow-pulse' :
                    questNode.status === 'in-progress' ? 'bg-path-glow animate-pulse' :
                    'bg-muted'
                  }`}>
                    <StatusIcon className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Enhanced Progress Ring for In-Progress Quests */}
                {questNode.status === 'in-progress' && (
                  <div className="absolute inset-0 rounded-full">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background ring */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="hsl(var(--path-primary))"
                        strokeWidth="3"
                        strokeOpacity="0.2"
                      />
                      {/* Progress ring with glow */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="hsl(var(--path-glow))"
                        strokeWidth="3"
                        strokeDasharray={`${questNode.progress * 2.83} 283`}
                        className="transition-all duration-700 animate-glow-pulse"
                        filter="url(#innerGlow)"
                      />
                    </svg>
                  </div>
                )}
              </div>

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

      {/* Animated Character Walking */}
      <div className="absolute bottom-16 left-16 z-10 animate-walk">
        <div className="relative">
          {/* Character shadow */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black/20 rounded-full blur-sm" />
          
          {/* Character figure */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-xl animate-float">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-glow to-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white animate-glow-pulse" />
            </div>
          </div>
          
          {/* Motion lines */}
          <div className="absolute top-2 -left-4 space-y-1">
            <div className="w-6 h-0.5 bg-path-glow/60 rounded-full animate-pulse" />
            <div className="w-4 h-0.5 bg-path-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-5 h-0.5 bg-path-secondary/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestPathView;