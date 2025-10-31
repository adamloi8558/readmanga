import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'รายงานปัญหา',
  description: 'รายงานปัญหาหรือข้อผิดพลาดในการใช้งาน Hydra',
};

export default function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <AlertTriangle className="h-16 w-16 mx-auto text-yellow-600" />
        <h1 className="text-4xl md:text-5xl font-bold">รายงานปัญหา</h1>
        <p className="text-gray-600 dark:text-gray-400">
          พบปัญหาหรือข้อผิดพลาด? แจ้งให้เราทราบได้เลย
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ประเภทปัญหาที่รายงานได้</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🐛 Bug หรือข้อผิดพลาดในระบบ</li>
            <li>📖 ตอนที่โหลดไม่ได้ หรือรูปภาพเสีย</li>
            <li>📝 ข้อมูลผิดพลาด (ชื่อ, เรื่องย่อ)</li>
            <li>⚠️ เนื้อหาไม่เหมาะสม</li>
            <li>🔗 ลิงก์เสีย</li>
            <li>💡 ข้อเสนอแนะปรับปรุง</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>วิธีรายงานปัญหา</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>กรุณาส่งข้อมูลดังนี้มาที่ <a href="mailto:support@hydra.com" className="text-primary">support@hydra.com</a>:</p>
          <ul>
            <li>ประเภทปัญหา</li>
            <li>URL ของหน้าที่เจอปัญหา</li>
            <li>รายละเอียดปัญหา</li>
            <li>Screenshot (ถ้ามี)</li>
            <li>Browser และอุปกรณ์ที่ใช้</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            เราจะตอบกลับภายใน 24-48 ชั่วโมง
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ขอบคุณที่ช่วยทำให้ Hydra ดีขึ้น! 🙏
        </p>
      </div>
    </div>
  );
}

