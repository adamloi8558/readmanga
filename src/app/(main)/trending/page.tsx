import { Suspense } from 'react';
import { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { apiAdapter } from '@/lib/api-adapter';
import { TrendingClient } from '@/components/trending/TrendingClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'การ์ตูนยอดนิยม | Hydra',
  description: 'การ์ตูนและนิยายที่กำลังมาแรง ยอดนิยม และได้รับคะแนนสูงสุด',
};

interface TrendingPageProps {
  searchParams: {
    sort?: string;
    page?: string;
  };
}

async function TrendingContent({ searchParams }: TrendingPageProps) {
  const sort = (searchParams.sort || 'popularity') as 'popularity' | 'rating' | 'recent';
  const page = parseInt(searchParams.page || '1');

  const data = await apiAdapter.getContentList({ sort, page, limit: 20 });

  return <TrendingClient initialData={data} initialSort={sort} initialPage={page} />;
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">ยอดนิยม</h1>
          <p className="text-gray-600 dark:text-gray-400">การ์ตูนและนิยายที่กำลังมาแรง</p>
        </div>
      </div>

      <Suspense fallback={<TrendingLoading />}>
        <TrendingContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function TrendingLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2 animate-pulse">
            <div className="aspect-[3/4] rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
