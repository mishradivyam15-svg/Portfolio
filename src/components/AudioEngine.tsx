'use client';

import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AudioEngine() {
  const { musicPlaying, toggleMusic } = useAppStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2); // fade in over 2s
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Synth Drone 1 (Deep base note)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      
      // Low pass filter to make it mellow
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      // Low frequency modulation (LFO) for sci-fi filter sweeps
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // very slow sweep
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(60, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      osc1.connect(filter);
      filter.connect(masterGain);
      osc1.start();
      oscillatorsRef.current.push(osc1, lfo);

      // Synth Drone 2 (ambient harmonic chime)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 note
      
      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(220, ctx.currentTime);

      osc2.connect(filter2);
      filter2.connect(masterGain);
      osc2.start();
      oscillatorsRef.current.push(osc2);

    } catch (e) {
      console.error('Failed to initialize Web Audio Synth:', e);
    }
  };

  const stopSynth = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); // quick fade out
      
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch (_) {}
        });
        oscillatorsRef.current = [];
        gainNodeRef.current = null;
      }, 500);
    }
  };

  useEffect(() => {
    if (musicPlaying) {
      startSynth();
    } else {
      stopSynth();
    }

    return () => {
      stopSynth();
    };
  }, [musicPlaying]);

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-panel hover:border-cyber-primary text-cyber-text transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-cyan-500/25"
      aria-label="Toggle ambient background music"
    >
      {musicPlaying ? (
        <Volume2 className="w-5 h-5 text-cyber-cyan animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-60" />
      )}
    </button>
  );
}
