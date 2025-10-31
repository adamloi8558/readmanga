'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Star, Eye, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatNumber, normalizeRating } from '@/lib/utils';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import type { ContentStats } from '@/schemas';

interface SidebarProps {
  weeklyContent: ContentStats[];
  monthlyContent: ContentStats[];
  yearlyContent: ContentStats[];
}

type TimePeriod = 'week' | 'month' | 'year';

export function Sidebar({ weeklyContent, monthlyContent, yearlyContent }: SidebarProps) {
  const [period, setPeriod] = useState<TimePeriod>('week');
  
  // เลือกข้อมูลตามช่วงเวลา
  const currentContent = {
    week: weeklyContent,
    month: monthlyContent,
    year: yearlyContent,
  }[period];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-orange-500';
    if (rank === 2) return 'from-gray-400 to-gray-500';
    if (rank === 3) return 'from-orange-600 to-orange-700';
    return 'from-blue-500 to-purple-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Medal className="h-4 w-4" />;
    return null;
  };

  const periodLabels = {
    week: 'รายสัปดาห์',
    month: 'รายเดือน',
    year: 'รายปี',
  };

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Trending */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-b space-y-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span>ยอดนิยม</span>
          </CardTitle>

          {/* Period Tabs */}
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as TimePeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  period === p
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {currentContent.slice(0, 10).map((item, index) => {
              const rank = index + 1;
              
              return (
                <Link
                  key={item.id}
                  href={`/manga/${item.slug}`}
                  className="group flex gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  {/* Rank */}
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br ${getRankColor(rank)} text-white font-bold text-sm shadow-lg`}>
                    {getRankIcon(rank) || rank}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    {getImageUrl(item.thumbnailImage) ? (
                      <Image
                        src={getImageUrl(item.thumbnailImage)!}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
                        📚
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre.id} variant="outline" className="text-xs px-1.5 py-0">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{normalizeRating(item.ratingValue || 0).toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatNumber(item.viewTotal)}</span>
                      </div>
                      {item.dislikeTotal > 0 && (
                        <div className="flex items-center gap-1 text-red-500">
                          <span>👎</span>
                          <span>{formatNumber(item.dislikeTotal)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

