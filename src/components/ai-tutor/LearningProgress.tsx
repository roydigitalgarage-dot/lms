import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, BookOpen, Calculator, Lightbulb, Palette } from 'lucide-react';

interface ProgressData {
  [topic: string]: {
    attempts: number;
    successes: number;
    averageDifficulty: number;
  };
}

interface LearningProgressProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LearningProgress({ isVisible, onClose }: LearningProgressProps) {
  const [progressData, setProgressData] = useState<ProgressData>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      loadProgressData();
      loadSuggestions();
    }
  }, [isVisible]);

  const loadProgressData = () => {
    const data = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    setProgressData(data);
  };

  const loadSuggestions = () => {
    // Mock suggestions for static version
    const mockSuggestions = [
      "Try asking me about your favorite subjects! 🌟",
      "Practice makes perfect - keep asking questions! 💪",
      "Explore new topics to expand your knowledge! 🚀",
      "Don't be afraid to ask 'why' - curiosity is amazing! 🤔"
    ];
    setSuggestions(mockSuggestions);
  };

  const getTopicIcon = (topic: string) => {
    switch (topic.toLowerCase()) {
      case 'math': return Calculator;
      case 'reading': return BookOpen;
      case 'science': return Lightbulb;
      case 'art': return Palette;
      default: return Target;
    }
  };

  const getTopicEmoji = (topic: string) => {
    switch (topic.toLowerCase()) {
      case 'math': return '🔢';
      case 'reading': return '📚';
      case 'science': return '🔬';
      case 'art': return '🎨';
      default: return '🎯';
    }
  };

  const getSuccessRate = (data: { attempts: number; successes: number }) => {
    return data.attempts > 0 ? Math.round((data.successes / data.attempts) * 100) : 0;
  };

  const getProgressColor = (successRate: number) => {
    if (successRate >= 80) return 'from-green-400 to-emerald-500';
    if (successRate >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white rounded-t-3xl p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce">🏆</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-30 animate-pulse">⭐</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-3xl font-bold flex items-center">
                <TrendingUp className="w-8 h-8 mr-3" />
                Your Learning Journey! 🚀
              </h2>
              <p className="text-purple-100 text-lg mt-2">See how amazing you're doing!</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
            >
              <span className="text-2xl">✖️</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress Cards */}
          {Object.keys(progressData).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(progressData).map(([topic, data]) => {
                const Icon = getTopicIcon(topic);
                const successRate = getSuccessRate(data);
                const progressColor = getProgressColor(successRate);
                
                return (
                  <div
                    key={topic}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-3 border-purple-200 dark:border-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${progressColor} flex items-center justify-center text-white shadow-lg`}>
                          <span className="text-2xl">{getTopicEmoji(topic)}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{topic}</h3>
                          <p className="text-sm text-purple-600 dark:text-purple-400">Learning Progress</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${progressColor} bg-clip-text text-transparent`}>
                          {successRate}%
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${successRate}%` }}
                      ></div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{data.attempts}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Questions Asked</div>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">{data.successes}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Great Answers!</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start Your Learning Adventure!</h3>
              <p className="text-purple-600 dark:text-purple-400 text-lg">
                Ask me questions to see your progress here! Every question helps you grow! 🚀
              </p>
            </div>
          )}

          {/* Personalized Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-3 border-yellow-200 dark:border-yellow-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-600" />
                <span className="text-2xl mr-2">💡</span>
                Personalized Tips for You!
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Badges */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <span className="text-2xl mr-2">🏅</span>
              Your Learning Badges
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(progressData).map(([topic, data]) => {
                const successRate = getSuccessRate(data);
                if (successRate >= 80) {
                  return (
                    <div
                      key={`${topic}-expert`}
                      className="bg-gradient-to-r from-gold-400 to-yellow-500 text-white rounded-full px-4 py-2 font-bold shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      🏆 {topic.charAt(0).toUpperCase() + topic.slice(1)} Expert!
                    </div>
                  );
                } else if (successRate >= 60) {
                  return (
                    <div
                      key={`${topic}-learner`}
                      className="bg-gradient-to-r from-silver-400 to-gray-500 text-white rounded-full px-4 py-2 font-bold shadow-lg transform hover:scale-110 transition-all duration-300"
                    >
                      🥈 {topic.charAt(0).toUpperCase() + topic.slice(1)} Learner!
                    </div>
                  );
                }
                return null;
              })}
              
              {Object.keys(progressData).length === 0 && (
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full px-6 py-3 font-bold shadow-lg">
                  🌟 Ready to Start Learning!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}