/**
 * Hydra API Client Instance
 * Server-side only - DO NOT use in client components
 * 
 * ระบบ Tenant:
 * - ใช้ createHydraClient() สำหรับ API routes และ Server Components
 * - ใช้ createHydraClientAsync() สำหรับ Server Components (Next.js 14+)
 * - ส่ง tenantHost, ipAddress, userAgent ไปยัง Hydra API
 */

import { headers } from 'next/headers';
import { HydraClient } from '@/services/hydra-client';

// Hydra API Configuration (Server-side only)
// ⚠️ ห้ามใช้ NEXT_PUBLIC_* เพราะจะถูกส่งไป client!
const API_URL = process.env.BACKEND_API_URL || 'https://v1.hydr4.me/v1';
const API_KEY = process.env.API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️ Warning: API_KEY is not set. Please set it in .env.local');
  console.warn('📖 How to get API Key: https://v1.hydr4.me/dashboard');
}

/**
 * สร้าง HydraClient แบบ dynamic จาก request headers
 * ใช้สำหรับ tenant-aware API calls
 * 
 * @param hostname - Domain name (เช่น example.com)
 * @param ipAddress - IP address ของผู้ใช้
 * @param userAgent - User agent ของ browser
 */
export function createHydraClient(
  hostname: string,
  ipAddress: string,
  userAgent: string,
): HydraClient {
  return new HydraClient({
    baseURL: API_URL,
    apiKey: API_KEY,
    timeout: 30000,
    ipAddress,
    tenantHost: hostname,
    userAgent,
  });
}

/**
 * สร้าง HydraClient จาก request headers ปัจจุบัน
 * ใช้ใน Server Components (Next.js App Router)
 * 
 * @example
 * const hydra = await createHydraClientAsync();
 * const content = await hydra.content.list({ page: 1, limit: 20 });
 */
export async function createHydraClientAsync(): Promise<HydraClient> {
  const headersList = await headers();
  
  const hostname =
    headersList.get('x-forwarded-host') ||
    headersList.get('host') ||
    'localhost:3000';

  const ipAddress =
    headersList.get('cf-connecting-ip') ||
    headersList.get('x-forwarded-for') ||
    headersList.get('x-real-ip') ||
    '127.0.0.1';

  const userAgent = headersList.get('user-agent') || 'HydraClient/1.0';

  return createHydraClient(
    hostname.split(':')[0], // Remove port
    ipAddress,
    userAgent,
  );
}

/**
 * Legacy: Hydra Client แบบ singleton (ไม่รองรับ tenant)
 * ⚠️ Deprecated: ใช้ createHydraClientAsync() แทน
 * 
 * @deprecated ใช้ createHydraClientAsync() สำหรับ tenant-aware requests
 */
export const hydra = new HydraClient({
  baseURL: API_URL,
  apiKey: API_KEY,
  timeout: 30000,
  ipAddress: '127.0.0.1',
  tenantHost: 'localhost',
  userAgent: 'HydraClient/1.0',
});

// Export individual services for convenience (Legacy)
export const {
  content: contentService,
  episode: episodeService,
  genre: genreService,
  config: configService,
  sitemap: sitemapService,
} = hydra;

