import { useState } from 'react';
import { 
  Award, Trophy, Star, Shield, Leaf, Droplet, Mountain, Sun, 
  Zap, Lightbulb, Waves, Recycle, Bug, Battery, Heart, 
  Flower, Flower2, TreePine, Trash, GraduationCap, Crown,
  Filter, Calendar, Lock, CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBadges } from '@/hooks/useBadges';

const Badges = () => {
  const { allBadges, userBadges, isLoading } = useBadges();
  const [filter, setFilter] = useState<'all' | 'earned' | 'available'>('all');

  const getIconComponent = (iconType: string) => {
    const iconMap: Record<string, any> = {
      'shield': Shield,
      'leaf': Leaf,
      'trophy': Trophy,
      'droplet': Droplet,
      'mountain': Mountain,
      'sun': Sun,
      'star': Star,
      'flower': Flower,
      'zap': Zap,
      'lightbulb': Lightbulb,
      'waves': Waves,
      'recycle': Recycle,
      'bug': Bug,
      'battery': Battery,
      'heart': Heart,
      'flower2': Flower2,
      'tree': TreePine,
      'trash': Trash,
      'graduation-cap': GraduationCap,
      'crown': Crown,
      'eco-warrior': Shield,
      'water-saver': Droplet,
      'organic-champion': Leaf,
      'soil-guardian': Mountain,
      'innovation-leader': Lightbulb
    };
    return iconMap[iconType] || Award;
  };

  const getBadgeRarity = (name: string) => {
    const legendaryBadges = ['Legend of the Land', 'Earth Champion'];
    const epicBadges = ['Climate Fighter', 'Future Farmer', 'Sustainability Star'];
    const rareBadges = ['Green Guardian', 'Water Wizard', 'Compost King', 'Bio Defender'];
    
    if (legendaryBadges.includes(name)) return 'legendary';
    if (epicBadges.includes(name)) return 'epic';
    if (rareBadges.includes(name)) return 'rare';
    return 'common';
  };

  const getBadgeStyles = (rarity: string, isEarned: boolean) => {
    const baseStyles = "group relative overflow-hidden transition-all duration-300 hover:scale-105";
    
    if (!isEarned) {
      return `${baseStyles} bg-muted/30 border-2 border-dashed border-muted grayscale`;
    }

    switch (rarity) {
      case 'legendary':
        return `${baseStyles} bg-gradient-to-br from-badge-gold/20 to-badge-bronze/20 border-2 border-badge-gold shadow-xl shadow-badge-gold/20`;
      case 'epic':
        return `${baseStyles} bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 shadow-xl shadow-purple-500/20`;
      case 'rare':
        return `${baseStyles} bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500 shadow-xl shadow-blue-500/20`;
      default:
        return `${baseStyles} bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary shadow-lg shadow-primary/10`;
    }
  };

  const getIconStyles = (rarity: string, isEarned: boolean) => {
    if (!isEarned) return 'text-muted-foreground';
    
    switch (rarity) {
      case 'legendary': return 'text-badge-gold';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      default: return 'text-primary';
    }
  };

  const filteredBadges = allBadges.filter(badge => {
    if (filter === 'earned') return badge.isEarned;
    if (filter === 'available') return !badge.isEarned;
    return true;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-badge-gold/30 to-badge-bronze/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-badge-gold" />
            </div>
            <span>Badge Collection</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn badges by completing sustainable farming achievements. Each badge represents your commitment to environmental stewardship and agricultural excellence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-eco rounded-xl p-6 text-white text-center">
            <Trophy className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold">{userBadges.length}</h3>
            <p className="text-white/80">Badges Earned</p>
          </div>
          <div className="bg-gradient-earth rounded-xl p-6 text-center">
            <Calendar className="w-10 h-10 text-secondary-dark mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-secondary-dark">{allBadges.length}</h3>
            <p className="text-secondary-dark/70">Total Available</p>
          </div>
          <div className="bg-quest-bg rounded-xl p-6 text-center">
            <Star className="w-10 h-10 text-quest-progress mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-quest-progress">
              {Math.round((userBadges.length / allBadges.length) * 100) || 0}%
            </h3>
            <p className="text-quest-progress/70">Completion Rate</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>All Badges</span>
            </Button>
            <Button
              variant={filter === 'earned' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('earned')}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Earned ({userBadges.length})</span>
            </Button>
            <Button
              variant={filter === 'available' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('available')}
              className="flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Available ({allBadges.length - userBadges.length})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBadges.map((badge) => {
          const IconComponent = getIconComponent(badge.icon_type);
          const rarity = getBadgeRarity(badge.name);
          const isEarned = badge.isEarned || false;
          
          return (
            <div
              key={badge.id}
              className={`p-6 rounded-xl ${getBadgeStyles(rarity, isEarned)}`}
            >
              {/* Rarity indicator */}
              <div className="absolute top-2 right-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs capitalize ${
                    rarity === 'legendary' ? 'border-badge-gold text-badge-gold bg-badge-gold/10' :
                    rarity === 'epic' ? 'border-purple-500 text-purple-500 bg-purple-500/10' :
                    rarity === 'rare' ? 'border-blue-500 text-blue-500 bg-blue-500/10' :
                    'border-primary text-primary bg-primary/10'
                  }`}
                >
                  {rarity}
                </Badge>
              </div>

              {/* Badge Icon */}
              <div className="text-center mb-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  isEarned ? 'bg-white/20' : 'bg-muted/20'
                }`}>
                  <IconComponent className={`w-8 h-8 ${getIconStyles(rarity, isEarned)}`} />
                </div>
                
                {/* Earned indicator */}
                {isEarned && (
                  <div className="absolute top-4 left-4">
                    <div className="w-6 h-6 rounded-full bg-quest-progress flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Badge Info */}
              <div className="text-center space-y-2">
                <h3 className={`font-bold text-lg ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm ${isEarned ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                  {badge.description}
                </p>
                
                {/* Earned date */}
                {isEarned && badge.earned_at && (
                  <p className="text-xs text-quest-progress font-medium">
                    Earned {new Date(badge.earned_at).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Glow effect for earned badges */}
              {isEarned && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-2xl max-w-md mx-auto">
          <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No badges found
          </h3>
          <p className="text-muted-foreground">
            {filter === 'earned' 
              ? 'You haven\'t earned any badges yet. Complete quests to start earning!'
              : 'No badges match your current filter.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Badges;