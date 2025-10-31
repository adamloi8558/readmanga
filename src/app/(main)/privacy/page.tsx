import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว',
  description: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของ Hydra',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">นโยบายความเป็นส่วนตัว</h1>
        <p className="text-gray-600 dark:text-gray-400">
          อัพเดทล่าสุด: {new Date().toLocaleDateString('th-TH')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลที่เราเก็บรวบรวม</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>เราเก็บข้อมูลดังต่อไปนี้:</p>
          <ul>
            <li>ข้อมูลการใช้งาน (เช่น ประวัติการอ่าน, บุ๊คมาร์ค)</li>
            <li>ข้อมูล cookies สำหรับปรับปรุงประสบการณ์</li>
            <li>ข้อมูล browser และอุปกรณ์</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>การใช้ข้อมูล</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>เราใช้ข้อมูลเพื่อ:</p>
          <ul>
            <li>ปรับปรุงประสบการณ์การใช้งาน</li>
            <li>แนะนำเนื้อหาที่เหมาะสมกับคุณ</li>
            <li>วิเคราะห์พฤติกรรมการใช้งาน</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>การคุ้มครองข้อมูล</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อคุ้มครองข้อมูลส่วนบุคคลของคุณ
            ข้อมูลจะไม่ถูกขายหรือแบ่งปันกับบุคคลที่สาม
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>สิทธิของคุณ</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>คุณมีสิทธิ์:</p>
          <ul>
            <li>เข้าถึงข้อมูลส่วนบุคคลของคุณ</li>
            <li>ขอแก้ไขหรือลบข้อมูล</li>
            <li>คัดค้านการประมวลผลข้อมูล</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

