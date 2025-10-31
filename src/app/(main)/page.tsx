import { Suspense } from 'react';
import { apiAdapter } from '@/lib/api-adapter';
import { ContentGrid } from '@/components/content/ContentGrid';
import { HomeFilters } from '@/components/home/HomeFilters';
import { HomeHero } from '@/components/home/HomeHero';
import { RandomButton } from '@/components/content/RandomButton';
import { Sidebar } from '@/components/layout/Sidebar';
import { hydra } from '@/lib/hydra-client';
import { getWeeklyDateRange, getMonthlyDateRange, getYearlyDateRange } from '@/lib/stats-helper';
import { Metadata } from 'next';

// Force dynamic rendering (ไม่ pre-render ตอน build)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hydra - อ่านการ์ตูนและนิยายออนไลน์ฟรี',
  description: 'แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน พร้อมการ์ตูนยอดนิยมมากกว่า 1,000 เรื่อง อ่านการ์ตูนไทย manga และนิยายแปลไทยคุณภาพสูง',
  keywords: ['การ์ตูน', 'นิยาย', 'manga', 'novel', 'อ่านการ์ตูน', 'อ่านนิยาย', 'การ์ตูนออนไลน์', 'manga online', 'อ่านการ์ตูนฟรี', 'การ์ตูนแปลไทย'],
  openGraph: {
    title: 'Hydra - อ่านการ์ตูนและนิยายออนไลน์ฟรี',
    description: 'แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน พร้อมการ์ตูนยอดนิยมมากกว่า 1,000 เรื่อง',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

interface HomePageProps {
  searchParams: {
    sort?: string;
    genre?: string;
    page?: string;
  };
}

async function HomeContent({ searchParams }: HomePageProps) {
  const sort = (searchParams.sort || 'popularity') as 'relevance' | 'popularity' | 'rating' | 'recent' | 'alphabetical';
  const genre = searchParams.genre;
  const page = parseInt(searchParams.page || '1');

  // Fetch data ฝั่ง server with error handling
  try {
    const [contentData, genresData, weeklyStats, monthlyStats, yearlyStats] = await Promise.all([
      apiAdapter.getContentList({ sort, genre, page, limit: 20 }),
      apiAdapter.getGenres(),
      hydra.content.stats({ ...getWeeklyDateRange(), sort: 'view', page: 1, limit: 10 }),
      hydra.content.stats({ ...getMonthlyDateRange(), sort: 'view', page: 1, limit: 10 }),
      hydra.content.stats({ ...getYearlyDateRange(), sort: 'view', page: 1, limit: 10 }),
    ]);

    // เช็คว่าได้ข้อมูลหรือไม่
    if (!contentData || !genresData) {
      throw new Error('No data received from API');
    }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8">
      {/* Main Content */}
      <div className="space-y-12">
      {/* SEO Content Block - ด้านบนสุด */}
      <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
          อ่านการ์ตูนและนิยายออนไลน์ฟรีที่ Hydra
        </h1>
        <div className="prose prose-sm md:prose-base prose-gray dark:prose-invert max-w-none">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Hydra</strong> คือแพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี ศูนย์รวมการ์ตูนยอดนิยม <strong>Manga</strong> <strong>Novel</strong> และ <strong>Webtoon </strong> 
            ที่ครบทุกแนว! อัพเดทตอนใหม่ทุกวัน พร้อมการ์ตูนยอดนิยมมากกว่า <strong>1,000+</strong> เรื่อง 
            อ่านฟรีไม่เสียเงิน เพียงแค่มีมือถือก็สามารถ<strong>อ่านการ์ตูนออนไลน์</strong>ได้ทุกที่ทุกเวลา 
            <strong>การ์ตูนแปลไทย</strong> <strong>การ์ตูนจีน</strong> <strong>การ์ตูนเกาหลี</strong> และ <strong>การ์ตูนญี่ปุ่น</strong> รวมถึง<strong>นิยายแปลไทย</strong>คุณภาพสูง 
            อ่านได้ทุกแพลตฟอร์ม ไม่ว่าจะเป็น <strong>Manga</strong> <strong>Manhwa</strong> <strong>Manhua</strong> หรือ <strong>Novel </strong> 
            พร้อมระบบค้นหาที่ดีที่สุด! กรองตามหมวดหมู่ จัดเรียงตามความนิยม คะแนน และวันที่อัพเดท 
            รองรับทั้งโหมดกลางวันและกลางคืน (Dark Mode) สำหรับการอ่านที่สบายตา 
            อ่านการ์ตูนออนไลน์กับ <strong>Hydra</strong> วันนี้ ไม่ควรพลาด!
          </p>
        </div>
      </div>

      {/* Hero Section with Carousel */}
      <HomeHero featuredContent={contentData.data.slice(0, 5)} />

      {/* Hidden SEO Content - Featured Manga */}
      <div className="sr-only" aria-hidden="true">
        <h2>การ์ตูนยอดนิยม</h2>
        <ul>
          {contentData.data.slice(0, 10).map((item) => (
            <li key={item.id}>
              <a href={`/manga/${item.slug}`}>
                {item.name} - {item.shortDescription}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Filters */}
      <HomeFilters
        genres={genresData.data}
        currentSort={sort}
        currentGenre={genre}
      />

      {/* Content Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {genre
                ? genresData.data.find((g) => g.slug === genre)?.name
                : 'การ์ตูนและนิยายทั้งหมด'}
            </h2>
            {contentData.pagination && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                พบ {contentData.pagination.total} รายการ
              </p>
            )}
          </div>
          
          {/* Random Button */}
          <RandomButton contentSlugs={contentData.data.map(c => c.slug)} />
        </div>

        <ContentGrid content={contentData.data} />

        {/* Pagination */}
        {contentData.pagination && contentData.pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex gap-2" aria-label="Pagination">
              {page > 1 && (
                <a
                  href={`/?sort=${sort}${genre ? `&genre=${genre}` : ''}&page=${page - 1}`}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium transition-all hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg"
                  rel="prev"
                >
                  ← ก่อนหน้า
                </a>
              )}
              <div className="flex items-center px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium">
                <span className="text-sm">
                  หน้า <span className="text-primary font-bold">{page}</span> / {contentData.pagination.totalPages}
                </span>
              </div>
              {page < contentData.pagination.totalPages && (
                <a
                  href={`/?sort=${sort}${genre ? `&genre=${genre}` : ''}&page=${page + 1}`}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium transition-all hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg"
                  rel="next"
                >
                  ถัดไป →
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          weeklyContent={weeklyStats.data}
          monthlyContent={monthlyStats.data}
          yearlyContent={yearlyStats.data}
        />
      </div>
    </div>
  );
  } catch (error) {
    // Error state
    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold mb-3">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
            ไม่สามารถเชื่อมต่อกับ API ได้ กรุณาตรวจสอบการตั้งค่า
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-2xl text-left">
            <h3 className="font-bold mb-2 text-red-800 dark:text-red-300">💡 วิธีแก้ไข:</h3>
            <ol className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>1. สร้างไฟล์ <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">.env.local</code></li>
              <li>2. ใส่ API Key:
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`BACKEND_API_URL=https://v1.hydr4.me/v1
API_KEY=your-api-key-here
SITE_URL=http://localhost:3000`}
                </pre>
              </li>
              <li>3. ขอ API Key ฟรีที่: <a href="https://v1.hydr4.me" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener">https://v1.hydr4.me</a></li>
              <li>4. รีสตาร์ท dev server (Ctrl+C แล้วรัน <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">npm run dev</code> ใหม่)</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Error: {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

function HomeLoading() {
  return (
    <div className="space-y-12">
      {/* Hero Skeleton */}
      <div className="h-64 rounded-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse shadow-xl" />
      
      {/* Sort Options Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Genre Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse shadow-lg" />
            <div className="space-y-2 p-2">
              <div className="h-5 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 rounded-lg bg-gray-200 dark:bg-gray-800 w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
