import Link from 'next/link';
import { BookOpen, Twitter, Facebook, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    เกี่ยวกับ: [
      { label: 'เกี่ยวกับเรา', href: '/about' },
      { label: 'ติดต่อเรา', href: '/contact' },
      { label: 'ข้อตกลงการใช้งาน', href: '/terms' },
      { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
    ],
    หมวดหมู่: [
      { label: 'การ์ตูนยอดนิยม', href: '/trending' },
      { label: 'การ์ตูนใหม่', href: '/?sort=recent' },
      { label: 'คะแนนสูงสุด', href: '/?sort=rating' },
      { label: 'ทั้งหมด', href: '/' },
    ],
    ช่วยเหลือ: [
      { label: 'วิธีใช้งาน', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'รายงานปัญหา', href: '/report' },
    ],
  };

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg group-hover:shadow-xl transition-all">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  อ่านมังงะ
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  อ่านการ์ตูนออนไลน์
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://twitter.com/hydra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/hydra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/hydra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentYear} © อ่านมังงะ. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                ข้อตกลงการใช้งาน
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link
                href="/dmca"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                DMCA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

