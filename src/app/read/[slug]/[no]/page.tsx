import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { apiAdapter } from '@/lib/api-adapter';
import { ReaderClient } from '@/components/reader/ReaderClient';

interface ReadPageProps {
  params: {
    slug: string;
    no: string;
  };
}

// Generate metadata สำหรับ SEO
export async function generateMetadata({ params }: ReadPageProps): Promise<Metadata> {
  try {
    const no = parseInt(params.no);
    const { data: episode } = await apiAdapter.getEpisode(params.slug, no);

    return {
      title: `${episode.content.name} - ${episode.name || `ตอนที่ ${episode.no}`} | Hydra`,
      description: `อ่าน ${episode.content.name} ${episode.name || `ตอนที่ ${episode.no}`} ออนไลน์ฟรี`,
      openGraph: {
        title: `${episode.content.name} - ${episode.name || `ตอนที่ ${episode.no}`}`,
        description: `อ่าน ${episode.content.name} ${episode.name || `ตอนที่ ${episode.no}`} ออนไลน์ฟรี`,
        images: episode.content.coverImage ? [episode.content.coverImage] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'ไม่พบตอน | Hydra',
    };
  }
}

async function ReaderServer({ slug, no }: { slug: string; no: number }) {
  try {
    const { data: episode } = await apiAdapter.getEpisode(slug, no);
    return <ReaderClient episode={episode} slug={slug} no={no} />;
  } catch {
    notFound();
  }
}

export default async function ReadPage({ params }: ReadPageProps) {
  const no = parseInt(params.no);

  return (
    <Suspense fallback={<ReaderLoading />}>
      <ReaderServer slug={params.slug} no={no} />
    </Suspense>
  );
}

function ReaderLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-2 bg-black min-h-screen">
      {/* Header Skeleton */}
      <div className="h-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
      
      {/* Content Skeleton - Image Pages */}
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className="aspect-[2/3] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
