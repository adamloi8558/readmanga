import type { AxiosInstance } from 'axios'

import type {
  ContentSitemapResponse,
  EpisodeSitemapResponse,
  SitemapRequest,
  SitemapSegmentResponse,
} from '@/schemas'

import { apiRequest } from './api'

/**
 * Sitemap service
 */

export class SitemapService {
  constructor(private client: AxiosInstance) {}

  /**
   * Get sitemap segment info
   * GET /sitemap/segment
   */
  async getSegment(params?: {
    limit?: number
  }): Promise<SitemapSegmentResponse> {
    return apiRequest<SitemapSegmentResponse>(this.client, {
      method: 'GET',
      url: '/sitemap/segment',
      params,
    })
  }

  /**
   * Get content sitemap
   * GET /sitemap/content
   */
  async getContent(params?: SitemapRequest): Promise<ContentSitemapResponse> {
    return apiRequest<ContentSitemapResponse>(this.client, {
      method: 'GET',
      url: '/sitemap/content',
      params,
    })
  }

  /**
   * Get episodes sitemap
   * GET /sitemap/episodes
   */
  async getEpisodes(params?: SitemapRequest): Promise<EpisodeSitemapResponse> {
    return apiRequest<EpisodeSitemapResponse>(this.client, {
      method: 'GET',
      url: '/sitemap/episodes',
      params,
    })
  }
}
