import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Tutor. I'm here to help you learn and answer any questions you have about your subjects. What would you like to learn today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      math: [
        "Great question about math! Let me help you understand this concept step by step.",
        "Math can be fun! Let's break this problem down into smaller parts.",
        "I love helping with math problems! Here's how we can solve this..."
      ],
      science: [
        "Science is amazing! Let me explain this concept in a simple way.",
        "That's a wonderful science question! Here's what you need to know...",
        "Science helps us understand the world around us. Let me show you..."
      ],
      english: [
        "English is a beautiful language! Let me help you with this.",
        "Great question about English! Here's how we can approach this...",
        "Reading and writing are important skills. Let me guide you..."
      ],
      default: [
        "That's an interesting question! Let me think about the best way to explain this.",
        "I'm here to help you learn! Let's explore this topic together.",
        "Learning is a journey, and I'm here to guide you every step of the way!"
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    let category = 'default';
    
    if (lowerMessage.includes('math') || lowerMessage.includes('number') || lowerMessage.includes('calculate')) {
      category = 'math';
    } else if (lowerMessage.includes('science') || lowerMessage.includes('experiment') || lowerMessage.includes('nature')) {
      category = 'science';
    } else if (lowerMessage.includes('english') || lowerMessage.includes('read') || lowerMessage.includes('write')) {
      category = 'english';
    }

    const categoryResponses = responses[category as keyof typeof responses];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Help me with math homework",
    "Explain photosynthesis",
    "How to write a good essay?",
    "What is the solar system?",
    "Help with multiplication tables"
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Tutor</h2>
            <p className="text-sm text-blue-100">Your personal learning assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '400px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
          <div className="flex flex-col space-y-1">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`p-2 rounded-lg ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title="Voice input"
            >
              🎤
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              📤
            </button>
          </div>
        </div>
        {isListening && (
          <p className="text-sm text-red-600 mt-1 animate-pulse">Listening... Speak now!</p>
        )}
      </div>
    </div>
  );
};

export default AITutor;