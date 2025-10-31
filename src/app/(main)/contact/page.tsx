import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อทีมงาน Hydra - เรายินดีรับฟังความคิดเห็นและข้อเสนอแนะจากคุณ',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">ติดต่อเรา</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          เรายินดีรับฟังความคิดเห็นและข้อเสนอแนะจากคุณ
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-bold mb-2">อีเมล</h3>
            <a
              href="mailto:support@hydra.com"
              className="text-primary hover:underline"
            >
              support@hydra.com
            </a>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-bold mb-2">แชท</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              เร็วๆ นี้
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Send className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-bold mb-2">Discord</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              เร็วๆ นี้
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ส่งข้อความถึงเรา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p>ฟีเจอร์นี้กำลังพัฒนา</p>
            <p className="text-sm mt-2">กรุณาติดต่อผ่านอีเมลในระหว่างนี้</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

