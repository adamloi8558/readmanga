import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย (FAQ)',
  description: 'คำถามที่พบบ่อยเกี่ยวกับอ่านมังงะ - แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'อ่านมังงะ คืออะไร?',
      a: 'อ่านมังงะ คือแพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน',
    },
    {
      q: 'ใช้งานฟรีจริงหรือ?',
      a: 'ใช่ครับ ฟรี 100% ไม่มีค่าใช้จ่ายใดๆ',
    },
    {
      q: 'มีการ์ตูนกี่เรื่อง?',
      a: 'มีการ์ตูนและนิยายมากกว่า 1,000+ เรื่อง และเพิ่มขึ้นเรื่อยๆ',
    },
    {
      q: 'อัพเดทตอนใหม่เมื่อไหร่?',
      a: 'เราอัพเดทตอนใหม่ทุกวัน ตรวจสอบได้ที่หน้า "การ์ตูนใหม่"',
    },
    {
      q: 'รองรับอุปกรณ์อะไรบ้าง?',
      a: 'รองรับทุกอุปกรณ์ - มือถือ, แท็บเล็ต, คอมพิวเตอร์',
    },
    {
      q: 'มี Dark Mode ไหม?',
      a: 'มีครับ! คลิกไอคอน 🌙 ที่ Navbar แล้วเลือกโหมดที่ชอบ',
    },
    {
      q: 'ประวัติการอ่านเก็บไว้ที่ไหน?',
      a: 'เก็บใน browser (localStorage) ของคุณ ปลอดภัย ไม่ส่งไปที่ server',
    },
    {
      q: 'สามารถดาวน์โหลดได้ไหม?',
      a: 'ปัจจุบันยังไม่รองรับการดาวน์โหลด แนะนำให้อ่านออนไลน์',
    },
    {
      q: 'หากเจอปัญหาต้องทำอย่างไร?',
      a: 'สามารถรายงานปัญหาได้ที่หน้า "รายงานปัญหา" หรือติดต่อเราทาง email',
    },
    {
      q: 'มีแอพมือถือไหม?',
      a: 'ยังไม่มีครับ แต่เว็บไซต์ responsive ใช้งานบนมือถือได้สะดวก',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">คำถามที่พบบ่อย</h1>
        <p className="text-gray-600 dark:text-gray-400">
          คำตอบสำหรับคำถามที่ผู้ใช้งานถามบ่อยที่สุด
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">Q: {faq.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">A: {faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            ยังมีคำถามอื่นๆ? <a href="/contact" className="text-primary hover:underline font-semibold">ติดต่อเรา</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

