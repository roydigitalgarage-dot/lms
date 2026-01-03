import { useState } from 'react';
import Layout from '../layout/Layout';
import { CheckCircle, XCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DraggableWord, DroppableBlank } from './DndComponents';

export default function MathAssignmentPage() {
  const [answers, setAnswers] = useState<{
    sectionA: (number | null)[];
    sectionB: string[];
    sectionC: string[];
  }>({
    sectionA: [null, null, null],
    sectionB: ['', '', '', ''],
    sectionC: ['', '', '', '']
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [sectionScores, setSectionScores] = useState({ A: 0, B: 0, C: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = {
    sectionA: [
      {
        question: 'What is 2 + 3?',
        options: ['4', '5', '6'],
        correct: 1
      },
      {
        question: 'Which shape has 3 sides?',
        options: ['Circle', 'Square', 'Triangle'],
        correct: 2
      },
      {
        question: 'What comes after 10?',
        options: ['9', '11', '12'],
        correct: 1
      }
    ],
    sectionB: [
        { question: 'Write the number name of 15.', keywords: ['fifteen'] },
        { question: 'How many corners does a square have?', keywords: ['4', 'four'] },
        { question: 'Add: 5 + 4 = ?', keywords: ['9', 'nine'] },
        { question: 'Subtract: 10 - 2 = ?', keywords: ['8', 'eight'] }
    ],
    sectionC: {
      words: ['one', 'four', 'round', 'zero'],
      blanks: [
        { pre: 'A circle is ', post: ' in shape.', correct: 'round' },
        { pre: 'A car has ', post: ' wheels.', correct: 'four' },
        { pre: 'We have ', post: ' nose.', correct: 'one' },
        { pre: '10 minus 10 is ', post: '.', correct: 'zero' }
      ]
    }
  };

  const calculateScore = () => {
    let scoreA = 0;
    questions.sectionA.forEach((q, index) => {
      if (answers.sectionA[index] === q.correct) scoreA++;
    });

    let scoreB = 0;
    questions.sectionB.forEach((q, index) => {
      const ans = answers.sectionB[index].toLowerCase();
      if (q.keywords.some(k => ans.includes(k))) {
        scoreB++;
      }
    });

    let scoreC = 0;
    questions.sectionC.blanks.forEach((q, index) => {
      if (answers.sectionC[index] === q.correct) scoreC++;
    });

    const totalPoints = questions.sectionA.length + questions.sectionB.length + questions.sectionC.blanks.length;
    const totalScore = scoreA + scoreB + scoreC;
    const percentage = Math.round((totalScore / totalPoints) * 100);

    setSectionScores({ A: scoreA, B: scoreB, C: scoreC });
    return percentage;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (isSubmitted) return;
    const { active, over } = event;
    
    if (over && active.id && over.id) {
       const word = active.id as string;
       const blankIndex = parseInt((over.id as string).split('-')[1]);
       
       const newC = [...answers.sectionC];
       const previousIndex = newC.indexOf(word);
       if (previousIndex !== -1) {
         newC[previousIndex] = '';
       }
       
       newC[blankIndex] = word;
       setAnswers({ ...answers, sectionC: newC });
    }
  };

  const handleSectionAAnswer = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = { ...answers };
    newAnswers.sectionA[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSectionBAnswer = (questionIndex: number, value: string) => {
    if (isSubmitted) return;
    const newAnswers = { ...answers };
    newAnswers.sectionB[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const clearBlank = (index: number) => {
     if (isSubmitted) return;
     const newC = [...answers.sectionC];
     newC[index] = '';
     setAnswers({ ...answers, sectionC: newC });
  }

  return (
    <Layout>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <div className="max-w-4xl mx-auto space-y-6 relative overflow-hidden">
        
        {/* Result Card */}
        {isSubmitted && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-4 border-green-400 shadow-2xl mb-8 animate-fade-in text-center">
            <h2 className="text-4xl font-bold text-green-600 mb-4">Total Score: {score}%! 🎉</h2>
            <div className="flex justify-center gap-6 mb-4 text-gray-700 dark:text-gray-300">
               <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
                 <p className="font-bold">Section A</p>
                 <p className="text-2xl">{sectionScores.A}/{questions.sectionA.length}</p>
               </div>
               <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl">
                 <p className="font-bold">Section B</p>
                 <p className="text-2xl">{sectionScores.B}/{questions.sectionB.length}</p>
               </div>
               <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl">
                 <p className="font-bold">Section C</p>
                 <p className="text-2xl">{sectionScores.C}/{questions.sectionC.blanks.length}</p>
               </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {score === 100 ? "Math Wizard! Amazing! 🌟" : 
               score >= 70 ? "Great job! You know your numbers! 👍" : "Good try! Keep practicing Math! 💪"}
            </p>
          </div>
        )}

        {/* Floating Decorations */}
        <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce pointer-events-none">🔢</div>
        <div className="absolute top-20 left-4 text-3xl opacity-30 animate-pulse pointer-events-none">📐</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-bounce pointer-events-none">➕</div>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 via-teal-400 to-emerald-500 text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>🌸</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">✨</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl text-white font-bold">123</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    Math: Numbers & Shapes!
                  </h1>
                  <p className="text-green-100 text-xl font-medium">Let's play with numbers! 🌟</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
                <div className="text-6xl mb-3 text-center">🔢</div>
                <p className="text-lg font-bold text-center">Math</p>
                <p className="text-sm text-center">Practice!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section A - Multiple Choice */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-700 overflow-hidden">
          <div className="p-6 border-b-4 border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="text-3xl mr-3">✅</span>
              A. Tick (✓) the correct answer
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {questions.sectionA.map((q, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 rounded-2xl p-6 border-3 border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {index + 1}. {q.question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {q.options.map((option, optionIndex) => {
                    const isSelected = answers.sectionA[index] === optionIndex;
                    const isCorrect = isSubmitted && q.correct === optionIndex;
                    const isWrong = isSubmitted && isSelected && q.correct !== optionIndex;

                    return (
                      <button
                        key={optionIndex}
                        onClick={() => handleSectionAAnswer(index, optionIndex)}
                        disabled={isSubmitted}
                        className={`p-4 rounded-2xl border-3 text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                           isCorrect ? 'border-green-500 bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-200' :
                           isWrong ? 'border-red-500 bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200' :
                           isSelected
                            ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg'
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10'
                        }`}
                      >
                        {String.fromCharCode(97 + optionIndex)}) {option}
                         {isSelected && !isSubmitted && (
                          <CheckCircle className="w-5 h-5 ml-2 inline text-green-600" />
                        )}
                        {isCorrect && <CheckCircle className="w-5 h-5 ml-2 inline text-green-700" />}
                        {isWrong && <XCircle className="w-5 h-5 ml-2 inline text-red-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B - Short Answers */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-teal-200 dark:border-teal-700 overflow-hidden">
          <div className="p-6 border-b-4 border-teal-200 dark:border-teal-700 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="text-3xl mr-3">📝</span>
              B. Answer the following questions
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {questions.sectionB.map((q, index) => {
               const ans = answers.sectionB[index].toLowerCase();
               const isCorrect = isSubmitted && q.keywords.some(k => ans.includes(k));
               
               return (
                  <div key={index} className={`rounded-2xl p-6 border-3 transition-colors ${
                      isSubmitted 
                      ? (isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-red-500 bg-red-50 dark:bg-red-900/10')
                      : 'border-teal-200 dark:border-teal-700 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10'
                  }`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {index + 1}. {q.question}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Ans.</p>
                      <textarea
                        value={answers.sectionB[index]}
                        onChange={(e) => handleSectionBAnswer(index, e.target.value)}
                        disabled={isSubmitted}
                        className="w-full p-4 border-3 border-teal-300 dark:border-teal-600 rounded-2xl focus:ring-4 focus:ring-teal-300 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-all duration-300 text-lg disabled:opacity-70"
                        rows={3}
                        placeholder="Write your answer... ✍️"
                      />
                       {isSubmitted && !isCorrect && (
                         <p className="text-red-500 text-sm font-bold">Suggested Answer: {q.keywords[0]}</p>
                       )}
                    </div>
                  </div>
               );
            })}
          </div>
        </div>

        {/* Section C - Fill in the blanks */}
        <DndContext onDragEnd={handleDragEnd}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-emerald-200 dark:border-emerald-700 overflow-hidden">
          <div className="p-6 border-b-4 border-emerald-200 dark:border-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center mb-4">
              <span className="text-3xl mr-3">🔤</span>
              C. Drag and Drop to fill the blanks
            </h2>
             
             {/* Word Bank */}
            <div className="mt-4 p-6 bg-white dark:bg-gray-700 rounded-2xl border-3 border-emerald-300 dark:border-emerald-600 shadow-inner">
              <div className="flex flex-wrap gap-4 justify-center">
                {questions.sectionC.words.map((word) => {
                   const isDropped = answers.sectionC.includes(word);
                   return (
                      <DraggableWord 
                         key={word} 
                         id={word} 
                         word={word} 
                         isDropped={isDropped} 
                         disabled={isSubmitted}
                      />
                   );
                })}
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {questions.sectionC.blanks.map((q, index) => (
              <div key={index} className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-6 border-3 border-emerald-200 dark:border-emerald-700 flex items-center">
                 <span className="text-xl font-bold text-gray-900 dark:text-white mr-4">
                   {index + 1}.
                 </span>
                 <div className="flex-1 text-xl font-medium text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                    <span>{q.pre}</span>
                    <div className="relative">
                        <DroppableBlank 
                           id={`blank-${index}`} 
                           filledWord={answers.sectionC[index]} 
                           correctWord={q.correct} 
                           isSubmitted={isSubmitted} 
                        />
                         {answers.sectionC[index] && !isSubmitted && (
                             <button 
                               onClick={() => clearBlank(index)}
                               className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                             >
                                <XCircle size={14} />
                             </button>
                         )}
                    </div>
                    <span>{q.post}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
        </DndContext>

        {/* Submit Button */}
        <div className="text-center pb-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl text-xl disabled:opacity-70 disabled:cursor-not-allowed ${
             isSubmitted ? 'transform-none' : ''
            }`}
          >
             <span className="text-2xl mr-3">{isSubmitted ? '✅' : '🚀'}</span>
             {isSubmitted ? 'Assignment Submitted!' : 'Submit My Assignment!'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
