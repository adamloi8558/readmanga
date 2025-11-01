/**
 * Image URL Helper
 * แปลง relative path จาก API เป็น absolute URL
 * ใช้ Custom Domain เท่านั้น ห้ามใช้ลิงก์อื่น
 */

// Custom CDN Domain - ต้องใช้ domain นี้เท่านั้น (sv3.อ่านมังงะ.com)
const S3_BASE_URL = 'https://sv3.xn--72ca6c8a8cwaef1r.com';

/**
 * แปลง image path เป็น absolute URL (โหลดตรงจาก CDN ผ่าน Cloudflare Proxy)
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

