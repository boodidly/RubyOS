import React, { useState } from 'react';
import { Mic, Gem } from 'lucide-react';

interface RubyChatProps {
  accentColor: string;
}

const RubyChat: React.FC<RubyChatProps> = ({ accentColor }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Handle chat submission
    setInput('');
  };

  return (
    <div className="relative flex items-center gap-2">
      <Gem className="w-4 h-4 absolute left-3" style={{ color: accentColor }} />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Ruby..."
          className="w-full pl-9 pr-10 py-2 bg-[#2A2A2A] rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1"
          style={{ 
            '--tw-ring-color': accentColor,
            borderColor: `${accentColor}40`
          } as React.CSSProperties}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#B63163]"
          style={{ '--tw-hover-color': accentColor } as React.CSSProperties}
        >
          <Mic className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default RubyChat;