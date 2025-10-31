import axios, { type AxiosInstance } from 'axios'

import { ConfigService } from './config'
import { ContentService } from './content'
import { EpisodeService } from './episode'
import { GenreService } from './genre'
import { SitemapService } from './sitemap'

export interface HydraClientConfig {
  baseURL: string
  apiKey: string
  timeout?: number
  ipAddress?: string
}

/**
 * Hydra Client
 * Client for content operations (config, genre, content, episode)
 * Requires API key authentication
 */
export class HydraClient {
  public readonly config: ConfigService
  public readonly genre: GenreService
  public readonly content: ContentService
  public readonly episode: EpisodeService
  public readonly sitemap: SitemapService
  public readonly apiKey: string

  private client: AxiosInstance

  constructor(config: HydraClientConfig) {
    const { baseURL, apiKey, timeout = 30000, ipAddress } = config

    this.apiKey = apiKey

    // Create axios instance
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-HYDRA-IP': ipAddress,
      },
    })

    // Initialize services
    this.config = new ConfigService(this.client)
    this.genre = new GenreService(this.client)
    this.content = new ContentService(this.client)
    this.episode = new EpisodeService(this.client)
    this.sitemap = new SitemapService(this.client)
  }
}
