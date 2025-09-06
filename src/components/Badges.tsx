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
    const baseStyles = "group relative overflow-hidden transition-all duration-500";
    
    if (!isEarned) {
      return `${baseStyles} bg-muted/20 border-2 border-dashed border-muted/50 grayscale opacity-60`;
    }

    switch (rarity) {
      case 'legendary':
        return `${baseStyles} bg-gradient-to-br from-badge-enhanced-legendary/30 via-badge-enhanced-legendary-glow/20 to-badge-enhanced-legendary/40 
                border-3 border-badge-enhanced-legendary animate-legendary-pulse 
                shadow-[0_0_40px_rgba(255,215,0,0.6),inset_0_0_20px_rgba(255,215,0,0.2)] 
                hover:shadow-[0_0_60px_rgba(255,215,0,0.8),inset_0_0_30px_rgba(255,215,0,0.3)] 
                hover:scale-110 transform`;
      case 'epic':
        return `${baseStyles} bg-gradient-to-br from-badge-enhanced-epic/25 via-badge-enhanced-epic-glow/15 to-badge-enhanced-epic/35 
                border-3 border-badge-enhanced-epic animate-epic-pulse 
                shadow-[0_0_30px_rgba(147,51,234,0.5),inset_0_0_15px_rgba(147,51,234,0.15)] 
                hover:shadow-[0_0_45px_rgba(147,51,234,0.7),inset_0_0_25px_rgba(147,51,234,0.25)] 
                hover:scale-108 transform`;
      case 'rare':
        return `${baseStyles} bg-gradient-to-br from-badge-enhanced-rare/20 via-badge-enhanced-rare-glow/10 to-badge-enhanced-rare/30 
                border-2 border-badge-enhanced-rare animate-rare-pulse 
                shadow-[0_0_20px_rgba(59,130,246,0.4),inset_0_0_10px_rgba(59,130,246,0.1)] 
                hover:shadow-[0_0_35px_rgba(59,130,246,0.6),inset_0_0_20px_rgba(59,130,246,0.2)] 
                hover:scale-105 transform`;
      default:
        return `${baseStyles} bg-gradient-to-br from-badge-enhanced-common/15 via-primary/10 to-badge-enhanced-common-glow/20 
                border-2 border-badge-enhanced-common 
                shadow-[0_0_15px_rgba(34,197,94,0.3)] 
                hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] 
                hover:scale-103 transform`;
    }
  };

  const getIconStyles = (rarity: string, isEarned: boolean) => {
    if (!isEarned) return 'text-muted-foreground/60';
    
    switch (rarity) {
      case 'legendary': return 'text-badge-enhanced-legendary drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]';
      case 'epic': return 'text-badge-enhanced-epic drop-shadow-[0_0_6px_rgba(147,51,234,0.6)]';
      case 'rare': return 'text-badge-enhanced-rare drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]';
      default: return 'text-badge-enhanced-common drop-shadow-[0_0_3px_rgba(34,197,94,0.4)]';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBadges.map((badge) => {
          const IconComponent = getIconComponent(badge.icon_type);
          const rarity = getBadgeRarity(badge.name);
          const isEarned = badge.isEarned || false;
          
          return (
            <div
              key={badge.id}
              className={`p-6 rounded-2xl ${getBadgeStyles(rarity, isEarned)} cursor-pointer`}
            >
              {/* Legendary Aura Effect */}
              {isEarned && rarity === 'legendary' && (
                <div className="absolute -inset-4 rounded-3xl opacity-30 animate-aura-spin">
                  <div className="w-full h-full rounded-3xl bg-gradient-conic from-badge-enhanced-legendary via-badge-enhanced-legendary-glow via-badge-enhanced-legendary to-badge-enhanced-legendary blur-sm" />
                </div>
              )}

              {/* Epic Aura Effect */}
              {isEarned && rarity === 'epic' && (
                <div className="absolute -inset-3 rounded-2xl opacity-25 animate-aura-spin" style={{ animationDuration: '6s' }}>
                  <div className="w-full h-full rounded-2xl bg-gradient-conic from-badge-enhanced-epic via-badge-enhanced-epic-glow to-badge-enhanced-epic blur-sm" />
                </div>
              )}

              {/* Shimmer Effect for Earned Badges */}
              {isEarned && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ backgroundSize: '200% 100%' }} />
              )}

              {/* Rarity indicator with enhanced styling */}
              <div className="absolute top-3 right-3 z-10">
                <Badge 
                  variant="outline" 
                  className={`text-xs font-bold capitalize backdrop-blur-sm ${
                    rarity === 'legendary' ? 'border-badge-enhanced-legendary text-badge-enhanced-legendary bg-badge-enhanced-legendary/20 shadow-lg shadow-badge-enhanced-legendary/30' :
                    rarity === 'epic' ? 'border-badge-enhanced-epic text-badge-enhanced-epic bg-badge-enhanced-epic/20 shadow-lg shadow-badge-enhanced-epic/30' :
                    rarity === 'rare' ? 'border-badge-enhanced-rare text-badge-enhanced-rare bg-badge-enhanced-rare/20 shadow-lg shadow-badge-enhanced-rare/30' :
                    'border-badge-enhanced-common text-badge-enhanced-common bg-badge-enhanced-common/20 shadow-lg shadow-badge-enhanced-common/30'
                  }`}
                >
                  {rarity}
                </Badge>
              </div>

              {/* Badge Icon with enhanced glow */}
              <div className="text-center mb-4 relative z-10">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 relative ${
                  isEarned ? 'bg-white/10 backdrop-blur-sm' : 'bg-muted/10'
                } ${isEarned && rarity === 'legendary' ? 'shadow-[0_0_30px_rgba(255,215,0,0.5)]' : ''}`}>
                  
                  {/* Icon glow background for legendary */}
                  {isEarned && rarity === 'legendary' && (
                    <div className="absolute inset-0 rounded-full bg-badge-enhanced-legendary/20 animate-pulse" />
                  )}
                  
                  <IconComponent className={`w-10 h-10 relative z-10 ${getIconStyles(rarity, isEarned)} transition-all duration-300 group-hover:scale-110`} />
                  
                  {/* Additional glow ring for powerful badges */}
                  {isEarned && (rarity === 'legendary' || rarity === 'epic') && (
                    <div className={`absolute inset-0 rounded-full border-2 opacity-50 animate-pulse ${
                      rarity === 'legendary' ? 'border-badge-enhanced-legendary' : 'border-badge-enhanced-epic'
                    }`} />
                  )}
                </div>
                
                {/* Earned indicator with glow */}
                {isEarned && (
                  <div className="absolute top-2 left-2 z-20">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      rarity === 'legendary' ? 'bg-badge-enhanced-legendary shadow-badge-enhanced-legendary/50' :
                      rarity === 'epic' ? 'bg-badge-enhanced-epic shadow-badge-enhanced-epic/50' :
                      rarity === 'rare' ? 'bg-badge-enhanced-rare shadow-badge-enhanced-rare/50' :
                      'bg-quest-progress shadow-quest-progress/50'
                    }`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Badge Info with enhanced styling */}
              <div className="text-center space-y-3 relative z-10">
                <h3 className={`font-bold text-lg transition-all duration-300 ${
                  isEarned ? 'text-foreground group-hover:scale-105' : 'text-muted-foreground'
                } ${rarity === 'legendary' && isEarned ? 'text-shadow-lg' : ''}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isEarned ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {badge.description}
                </p>
                
                {/* Earned date with special styling */}
                {isEarned && badge.earned_at && (
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                    rarity === 'legendary' ? 'bg-badge-enhanced-legendary/20 text-badge-enhanced-legendary border border-badge-enhanced-legendary/30' :
                    rarity === 'epic' ? 'bg-badge-enhanced-epic/20 text-badge-enhanced-epic border border-badge-enhanced-epic/30' :
                    rarity === 'rare' ? 'bg-badge-enhanced-rare/20 text-badge-enhanced-rare border border-badge-enhanced-rare/30' :
                    'bg-quest-progress/20 text-quest-progress border border-quest-progress/30'
                  }`}>
                    <Calendar className="w-3 h-3" />
                    <span>Earned {new Date(badge.earned_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Powerful badge special effects */}
              {isEarned && rarity === 'legendary' && (
                <>
                  {/* Golden particles */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-badge-enhanced-legendary rounded-full animate-float opacity-60" />
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-badge-enhanced-legendary-glow rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 right-4 w-1 h-1 bg-badge-enhanced-legendary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
                </>
              )}

              {/* Epic badge special effects */}
              {isEarned && rarity === 'epic' && (
                <>
                  <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-badge-enhanced-epic rounded-full animate-float opacity-60" />
                  <div className="absolute bottom-8 left-6 w-1 h-1 bg-badge-enhanced-epic-glow rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }} />
                </>
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