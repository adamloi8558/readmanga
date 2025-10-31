'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Home, List, Menu, Maximize2, Minimize2 } from 'lucide-react';
import { useRecordEpisodeView } from '@/hooks/useHydraEpisode';
import { useReadingHistoryStore } from '@/store/readingHistoryStore';
import { useAutoHide } from '@/hooks/useAutoHide';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { EpisodeWithContent, EpisodeMangaData, EpisodeNovelData } from '@/schemas';

interface ReaderClientProps {
  episode: EpisodeWithContent;
  slug: string;
  no: number;
}

export function ReaderClient({ episode, slug, no }: ReaderClientProps) {
  const router = useRouter();
  const recordView = useRecordEpisodeView();
  const addHistory = useReadingHistoryStore((state) => state.addHistory);
  const { isVisible } = useAutoHide(3000); // ซ่อนหลัง 3 วินาที
  const [isFullscreen, setIsFullscreen] = useState(false);

  const content = episode.content;

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    recordView.mutate({ slug, no });
    addHistory({
      slug: content.slug,
      episodeNo: episode.no,
      contentName: content.name,
      thumbnailImage: content.thumbnailImage,
    });
  }, [slug, no, recordView, addHistory, content.slug, episode.no, content.name, content.thumbnailImage]);

  // Navigation - ใช้ prevEpisode/nextEpisode จาก API (ถ้ามี)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prevEpisode = (episode as any).prevEpisode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nextEpisode = (episode as any).nextEpisode;
  
  const hasPrevious = !!prevEpisode;
  const hasNext = !!nextEpisode;
  
  const previousEpisodeNo = prevEpisode?.no || (no > 1 ? no - 1 : null);
  const nextEpisodeNo = nextEpisode?.no || no + 1;

  const handlePrevious = () => {
    if (previousEpisodeNo) {
      router.push(`/read/${slug}/${previousEpisodeNo}`);
    }
  };

  const handleNext = () => {
    if (nextEpisodeNo) {
      router.push(`/read/${slug}/${nextEpisodeNo}`);
    }
  };

  const isManga = 'images' in episode.data;
  const episodeData = episode.data as EpisodeMangaData | EpisodeNovelData;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header - Auto Hide */}
      <div className={cn(
        "mb-6 sticky top-0 left-0 right-0 z-50 border-b bg-black/80 backdrop-blur-xl p-4 shadow-2xl transition-all duration-500",
        !isVisible && "opacity-0 pointer-events-none -translate-y-full"
      )}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/manga/${slug}`}>
              <Button variant="ghost" size="icon">
                <List className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold truncate text-white">{content.name}</h1>
              <p className="text-sm text-gray-300 truncate">
                {episode.name || `ตอนที่ ${episode.no}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'ออกจาก Fullscreen' : 'Fullscreen'}
              className="text-white hover:bg-white/10"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              title={hasPrevious ? `ตอนที่ ${previousEpisodeNo}` : 'ไม่มีตอนก่อนหน้า'}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">ก่อนหน้า</span>
            </Button>
            <Button
              onClick={handleNext}
              disabled={!hasNext}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
              title={hasNext ? `ตอนที่ ${nextEpisodeNo}` : 'ไม่มีตอนถัดไป'}
            >
              <span className="hidden sm:inline mr-1">ถัดไป</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        {isManga ? (
          // Manga Reader
          <div className="space-y-1 bg-black">
            {(episodeData as EpisodeMangaData).images.map((image, index) => (
              <div key={index} className="relative w-full">
                <Image
                  src={image}
                  alt={`หน้า ${index + 1}`}
                  width={1200}
                  height={1800}
                  className="w-full h-auto"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        ) : (
          // Novel Reader
          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                style={{
                  fontFamily: 'Georgia, serif',
                  lineHeight: '2',
                  fontSize: '1.125rem',
                }}
              >
                <div className="whitespace-pre-wrap">
                  {(episodeData as EpisodeNovelData).content}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation - Auto Hide */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-black/80 backdrop-blur-xl shadow-2xl transition-all duration-500",
        !isVisible && "opacity-0 pointer-events-none translate-y-full"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
            <Button
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/30 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              title={hasPrevious ? `ตอนที่ ${previousEpisodeNo}` : 'ไม่มีตอนก่อนหน้า'}
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">ตอนก่อนหน้า</span>
            </Button>

            <Link href={`/manga/${slug}`} className="flex-1">
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 h-12">
                <Menu className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">รายการตอน</span>
              </Button>
            </Link>

            <Button
              onClick={handleNext}
              disabled={!hasNext}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl h-12 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700"
              title={hasNext ? `ตอนที่ ${nextEpisodeNo}` : 'ไม่มีตอนถัดไป'}
            >
              <span className="hidden sm:inline">ตอนถัดไป</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

