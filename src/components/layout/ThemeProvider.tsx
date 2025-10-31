'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // โหลด theme จาก localStorage
    const savedTheme = localStorage.getItem('theme') || 'system';
    
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    };

    const effectiveTheme = savedTheme === 'system' ? getSystemTheme() : savedTheme;
    
    // ตั้งค่า theme ทันที
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(effectiveTheme);
  }, []);

  // ป้องกัน hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

