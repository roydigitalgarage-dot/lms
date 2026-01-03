import React, { useState } from 'react';
import { MessageCircle, Send, Search, Filter, Clock, User } from 'lucide-react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      teacher: 'Ms. Smith',
      subject: 'Math Teacher',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      lastMessage: 'Alex is doing great in math! Keep up the good work.',
      timestamp: '2 hours ago',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'teacher',
          content: 'Hello! I wanted to update you on Alex\'s progress in math.',
          timestamp: '10:30 AM',
          date: 'Today'
        },
        {
          id: 2,
          sender: 'parent',
          content: 'Thank you for reaching out! How is he doing?',
          timestamp: '10:45 AM',
          date: 'Today'
        },
        {
          id: 3,
          sender: 'teacher',
          content: 'Alex is doing great in math! Keep up the good work. He scored 95% on his recent quiz.',
          timestamp: '11:00 AM',
          date: 'Today'
        }
      ]
    },
    {
      id: 2,
      teacher: 'Mr. Johnson',
      subject: 'Science Teacher',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      lastMessage: 'Science fair project deadline is next week.',
      timestamp: '1 day ago',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'teacher',
          content: 'Reminder: Science fair project deadline is next week. Alex has chosen a great topic!',
          timestamp: '2:15 PM',
          date: 'Yesterday'
        },
        {
          id: 2,
          sender: 'parent',
          content: 'Thank you for the reminder. What materials does he need?',
          timestamp: '3:00 PM',
          date: 'Yesterday'
        }
      ]
    },
    {
      id: 3,
      teacher: 'Ms. Davis',
      subject: 'Reading Teacher',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      lastMessage: 'Alex\'s reading level has improved significantly!',
      timestamp: '3 days ago',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'teacher',
          content: 'Great news! Alex\'s reading level has improved significantly this semester.',
          timestamp: '9:00 AM',
          date: '3 days ago'
        }
      ]
    }
  ];

  const currentConversation = conversations[selectedConversation];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">💬</span>
          Messages
        </h1>
        <p className="text-blue-100 text-xl">Communicate with your child's teachers</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversations List */}
          <div className="w-1/3 border-r-4 border-blue-200 dark:border-blue-600 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="p-6 border-b-4 border-blue-200 dark:border-blue-600">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="🔍 Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-full">
              {conversations.map((conversation, index) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(index)}
                  className={`w-full p-6 text-left hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-all duration-300 border-b-2 border-blue-100 dark:border-blue-800/30 ${
                    selectedConversation === index ? 'bg-blue-200 dark:bg-blue-800/50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.teacher}
                        className="w-12 h-12 rounded-full border-2 border-blue-300"
                      />
                      {conversation.unread > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{conversation.teacher}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">{conversation.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b-4 border-blue-200 dark:border-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <div className="flex items-center space-x-4">
                <img
                  src={currentConversation.avatar}
                  alt={currentConversation.teacher}
                  className="w-12 h-12 rounded-full border-2 border-blue-300"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentConversation.teacher}</h2>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">{currentConversation.subject}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-lg ${
                      message.sender === 'parent'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900/30 text-gray-900 dark:text-white border-2 border-blue-200 dark:border-blue-600'
                    }`}
                  >
                    <p className="font-medium">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${
                        message.sender === 'parent' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.date}
                      </span>
                      <span className={`text-xs ${
                        message.sender === 'parent' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t-4 border-blue-200 dark:border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="💬 Type your message..."
                  className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-3xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>📤 Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}