'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ContentGrid } from '@/components/content/ContentGrid';
import { SearchInputWithSuggestions } from '@/components/search/SearchInputWithSuggestions';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import type { ContentListResponse, Genre } from '@/schemas';

type SortType = 'relevance' | 'popularity' | 'rating' | 'recent' | 'alphabetical';

interface SearchClientProps {
  initialData: ContentListResponse;
  genres: Genre[];
  initialQuery?: string;
  initialSort: string;
  initialGenre?: string;
  initialPage: number;
}

export function SearchClient({
  initialData,
  genres,
  initialQuery = '',
  initialSort,
  initialGenre,
  initialPage,
}: SearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'relevance', label: 'ความเกี่ยวข้อง' },
    { value: 'popularity', label: 'ยอดนิยม' },
    { value: 'rating', label: 'คะแนนสูงสุด' },
    { value: 'recent', label: 'อัพเดทล่าสุด' },
    { value: 'alphabetical', label: 'เรียงตามชื่อ' },
  ];

  const updateParams = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    params.delete('page');
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">ค้นหาการ์ตูนและนิยาย</h1>
        
        {/* Search Input with Autocomplete */}
        <SearchInputWithSuggestions defaultValue={initialQuery} />

        {/* Search Info */}
        {initialData.search && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            พบ <strong>{initialData.search.totalResults}</strong> รายการ
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          {/* Sort Filter */}
          <div className="rounded-lg border bg-card p-4 dark:border-gray-800">
            <h3 className="mb-3 font-semibold">จัดเรียงตาม</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateParams('sort', option.value)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    initialSort === option.value
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="rounded-lg border bg-card p-4 dark:border-gray-800">
            <h3 className="mb-3 font-semibold">หมวดหมู่</h3>
            <div className="space-y-2">
              <button
                onClick={() => updateParams('genre', undefined)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  !initialGenre
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                ทั้งหมด
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => updateParams('genre', genre.slug)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    initialGenre === genre.slug
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Active Filters */}
          {(initialGenre || initialQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">ตัวกรองที่ใช้:</span>
              {initialQuery && (
                <Badge variant="secondary" className="gap-2">
                  ค้นหา: {initialQuery}
                  <button
                    onClick={() => {
                      updateParams('q', undefined);
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    ✕
                  </button>
                </Badge>
              )}
              {initialGenre && (
                <Badge variant="secondary" className="gap-2">
                  หมวด: {genres.find((g) => g.slug === initialGenre)?.name}
                  <button
                    onClick={() => updateParams('genre', undefined)}
                    className="ml-1 hover:text-red-600"
                  >
                    ✕
                  </button>
                </Badge>
              )}
            </div>
          )}

          <ContentGrid content={initialData.data} />

          {/* Pagination */}
          {initialData.pagination && initialData.pagination.totalPages > 1 && (
            <Pagination
              currentPage={initialPage}
              totalPages={initialData.pagination.totalPages}
              baseUrl={`/search?${Array.from(searchParams.entries())
                .filter(([key]) => key !== 'page')
                .map(([key, value]) => `${key}=${value}`)
                .join('&')}${searchParams.toString() ? '&' : ''}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

