import { Suspense } from 'react';
import { Metadata } from 'next';
import { apiAdapter } from '@/lib/api-adapter';
import { SearchClient } from '@/components/search/SearchClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ค้นหาการ์ตูนและนิยาย | Hydra',
  description: 'ค้นหาการ์ตูนและนิยายที่คุณชื่นชอบ ค้นหาได้ทั้งชื่อเรื่อง ผู้แต่ง และหมวดหมู่',
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    sort?: string;
    genre?: string;
    page?: string;
  };
}

async function SearchContent({ searchParams }: SearchPageProps) {
  const q = searchParams.q;
  const sort = (searchParams.sort || 'relevance') as 'relevance' | 'popularity' | 'rating' | 'recent' | 'alphabetical';
  const genre = searchParams.genre;
  const page = parseInt(searchParams.page || '1');

  const [contentData, genresData] = await Promise.all([
    apiAdapter.getContentList({ q, sort, genre, page, limit: 20 }),
    apiAdapter.getGenres(),
  ]);

  return (
    <SearchClient
      initialData={contentData}
      genres={genresData.data}
      initialQuery={q}
      initialSort={sort}
      initialGenre={genre}
      initialPage={page}
    />
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-800" />
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <div className="h-40 rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[3/4] rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
