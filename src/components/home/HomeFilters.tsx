'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Flame, Clock, Star, TrendingUp } from 'lucide-react';
import type { Genre } from '@/schemas';

type SortType = 'relevance' | 'popularity' | 'rating' | 'recent' | 'alphabetical';

interface HomeFiltersProps {
  genres: Genre[];
  currentSort: string;
  currentGenre?: string;
}

export function HomeFilters({ genres, currentSort, currentGenre }: HomeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions: { value: SortType; label: string; icon: React.ReactNode }[] = [
    { value: 'popularity', label: 'ยอดนิยม', icon: <Flame className="h-4 w-4" /> },
    { value: 'recent', label: 'อัพเดทล่าสุด', icon: <Clock className="h-4 w-4" /> },
    { value: 'rating', label: 'คะแนนสูงสุด', icon: <Star className="h-4 w-4" /> },
    { value: 'alphabetical', label: 'เรียงตามชื่อ', icon: <TrendingUp className="h-4 w-4" /> },
  ];

  const updateParams = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset page when changing filters
    params.delete('page');
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Sort Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          จัดเรียงตาม
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateParams('sort', option.value)}
              className={`group flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-300 ${
                currentSort === option.value
                  ? 'bg-gradient-to-br from-primary to-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg'
              }`}
            >
              <div className={`rounded-xl p-3 transition-colors ${
                currentSort === option.value
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-primary/10'
              }`}>
                {option.icon}
              </div>
              <span className="font-semibold text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          หมวดหมู่
        </h2>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => updateParams('genre', undefined)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              !currentGenre
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md hover:scale-105'
            }`}
          >
            ทั้งหมด
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => updateParams('genre', genre.slug)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                currentGenre === genre.slug
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md hover:scale-105'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

