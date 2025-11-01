/**
 * Image URL Helper
 * แปลง relative path จาก API เป็น absolute URL
 */

// Custom CDN Domain (ใช้ของตัวเองผ่าน Cloudflare Proxy)
const S3_BASE_URL = 'https://sbw.hydr4.me';

/**
 * แปลง image path เป็น absolute URL (โหลดตรงจาก CDN)
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  
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

