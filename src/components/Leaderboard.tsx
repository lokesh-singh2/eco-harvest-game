import { useState } from "react";
import { Trophy, Medal, Award, Users, MapPin, Crown } from "lucide-react";

interface LeaderboardProps {
  currentUser: {
    name: string;
    score: number;
    rank: number;
  };
}

const Leaderboard = ({ currentUser }: LeaderboardProps) => {
  const [scope, setScope] = useState<'village' | 'panchayat'>('village');

  // Mock leaderboard data
  const villageLeaderboard = [
    { rank: 1, name: "Rajesh Kumar", score: 2850, avatar: "RK", isCurrentUser: false },
    { rank: 2, name: "Priya Sharma", score: 2340, avatar: "PS", isCurrentUser: false },
    { rank: 3, name: "Suresh Patel", score: 2120, avatar: "SP", isCurrentUser: false },
    { rank: 4, name: "Anjali Patel", score: currentUser.score, avatar: "AP", isCurrentUser: true },
    { rank: 5, name: "Ramesh Singh", score: 1890, avatar: "RS", isCurrentUser: false },
    { rank: 6, name: "Kavita Devi", score: 1750, avatar: "KD", isCurrentUser: false },
    { rank: 7, name: "Vikram Yadav", score: 1640, avatar: "VY", isCurrentUser: false },
    { rank: 8, name: "Sunita Gupta", score: 1520, avatar: "SG", isCurrentUser: false },
    { rank: 9, name: "Anil Verma", score: 1430, avatar: "AV", isCurrentUser: false },
    { rank: 10, name: "Meera Joshi", score: 1350, avatar: "MJ", isCurrentUser: false }
  ];

  const panchayatLeaderboard = [
    { rank: 1, name: "Rajesh Kumar", score: 2850, avatar: "RK", isCurrentUser: false },
    { rank: 2, name: "Harish Chandra", score: 2680, avatar: "HC", isCurrentUser: false },
    { rank: 3, name: "Priya Sharma", score: 2340, avatar: "PS", isCurrentUser: false },
    { rank: 4, name: "Mohan Das", score: 2290, avatar: "MD", isCurrentUser: false },
    { rank: 5, name: "Suresh Patel", score: 2120, avatar: "SP", isCurrentUser: false },
    { rank: 6, name: "Lakshmi Iyer", score: 1980, avatar: "LI", isCurrentUser: false },
    { rank: 7, name: "Ramesh Singh", score: 1890, avatar: "RS", isCurrentUser: false },
    { rank: 8, name: "Anjali Patel", score: currentUser.score, avatar: "AP", isCurrentUser: true },
    { rank: 9, name: "Krishna Reddy", score: 1720, avatar: "KR", isCurrentUser: false },
    { rank: 10, name: "Kavita Devi", score: 1680, avatar: "KD", isCurrentUser: false }
  ];

  const currentLeaderboard = scope === 'village' ? villageLeaderboard : panchayatLeaderboard;

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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-badge-gold/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-badge-gold" />
            </div>
            <span>Leaderboard</span>
          </h2>
          
          {/* Scope Toggle */}
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setScope('village')}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center space-x-2 ${
                scope === 'village'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Local Village</span>
            </button>
            <button
              onClick={() => setScope('panchayat')}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center space-x-2 ${
                scope === 'panchayat'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Panchayat</span>
            </button>
          </div>
        </div>

        {/* Current User Highlight */}
        <div className="bg-gradient-eco rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">AP</span>
              </div>
              <div>
                <p className="font-semibold text-lg">Your Ranking</p>
                <p className="text-white/80">
                  #{currentUser.rank} in {scope === 'village' ? 'Local Village' : 'Panchayat'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{currentUser.score}</p>
              <p className="text-white/80 text-sm">Sustainability Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Rankings */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Top Performers - {scope === 'village' ? 'Local Village' : 'Panchayat'}
        </h3>
        
        <div className="space-y-3">
          {currentLeaderboard.map((farmer) => (
            <div
              key={farmer.rank}
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
            {currentLeaderboard.filter(f => f.score > 2000).length}
          </h4>
          <p className="text-secondary-dark/70">Champions (2000+ pts)</p>
        </div>
        
        <div className="bg-quest-bg rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-quest-progress mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-quest-progress">
            {currentLeaderboard.length}
          </h4>
          <p className="text-quest-progress/70">Active Farmers</p>
        </div>
        
        <div className="bg-accent rounded-xl p-6 text-center">
          <Award className="w-12 h-12 text-accent-vibrant mx-auto mb-3" />
          <h4 className="text-2xl font-bold text-accent-vibrant">
            {Math.round(currentLeaderboard.reduce((sum, f) => sum + f.score, 0) / currentLeaderboard.length)}
          </h4>
          <p className="text-accent-vibrant/70">Average Score</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;