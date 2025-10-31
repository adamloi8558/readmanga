import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'ข้อตกลงการใช้งาน',
  description: 'ข้อตกลงและเงื่อนไขการใช้งานเว็บไซต์ Hydra',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">ข้อตกลงการใช้งาน</h1>
        <p className="text-gray-600 dark:text-gray-400">
          อัพเดทล่าสุด: {new Date().toLocaleDateString('th-TH')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. การยอมรับข้อตกลง</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            การใช้งานเว็บไซต์ Hydra ถือว่าคุณยอมรับข้อตกลงและเงื่อนไขการใช้งานทั้งหมด
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. การใช้งานเนื้อหา</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            เนื้อหาทั้งหมดบนเว็บไซต์นี้มีไว้สำหรับการอ่านเท่านั้น 
            ห้ามทำซ้ำ แจกจ่าย หรือนำไปใช้ในเชิงพาณิชย์โดยไม่ได้รับอนุญาต
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. ลิขสิทธิ์</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            เนื้อหาทั้งหมดเป็นทรัพย์สินของเจ้าของลิขสิทธิ์ 
            Hydra เป็นเพียงแพลตฟอร์มสำหรับการอ่านเท่านั้น
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. ความรับผิดชอบ</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Hydra ไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้งานเว็บไซต์
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

