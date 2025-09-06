import { useState } from "react";
import { Trophy, Medal, Award, Users, MapPin, Crown, Leaf } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const Leaderboard = () => {
  const { leaderboardData, currentUser, isLoading } = useLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-badge-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-badge-silver" />;
      case 3:
        return <Award className="w-6 h-6 text-badge-bronze" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-bold text-muted-foreground">{rank}</span>
          </div>
        );
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-badge-gold/20 text-badge-gold border-badge-gold/30';
      case 2:
        return 'bg-badge-silver/20 text-badge-silver border-badge-silver/30';
      case 3:
        return 'bg-badge-bronze/20 text-badge-bronze border-badge-bronze/30';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (!leaderboardData.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-muted/30 rounded-2xl max-w-md mx-auto">
          <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No leaderboard data yet
          </h3>
          <p className="text-muted-foreground">
            Complete quests to start earning sustainability points and appear on the leaderboard!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-badge-gold/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-badge-gold" />
            </div>
            <span>Leaderboard</span>
          </h2>
        </div>

        {/* Current User Highlight */}
        {currentUser && (
          <div className="bg-gradient-eco rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-bold">{currentUser.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Your Ranking</p>
                  <p className="text-white/80">
                    #{currentUser.rank} out of {leaderboardData.length} farmers
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentUser.score}</p>
                <p className="text-white/80 text-sm">Sustainability Points</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Rankings */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Top Performers
        </h3>
        
        <div className="space-y-3">
          {leaderboardData.map((farmer) => (
            <div
              key={farmer.userId}
              className={`p-4 rounded-xl border-2 transition-all ${
                farmer.isCurrentUser
                  ? 'bg-primary/10 border-primary shadow-natural'
                  : 'bg-background border-border hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl border-2 ${getRankBadgeColor(farmer.rank)}`}>
                    {getRankIcon(farmer.rank)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      farmer.isCurrentUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gradient-earth text-secondary-dark'
                    }`}>
                      {farmer.avatar}
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        farmer.isCurrentUser ? 'text-primary' : 'text-foreground'
                      }`}>
                        {farmer.name}
                        {farmer.isCurrentUser && (
                          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Rank #{farmer.rank}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">{farmer.score}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-earth rounded-xl p-6 text-center">
          <Trophy className="w-12 h-12 text-badge-gold mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-secondary-dark">
            {leaderboardData.filter(f => f.score > 2000).length}
          </h4>
          <p className="text-secondary-dark/70">Champions (2000+ pts)</p>
        </div>
        
        <div className="bg-quest-bg rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-quest-progress mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-quest-progress">
            {leaderboardData.length}
          </h4>
          <p className="text-quest-progress/70">Active Farmers</p>
        </div>
        
        <div className="bg-accent rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-accent-vibrant mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-accent-vibrant">
            {leaderboardData.length > 0 
              ? Math.round(leaderboardData.reduce((sum, f) => sum + f.score, 0) / leaderboardData.length)
              : 0
            }
          </h4>
          <p className="text-accent-vibrant/70">Average Score</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;