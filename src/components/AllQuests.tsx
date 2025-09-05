import { useState } from "react";
import { Search, Filter, Target, CheckCircle, Clock, Leaf } from "lucide-react";
import QuestCard from "./QuestCard";
import { Input } from "@/components/ui/input";
import { useQuests } from "@/hooks/useQuests";

const AllQuests = () => {
  const { allQuests, isLoading } = useQuests();
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <span>All Quests</span>
          </h2>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Quests</p>
            <p className="text-2xl font-bold text-primary">{allQuests.length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search quests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border focus:border-primary"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const count = getTabCount(tab.id);
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap border-2 ${
                  isActive 
                    ? tab.color 
                    : 'text-muted-foreground border-border bg-background hover:bg-muted/50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
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

      {/* Quest List */}
      <div className="space-y-6">
        {filteredQuests.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredQuests.length} {activeTab.replace('-', ' ')} quest{filteredQuests.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-2xl">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No {activeTab.replace('-', ' ')} quests found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
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
        )}
      </div>
    </div>
  );
};

export default AllQuests;