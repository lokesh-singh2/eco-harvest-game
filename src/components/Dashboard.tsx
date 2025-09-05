import { Leaf, Droplets, Recycle, Award, Calendar, Target } from "lucide-react";
import QuestCard from "./QuestCard";

interface DashboardProps {
  userName: string;
  activeQuests: any[];
  badges: any[];
  onStartQuest: (id: string) => void;
  onCompleteQuest: (id: string) => void;
}

const Dashboard = ({ userName, activeQuests, badges, onStartQuest, onCompleteQuest }: DashboardProps) => {
  const badgeIcons = {
    'water-saver': Droplets,
    'organic-champion': Leaf,
    'waste-warrior': Recycle,
    'soil-guardian': Target,
    'eco-pioneer': Award
  };

  const getBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'water-saver': 'text-accent-vibrant bg-accent',
      'organic-champion': 'text-quest-progress bg-quest-bg',
      'waste-warrior': 'text-secondary-dark bg-secondary',
      'soil-guardian': 'text-badge-bronze bg-badge-bronze/20',
      'eco-pioneer': 'text-badge-gold bg-badge-gold/20'
    };
    return colors[type] || 'text-primary bg-primary/20';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-eco rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-3">Welcome back, {userName}! 🌱</h2>
          <p className="text-white/90 text-lg max-w-2xl">
            Continue your sustainable farming journey. Your actions today create a better tomorrow for agriculture and our planet.
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Week 3 of Monsoon Season</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">{activeQuests.length} Active Quests</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Active Quests Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span>Your Active Quests</span>
          </h3>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {activeQuests.filter(q => q.status === 'in-progress').length} in progress
          </span>
        </div>

        {activeQuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                {...quest}
                onStartQuest={onStartQuest}
                onCompleteQuest={onCompleteQuest}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">No Active Quests</h4>
            <p className="text-muted-foreground">Start your sustainability journey by exploring available quests!</p>
          </div>
        )}
      </div>

      {/* My Badges Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-badge-gold/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-badge-gold" />
            </div>
            <span>My Badges</span>
          </h3>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {badges.length} earned
          </span>
        </div>

        {badges.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {badges.map((badge) => {
              const IconComponent = badgeIcons[badge.type as keyof typeof badgeIcons] || Award;
              return (
                <div
                  key={badge.id}
                  className="flex-shrink-0 group cursor-pointer"
                  title={badge.description}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${getBadgeColor(badge.type)}`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <p className="text-center text-sm font-medium text-foreground mt-2 max-w-20">
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-2xl">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h4 className="font-semibold text-foreground mb-1">No Badges Yet</h4>
            <p className="text-muted-foreground text-sm">Complete quests to earn your first badges!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;