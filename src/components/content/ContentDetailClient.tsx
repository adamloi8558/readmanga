'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Star, Eye, Bookmark, Calendar, Play, BookmarkPlus, Share2, ArrowUpDown, Search } from 'lucide-react';
import { useRecordView, useRecordBookmark, useRecordStar } from '@/hooks/useHydraContent';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { RatingModal } from '@/components/content/RatingModal';
import { StarRating } from '@/components/ui/StarRating';
import { RecommendedSection } from '@/components/content/RecommendedSection';
import { formatNumber, getCompletionStatusText, getContentTypeText, formatDate, normalizeRating } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-url';
import type { ContentDetail } from '@/schemas';

interface ContentDetailClientProps {
  content: ContentDetail;
  allContent?: Content[];
}

import type { Content } from '@/schemas';

export function ContentDetailClient({ content, allContent = [] }: ContentDetailClientProps) {
  const router = useRouter();
  const recordView = useRecordView();
  const recordBookmark = useRecordBookmark();
  const recordStar = useRecordStar();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const [sortAscending, setSortAscending] = useState(false); // false = ล่าสุดก่อน, true = ตอนแรกก่อน
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [episodeSearch, setEpisodeSearch] = useState('');

  const isContentBookmarked = isBookmarked(content.slug);

  // เรียงลำดับตอน
  const sortedEpisodes = sortAscending 
    ? [...content.episodes] // ตอนแรกก่อน (1, 2, 3, ...)
    : [...content.episodes].reverse(); // ตอนล่าสุดก่อน (..., 3, 2, 1)

  // ค้นหาตอน
  const filteredEpisodes = episodeSearch
    ? sortedEpisodes.filter((ep) => {
        const searchLower = episodeSearch.toLowerCase();
        return (
          ep.no.toString().includes(searchLower) ||
          ep.name?.toLowerCase().includes(searchLower)
        );
      })
    : sortedEpisodes;

  // แสดงแค่ 20 ตอนแรก ถ้ายังไม่กด "แสดงเพิ่มเติม"
  const EPISODES_PER_PAGE = 20;
  const displayedEpisodes = showAllEpisodes 
    ? filteredEpisodes 
    : filteredEpisodes.slice(0, EPISODES_PER_PAGE);
  const hasMoreEpisodes = filteredEpisodes.length > EPISODES_PER_PAGE;

  const handleReadNow = () => {
    if (content.episodes.length > 0) {
      router.push(`/read/${content.slug}/${content.episodes[0].no}`);
      recordView.mutate(content.slug);
    }
  };

  const handleBookmark = () => {
    toggleBookmark(content.slug);
    recordBookmark.mutate(content.slug);
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    recordStar.mutate({ slug: content.slug, rating });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section - ปรับปรุงให้หรูหรา */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-2xl">
        {/* Background Image with Blur */}
        {getImageUrl(content.coverImage) && (
          <>
            <div className="absolute inset-0">
              <Image
                src={getImageUrl(content.coverImage)!}
                alt={content.name}
                fill
                className="object-cover opacity-20 blur-2xl scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
          </>
        )}
        
        <div className="relative z-10 grid gap-8 p-8 md:p-12 md:grid-cols-[320px_1fr]">
          {/* Cover Image with 3D Effect */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/10 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500">
              {getImageUrl(content.thumbnailImage) ? (
                <Image
                  src={getImageUrl(content.thumbnailImage)!}
                  alt={content.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <span className="text-8xl">📚</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  {getContentTypeText(content.type)}
                </Badge>
                <Badge className={content.completionStatus === 'COMPLETED' 
                  ? 'bg-green-500/20 backdrop-blur-sm border-green-500/30 text-green-300'
                  : 'bg-yellow-500/20 backdrop-blur-sm border-yellow-500/30 text-yellow-300'
                }>
                  {getCompletionStatusText(content.completionStatus)}
                </Badge>
                {content.ageRating && (
                  <Badge className="bg-purple-500/20 backdrop-blur-sm border-purple-500/30 text-purple-300">
                    {content.ageRating}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                {content.name}
              </h1>

              {content.shortDescription && (
                <div 
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content.shortDescription }}
                />
              )}

              {/* Stats with Glassmorphism */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="font-bold text-xl">{formatNumber(content.viewTotal)}</div>
                  <div className="text-xs text-gray-400">ยอดดู</div>
                </div>
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center hover:bg-white/20 hover:scale-105 transition-all"
                >
                  <Star className="h-6 w-6 mx-auto mb-2 fill-yellow-400 text-yellow-400" />
                  <div className="font-bold text-xl">{normalizeRating(content.ratingValue || 0).toFixed(1)}</div>
                  <div className="text-xs text-gray-400">{formatNumber(content.ratingTotal)} คะแนน</div>
                  {userRating > 0 && (
                    <div className="mt-2 flex justify-center">
                      <StarRating value={userRating} readonly size="sm" />
                    </div>
                  )}
                </button>
                <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center">
                  <Bookmark className="h-6 w-6 mx-auto mb-2 text-pink-400" />
                  <div className="font-bold text-xl">{formatNumber(content.bookmarkTotal)}</div>
                  <div className="text-xs text-gray-400">บุ๊คมาร์ค</div>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {content.genres.map((genre) => (
                  <Badge 
                    key={genre.id} 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {content.lastEpisodeAt && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>อัพเดทล่าสุด: {formatDate(content.lastEpisodeAt)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleReadNow}
                disabled={content.episodes.length === 0}
                className="gap-2 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-12 md:h-14 text-base md:text-lg font-bold"
              >
                <Play className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                <span className="whitespace-nowrap">อ่านเลย</span>
              </Button>
              <Button
                size="lg"
                onClick={handleBookmark}
                className={`gap-2 h-12 md:h-14 ${
                  isContentBookmarked 
                    ? 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white shadow-xl'
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                }`}
              >
                <BookmarkPlus className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button
                size="lg"
                className="gap-2 h-12 md:h-14 bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <Share2 className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {content.description && (
        <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              เรื่องย่อ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg prose-gray dark:prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </CardContent>
        </Card>
      )}

      {/* Episodes List */}
      <Card id="episodes-section" className="border-0 shadow-xl bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b space-y-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <span>รายการตอน</span>
              <Badge className="ml-2">{content.episodes.length} ตอน</Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortAscending(!sortAscending)}
              title={sortAscending ? 'เรียงจากตอนที่ 1' : 'เรียงจากตอนล่าสุด'}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </CardTitle>

          {/* Search Episodes */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="ค้นหาตอน... (ใส่ตัวเลขเท่านั้น)"
              value={episodeSearch}
              onChange={(e) => setEpisodeSearch(e.target.value)}
              className="pl-10"
            />
            {episodeSearch && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                {filteredEpisodes.length} ตอน
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {content.episodes.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">ยังไม่มีตอนที่เผยแพร่</p>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {displayedEpisodes.map((episode) => {
                // ตอนล่าสุดคือตอนที่มีเลขมากสุด
                const isLatest = episode.no === Math.max(...content.episodes.map(e => e.no));
                
                return (
                  <Link
                    key={episode.id}
                    href={`/read/${content.slug}/${episode.no}`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg hover:scale-105 hover:border-primary"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                      {episode.no}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate group-hover:text-primary transition-colors">
                        {episode.name || `ตอนที่ ${episode.no}`}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDate(episode.createdAt)}
                      </p>
                      {isLatest && (
                        <Badge variant="default" className="mt-1 text-xs">ล่าสุด</Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
              </div>

              {/* Show More Button */}
              {hasMoreEpisodes && !showAllEpisodes && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowAllEpisodes(true)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>แสดงเพิ่มเติม</span>
                    <span className="text-sm opacity-80">
                      ({sortedEpisodes.length - EPISODES_PER_PAGE} ตอน)
                    </span>
                  </button>
                </div>
              )}

              {/* Show Less Button */}
              {showAllEpisodes && hasMoreEpisodes && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setShowAllEpisodes(false);
                      // Scroll to episodes section
                      document.querySelector('#episodes-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                  >
                    แสดงน้อยลง
                  </button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Recommended Section */}
      {allContent.length > 0 && (
        <RecommendedSection currentContent={content} allContent={allContent} />
      )}

      {/* Rating Modal */}
      <RatingModal
        contentName={content.name}
        currentRating={userRating}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRating}
      />
    </div>
  );
}
