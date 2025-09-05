import { User, Trophy, Leaf, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Navigate } from "react-router-dom";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Leaf },
    { id: 'quests', label: 'All Quests', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'rewards', label: 'Rewards', icon: Trophy }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-eco flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">EcoHarvest</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === item.id
                  ? 'bg-primary text-primary-foreground shadow-natural'
                  : 'text-muted-foreground hover:text-primary hover:bg-quest-bg'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-foreground">{profile?.display_name || user.email}</p>
            <p className="text-sm text-primary font-semibold">Score: {profile?.sustainability_score || 0} pts</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-earth flex items-center justify-center">
            <User className="w-6 h-6 text-secondary-dark" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-background">
        <div className="container mx-auto px-4 py-2 flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                currentView === item.id
                  ? 'text-primary bg-quest-bg'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;