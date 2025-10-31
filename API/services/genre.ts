import type { AxiosInstance } from 'axios'

import type { GenreListResponse } from '@/schemas'

import { apiRequest } from './api'

/**
 * Genre service
 */

export class GenreService {
  constructor(private client: AxiosInstance) {}

  /**
   * Get all genres
   * GET /genre
   */
  async list(): Promise<GenreListResponse> {
    return apiRequest<GenreListResponse>(this.client, {
      method: 'GET',
      url: '/genre',
    })
  }
}
