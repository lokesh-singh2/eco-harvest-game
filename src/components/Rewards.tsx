import { Gift, GraduationCap, Star, Bookmark, Coins, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RewardsProps {
  currentPoints: number;
}

const Rewards = ({ currentPoints }: RewardsProps) => {
  const rewards = [
    {
      id: 1,
      title: "Advanced Organic Inputs Training",
      description: "Access to comprehensive online course on organic fertilizers and natural pest management techniques.",
      points: 500,
      icon: GraduationCap,
      category: "Education",
      available: true,
      popular: true
    },
    {
      id: 2,
      title: "Krishi Karman Scheme Bonus",
      description: "+10 points eligibility boost for government agricultural schemes and subsidies.",
      points: 1000,
      icon: Star,
      category: "Government",
      available: true,
      popular: false
    },
    {
      id: 3,
      title: "Progressive Farmer Spotlight",
      description: "Featured profile in regional agricultural newsletter and social media channels.",
      points: 2500,
      icon: Bookmark,
      category: "Recognition",
      available: false,
      popular: true
    },
    {
      id: 4,
      title: "Precision Agriculture Workshop",
      description: "Hands-on training session on modern farming technologies and data-driven agriculture.",
      points: 750,
      icon: GraduationCap,
      category: "Education",
      available: true,
      popular: false
    },
    {
      id: 5,
      title: "Sustainable Seeds Package",
      description: "Premium quality drought-resistant and high-yield seed varieties for next planting season.",
      points: 1500,
      icon: Gift,
      category: "Resources",
      available: true,
      popular: true
    },
    {
      id: 6,
      title: "Agricultural Expert Consultation",
      description: "One-on-one session with certified agricultural scientist for personalized farming advice.",
      points: 2000,
      icon: Star,
      category: "Consultation",
      available: false,
      popular: false
    },
    {
      id: 7,
      title: "Water Management Certificate",
      description: "Official certification in water conservation and efficient irrigation practices.",
      points: 1200,
      icon: CheckCircle,
      category: "Certification",
      available: true,
      popular: false
    },
    {
      id: 8,
      title: "Soil Health Testing Kit",
      description: "Professional soil testing equipment and analysis service for optimal crop planning.",
      points: 800,
      icon: Gift,
      category: "Resources",
      available: true,
      popular: true
    }
  ];

  const categories = ["All", "Education", "Government", "Recognition", "Resources", "Consultation", "Certification"];

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      Education: GraduationCap,
      Government: Star,
      Recognition: Bookmark,
      Resources: Gift,
      Consultation: Star,
      Certification: CheckCircle
    };
    return icons[category] || Gift;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Education: 'bg-accent text-accent-vibrant',
      Government: 'bg-badge-gold/20 text-badge-gold',
      Recognition: 'bg-primary/20 text-primary',
      Resources: 'bg-quest-bg text-quest-progress',
      Consultation: 'bg-secondary text-secondary-dark',
      Certification: 'bg-badge-bronze/20 text-badge-bronze'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const canAfford = (points: number) => currentPoints >= points;

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
                {rewards.filter(r => canAfford(r.points)).length}
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
            {rewards.filter(r => canAfford(r.points)).length} of {rewards.length} rewards available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const IconComponent = reward.icon;
            const affordable = canAfford(reward.points);
            
            return (
              <div
                key={reward.id}
                className={`p-6 rounded-xl border-2 transition-all relative ${
                  affordable
                    ? 'bg-background border-border hover:shadow-card hover:border-primary/30'
                    : 'bg-muted/30 border-muted opacity-75'
                }`}
              >
                {reward.popular && (
                  <div className="absolute -top-3 -right-3 bg-badge-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      affordable ? getCategoryColor(reward.category) : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
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
                    <span className="font-semibold text-sm">{reward.points} pts</span>
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
                          Need {reward.points - currentPoints} more points
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
            .filter(r => !canAfford(r.points))
            .sort((a, b) => a.points - b.points)[0];
          
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

          const pointsNeeded = nextAffordable.points - currentPoints;
          const progress = (currentPoints / nextAffordable.points) * 100;

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-quest-progress">{nextAffordable.title}</p>
                  <p className="text-sm text-quest-progress/70">
                    {pointsNeeded} points needed ({nextAffordable.points} total)
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