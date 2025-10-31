'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bookmark, TrendingUp, Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();

  const mainLinks = [
    { href: '/', label: 'หน้าแรก', icon: BookOpen },
    { href: '/trending', label: 'ยอดนิยม', icon: TrendingUp },
    { href: '/recommended', label: 'แนะนำ', icon: Sparkles },
    { href: '/bookmarks', label: 'บุ๊คมาร์ค', icon: Bookmark },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 backdrop-blur-xl dark:bg-gray-900/70 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <BookOpen className="h-7 w-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hydra
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1">
                อ่านการ์ตูนออนไลน์
              </span>
            </div>
          </Link>

          {/* Main Menu - Center (Desktop only) */}
          <div className="hidden md:flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
            {mainLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'group flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all duration-300',
                  pathname === href
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:scale-105'
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform",
                  pathname === href && "animate-pulse"
                )} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right - Search + Mobile Menu + Theme */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <Link
              href="/search"
              className={cn(
                'hidden md:flex items-center gap-2 rounded-xl px-2.5 py-2.5 font-medium transition-all duration-300',
                pathname === '/search'
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:scale-105'
              )}
            >
              <Search className="h-5 w-5" />
            </Link>
            
            <MobileMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

