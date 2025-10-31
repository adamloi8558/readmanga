import { z } from 'zod'
import { paginationResponseSchema } from './common'

/**
 * Sitemap schemas
 */

// Sitemap request schema
export const sitemapRequestSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(500).default(500),
})

// Content sitemap item schema
export const contentSitemapItemSchema = z.object({
  name: z.string(),
  slug: z.string(),
  thumbnail: z.string(),
  lastEpisodeAt: z.string().nullable(),
  changefreq: z.literal('weekly'),
  priority: z.number(),
})

// Episode sitemap item schema
export const episodeSitemapItemSchema = z.object({
  name: z.string().nullable(),
  slug: z.string(),
  no: z.string(),
  publishedAt: z.string().nullable(),
  changefreq: z.literal('never'),
  priority: z.number(),
})

// Content sitemap response schema
export const contentSitemapResponseSchema = z.object({
  data: z.array(contentSitemapItemSchema),
  pagination: paginationResponseSchema,
})

// Episode sitemap response schema
export const episodeSitemapResponseSchema = z.object({
  data: z.array(episodeSitemapItemSchema),
  pagination: paginationResponseSchema,
})

// Sitemap segment info schema
export const sitemapSegmentInfoSchema = z.object({
  total: z.number(),
  limit: z.number(),
  segments: z.number(),
})

// Sitemap segment response schema
export const sitemapSegmentResponseSchema = z.object({
  data: z.object({
    content: sitemapSegmentInfoSchema,
    episodes: sitemapSegmentInfoSchema,
  }),
})

// Types
export type SitemapRequest = z.infer<typeof sitemapRequestSchema>
export type ContentSitemapItem = z.infer<typeof contentSitemapItemSchema>
export type EpisodeSitemapItem = z.infer<typeof episodeSitemapItemSchema>
export type ContentSitemapResponse = z.infer<
  typeof contentSitemapResponseSchema
>
export type EpisodeSitemapResponse = z.infer<
  typeof episodeSitemapResponseSchema
>
export type SitemapSegmentInfo = z.infer<typeof sitemapSegmentInfoSchema>
export type SitemapSegmentResponse = z.infer<
  typeof sitemapSegmentResponseSchema
>
