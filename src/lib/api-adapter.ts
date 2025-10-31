/**
 * API Adapter
 * Adapts Hydra API responses to Next.js format with caching
 */

import type {
  ContentListRequest,
  ContentListResponse,
  ContentDetailResponse,
  EpisodeDetailResponse,
  GenreListResponse,
} from '@/schemas';
import { hydra } from './hydra-client';

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
    
    return hydra.content.list({ ...defaultParams, ...params });
  }

  /**
   * Get content by slug with Next.js caching
   */
  async getContentBySlug(slug: string): Promise<ContentDetailResponse> {
    return hydra.content.getBySlug(slug);
  }

  /**
   * Get episode by slug and number
   */
  async getEpisode(slug: string, no: number): Promise<EpisodeDetailResponse> {
    return hydra.episode.getBySlugAndNo(slug, no);
  }

  /**
   * Get all genres
   */
  async getGenres(): Promise<GenreListResponse> {
    return hydra.genre.list();
  }

  /**
   * Record content view
   */
  async recordView(slug: string): Promise<void> {
    await hydra.content.recordView(slug);
  }

  /**
   * Record content star
   */
  async recordStar(slug: string, rating: number = 5): Promise<void> {
    await hydra.content.recordStar(slug, rating);
  }

  /**
   * Record content bookmark
   */
  async recordBookmark(slug: string): Promise<void> {
    await hydra.content.recordBookmark(slug);
  }

  /**
   * Record episode view
   */
  async recordEpisodeView(slug: string, no: number): Promise<void> {
    await hydra.episode.recordView(slug, no);
  }

  /**
   * Get search suggestions
   */
  async getSearchSuggestions(query: string, limit = 10) {
    return hydra.content.searchSuggestions({ q: query, limit });
  }
}

export const apiAdapter = new ApiAdapter();

