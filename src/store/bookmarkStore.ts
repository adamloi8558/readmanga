import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkState {
  bookmarks: Set<string>;
  addBookmark: (slug: string) => void;
  removeBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: new Set<string>(),
      addBookmark: (slug) =>
        set((state) => ({
          bookmarks: new Set(state.bookmarks).add(slug),
        })),
      removeBookmark: (slug) =>
        set((state) => {
          const newBookmarks = new Set(state.bookmarks);
          newBookmarks.delete(slug);
          return { bookmarks: newBookmarks };
        }),
      isBookmarked: (slug) => get().bookmarks.has(slug),
      toggleBookmark: (slug) => {
        const { isBookmarked, addBookmark, removeBookmark } = get();
        if (isBookmarked(slug)) {
          removeBookmark(slug);
        } else {
          addBookmark(slug);
        }
      },
    }),
    {
      name: 'bookmark-storage',
      partialize: (state) => ({
        bookmarks: Array.from(state.bookmarks),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.bookmarks)) {
          state.bookmarks = new Set(state.bookmarks as string[]);
        }
      },
    }
  )
);

