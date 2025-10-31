/**
 * Image URL Helper
 * แปลง relative path จาก API เป็น absolute URL
 */

// S3 CDN Base URL (จาก Hydra API)
const S3_BASE_URL = 'https://pub-d8a73e1c5c024e809e7bea7ea94333f4.r2.dev';

/**
 * แปลง image path เป็น absolute URL
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  
  // ถ้าเป็น absolute URL อยู่แล้ว
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // ถ้าเป็น relative path ให้ต่อ base URL
  // ลบ leading slash (ถ้ามี) เพราะ baseUrl มี trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${S3_BASE_URL}/${cleanPath}`;
}

/**
 * Fallback image URL
 */
export const FALLBACK_IMAGE = '/placeholder.png';

