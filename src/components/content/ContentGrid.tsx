import { ContentCard } from './ContentCard';
import type { Content, ContentSearch } from '@/schemas';
import { BookX } from 'lucide-react';

interface ContentGridProps {
  content: (Content | ContentSearch)[];
}

export function ContentGrid({ content }: ContentGridProps) {
  if (content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
          <BookX className="h-20 w-20 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          ไม่พบเนื้อหา
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง เราจะอัพเดทเนื้อหาใหม่ๆ ทุกวัน
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {content.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
}
