import type { AxiosInstance } from 'axios'

import type { EpisodeDetailResponse, EpisodeViewResponse } from '@/schemas'

import { apiRequest } from './api'

/**
 * Episode service
 */

export class EpisodeService {
  constructor(private client: AxiosInstance) {}

  /**
   * Get episode by slug and number
   * GET /content/:slug/:no
   */
  async getBySlugAndNo(
    slug: string,
    no: number
  ): Promise<EpisodeDetailResponse> {
    return apiRequest<EpisodeDetailResponse>(this.client, {
      method: 'GET',
      url: `/content/${slug}/${no}`,
    })
  }

  /**
   * Record episode view
   * POST /content/:slug/:no/view
   */
  async recordView(slug: string, no: number): Promise<EpisodeViewResponse> {
    return apiRequest<EpisodeViewResponse>(this.client, {
      method: 'POST',
      url: `/content/${slug}/${no}/view`,
    })
  }
}
