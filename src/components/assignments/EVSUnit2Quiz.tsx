import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { CheckCircle, ArrowLeft, BookOpen, Trophy, Star, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface ShortQuestion {
  id: number;
  question: string;
}

interface FillBlankQuestion {
  id: number;
  sentence: string;
  answer: string;
}

export default function EVSUnit2Quiz() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<number[]>([]);
  const [shortAnswers, setShortAnswers] = useState<string[]>([]);
  const [fillAnswers, setFillAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  const mcqQuestions: MCQQuestion[] = [
    {
      id: 1,
      question: "Which is an internal organ?",
      options: ["skin", "eyes", "lungs"],
      correct: 2
    },
    {
      id: 2,
      question: "Which is an external organ?",
      options: ["stomach", "kidneys", "ears"],
      correct: 2
    },
    {
      id: 3,
      question: "Brain helps us to .......................... .......................... and .",
      options: ["think", "act", "both of these"],
      correct: 2
    }
  ];

  const shortQuestions: ShortQuestion[] = [
    { id: 1, question: "What are sense organs?" },
    { id: 2, question: "Name some external organs." },
    { id: 3, question: "What do we do with our eyes?" },
    { id: 4, question: "What is the function of heart?" }
  ];

  const fillBlankQuestions: FillBlankQuestion[] = [
    { id: 1, sentence: "We have _____________ sense organs.", answer: "five" },
    { id: 2, sentence: "_____________ helps me to smell things.", answer: "nose" },
    { id: 3, sentence: "_____________ is located inside our head.", answer: "brain" },
    { id: 4, sentence: "_____________ is the internal organ.", answer: "kidney" }
  ];

  const sections = ['Multiple Choice', 'Short Answers', 'Fill in the Blanks'];

  React.useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, showResults]);

  const handleMCQSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...mcqAnswers];
    newAnswers[questionIndex] = answerIndex;
    setMcqAnswers(newAnswers);
  };

  const handleShortAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...shortAnswers];
    newAnswers[questionIndex] = answer;
    setShortAnswers(newAnswers);
  };

  const handleFillAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...fillAnswers];
    newAnswers[questionIndex] = answer;
    setFillAnswers(newAnswers);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let mcqCorrect = 0;
    let shortCorrect = 0;
    let fillCorrect = 0;

    // MCQ scoring
    mcqQuestions.forEach((question, index) => {
      if (mcqAnswers[index] === question.correct) {
        mcqCorrect++;
      }
    });

    // Short answer scoring (basic keyword matching)
    shortAnswers.forEach((answer, index) => {
      if (answer && answer.trim().length > 5) {
        shortCorrect++;
      }
    });

    // Fill in the blanks scoring
    fillBlankQuestions.forEach((question, index) => {
      if (fillAnswers[index] && fillAnswers[index].toLowerCase().trim() === question.answer.toLowerCase()) {
        fillCorrect++;
      }
    });

    const totalCorrect = mcqCorrect + shortCorrect + fillCorrect;
    const totalQuestions = mcqQuestions.length + shortQuestions.length + fillBlankQuestions.length;
    
    return {
      mcqCorrect,
      shortCorrect,
      fillCorrect,
      totalCorrect,
      totalQuestions,
      percentage: Math.round((totalCorrect / totalQuestions) * 100)
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const restartQuiz = () => {
    setCurrentSection(0);
    setMcqAnswers([]);
    setShortAnswers([]);
    setFillAnswers([]);
    setShowResults(false);
    setTimeLeft(900);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          {/* Floating Decorations */}
          <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce pointer-events-none">🏆</div>
          <div className="absolute top-20 left-4 text-3xl opacity-30 animate-pulse pointer-events-none">⭐</div>
          <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-bounce pointer-events-none">🎉</div>

          {/* Results Header */}
          <div className={`bg-gradient-to-r ${score.percentage >= 80 ? 'from-green-400 to-blue-500' : score.percentage >= 60 ? 'from-yellow-400 to-orange-500' : 'from-red-400 to-pink-500'} text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden`}>
            <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>🌱</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">✨</div>
            
            <div className="text-center relative z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                <Trophy className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Quiz Complete! 🎉</h1>
              <p className="text-xl opacity-90">EVS Unit 2 - Great job!</p>
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-700 p-8">
            <div className="text-center">
              <div className={`text-8xl font-bold mb-4 ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {score.percentage}%
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Score: {score.totalCorrect}/{score.totalQuestions}
              </h2>
              
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-8 h-8 ${i < Math.floor(score.percentage / 20) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                  />
                ))}
              </div>

              <div className={`text-2xl font-bold mb-6 ${score.percentage >= 80 ? 'text-green-600' : score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {score.percentage >= 80 ? '🌟 Excellent Work!' : 
                 score.percentage >= 60 ? '👍 Good Job!' : 
                 '💪 Keep Practicing!'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-2xl p-4 border-3 border-blue-200 dark:border-blue-700">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-2xl font-bold text-blue-600">{score.mcqCorrect}/{mcqQuestions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Multiple Choice</div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/20 rounded-2xl p-4 border-3 border-green-200 dark:border-green-700">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-green-600">{score.shortCorrect}/{shortQuestions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Short Answers</div>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-2xl p-4 border-3 border-purple-200 dark:border-purple-700">
                  <div className="text-3xl mb-2">🔤</div>
                  <div className="text-2xl font-bold text-purple-600">{score.fillCorrect}/{fillBlankQuestions.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fill Blanks</div>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl p-4 border-3 border-yellow-200 dark:border-yellow-700">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-yellow-600">{score.percentage}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => navigate('/assignments/evs')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce pointer-events-none">🌱</div>
        <div className="absolute top-20 left-4 text-3xl opacity-30 animate-pulse pointer-events-none">📝</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-bounce pointer-events-none">🎯</div>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>🌱</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">✨</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <button
                onClick={() => navigate('/assignments/evs')}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 mb-4 inline-flex"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">🌱 Back to EVS</span>
              </button>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">EVS Unit 2 Quiz! 🌱</h1>
                  <p className="text-green-100 text-xl font-medium">Test your knowledge! 🧠</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
                <div className="text-6xl mb-3 text-center">⏰</div>
                <p className="text-lg font-bold text-center">{formatTime(timeLeft)}</p>
                <p className="text-sm text-center">Time Left</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border-3 border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Section {currentSection + 1} of {sections.length}: {sections[currentSection]}
            </span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-700 overflow-hidden">
          <div className="p-8">
            {/* Section A: Multiple Choice */}
            {currentSection === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">✅</span>
                  A. Tick (✓) the correct answer
                </h2>
                <div className="space-y-6">
                  {mcqQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 border-3 border-green-200 dark:border-green-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleMCQSelect(qIndex, oIndex)}
                            className={`w-full p-4 rounded-2xl border-3 text-left text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                              mcqAnswers[qIndex] === oIndex
                                ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg'
                                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                mcqAnswers[qIndex] === oIndex
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-gray-400'
                              }`}>
                                {mcqAnswers[qIndex] === oIndex && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span>{String.fromCharCode(97 + oIndex)}) {option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section B: Short Answers */}
            {currentSection === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">📝</span>
                  B. Answer the following questions
                </h2>
                <div className="space-y-6">
                  {shortQuestions.map((question, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6 border-3 border-blue-200 dark:border-blue-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Ans.</p>
                        <textarea
                          value={shortAnswers[index] || ''}
                          onChange={(e) => handleShortAnswer(index, e.target.value)}
                          className="w-full p-4 border-3 border-blue-300 dark:border-blue-600 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 text-lg"
                          rows={3}
                          placeholder="Write your answer here... 🌟"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section C: Fill in the Blanks */}
            {currentSection === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="text-3xl mr-3">🔤</span>
                  C. Fill in the blanks
                </h2>
                <div className="mb-6 p-4 bg-white dark:bg-gray-700 rounded-2xl border-3 border-purple-300 dark:border-purple-600">
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Word Bank:</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {['nose', 'five', 'kidney', 'brain'].map((word, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  {fillBlankQuestions.map((question, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border-3 border-purple-200 dark:border-purple-700">
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {index + 1}.
                        </span>
                        <div className="flex-1 text-xl font-medium text-gray-900 dark:text-white">
                          {question.sentence.split('_____________').map((part, partIndex) => (
                            <span key={partIndex}>
                              {part}
                              {partIndex === 0 && (
                                <input
                                  type="text"
                                  value={fillAnswers[index] || ''}
                                  onChange={(e) => handleFillAnswer(index, e.target.value)}
                                  className="mx-2 px-4 py-2 border-3 border-purple-300 dark:border-purple-600 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300 text-lg font-bold text-center min-w-[120px]"
                                  placeholder="word"
                                />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-6 border-t-4 border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevSection}
                disabled={currentSection === 0}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Previous Section
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Section {currentSection + 1} of {sections.length}
                </p>
              </div>

              {currentSection === sections.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Submit Quiz 🚀
                </button>
              ) : (
                <button
                  onClick={handleNextSection}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Next Section
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}