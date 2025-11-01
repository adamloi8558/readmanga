/**
 * Image URL Helper
 * แปลง relative path จาก API เป็น absolute URL
 * ใช้ NEXT_PUBLIC_CDN_URL จาก environment variable
 */

// CDN URL จาก environment variable (บังคับต้องตั้ง)
const S3_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

/**
 * แปลง image path เป็น absolute URL (โหลดตรงจาก CDN ผ่าน Cloudflare Proxy)
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  
  // ถ้าไม่ตั้ง CDN_URL ให้แสดง error
  if (!S3_BASE_URL) {
    console.error('⚠️ NEXT_PUBLIC_CDN_URL not set! Please set CDN URL in environment variables');
    return null;
  }
  
  // ถ้าเป็น absolute URL อยู่แล้ว
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // ถ้าเป็น relative path ให้ต่อ base URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${S3_BASE_URL}/${cleanPath}`;
}

/**
 * Fallback image URL
 */
export const FALLBACK_IMAGE = '/placeholder.png';

