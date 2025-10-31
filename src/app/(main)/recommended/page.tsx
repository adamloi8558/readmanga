import { Suspense } from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { apiAdapter } from '@/lib/api-adapter';
import { ContentGrid } from '@/components/content/ContentGrid';
import { RandomButton } from '@/components/content/RandomButton';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'มังงะแนะนำ - แนะนำสำหรับคุณ',
  description: 'การ์ตูนและนิยายที่แนะนำมาเป็นพิเศษ อัพเดททุกวัน',
};

async function RecommendedContent() {
  const data = await apiAdapter.getContentList({ 
    sort: 'rating', 
    page: 1, 
    limit: 30 
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">มังงะแนะนำ</h1>
            <p className="text-gray-600 dark:text-gray-400">
              การ์ตูนที่ได้รับคะแนนสูงสุด
            </p>
          </div>
        </div>

        <RandomButton contentSlugs={data.data.map(c => c.slug)} />
      </div>

      <ContentGrid content={data.data} />
    </div>
  );
}

export default async function RecommendedPage() {
  return (
    <Suspense fallback={<RecommendedLoading />}>
      <RecommendedContent />
    </Suspense>
  );
}

function RecommendedLoading() {
  return (
    <div className="space-y-8">
      <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3 animate-pulse">
            <div className="aspect-[3/4] rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-5 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

