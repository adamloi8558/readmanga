import { Metadata } from 'next';
import { BookmarksClient } from '@/components/bookmarks/BookmarksClient';

export const metadata: Metadata = {
  title: 'บุ๊คมาร์คของฉัน | Hydra',
  description: 'รายการการ์ตูนและนิยายที่คุณบันทึกไว้',
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
