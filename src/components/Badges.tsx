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
    if (!isEarned) {
      // Make unearned icons still show color but dimmed
      switch (rarity) {
        case 'legendary': return 'text-badge-enhanced-legendary/60 drop-shadow-[0_0_8px_hsl(var(--badge-legendary-glow)/0.4)] transition-all group-hover:text-badge-enhanced-legendary/80';
        case 'epic': return 'text-badge-enhanced-epic/60 drop-shadow-[0_0_6px_hsl(var(--badge-epic-glow)/0.3)] transition-all group-hover:text-badge-enhanced-epic/80';
        case 'rare': return 'text-badge-enhanced-rare/60 drop-shadow-[0_0_5px_hsl(var(--badge-rare-glow)/0.3)] transition-all group-hover:text-badge-enhanced-rare/80';
        default: return 'text-badge-enhanced-common/60 drop-shadow-[0_0_4px_hsl(var(--badge-common-glow)/0.3)] transition-all group-hover:text-badge-enhanced-common/80';
      }
    }
    
    switch (rarity) {
      case 'legendary': return 'text-badge-enhanced-legendary drop-shadow-[0_0_15px_hsl(var(--badge-legendary-glow)/0.9)] filter brightness-110 animate-pulse';
      case 'epic': return 'text-badge-enhanced-epic drop-shadow-[0_0_12px_hsl(var(--badge-epic-glow)/0.8)] filter brightness-105';
      case 'rare': return 'text-badge-enhanced-rare drop-shadow-[0_0_10px_hsl(var(--badge-rare-glow)/0.7)] filter brightness-102';
      default: return 'text-badge-enhanced-common drop-shadow-[0_0_8px_hsl(var(--badge-common-glow)/0.6)]';
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
              {/* Legendary Divine Aura (preview visible even if locked) */}
              {rarity === 'legendary' && (
                <>
                  <div className={`absolute -inset-6 rounded-3xl ${isEarned ? 'opacity-40' : 'opacity-25'} animate-aura-spin`}>
                    <div className="w-full h-full rounded-3xl bg-gradient-conic from-badge-enhanced-legendary via-badge-enhanced-legendary-glow via-transparent to-badge-enhanced-legendary blur-lg" />
                  </div>
                  <div className={`absolute -inset-4 rounded-3xl ${isEarned ? 'opacity-60' : 'opacity-35'} animate-aura-spin`} style={{ animationDirection: 'reverse', animationDuration: '8s' }}>
                    <div className="w-full h-full rounded-3xl bg-gradient-conic from-transparent via-badge-enhanced-legendary-glow to-transparent blur-md" />
                  </div>
                </>
              )}

              {/* Epic Mystical Aura (preview visible even if locked) */}
              {rarity === 'epic' && (
                <>
                  <div className={`absolute -inset-4 rounded-2xl ${isEarned ? 'opacity-35' : 'opacity-20'} animate-aura-spin`} style={{ animationDuration: '10s' }}>
                    <div className="w-full h-full rounded-2xl bg-gradient-conic from-badge-enhanced-epic via-badge-enhanced-epic-glow to-transparent blur-lg" />
                  </div>
                  <div className={`absolute -inset-2 rounded-2xl ${isEarned ? 'opacity-50' : 'opacity-30'} animate-aura-spin`} style={{ animationDirection: 'reverse', animationDuration: '6s' }}>
                    <div className="w-full h-full rounded-2xl bg-gradient-conic from-transparent via-badge-enhanced-epic-glow to-badge-enhanced-epic blur-sm" />
                  </div>
                </>
              )}

              {/* Rare Crystal Aura (preview visible even if locked) */}
              {rarity === 'rare' && (
                <div className={`absolute -inset-3 rounded-2xl ${isEarned ? 'opacity-30' : 'opacity-20'} animate-aura-spin`} style={{ animationDuration: '8s' }}>
                  <div className="w-full h-full rounded-2xl bg-gradient-conic from-badge-enhanced-rare via-badge-enhanced-rare-glow to-transparent blur-md" />
                </div>
              )}

              {/* Enhanced Shimmer Effect (preview on hover) */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer opacity-0 ${isEarned ? 'group-hover:opacity-100' : 'group-hover:opacity-90'} transition-opacity duration-500`} 
                   style={{ backgroundSize: '300% 100%' }} />
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

              {/* Badge Icon with Magical Enhancement */}
              <div className="text-center mb-4 relative z-10">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 relative transition-all duration-700 ${
                  isEarned ? 'bg-white/15 backdrop-blur-md border-2' : 'bg-white/8 backdrop-blur-sm border-2'
                } ${
                  rarity === 'legendary' ? `border-badge-enhanced-legendary${isEarned ? '' : '/40'} shadow-[0_0_40px_hsl(var(--badge-legendary-glow)/${isEarned ? '0.6' : '0.2'})]` :
                  rarity === 'epic' ? `border-badge-enhanced-epic${isEarned ? '' : '/35'} shadow-[0_0_30px_hsl(var(--badge-epic-glow)/${isEarned ? '0.5' : '0.15'})]` :
                  rarity === 'rare' ? `border-badge-enhanced-rare${isEarned ? '' : '/30'} shadow-[0_0_25px_hsl(var(--badge-rare-glow)/${isEarned ? '0.4' : '0.12'})]` :
                  `border-badge-enhanced-common${isEarned ? '' : '/25'} shadow-[0_0_20px_hsl(var(--badge-common-glow)/${isEarned ? '0.3' : '0.1'})]`
                }`}>
                  
                  {/* Multi-layer glow backgrounds for earned badges */}
                  {isEarned && rarity === 'legendary' && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-badge-enhanced-legendary/30 animate-pulse blur-sm" />
                      <div className="absolute inset-1 rounded-full bg-badge-enhanced-legendary-glow/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </>
                  )}
                  {isEarned && rarity === 'epic' && (
                    <div className="absolute inset-0 rounded-full bg-badge-enhanced-epic/25 animate-pulse blur-sm" />
                  )}
                  {isEarned && rarity === 'rare' && (
                    <div className="absolute inset-0 rounded-full bg-badge-enhanced-rare/20 animate-pulse blur-sm" />
                  )}
                  
                  <IconComponent className={`w-12 h-12 relative z-20 ${getIconStyles(rarity, isEarned)} transition-all duration-500 group-hover:scale-125 ${isEarned ? 'group-hover:rotate-12' : 'group-hover:rotate-6'}`} />
                  
                  {/* Enhanced glow rings for earned badges */}
                  {isEarned && rarity === 'legendary' && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-badge-enhanced-legendary opacity-60 animate-pulse" />
                      <div className="absolute -inset-1 rounded-full border border-badge-enhanced-legendary-glow opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                  {isEarned && rarity === 'epic' && (
                    <div className="absolute inset-0 rounded-full border-2 border-badge-enhanced-epic opacity-50 animate-pulse" />
                  )}
                  {isEarned && rarity === 'rare' && (
                    <div className="absolute inset-0 rounded-full border border-badge-enhanced-rare opacity-40 animate-pulse" />
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
                  isEarned ? 'text-foreground group-hover:scale-105' : 'text-foreground/80 group-hover:text-foreground'
                } ${rarity === 'legendary' && isEarned ? 'text-shadow-lg' : ''}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isEarned ? 'text-muted-foreground' : 'text-muted-foreground/70 group-hover:text-muted-foreground/90'
                }`}>
                  {badge.description}
                </p>
                
                {/* Lock message for unearned badges - subtle */}
                {!isEarned && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-muted/80">
                    <Lock className="w-3 h-3" />
                    <span>Complete quests to unlock</span>
                  </div>
                )}
                
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

              {/* Legendary Divine Particles */}
              {isEarned && rarity === 'legendary' && (
                <>
                  <div className="absolute top-3 left-3 w-3 h-3 bg-badge-enhanced-legendary rounded-full animate-magical-float opacity-80 blur-sm" />
                  <div className="absolute top-8 right-5 w-2 h-2 bg-badge-enhanced-legendary-glow rounded-full animate-magical-float opacity-90" style={{ animationDelay: '1s' }} />
                  <div className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-badge-enhanced-legendary rounded-full animate-magical-float opacity-70" style={{ animationDelay: '2s' }} />
                  <div className="absolute bottom-4 right-3 w-1.5 h-1.5 bg-badge-enhanced-legendary-glow rounded-full animate-magical-float opacity-85" style={{ animationDelay: '3s' }} />
                  <div className="absolute top-1/2 left-2 w-1 h-1 bg-badge-enhanced-legendary rounded-full animate-magical-float opacity-60" style={{ animationDelay: '4s' }} />
                  <div className="absolute top-1/3 right-2 w-1.5 h-1.5 bg-badge-enhanced-legendary-glow rounded-full animate-magical-float opacity-75" style={{ animationDelay: '0.5s' }} />
                </>
              )}

              {/* Epic Mystical Effects */}
              {isEarned && rarity === 'epic' && (
                <>
                  <div className="absolute top-5 right-7 w-2 h-2 bg-badge-enhanced-epic rounded-full animate-magical-float opacity-70" />
                  <div className="absolute bottom-7 left-5 w-1.5 h-1.5 bg-badge-enhanced-epic-glow rounded-full animate-magical-float opacity-80" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute top-1/3 left-3 w-1 h-1 bg-badge-enhanced-epic rounded-full animate-magical-float opacity-60" style={{ animationDelay: '2.5s' }} />
                  <div className="absolute bottom-1/3 right-4 w-1.5 h-1.5 bg-badge-enhanced-epic-glow rounded-full animate-magical-float opacity-75" style={{ animationDelay: '1s' }} />
                </>
              )}

              {/* Rare Crystal Sparkles */}
              {isEarned && rarity === 'rare' && (
                <>
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-badge-enhanced-rare rounded-full animate-magical-float opacity-70" />
                  <div className="absolute bottom-8 left-7 w-1 h-1 bg-badge-enhanced-rare-glow rounded-full animate-magical-float opacity-80" style={{ animationDelay: '1.8s' }} />
                  <div className="absolute top-1/2 right-3 w-1 h-1 bg-badge-enhanced-rare rounded-full animate-magical-float opacity-65" style={{ animationDelay: '0.8s' }} />
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