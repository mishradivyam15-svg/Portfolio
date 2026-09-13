'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import GlowCard from './ui/GlowCard';
import Reveal from './ui/Reveal';
import MagneticButton from './ui/MagneticButton';
import { LinkedinIcon } from './ui/BrandIcons';
import InteractiveHeading from './ui/InteractiveHeading';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill all the fields.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/contact', form);
      if (response.data.success) {
        setSuccess('Message sent successfully.');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal>
      <section
        id="contact"
        className="relative w-full py-28 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-14 text-center">
            <InteractiveHeading text="Let's Connect" className="text-3xl md:text-5xl font-semibold mb-3" />
            <p className="text-sm text-cyber-text/50 max-w-lg">
              Reach out directly, or send a message below.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <MagneticButton
              as="a"
              href="mailto:mishradivyam15@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-sm text-cyber-text/85 hover:text-cyber-cyan transition-colors"
            >
              <Mail className="w-4 h-4" /> mishradivyam15@gmail.com
            </MagneticButton>
            <MagneticButton
              as="a"
              href="https://www.linkedin.com/in/divyam-mishra-b0bb53363/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-sm text-cyber-text/85 hover:text-cyber-cyan transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </MagneticButton>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlowCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(['name', 'email'] as const).map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="text-xs text-cyber-text/50 capitalize">{field}</label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder={`Your ${field}`}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-cyber-text placeholder-cyber-text/30 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-cyber-text/50">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="What is this about?"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-cyber-text placeholder-cyber-text/30 focus:outline-none focus:border-cyber-cyan/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-cyber-text/50">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    disabled={loading}
                    placeholder="Write your message here..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-cyber-text placeholder-cyber-text/30 focus:outline-none focus:border-cyber-cyan/50 transition-colors resize-none"
                  />
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-cyber-green/30 bg-cyber-green/5 text-cyber-green rounded-lg flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{success}</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-cyber-pink/30 bg-cyber-pink/5 text-cyber-pink rounded-lg flex items-center gap-2 text-sm"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="hover"
                  className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-cyber-pink text-black font-medium rounded-full transition-opacity hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
}
