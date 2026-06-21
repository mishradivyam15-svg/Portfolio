'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Send,
  Bot,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import GlowCard from './ui/GlowCard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  { label: 'Who is Divyam?', value: 'Who is Divyam?' },
  { label: 'Skills', value: 'What are his technical skills?' },
  { label: 'Projects', value: 'Tell me about his projects.' },
  { label: 'GATE Goals', value: 'What are his GATE 2027 goals?' },
  { label: 'Future Plans', value: 'What are his future goals?' }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I’m Divyam’s AI assistant. Ask me anything about his skills, projects, GATE preparation, or future goals."
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setError('');
    const userMsg = text.trim();

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: userMsg
      });

      const reply = response.data.reply;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply }
      ]);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        'Something went wrong. Please try again.';

      setError(errorMsg);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I couldn’t process that request right now.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-assistant"
      className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
            AI Assistant
          </h2>

          <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
            Ask anything about my work, skills, or journey
          </p>
        </div>

        <GlowCard className="p-0 rounded-xl overflow-hidden">

          {/* Top Bar */}
          <div className="border-b border-cyber-cyan/20 px-6 py-4 flex items-center justify-between bg-cyber-dark-lighter/40">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyber-cyan" />

              <span className="font-mono text-xs uppercase font-bold text-cyber-cyan">
                Portfolio Assistant
              </span>
            </div>

            <div className="flex items-center gap-2 text-cyber-green text-[10px] font-mono uppercase">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              Online
            </div>
          </div>

          {/* Messages */}
          <div className="h-[300px] md:h-[400px] overflow-y-auto p-6 space-y-4 font-mono text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user'
                    ? 'ml-auto flex-row-reverse'
                    : ''
                }`}
              >
                <div
                  className={`p-2 rounded h-8 w-8 flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-cyber-pink/20 text-cyber-pink'
                      : 'bg-cyber-cyan/20 text-cyber-cyan'
                  }`}
                >
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>

                <div
                  className={`p-3 rounded-lg border leading-relaxed ${
                    msg.role === 'user'
                      ? 'border-cyber-pink/30 bg-cyber-pink/5 text-cyber-pink/95'
                      : 'border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan/95'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="p-2 rounded h-8 w-8 flex items-center justify-center bg-cyber-cyan/20 text-cyber-cyan">
                  AI
                </div>

                <div className="p-3 border border-cyber-cyan/20 bg-cyber-cyan/5 rounded-lg flex items-center gap-2 text-cyber-cyan/70">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 border border-cyber-pink/30 bg-cyber-pink/5 text-cyber-pink rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-3 border-t border-cyber-cyan/15 bg-cyber-dark/30 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.value)}
                disabled={loading}
                className="px-3 py-1.5 border border-cyber-cyan/30 hover:border-cyber-pink text-cyber-text/80 hover:text-cyber-pink font-mono text-xs rounded-full transition-all"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="border-t border-cyber-cyan/20 p-4 flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={loading}
              className="flex-1 bg-black/60 border border-cyber-cyan/20 rounded px-4 py-3 text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-pink"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 rounded bg-cyber-cyan hover:bg-cyber-pink text-black font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </GlowCard>
      </div>
    </section>
  );
}