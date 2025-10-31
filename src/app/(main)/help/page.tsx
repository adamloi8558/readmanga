import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'วิธีใช้งาน',
  description: 'คู่มือการใช้งาน Hydra - เรียนรู้วิธีอ่านการ์ตูนและใช้ฟีเจอร์ต่างๆ',
};

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <HelpCircle className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold">วิธีใช้งาน</h1>
        <p className="text-gray-600 dark:text-gray-400">
          เรียนรู้วิธีใช้งาน Hydra ให้เต็มประสิทธิภาพ
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔍 วิธีค้นหาการ์ตูน</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>คลิกที่ &ldquo;ค้นหา&rdquo; ใน Navbar</li>
            <li>พิมพ์ชื่อการ์ตูนที่ต้องการ</li>
            <li>กรองตามหมวดหมู่ (ถ้าต้องการ)</li>
            <li>เลือกการ์ตูนที่ชอบ</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📖 วิธีอ่านการ์ตูน</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>เลือกการ์ตูนที่ต้องการอ่าน</li>
            <li>คลิก &ldquo;อ่านเลย&rdquo; หรือเลือกตอน</li>
            <li>เลื่อนลงเพื่ออ่าน (Manga) หรืออ่านข้อความ (Novel)</li>
            <li>ใช้ปุ่มนำทาง &ldquo;ตอนก่อนหน้า&rdquo; / &ldquo;ตอนถัดไป&rdquo;</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔖 วิธีบันทึกบุ๊คมาร์ค</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>เปิดหน้ารายละเอียดการ์ตูน</li>
            <li>คลิกปุ่ม &ldquo;บันทึก&rdquo; (ไอคอน 🔖)</li>
            <li>ดูบุ๊คมาร์คได้ที่ Navbar → &ldquo;บุ๊คมาร์ค&rdquo;</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌓 วิธีเปิด Dark Mode</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>คลิกไอคอน 🌙 หรือ ☀️ ที่ Navbar</li>
            <li>เลือกโหมด: Light / Dark / System</li>
            <li>ระบบจะจำค่าที่เลือกอัตโนมัติ</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

