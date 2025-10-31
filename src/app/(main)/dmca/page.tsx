import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA',
  description: 'นโยบาย DMCA และการรายงานการละเมิดลิขสิทธิ์',
};

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Shield className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold">DMCA Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          นโยบายการคุ้มครองลิขสิทธิ์ตาม Digital Millennium Copyright Act
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>การแจ้งละเมิดลิขสิทธิ์</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Hydra เคารพสิทธิ์ในทรัพย์สินทางปัญญา หากคุณเชื่อว่ามีเนื้อหาละเมิดลิขสิทธิ์ 
            กรุณาติดต่อเราพร้อมข้อมูลดังนี้:
          </p>
          <ul>
            <li>รายละเอียดของงานที่ถูกละเมิด</li>
            <li>URL ของเนื้อหาที่ละเมิด</li>
            <li>ข้อมูลการติดต่อของคุณ</li>
            <li>คำยืนยันว่าคุณเป็นเจ้าของลิขสิทธิ์</li>
          </ul>
          <p className="font-semibold">
            ส่งมาที่: <a href="mailto:dmca@hydra.com" className="text-primary">dmca@hydra.com</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ขั้นตอนการดำเนินการ</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>เราจะตรวจสอบคำร้องภายใน 24-48 ชั่วโมง</li>
            <li>หากพบว่าละเมิดจริง เราจะลบเนื้อหาทันที</li>
            <li>แจ้งผู้อัพโหลดเกี่ยวกับการลบ</li>
            <li>บันทึกประวัติการละเมิด</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

