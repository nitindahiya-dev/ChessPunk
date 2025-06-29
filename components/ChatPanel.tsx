import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChatMessage {
  user: string;
  text: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  chatRef: React.RefObject<HTMLDivElement | null>;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSend, chatRef }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, chatRef]);

  return (
    <div className="w-96 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 h-[37rem] flex flex-col justify-between">
      <div className="p-4 border-b border-cyan-500/20">
        <h2 className="text-lg font-bold text-cyan-300">Game Chat</h2>
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: '400px' }}
      >
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No messages yet</p>
            <p className="text-sm mt-2">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-xl ${
                  msg.user === 'You' 
                    ? 'bg-cyan-500/20 rounded-br-none' 
                    : 'bg-gray-700/50 rounded-bl-none'
                }`}
              >
                <div className="text-xs font-bold mb-1 text-cyan-300">
                  {msg.user}
                </div>
                <div className="text-sm">{msg.text}</div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700/50 border border-cyan-500/30 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 px-4 rounded-r-lg transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;