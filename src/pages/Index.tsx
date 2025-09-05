import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import AllQuests from "@/components/AllQuests";
import Leaderboard from "@/components/Leaderboard";
import Rewards from "@/components/Rewards";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  // User data
  const currentUser = {
    name: "Anjali Patel",
    score: 1250,
    rank: 4
  };

  // Mock quest data
  const [quests, setQuests] = useState([
    {
      id: 'quest-1',
      title: 'Mulching Master',
      description: 'Complete 3 weeks of mulching on your banana fields to improve soil moisture retention and reduce weed growth.',
      progress: 66,
      points: 75,
      status: 'in-progress',
      category: 'Soil Health'
    },
    {
      id: 'quest-2',
      title: 'Water Conservation Champion',
      description: 'Reduce water usage by 15% this month using drip irrigation and water harvesting techniques.',
      progress: 40,
      points: 100,
      status: 'in-progress',
      category: 'Water Management'
    },
    {
      id: 'quest-3',
      title: 'Organic Pest Controller',
      description: 'Switch to bio-pesticides for the monsoon season and document pest control effectiveness.',
      progress: 100,
      points: 90,
      status: 'in-progress',
      category: 'Organic Farming'
    },
    {
      id: 'quest-4',
      title: 'Mixed Cropping Pioneer',
      description: 'Introduce mixed cropping with legumes on 1 acre to improve soil nitrogen and increase biodiversity.',
      progress: 0,
      points: 120,
      status: 'recommended',
      category: 'Sustainable Practices'
    },
    {
      id: 'quest-5',
      title: 'Soil Health Analyst',
      description: 'Complete a comprehensive soil health test and apply recommendations for optimal nutrient management.',
      progress: 0,
      points: 85,
      status: 'recommended',
      category: 'Soil Health'
    },
    {
      id: 'quest-6',
      title: 'Composting Expert',
      description: 'Create and maintain a composting system for farm waste, producing organic fertilizer for crops.',
      progress: 0,
      points: 70,
      status: 'recommended',
      category: 'Waste Management'
    },
    {
      id: 'quest-7',
      title: 'Crop Rotation Specialist',
      description: 'Implement a 3-crop rotation cycle to maintain soil health and reduce pest and disease pressure.',
      progress: 100,
      points: 110,
      status: 'completed',
      category: 'Sustainable Practices'
    },
    {
      id: 'quest-8',
      title: 'Green Manure Champion',
      description: 'Cultivate and incorporate green manure crops to enhance soil fertility naturally.',
      progress: 100,
      points: 95,
      status: 'completed',
      category: 'Soil Health'
    }
  ]);

  // Mock badges data
  const badges = [
    {
      id: 'badge-1',
      name: 'Water Saver',
      description: 'Reduced water consumption by 20% through efficient irrigation practices',
      type: 'water-saver'
    },
    {
      id: 'badge-2',
      name: 'Organic Champion',
      description: 'Successfully transitioned to 100% organic pest management',
      type: 'organic-champion'
    },
    {
      id: 'badge-3',
      name: 'Soil Guardian',
      description: 'Maintained healthy soil through composting and organic matter',
      type: 'soil-guardian'
    }
  ];

  // Get active quests (in-progress status)
  const activeQuests = quests.filter(quest => quest.status === 'in-progress');

  // Handle quest actions
  const handleStartQuest = (questId: string) => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === questId
          ? { ...quest, status: 'in-progress' as const, progress: 10 }
          : quest
      )
    );
  };

  const handleCompleteQuest = (questId: string) => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === questId
          ? { ...quest, status: 'completed' as const, progress: 100 }
          : quest
      )
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            userName={currentUser.name}
            activeQuests={activeQuests}
            badges={badges}
            onStartQuest={handleStartQuest}
            onCompleteQuest={handleCompleteQuest}
          />
        );
      case 'quests':
        return (
          <AllQuests
            quests={quests}
            onStartQuest={handleStartQuest}
            onCompleteQuest={handleCompleteQuest}
          />
        );
      case 'leaderboard':
        return <Leaderboard currentUser={currentUser} />;
      case 'rewards':
        return <Rewards currentPoints={currentUser.score} />;
      default:
        return (
          <Dashboard
            userName={currentUser.name}
            activeQuests={activeQuests}
            badges={badges}
            onStartQuest={handleStartQuest}
            onCompleteQuest={handleCompleteQuest}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        userName={currentUser.name}
        score={currentUser.score}
      />
      <main className="relative">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;