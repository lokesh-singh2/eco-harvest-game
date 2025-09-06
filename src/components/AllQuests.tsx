import { useState } from "react";
import { Search, Filter, Target, CheckCircle, Clock, Leaf, Calendar, Trophy, Star, Award, Play, Lock } from "lucide-react";
import QuestCard from "./QuestCard";
import QuestPathView from "./QuestPathView";
import QuestModal from "./QuestModal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuests } from "@/hooks/useQuests";

const AllQuests = () => {
  const { allQuests, isLoading } = useQuests();
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'path' | 'grid'>('path');

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading quests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Quest Journey</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search quests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Quest Status</h3>
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
                  className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </div>
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                    {count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Toggle */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">View Mode</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'path' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('path')}
              className="flex-1"
            >
              Path View
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1"
            >
              Grid View
            </Button>
          </div>
        </div>

        {/* Quest Stats */}
        <div className="p-6 mt-auto">
          <div className="bg-gradient-eco rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-6 h-6" />
              <span className="text-sm opacity-90">Progress</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>{getTabCount('completed')}/{allQuests.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(getTabCount('completed') / allQuests.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground capitalize">
                {activeTab.replace('-', ' ')} Quests
              </h2>
              <p className="text-muted-foreground">
                {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''} available
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary border-primary">
                Total: {allQuests.length}
              </Badge>
              {activeTab === 'completed' && (
                <Badge className="bg-quest-progress text-primary-foreground">
                  <Award className="w-3 h-3 mr-1" />
                  {getTabCount('completed')} Completed
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Quest Content */}
        <div className="flex-1 overflow-hidden">
          {filteredQuests.length > 0 ? (
            <>
              {viewMode === 'path' ? (
                <QuestPathView 
                  quests={filteredQuests}
                  onQuestClick={setSelectedQuest}
                  activeTab={activeTab}
                />
              ) : (
                <div className="p-6 overflow-auto h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredQuests.map((quest) => (
                      <QuestCard
                        key={quest.id}
                        id={quest.id}
                        title={quest.title}
                        description={quest.description}
                        progress={quest.progress}
                        points={quest.points}
                        status={quest.status}
                        category={quest.category}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center py-16 bg-muted/30 rounded-2xl max-w-md mx-6">
                <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No {activeTab.replace('-', ' ')} quests found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Try adjusting your search terms or browse other categories.`
                    : `Check back later for new ${activeTab.replace('-', ' ')} quests.`
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-primary hover:text-primary-glow font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          isOpen={!!selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </div>
  );
};

export default AllQuests;