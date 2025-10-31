import type { AxiosInstance } from 'axios'

import type {
  ContentBookmarkResponse,
  ContentDetailResponse,
  ContentListRequest,
  ContentListResponse,
  ContentStarResponse,
  ContentStatsRequest,
  ContentStatsResponse,
  ContentViewResponse,
  SearchSuggestionsRequest,
  SearchSuggestionsResponse,
} from '@/schemas'

import { apiRequest } from './api'

/**
 * Content service
 */

export class ContentService {
  constructor(private client: AxiosInstance) {}

  /**
   * List/search content
   * GET /content
   */
  async list(params: ContentListRequest): Promise<ContentListResponse> {
    return apiRequest<ContentListResponse>(this.client, {
      method: 'GET',
      url: '/content',
      params,
    })
  }

  /**
   * Get content by slug
   * GET /content/:slug
   */
  async getBySlug(slug: string): Promise<ContentDetailResponse> {
    return apiRequest<ContentDetailResponse>(this.client, {
      method: 'GET',
      url: `/content/${slug}`,
    })
  }

  /**
   * Get search suggestions
   * GET /content/search/suggestions
   */
  async searchSuggestions(
    params: SearchSuggestionsRequest
  ): Promise<SearchSuggestionsResponse> {
    return apiRequest<SearchSuggestionsResponse>(this.client, {
      method: 'GET',
      url: '/content/search/suggestions',
      params,
    })
  }

  /**
   * Get content statistics
   * GET /content/stats
   */
  async stats(params: ContentStatsRequest): Promise<ContentStatsResponse> {
    return apiRequest<ContentStatsResponse>(this.client, {
      method: 'GET',
      url: '/content/stats',
      params,
    })
  }

  /**
   * Record content view
   * POST /content/:slug/view
   */
  async recordView(slug: string): Promise<ContentViewResponse> {
    return apiRequest<ContentViewResponse>(this.client, {
      method: 'POST',
      url: `/content/${slug}/view`,
    })
  }

  /**
   * Record content star
   * POST /content/:slug/star
   */
  async recordStar(slug: string, rating: number): Promise<ContentStarResponse> {
    return apiRequest<ContentStarResponse>(this.client, {
      method: 'POST',
      url: `/content/${slug}/star`,
      data: { rating },
    })
  }

  /**
   * Record content bookmark
   * POST /content/:slug/bookmark
   */
  async recordBookmark(slug: string): Promise<ContentBookmarkResponse> {
    return apiRequest<ContentBookmarkResponse>(this.client, {
      method: 'POST',
      url: `/content/${slug}/bookmark`,
    })
  }
}
