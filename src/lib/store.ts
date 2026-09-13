import { create } from 'zustand';

interface AppState {
  loading: boolean;
  musicPlaying: boolean;
  theme: 'dark' | 'light';
  visitorCount: number;
  activeSection: string;
  setLoading: (loading: boolean) => void;
  toggleMusic: () => void;
  setMusicPlaying: (playing: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setVisitorCount: (count: number) => void;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  loading: true,
  musicPlaying: false,
  theme: 'dark',
  visitorCount: 1337,
  activeSection: 'hero',
  setLoading: (loading) => set({ loading }),
  toggleMusic: () => set((state) => ({ musicPlaying: !state.musicPlaying })),
  setMusicPlaying: (playing) => set({ musicPlaying: playing }),
  setTheme: (theme) => set({ theme }),
  setVisitorCount: (visitorCount) => set({ visitorCount }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));
