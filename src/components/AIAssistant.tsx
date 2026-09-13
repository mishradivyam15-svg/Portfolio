'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, AlertCircle, Sparkles } from 'lucide-react';
import GlowCard from './ui/GlowCard';
import InteractiveHeading from './ui/InteractiveHeading';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  { label: 'Who is Divyam?', value: 'Who is Divyam?' },
  { label: 'Skills', value: 'What are his technical skills?' },
  { label: 'Projects', value: 'Tell me about his projects.' },
  { label: 'GATE Goals', value: 'What are his GATE 2027 goals?' },
  { label: 'Future Plans', value: 'What are his future goals?' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm Divyam's AI assistant. Ask me anything about his skills, projects, GATE preparation, or future goals.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scoped to the chat's own scroll container only — never touches page scroll.
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setError('');
    const userMsg = text.trim();

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: userMsg });
      const reply = response.data.reply;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't process that request right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="relative w-full py-28 px-6 md:px-12 z-10 border-t border-cyber-cyan/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <InteractiveHeading text="AI Lab" className="text-3xl md:text-5xl font-semibold mb-3" />
          <p className="text-sm text-cyber-text/50">
            An experimental assistant — ask anything about my work, skills, or journey.
          </p>
        </div>

        <GlowCard tilt className="p-0 rounded-2xl overflow-hidden">
          <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyber-cyan" />
              <span className="text-xs uppercase tracking-wider font-medium text-cyber-text/80">
                Portfolio Assistant
              </span>
            </div>
            <div className="flex items-center gap-2 text-cyber-green text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              Online
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="h-[300px] md:h-[400px] overflow-y-auto p-6 space-y-4 text-sm"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center shrink-0 text-[10px] font-medium ${
                    msg.role === 'user' ? 'bg-cyber-pink/15 text-cyber-pink' : 'bg-cyber-cyan/15 text-cyber-cyan'
                  }`}
                >
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>
                <div
                  className={`p-3 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyber-pink/10 text-cyber-text/90'
                      : 'bg-white/[0.04] text-cyber-text/90'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-cyber-cyan/15 text-cyber-cyan text-[10px]">
                  AI
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.04] flex items-center gap-2 text-cyber-text/60">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-cyber-pink/10 text-cyber-pink flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <div className="px-6 py-3 border-t border-white/10 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.value)}
                disabled={loading}
                data-cursor="hover"
                className="px-3 py-1.5 rounded-full border border-white/10 hover:border-cyber-cyan/40 text-cyber-text/70 hover:text-cyber-cyan text-xs transition-all"
              >
                {q.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="border-t border-white/10 p-4 flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-3 text-cyber-text placeholder-cyber-text/30 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              data-cursor="hover"
              className="px-5 rounded-full bg-cyber-cyan text-black font-medium transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </GlowCard>
      </div>
    </section>
  );
}
