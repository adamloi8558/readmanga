import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BookOpen, Users, Target, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'Hydra - แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี มุ่งมั่นมอบประสบการณ์การอ่านที่ดีที่สุด',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          เกี่ยวกับ Hydra
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรีที่ดีที่สุด
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            ภารกิจของเรา
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Hydra มุ่งมั่นที่จะเป็นแพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ที่ดีที่สุด 
            โดยมอบประสบการณ์การอ่านที่สะดวก รวดเร็ว และเข้าถึงได้ง่ายสำหรับทุกคน
            เราอัพเดทเนื้อหาใหม่ทุกวัน พร้อมรองรับทั้ง Manga, Manhwa, Manhua และ Novel
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-bold text-xl mb-2">ผู้ใช้งาน</h3>
            <p className="text-3xl font-bold text-primary">100K+</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-bold text-xl mb-2">การ์ตูน</h3>
            <p className="text-3xl font-bold text-primary">1,000+</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-pink-600" />
            <h3 className="font-bold text-xl mb-2">อัพเดท</h3>
            <p className="text-3xl font-bold text-primary">ทุกวัน</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            จุดเด่นของเรา
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>อ่านฟรี 100% ไม่มีค่าใช้จ่าย</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>อัพเดทเนื้อหาใหม่ทุกวัน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>รองรับ Dark Mode สำหรับการอ่านตอนกลางคืน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Responsive ใช้งานได้บนทุกอุปกรณ์</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>ระบบค้นหาและกรองที่ทรงพลัง</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

