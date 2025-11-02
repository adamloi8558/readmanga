'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Eye, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { WrapperImage } from '@/components/ui/WrapperImage';
import { formatNumber, normalizeRating } from '@/lib/utils';
import type { Content } from '@/schemas';

interface HomeHeroProps {
  featuredContent?: Content[];
}

export function HomeHero({ featuredContent = [] }: HomeHeroProps) {
  // รวม Welcome slide + Featured content slides
  const totalSlides = 1 + featuredContent.length; // 1 slide ต้อนรับ + n slides การ์ตูน
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const isWelcomeSlide = currentIndex === 0;
  const currentContent = currentIndex > 0 ? featuredContent[currentIndex - 1] : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl h-[400px] md:h-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background - เปลี่ยนตาม slide */}
      <div className="absolute inset-0">
        {isWelcomeSlide ? (
          // Welcome slide - gradient เดิม (ห้ามแก้!)
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        ) : currentContent && (currentContent.coverImage || currentContent.thumbnailImage) ? (
          // Slide การ์ตูน - ใช้รูปปกของเรื่องนั้นๆ แบบ blur พื้นหลังดำ
          <>
            <WrapperImage
              key={`bg-${currentContent.slug}`}
              src={(currentContent.coverImage || currentContent.thumbnailImage)!}
              alt={`${currentContent.name} background`}
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        ) : null}
      </div>

      {/* Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-[150px_1fr] md:grid-cols-[280px_1fr] gap-4 md:gap-8 p-6 md:p-12 items-center">
        {isWelcomeSlide ? (
          // Welcome Slide - เต็มพื้นที่
          <div className="col-span-2 space-y-3 md:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 w-fit">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-300" />
              <span className="text-xs font-medium">แพลตฟอร์มอ่านการ์ตูน #1</span>
            </div>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              ยินดีต้อนรับสู่
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                อ่านมังงะ
              </span>
            </h1>

            <p className="text-sm md:text-xl lg:text-2xl text-blue-100">
              อ่านการ์ตูนและนิยายออนไลน์ฟรี อัพเดทตอนใหม่ทุกวัน
              พร้อมคอลเลกชั่นมากกว่า <strong className="text-white">1,000+</strong> เรื่อง
            </p>

            <div className="flex flex-wrap gap-3 md:gap-8">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white/20 p-1.5 md:p-2 backdrop-blur-sm text-lg md:text-xl">📚</div>
                <div>
                  <div className="font-bold text-sm md:text-xl">1,000+</div>
                  <div className="text-xs text-blue-200">การ์ตูน</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white/20 p-1.5 md:p-2 backdrop-blur-sm text-lg md:text-xl">🔥</div>
                <div>
                  <div className="font-bold text-sm md:text-xl whitespace-nowrap">อัพเดททุกวัน</div>
                  <div className="text-xs text-blue-200">ตอนใหม่</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white/20 p-1.5 md:p-2 backdrop-blur-sm text-lg md:text-xl">⭐</div>
                <div>
                  <div className="font-bold text-sm md:text-xl">ฟรี 100%</div>
                  <div className="text-xs text-blue-200">ไม่มีค่าใช้จ่าย</div>
                </div>
              </div>
            </div>
          </div>
        ) : currentContent && (
          // Featured Content Slide - แบบในภาพ
          <>
            {/* Left - Cover Image (แสดงทั้ง Mobile & Desktop) */}
            <div className="relative">
              <div className="relative aspect-[2/3] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl ring-2 md:ring-4 ring-white/10">
                {currentContent.thumbnailImage || currentContent.coverImage ? (
                  <WrapperImage
                    src={(currentContent.thumbnailImage || currentContent.coverImage)!}
                    alt={currentContent.name}
                    width={300}
                    height={450}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl">📚</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Content Info */}
            <Link href={`/manga/${currentContent.slug}`} className="flex flex-col justify-center space-y-2 md:space-y-5">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                <Badge className="bg-yellow-500/90 text-black font-bold px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
                  #{currentIndex} ยอดนิยม
                </Badge>
                {currentContent.genres.slice(0, 2).map((genre) => (
                  <Badge key={genre.id} className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs md:text-sm">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight line-clamp-2">
                {currentContent.name}
              </h2>

              {currentContent.shortDescription && (
                <div 
                  className="text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentContent.shortDescription }}
                />
              )}

              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2">
                  <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{normalizeRating(currentContent.ratingValue || 0).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 md:px-4 md:py-2">
                  <Eye className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold">{formatNumber(currentContent.viewTotal)}</span>
                </div>
                {/* Episodes count removed - not available in Content type */}
              </div>

              <div className="pt-1 md:pt-2">
                <span className="inline-flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-base shadow-xl transition-all">
                  <span>▶</span>
                  <span className="whitespace-nowrap">อ่านเลย</span>
                </span>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 backdrop-blur-sm p-2 md:p-3 text-white opacity-50 hover:opacity-100 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 backdrop-blur-sm p-2 md:p-3 text-white opacity-50 hover:opacity-100 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 md:w-12 bg-white'
                    : 'w-1.5 md:w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Decorative Circles */}
      {isWelcomeSlide && (
        <>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
        </>
      )}
    </div>
  );
}

