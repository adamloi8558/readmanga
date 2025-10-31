'use client';

import { Sparkles } from 'lucide-react';
import { ContentCard } from './ContentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { Content } from '@/schemas';

interface RecommendedSectionProps {
  currentContent: Content;
  allContent: Content[];
}

export function RecommendedSection({ currentContent, allContent }: RecommendedSectionProps) {
  // แนะนำการ์ตูนที่มี genre เหมือนกัน
  const recommendedContent = allContent
    .filter((item) => {
      // ไม่เอาเรื่องปัจจุบัน
      if (item.slug === currentContent.slug) return false;
      
      // มี genre เหมือนกันอย่างน้อย 1 อัน
      return item.genres.some((g) =>
        currentContent.genres.some((cg) => cg.id === g.id)
      );
    })
    .sort((a, b) => {
      // เรียงตามจำนวน genre ที่เหมือนกัน
      const aMatchCount = a.genres.filter((g) =>
        currentContent.genres.some((cg) => cg.id === g.id)
      ).length;
      const bMatchCount = b.genres.filter((g) =>
        currentContent.genres.some((cg) => cg.id === g.id)
      ).length;
      
      return bMatchCount - aMatchCount;
    })
    .slice(0, 10);

  // ถ้าไม่มีเลย แสดงการ์ตูนยอดนิยมแทน
  const displayContent = recommendedContent.length > 0 
    ? recommendedContent 
    : allContent.filter(item => item.slug !== currentContent.slug).slice(0, 10);

  if (displayContent.length === 0) return null;

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <span>มังงะแนะนำสำหรับคุณ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayContent.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

