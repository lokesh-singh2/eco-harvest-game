import { Gift, GraduationCap, Star, Bookmark, Coins, CheckCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";

const Rewards = () => {
  const { profile } = useProfile();
  const { rewards, isLoading } = useRewards();
  const currentPoints = profile?.sustainability_score || 0;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      training: GraduationCap,
      government: Star,
      recognition: Bookmark,
      services: Gift,
      equipment: Gift,
      certification: CheckCircle
    };
    return icons[category] || Gift;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      training: 'bg-accent text-accent-vibrant',
      government: 'bg-badge-gold/20 text-badge-gold',
      recognition: 'bg-primary/20 text-primary',
      services: 'bg-quest-bg text-quest-progress',
      equipment: 'bg-secondary text-secondary-dark',
      certification: 'bg-badge-bronze/20 text-badge-bronze'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const canAfford = (points: number) => currentPoints >= points;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading rewards...</p>
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
            <div className="w-10 h-10 rounded-full bg-badge-gold/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-badge-gold" />
            </div>
            <span>Rewards & Incentives</span>
          </h2>
        </div>

        {/* Points Summary */}
        <div className="bg-gradient-eco rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Coins className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{currentPoints} Points</h3>
                <p className="text-white/80">Available for rewards</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80 mb-1">Rewards Available</p>
              <p className="text-2xl font-bold">
                {rewards.filter(r => canAfford(r.points_cost)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Available Rewards</h3>
          <p className="text-muted-foreground text-sm">
            {rewards.filter(r => canAfford(r.points_cost)).length} of {rewards.length} rewards available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const IconComponent = getCategoryIcon(reward.category);
            const affordable = canAfford(reward.points_cost);
            
            return (
              <div
                key={reward.id}
                className={`p-6 rounded-xl border-2 transition-all relative ${
                  affordable
                    ? 'bg-background border-border hover:shadow-card hover:border-primary/30'
                    : 'bg-muted/30 border-muted opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      affordable ? getCategoryColor(reward.category) : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        affordable ? getCategoryColor(reward.category) : 'bg-muted text-muted-foreground'
                      }`}>
                        {reward.category}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                    affordable 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Coins className="w-4 h-4" />
                    <span className="font-semibold text-sm">{reward.points_cost} pts</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold text-lg mb-2 ${
                      affordable ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {reward.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${
                      affordable ? 'text-muted-foreground' : 'text-muted-foreground/70'
                    }`}>
                      {reward.description}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    {affordable ? (
                      <Button 
                        className="bg-primary hover:bg-primary-glow text-primary-foreground font-medium"
                      >
                        Redeem Now
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Need {reward.points_cost - currentPoints} more points
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress to Next Reward */}
      <div className="bg-quest-bg rounded-xl p-6">
        <h3 className="text-lg font-semibold text-quest-progress mb-4">Next Milestone</h3>
        {(() => {
          const nextAffordable = rewards
            .filter(r => !canAfford(r.points_cost))
            .sort((a, b) => a.points_cost - b.points_cost)[0];
          
          if (!nextAffordable) {
            return (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-quest-progress mx-auto mb-3" />
                <p className="text-quest-progress font-semibold">
                  Congratulations! You can afford all available rewards.
                </p>
              </div>
            );
          }

          const pointsNeeded = nextAffordable.points_cost - currentPoints;
          const progress = (currentPoints / nextAffordable.points_cost) * 100;

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-quest-progress">{nextAffordable.title}</p>
                  <p className="text-sm text-quest-progress/70">
                    {pointsNeeded} points needed ({nextAffordable.points_cost} total)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-quest-progress">{Math.round(progress)}%</p>
                </div>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-growth transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Rewards;