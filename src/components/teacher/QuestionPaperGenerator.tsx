import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { FileText, Download, Edit2, Plus, Trash2, Save, Eye } from 'lucide-react';

interface Question {
  id: string;
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  marks: number;
}

export default function QuestionPaperGenerator() {
  const [subject, setSubject] = useState('Mathematics');
  const [className, setClassName] = useState('Class 1');
  const [examType, setExamType] = useState('Unit Test');
  const [totalMarks, setTotalMarks] = useState(50);
  const [duration, setDuration] = useState('1 hour');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const subjects = ['Telugu', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Studies', 'EVS'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  const generateSampleQuestions = () => {
    const samples: Question[] = [
      { id: '1', type: 'mcq', question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], marks: 1 },
      { id: '2', type: 'mcq', question: 'Which is the largest number?', options: ['5', '8', '3', '6'], marks: 1 },
      { id: '3', type: 'short', question: 'Write the number names from 1 to 5.', marks: 3 },
      { id: '4', type: 'short', question: 'Draw a circle and a square.', marks: 2 },
      { id: '5', type: 'long', question: 'Solve: 15 + 23 = ? Show your work.', marks: 5 }
    ];
    setQuestions(samples);
  };

  const addQuestion = () => {
    const newQ: Question = {
      id: Date.now().toString(),
      type: 'mcq',
      question: 'Enter your question here',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      marks: 1
    };
    setQuestions([...questions, newQ]);
    setEditingId(newQ.id);
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (id: string, index: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id && q.options) {
        const newOptions = [...q.options];
        newOptions[index] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const downloadPaper = () => {
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${subject} - ${examType}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
    .info { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .question { margin-bottom: 25px; page-break-inside: avoid; }
    .question-header { font-weight: bold; margin-bottom: 10px; }
    .options { margin-left: 20px; }
    .option { margin: 5px 0; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Vijay School</h1>
    <h2>${subject} - ${examType}</h2>
    <h3>${className}</h3>
  </div>
  
  <div class="info">
    <div><strong>Total Marks:</strong> ${totalMarks}</div>
    <div><strong>Duration:</strong> ${duration}</div>
    <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
  </div>
  
  <div><strong>Student Name:</strong> _________________________</div>
  <div style="margin-bottom: 30px;"><strong>Roll Number:</strong> _________________________</div>
  
  ${questions.map((q, i) => `
    <div class="question">
      <div class="question-header">Q${i + 1}. ${q.question} (${q.marks} mark${q.marks > 1 ? 's' : ''})</div>
      ${q.type === 'mcq' && q.options ? `
        <div class="options">
          ${q.options.map((opt, j) => `<div class="option">${String.fromCharCode(65 + j)}) ${opt}</div>`).join('')}
        </div>
      ` : `
        <div style="margin-top: 10px; border-bottom: 1px solid #ccc; min-height: ${q.type === 'long' ? '100px' : '50px'};"></div>
      `}
    </div>
  `).join('')}
  
  <div style="margin-top: 50px; text-align: center; font-style: italic;">
    --- End of Question Paper ---
  </div>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}_${examType}_${className}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Question Paper Generator
          </h1>
          <p className="text-blue-100 text-lg mt-2">Create and customize exam papers easily!</p>
        </div>

        {/* Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Paper Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 border rounded-xl">
                {subjects.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Class</label>
              <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full p-3 border rounded-xl">
                {classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Exam Type</label>
              <select value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full p-3 border rounded-xl">
                <option>Unit Test</option>
                <option>Mid Term</option>
                <option>Final Exam</option>
                <option>Weekly Test</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks</label>
              <input type="number" value={totalMarks} onChange={(e) => setTotalMarks(Number(e.target.value))} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-3 border rounded-xl" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={generateSampleQuestions} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generate Sample
            </button>
            <button onClick={addQuestion} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Questions ({questions.length})</h2>
          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No questions yet. Click "Generate Sample" or "Add Question" to start.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg">Q{i + 1}.</span>
                        <select value={q.type} onChange={(e) => updateQuestion(q.id, 'type', e.target.value)} disabled={editingId !== q.id} className="p-2 border rounded-lg text-sm">
                          <option value="mcq">MCQ</option>
                          <option value="short">Short Answer</option>
                          <option value="long">Long Answer</option>
                        </select>
                        <input type="number" value={q.marks} onChange={(e) => updateQuestion(q.id, 'marks', Number(e.target.value))} disabled={editingId !== q.id} className="w-20 p-2 border rounded-lg text-sm" placeholder="Marks" />
                      </div>
                      {editingId === q.id ? (
                        <textarea value={q.question} onChange={(e) => updateQuestion(q.id, 'question', e.target.value)} className="w-full p-3 border rounded-xl" rows={2} />
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{q.question}</p>
                      )}
                      {q.type === 'mcq' && q.options && (
                        <div className="mt-3 space-y-2">
                          {q.options.map((opt, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <span className="font-medium">{String.fromCharCode(65 + j)})</span>
                              {editingId === q.id ? (
                                <input value={opt} onChange={(e) => updateOption(q.id, j, e.target.value)} className="flex-1 p-2 border rounded-lg" />
                              ) : (
                                <span>{opt}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingId === q.id ? (
                        <button onClick={() => setEditingId(null)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                          <Save className="w-5 h-5" />
                        </button>
                      ) : (
                        <button onClick={() => setEditingId(q.id)} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                          <Edit2 className="w-5 h-5" />
                        </button>
                      )}
                      <button onClick={() => deleteQuestion(q.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {questions.length > 0 && (
          <div className="flex gap-4">
            <button onClick={() => setShowPreview(!showPreview)} className="flex-1 bg-purple-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-purple-600 flex items-center justify-center gap-2">
              <Eye className="w-6 h-6" />
              {showPreview ? 'Hide Preview' : 'Preview Paper'}
            </button>
            <button onClick={downloadPaper} className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-600 hover:to-blue-600 flex items-center justify-center gap-2">
              <Download className="w-6 h-6" />
              Download Paper
            </button>
          </div>
        )}

        {/* Preview */}
        {showPreview && questions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border-4 border-purple-200">
            <div className="text-center border-b-2 pb-6 mb-6">
              <h1 className="text-3xl font-bold">Vijay School</h1>
              <h2 className="text-2xl font-bold mt-2">{subject} - {examType}</h2>
              <h3 className="text-xl mt-2">{className}</h3>
            </div>
            <div className="flex justify-between mb-6">
              <div><strong>Total Marks:</strong> {totalMarks}</div>
              <div><strong>Duration:</strong> {duration}</div>
              <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
            </div>
            <div className="mb-6">
              <div><strong>Student Name:</strong> _________________________</div>
              <div><strong>Roll Number:</strong> _________________________</div>
            </div>
            {questions.map((q, i) => (
              <div key={q.id} className="mb-6">
                <div className="font-bold mb-2">Q{i + 1}. {q.question} ({q.marks} mark{q.marks > 1 ? 's' : ''})</div>
                {q.type === 'mcq' && q.options && (
                  <div className="ml-6">
                    {q.options.map((opt, j) => (
                      <div key={j}>{String.fromCharCode(65 + j)}) {opt}</div>
                    ))}
                  </div>
                )}
                {q.type !== 'mcq' && (
                  <div className="border-b border-gray-300 mt-2" style={{ minHeight: q.type === 'long' ? '100px' : '50px' }}></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}