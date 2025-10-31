'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Flame, Star, Eye } from 'lucide-react';
import { ContentGrid } from '@/components/content/ContentGrid';
import type { ContentListResponse } from '@/schemas';

type SortType = 'popularity' | 'rating' | 'recent';

interface TrendingClientProps {
  initialData: ContentListResponse;
  initialSort: string;
  initialPage: number;
}

export function TrendingClient({ initialData, initialSort, initialPage }: TrendingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions: { value: SortType; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: 'popularity',
      label: 'ยอดนิยม',
      icon: <Flame className="h-5 w-5" />,
      description: 'การ์ตูนที่มียอดดูมากที่สุด',
    },
    {
      value: 'rating',
      label: 'คะแนนสูงสุด',
      icon: <Star className="h-5 w-5" />,
      description: 'การ์ตูนที่ได้คะแนนรีวิวสูงสุด',
    },
    {
      value: 'recent',
      label: 'อัพเดทล่าสุด',
      icon: <Eye className="h-5 w-5" />,
      description: 'การ์ตูนที่มีตอนใหม่ล่าสุด',
    },
  ];

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page');
    router.push(`/trending?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Sort Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateSort(option.value)}
            className={`flex flex-col items-start gap-3 rounded-lg border p-4 text-left transition-all ${
              initialSort === option.value
                ? 'border-primary bg-primary/5 shadow-md dark:border-primary'
                : 'hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <div className={`rounded-lg p-2 ${
              initialSort === option.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {option.icon}
            </div>
            <div>
              <h3 className="font-semibold">{option.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <ContentGrid content={initialData.data} />

      {/* Pagination */}
      {initialData.pagination && initialData.pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex gap-2">
            {initialPage > 1 && (
              <a
                href={`/trending?sort=${initialSort}&page=${initialPage - 1}`}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              >
                ก่อนหน้า
              </a>
            )}
            <span className="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
              หน้า {initialPage} / {initialData.pagination.totalPages}
            </span>
            {initialPage < initialData.pagination.totalPages && (
              <a
                href={`/trending?sort=${initialSort}&page=${initialPage + 1}`}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
              >
                ถัดไป
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}

