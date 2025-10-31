import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function getCompletionStatusText(status: string): string {
  switch (status) {
    case 'ONGOING':
      return 'กำลังดำเนินการ';
    case 'COMPLETED':
      return 'จบแล้ว';
    case 'HIATUS':
      return 'พักเบรก';
    case 'CANCELLED':
      return 'ยกเลิก';
    default:
      return status;
  }
}

export function getContentTypeText(type: string): string {
  switch (type) {
    case 'MANGA':
      return 'การ์ตูน';
    case 'NOVEL':
      return 'นิยาย';
    default:
      return type;
  }
}

/**
 * แปลง rating จาก API (0-100 หรือ 0-50) ให้เป็น scale 1-5
 */
export function normalizeRating(ratingValue: number | null | undefined): number {
  // Handle null/undefined
  if (!ratingValue || ratingValue === 0) {
    return 0;
  }

  const value = Number(ratingValue);
  
  // ถ้า rating อยู่ในช่วง 0-5 แล้ว ให้ใช้ตรงๆ
  if (value <= 5) {
    return value;
  }
  
  // ถ้า rating อยู่ในช่วง 6-50 (scale 10)
  if (value <= 50) {
    return Number((value / 10).toFixed(1));
  }
  
  // ถ้า rating อยู่ในช่วง 51-100 (scale 20)
  if (value <= 100) {
    return Number((value / 20).toFixed(1));
  }
  
  // fallback - คะแนนเกิน 100
  return Math.min(Number((value / 20).toFixed(1)), 5);
}
