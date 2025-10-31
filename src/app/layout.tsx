import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const notoSansThai = Noto_Sans_Thai({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Hydra - อ่านการ์ตูนและนิยายออนไลน์ฟรี",
    template: "%s | Hydra",
  },
  description: "แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน พร้อมการ์ตูนยอดนิยมมากมาย",
  keywords: ['การ์ตูน', 'นิยาย', 'manga', 'novel', 'อ่านการ์ตูน', 'อ่านนิยาย', 'การ์ตูนออนไลน์'],
  authors: [{ name: 'Hydra Team' }],
  creator: 'Hydra',
  publisher: 'Hydra',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: '/',
    title: 'Hydra - อ่านการ์ตูนและนิยายออนไลน์ฟรี',
    description: 'แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน',
    siteName: 'Hydra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydra - อ่านการ์ตูนและนิยายออนไลน์ฟรี',
    description: 'แพลตฟอร์มอ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน',
    creator: '@hydra',
  },
  verification: {
    google: 'google-verification-code', // เปลี่ยนเป็นของจริง
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={notoSansThai.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

