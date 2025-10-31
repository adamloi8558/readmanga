import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { apiAdapter } from '@/lib/api-adapter';
import { ContentDetailClient } from '@/components/content/ContentDetailClient';

interface ContentPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata สำหรับ SEO
export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  try {
    const { data: content } = await apiAdapter.getContentBySlug(params.slug);

    return {
      title: `${content.name} - อ่านการ์ตูนออนไลน์ | Hydra`,
      description: content.shortDescription || content.description || `อ่าน ${content.name} ออนไลน์ฟรี`,
      keywords: [
        content.name,
        ...content.genres.map(g => g.name),
        'การ์ตูน',
        'manga',
        'อ่านการ์ตูน',
      ],
      openGraph: {
        title: content.name,
        description: content.shortDescription || content.description || '',
        images: content.coverImage ? [content.coverImage] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: content.name,
        description: content.shortDescription || '',
        images: content.coverImage ? [content.coverImage] : [],
      },
    };
  } catch {
    return {
      title: 'ไม่พบเนื้อหา | Hydra',
    };
  }
}

async function ContentDetailServer({ slug }: { slug: string }) {
  try {
    const [{ data: content }, relatedContent] = await Promise.all([
      apiAdapter.getContentBySlug(slug),
      apiAdapter.getContentList({ limit: 50, sort: 'popularity' }),
    ]);
    
    return <ContentDetailClient content={content} allContent={relatedContent.data} />;
  } catch {
    notFound();
  }
}

export default async function ContentDetailPage({ params }: ContentPageProps) {
  return (
    <Suspense fallback={<ContentDetailLoading />}>
      <ContentDetailServer slug={params.slug} />
    </Suspense>
  );
}

function ContentDetailLoading() {
  return (
    <div className="space-y-8">
      {/* Hero Skeleton */}
      <div className="h-[600px] rounded-3xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse shadow-2xl" />
      
      {/* Description Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
        <div className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-11/12 animate-pulse" />
          <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-10/12 animate-pulse" />
        </div>
      </div>

      {/* Episodes Skeleton */}
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
        <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 mb-6 animate-pulse" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
