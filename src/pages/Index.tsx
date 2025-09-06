import { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import AllQuests from "@/components/AllQuests";
import Leaderboard from "@/components/Leaderboard";
import Rewards from "@/components/Rewards";
import Badges from "@/components/Badges";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Leaf } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const { profile } = useProfile();
  const [currentView, setCurrentView] = useState('dashboard');

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Current user data from profile
  const currentUser = {
    name: profile?.display_name || user.email || "Farmer",
    score: profile?.sustainability_score || 0,
    rank: 4 // This could be calculated from leaderboard data
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'quests':
        return <AllQuests />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'rewards':
        return <Rewards />;
      case 'badges':
        return <Badges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="relative">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;