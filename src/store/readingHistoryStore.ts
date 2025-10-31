import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ReadingHistory {
  slug: string;
  episodeNo: number;
  timestamp: number;
  contentName: string;
  thumbnailImage: string | null;
}

interface ReadingHistoryState {
  history: ReadingHistory[];
  addHistory: (item: Omit<ReadingHistory, 'timestamp'>) => void;
  getLastRead: (slug: string) => ReadingHistory | undefined;
  clearHistory: () => void;
}

export const useReadingHistoryStore = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addHistory: (item) =>
        set((state) => {
          const filtered = state.history.filter((h) => h.slug !== item.slug);
          return {
            history: [
              { ...item, timestamp: Date.now() },
              ...filtered,
            ].slice(0, 50), // Keep only last 50 items
          };
        }),
      getLastRead: (slug) =>
        get().history.find((h) => h.slug === slug),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'reading-history-storage',
    }
  )
);

