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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (err: any) {
      const errMsg =
        err.response?.data?.error ||
        'Something went wrong. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
      },
    }),
  };

  return (
    <Reveal>
      <section
        id="contact"
        className="relative w-full py-24 px-6 md:px-12 z-10 border-t border-cyber-cyan/10"
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-cyber-cyan">
              Contact Me
            </h2>

            <p className="text-xs md:text-sm font-mono text-cyber-text/50 uppercase tracking-widest">
              Let’s connect, collaborate, or talk about opportunities
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlowCard className="p-8">

              {/* Header */}
              <div className="flex items-center gap-2 mb-8 text-cyber-cyan border-b border-cyber-cyan/20 pb-4">
                <Mail className="w-5 h-5 text-cyber-pink" />

                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Send a Message
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 font-mono text-sm"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {['name', 'email'].map((field, index) => (
                    <motion.div
                      key={field}
                      custom={index}
                      variants={fieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      className="space-y-2"
                    >
                      <label className="text-xs text-cyber-text/60 capitalize">
                        {field}
                      </label>

                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={form[field as keyof FormState]}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder={`Your ${field}`}
                        className="w-full bg-black/60 border border-cyber-cyan/20 rounded px-4 py-3 text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-pink"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Subject */}
                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="space-y-2"
                >
                  <label className="text-xs text-cyber-text/60">Subject</label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="What is this about?"
                    className="w-full bg-black/60 border border-cyber-cyan/20 rounded px-4 py-3 text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-pink"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="space-y-2"
                >
                  <label className="text-xs text-cyber-text/60">Message</label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    disabled={loading}
                    placeholder="Write your message here..."
                    className="w-full bg-black/60 border border-cyber-cyan/20 rounded px-4 py-3 text-cyber-cyan placeholder-cyber-cyan/40 focus:outline-none focus:border-cyber-pink resize-none"
                  />
                </motion.div>

                {/* Success */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-cyber-green/35 bg-cyber-green/5 text-cyber-green rounded flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{success}</span>
                  </motion.div>
                )}

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-cyber-pink/35 bg-cyber-pink/5 text-cyber-pink rounded flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-cyber-accent hover:from-cyber-pink hover:to-cyber-accent text-black font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>

              </form>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
}