import type { AxiosInstance } from 'axios'

import type { ConfigResponse } from '@/schemas'

import { apiRequest } from './api'

/**
 * Config service
 */

export class ConfigService {
  constructor(private client: AxiosInstance) {}

  /**
   * Get public configuration
   * GET /config
   */
  async get(): Promise<ConfigResponse> {
    return apiRequest<ConfigResponse>(this.client, {
      method: 'GET',
      url: '/config',
    })
  }
}
