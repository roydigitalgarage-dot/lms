import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState({
    earned: [
      { name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', points: 10, rarity: 'common' }
    ],
    available: [
      { name: 'Speed Learner', description: 'Complete 5 lessons in one day', icon: '⚡', points: 50, rarity: 'rare' }
    ],
    totalPoints: 10
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Trophy className="w-12 h-12 mr-4" />
            Achievements
          </h1>
          <p className="text-yellow-100 text-xl">Your learning milestones and rewards</p>
          <div className="mt-4 flex items-center space-x-6">
            <div className="bg-white/20 rounded-2xl px-4 py-2">
              <span className="text-2xl font-bold">{achievements.earned.length}</span>
              <span className="text-sm ml-2">Earned</span>
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-2">
              <span className="text-2xl font-bold">{achievements.totalPoints}</span>
              <span className="text-sm ml-2">Points</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Award className="w-8 h-8 mr-3 text-yellow-500" />
            Earned Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.earned.map((achievement, index) => (
              <div key={index} className={`p-6 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-lg`}>
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-2">{achievement.name}</h3>
                <p className="text-sm opacity-90 mb-3">{achievement.description}</p>
                <span className="text-lg font-bold">{achievement.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-500" />
            Available Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.available.map((achievement, index) => (
              <div key={index} className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-600">
                <div className="text-4xl mb-3 opacity-50">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{achievement.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                <span className="text-lg font-bold text-blue-600">{achievement.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}