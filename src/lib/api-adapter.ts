/**
 * API Adapter
 * Adapts Hydra API responses to Next.js format with caching
 * 
 * ⚠️ IMPORTANT: ใช้ createHydraClientAsync() แทนการใช้ singleton hydra
 * เพื่อรองรับระบบ Multi-tenant
 */

import type {
  ContentListRequest,
  ContentListResponse,
  ContentDetailResponse,
  EpisodeDetailResponse,
  GenreListResponse,
} from '@/schemas';
import { createHydraClientAsync } from './hydra-client';

export class ApiAdapter {
  /**
   * Get content list with Next.js caching
   */
  async getContentList(params?: Partial<ContentListRequest>): Promise<ContentListResponse> {
    const defaultParams: ContentListRequest = {
      page: 1,
      limit: 20,
      sort: 'relevance',
    };
    
    const hydra = await createHydraClientAsync();
    return hydra.content.list({ ...defaultParams, ...params });
  }

  /**
   * Get content by slug with Next.js caching
   */
  async getContentBySlug(slug: string): Promise<ContentDetailResponse> {
    const hydra = await createHydraClientAsync();
    return hydra.content.getBySlug(slug);
  }

  /**
   * Get episode by slug and number
   */
  async getEpisode(slug: string, no: number): Promise<EpisodeDetailResponse> {
    const hydra = await createHydraClientAsync();
    return hydra.episode.getBySlugAndNo(slug, no);
  }

  /**
   * Get all genres
   */
  async getGenres(): Promise<GenreListResponse> {
    const hydra = await createHydraClientAsync();
    return hydra.genre.list();
  }

  /**
   * Record content view
   */
  async recordView(slug: string): Promise<void> {
    const hydra = await createHydraClientAsync();
    await hydra.content.recordView(slug);
  }

  /**
   * Record content star
   */
  async recordStar(slug: string, rating: number = 5): Promise<void> {
    const hydra = await createHydraClientAsync();
    await hydra.content.recordStar(slug, rating);
  }

  /**
   * Record content bookmark
   */
  async recordBookmark(slug: string): Promise<void> {
    const hydra = await createHydraClientAsync();
    await hydra.content.recordBookmark(slug);
  }

  /**
   * Record episode view
   */
  async recordEpisodeView(slug: string, no: number): Promise<void> {
    const hydra = await createHydraClientAsync();
    await hydra.episode.recordView(slug, no);
  }

  /**
   * Get search suggestions
   */
  async getSearchSuggestions(query: string, limit = 10) {
    const hydra = await createHydraClientAsync();
    return hydra.content.searchSuggestions({ q: query, limit });
  }
}

export const apiAdapter = new ApiAdapter();

