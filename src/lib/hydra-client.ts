/**
 * Hydra API Client Instance
 * Server-side only - DO NOT use in client components
 */

import { HydraClient } from '@/services/hydra-client';

// Hydra API Configuration (Server-side only)
// ⚠️ ห้ามใช้ NEXT_PUBLIC_* เพราะจะถูกส่งไป client!
const API_URL = process.env.BACKEND_API_URL || 'https://v1.hydr4.me/v1';
const API_KEY = process.env.API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️ Warning: API_KEY is not set. Please set it in .env.local');
  console.warn('📖 How to get API Key: https://v1.hydr4.me/dashboard');
}

// Create Hydra Client (เวอร์ชันใหม่)
export const hydra = new HydraClient({
  baseURL: API_URL,
  apiKey: API_KEY,
  timeout: 30000,
});

// Export individual services for convenience
export const {
  content: contentService,
  episode: episodeService,
  genre: genreService,
  config: configService,
  sitemap: sitemapService,
} = hydra;

