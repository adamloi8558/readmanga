'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RandomButtonProps {
  contentSlugs: string[];
}

export function RandomButton({ contentSlugs }: RandomButtonProps) {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRandom = () => {
    if (contentSlugs.length === 0) return;

    setIsSpinning(true);
    
    // Random slug
    const randomSlug = contentSlugs[Math.floor(Math.random() * contentSlugs.length)];
    
    // Delay เล็กน้อยเพื่อให้เห็น animation
    setTimeout(() => {
      router.push(`/manga/${randomSlug}`);
      setIsSpinning(false);
    }, 500);
  };

  return (
    <Button
      onClick={handleRandom}
      disabled={isSpinning}
      className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
    >
      <Shuffle className={cn('h-5 w-5', isSpinning && 'animate-spin')} />
      <span>สุ่มมังงะ</span>
    </Button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

