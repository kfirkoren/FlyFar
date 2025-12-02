import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { getTravelAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'שלום! אני ה-AI של "עפים רחוק". אני כאן כדי לעזור לכם לתכנן את הטיול המושלם בתאילנד. לאן תרצו לנסוע ומה התקציב שלכם?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare context from previous messages (simple concatenation for this demo)
    const context = messages.slice(-4).map(m => `${m.role === 'user' ? 'לקוח' : 'סוכן'}: ${m.text}`).join('\n');
    const fullPrompt = `${context}\nלקוח: ${userMessage.text}\nסוכן:`;

    const responseText = await getTravelAdvice(fullPrompt);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[70vh] md:h-[800px] border border-gray-200">
        
        {/* Header */}
        <div className="bg-brand-blue p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles size={24} className="text-brand-yellow" />
            </div>
            <div>
              <h1 className="text-xl font-bold">יועץ הטיולים החכם</h1>
              <p className="text-sky-100 text-sm">מופעל על ידי בינה מלאכותית</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-300' : 'bg-brand-blue text-white'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none' 
                    : 'bg-sky-50 border border-sky-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end">
              <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-4 py-2 rounded-full text-sm">
                <Loader2 size={16} className="animate-spin" /> היועץ חושב...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="שאלו אותי כל דבר על תאילנד..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-brand-blue hover:bg-sky-600 text-white p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={24} className={isLoading ? 'opacity-0' : ''} />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            התשובות מבוססות על AI ועשויות לכלול אי-דיוקים. לתכנון סופי מומלץ להתייעץ עם סוכן אנושי.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;