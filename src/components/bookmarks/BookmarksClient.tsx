'use client';

import { useBookmarkStore } from '@/store/bookmarkStore';
import { ContentGrid } from '@/components/content/ContentGrid';
import { Card, CardContent } from '@/components/ui/Card';
import { Bookmark } from 'lucide-react';
import { useQueries } from '@tanstack/react-query';

export function BookmarksClient() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const bookmarkArray = Array.from(bookmarks);

  // ดึงข้อมูลแต่ละ bookmark ผ่าน Next.js API route (ใช้ API_KEY ฝั่ง server)
  const bookmarkQueries = useQueries({
    queries: bookmarkArray.map((slug) => ({
      queryKey: ['content', 'detail', slug],
      queryFn: async () => {
        const res = await fetch(`/api/content/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      },
      retry: 1,
    })),
  });

  const isLoading = bookmarkQueries.some((q) => q.isLoading);
  
  // รวมข้อมูลที่ดึงได้ทั้งหมด
  const bookmarkedContent = bookmarkQueries
    .filter((q) => q.data?.data)
    .map((q) => q.data!.data) || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Bookmark className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">บุ๊คมาร์คของฉัน</h1>
          <p className="text-gray-600 dark:text-gray-400">
            คุณมี {bookmarkArray.length} รายการที่บันทึกไว้
          </p>
        </div>
      </div>

      {bookmarkArray.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-xl font-semibold mb-2">ยังไม่มีบุ๊คมาร์ค</h2>
            <p className="text-gray-600 dark:text-gray-400">
              เริ่มบันทึกการ์ตูนและนิยายที่คุณชื่นชอบเพื่อเข้าถึงได้ง่ายขึ้น
            </p>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="aspect-[3/4] rounded-2xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      ) : bookmarkedContent.length > 0 ? (
        <ContentGrid content={bookmarkedContent} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold mb-2">ไม่พบรายการที่บุ๊คมาร์ค</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              รายการที่คุณบันทึกอาจไม่อยู่ในหน้าแรก ลองค้นหาด้วยชื่อเรื่อง
            </p>
            <div className="text-xs text-gray-500">
              Bookmarks: {bookmarkArray.join(', ')}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

