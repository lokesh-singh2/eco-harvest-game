import { useState } from "react";
import { Search, Grid3x3, Clock, CheckCircle, Target, Leaf, Sprout, TreePine, Flower2, Apple } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuests } from "@/hooks/useQuests";
import QuestDetailModal from "./QuestDetailModal";

const AllQuests = () => {
  const { allQuests, isLoading } = useQuests();
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuest, setSelectedQuest] = useState<any>(null);

  const tabs = [
    { 
      id: 'recommended', 
      label: 'Recommended', 
      icon: Target,
      color: 'text-primary border-primary bg-primary/10'
    },
    { 
      id: 'in-progress', 
      label: 'In Progress', 
      icon: Clock,
      color: 'text-accent-vibrant border-accent-vibrant bg-accent/10'
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      icon: CheckCircle,
      color: 'text-quest-progress border-quest-progress bg-quest-bg'
    }
  ];

  const filteredQuests = allQuests.filter(quest => {
    const matchesTab = quest.status === activeTab;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabCount = (status: string) => {
    return allQuests.filter(quest => quest.status === status).length;
  };

  // Quest node positions for the path visualization
  const questNodePositions = [
    { x: 20, y: 60, rotation: 0 },
    { x: 35, y: 45, rotation: -15 },
    { x: 50, y: 35, rotation: -30 },
    { x: 65, y: 40, rotation: 15 },
    { x: 80, y: 55, rotation: 30 },
    { x: 75, y: 75, rotation: -45 },
    { x: 60, y: 85, rotation: -60 },
    { x: 40, y: 80, rotation: 45 },
  ];

  const getQuestIcon = (category: string, index: number) => {
    const icons = [Leaf, Sprout, TreePine, Flower2, Apple, Target];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading quests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border shadow-natural flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">All Quests</h2>
              <p className="text-sm text-muted-foreground">{allQuests.length} available</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search quests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              <Grid3x3 className="w-4 h-4" />
              <span>Filter</span>
            </div>
            
            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                const count = getTabCount(tab.id);
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl font-medium transition-all border-2 ${
                      isActive 
                        ? tab.color 
                        : 'text-muted-foreground border-transparent bg-transparent hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isActive 
                        ? 'bg-background/30 text-current' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Quest Map */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Path */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--accent-vibrant))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--quest-progress))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Curved path */}
          <path
            d="M 100 400 Q 200 200, 400 350 T 700 300 Q 800 200, 900 400"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
          
          {/* Decorative elements */}
          <circle cx="150" cy="350" r="2" fill="hsl(var(--primary))" opacity="0.6" />
          <circle cx="350" cy="250" r="2" fill="hsl(var(--accent-vibrant))" opacity="0.6" />
          <circle cx="550" cy="320" r="2" fill="hsl(var(--quest-progress))" opacity="0.6" />
        </svg>

        {/* Quest Nodes */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {filteredQuests.map((quest, index) => {
            if (index >= questNodePositions.length) return null;
            
            const position = questNodePositions[index];
            const IconComponent = getQuestIcon(quest.category, index);
            
            return (
              <button
                key={quest.id}
                onClick={() => setSelectedQuest(quest)}
                className="absolute group animate-fade-in"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`relative w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110 shadow-natural ${
                  quest.status === 'completed'
                    ? 'bg-quest-progress text-background'
                    : quest.status === 'in-progress'
                    ? 'bg-accent-vibrant text-background'
                    : 'bg-primary text-background'
                }`}>
                  <IconComponent className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Progress ring */}
                  {quest.progress > 0 && (
                    <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${(quest.progress / 100) * 176} 176`}
                        strokeOpacity="0.3"
                      />
                    </svg>
                  )}

                  {/* Status indicator */}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
                    quest.status === 'completed'
                      ? 'bg-quest-progress'
                      : quest.status === 'in-progress'
                      ? 'bg-accent-vibrant'
                      : 'bg-muted-foreground'
                  }`}>
                    {quest.status === 'completed' && <CheckCircle className="w-3 h-3 text-background m-auto" />}
                    {quest.status === 'in-progress' && <Clock className="w-3 h-3 text-background m-auto" />}
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg px-3 py-2 shadow-natural min-w-max">
                  <h4 className="font-semibold text-sm text-foreground">{quest.title}</h4>
                  <p className="text-xs text-muted-foreground">{quest.points} points</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredQuests.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
            <div className="text-center">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {activeTab.replace('-', ' ')} quests found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchQuery 
                  ? `Try adjusting your search terms or browse other categories.`
                  : `Check back later for new ${activeTab.replace('-', ' ')} quests.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <QuestDetailModal
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </div>
  );
};

export default AllQuests;