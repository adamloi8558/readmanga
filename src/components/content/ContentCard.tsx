'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Eye, Bookmark, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Content, ContentSearch } from '@/schemas';
import { formatNumber, getCompletionStatusText, getContentTypeText, normalizeRating } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-url';

interface ContentCardProps {
  content: Content | ContentSearch;
}

export function ContentCard({ content }: ContentCardProps) {
  const statusVariant = content.completionStatus === 'COMPLETED' ? 'success' : 'default';

  return (
    <Link href={`/manga/${content.slug}`} className="block h-full">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] border-0 bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-t-2xl">
          {getImageUrl(content.thumbnailImage) ? (
            <>
              <Image
                src={getImageUrl(content.thumbnailImage)!}
                alt={content.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
              <span className="text-6xl">📚</span>
            </div>
          )}
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant={statusVariant} className="shadow-lg backdrop-blur-sm">
              {getCompletionStatusText(content.completionStatus)}
            </Badge>
            <Badge variant="secondary" className="shadow-lg backdrop-blur-sm">
              {getContentTypeText(content.type)}
            </Badge>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 transform transition-all duration-300 group-hover:from-black/95">
            <div className="flex items-center gap-2 text-xs text-white font-medium flex-wrap">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Eye className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs">{formatNumber(content.viewTotal)}</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Star className="h-3 w-3 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{normalizeRating(content.ratingValue || 0).toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Bookmark className="h-3 w-3 flex-shrink-0" />
                <span className="text-xs">{formatNumber(content.bookmarkTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="mb-2 line-clamp-2 font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors min-h-[3.5rem]">
            {content.name}
          </h3>
          <div 
            className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[2.5rem]"
            dangerouslySetInnerHTML={{ __html: content.shortDescription || '' }}
          />
          
          <div className="flex flex-wrap gap-1.5 mb-3 min-h-[2rem]">
            {content.genres.slice(0, 3).map((genre) => (
              <Badge 
                key={genre.id} 
                variant="outline" 
                className="text-xs border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="mt-auto">
            {content.lastEpisodeAt && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-lg px-2.5 py-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>อัพเดท: {new Date(content.lastEpisodeAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

