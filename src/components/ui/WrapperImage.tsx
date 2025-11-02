'use client';

/* eslint-disable @next/next/no-img-element */

interface WrapperImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * CDN Image wrapper - โหลดรูปจาก CDN โดยตรง
 * ใช้ native <img> tag สำหรับ performance ที่ดีกว่า
 */
export function WrapperImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  style,
  onLoad,
  onError,
}: WrapperImageProps) {
  // CDN Domain - ต้องใช้ custom domain นี้เท่านั้น (sv3.อ่านมังงะ.com)
  const CDN_URL = 'https://xn--72ca6c6a8cwaef1r.com';

  // Build CDN URL
  let imageSrc = src;

  // เพิ่ม CDN URL prefix ถ้ายังไม่ใช่ absolute URL
  if (!imageSrc.includes('://')) {
    imageSrc = `${CDN_URL}${imageSrc.startsWith('/') ? '' : '/'}${imageSrc}`;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      style={style}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

