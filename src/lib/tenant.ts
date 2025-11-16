/**
 * Tenant Utilities
 * ฟังก์ชันช่วยสำหรับระบบ Multi-tenant
 */

import { NextRequest } from 'next/server';

export interface TenantInfo {
  hostname: string;
  ipAddress: string;
  userAgent: string;
}

/**
 * ดึงข้อมูล tenant จาก Next.js Request (API Routes)
 * 
 * @param request - NextRequest object
 * @returns TenantInfo object
 * 
 * @example
 * // ใน API Route
 * export async function GET(request: NextRequest) {
 *   const tenant = getTenantInfo(request);
 *   const hydra = createHydraClient(tenant.hostname, tenant.ipAddress, tenant.userAgent);
 *   // ... use hydra client
 * }
 */
export function getTenantInfo(request: NextRequest): TenantInfo {
  const hostname =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    'localhost:3000';

  const ipAddress =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    '127.0.0.1';

  const userAgent = request.headers.get('user-agent') || 'HydraClient/1.0';

  return {
    hostname: hostname.split(':')[0], // Remove port
    ipAddress,
    userAgent,
  };
}

/**
 * ดึง IP address จาก headers (รองรับ Cloudflare, nginx, และอื่นๆ)
 * 
 * @param headers - Headers object
 * @returns IP address string
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0] ||
    headers.get('x-real-ip') ||
    headers.get('x-client-ip') ||
    '127.0.0.1'
  );
}

/**
 * ดึง hostname จาก headers
 * 
 * @param headers - Headers object
 * @returns hostname (without port)
 */
export function getHostname(headers: Headers): string {
  const hostname =
    headers.get('x-forwarded-host') ||
    headers.get('host') ||
    'localhost:3000';

  return hostname.split(':')[0];
}

