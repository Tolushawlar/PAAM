import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSend, FiMessageCircle, FiUser } from 'react-icons/fi';

const AdminAIChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for administrators. How can I help you manage the platform today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput) => {
    const responses = [
      "As an admin, I can help you with platform management and user oversight.",
      "I can assist you with system administration and content management tasks.",
      "Let me help you with administrative functions and platform optimization.",
      "I'm here to support your administrative duties and system management needs.",
      "I can provide guidance on platform administration and user management best practices."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-paam-primary rounded-full flex items-center justify-center">
            <FiMessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t('aiAssistant')} - Admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('chatWithAI')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-paam-primary rounded-full flex items-center justify-center flex-shrink-0">
                <FiMessageCircle className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-paam-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' 
                  ? 'text-blue-100' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <FiUser className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-paam-primary rounded-full flex items-center justify-center flex-shrink-0">
              <FiMessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
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

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('typeMessage')}
            className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-paam-primary focus:border-transparent"
            rows="1"
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-paam-primary text-white rounded-lg hover:bg-paam-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAIChat;