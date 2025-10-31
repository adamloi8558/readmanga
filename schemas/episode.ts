import { z } from 'zod'

import { apiResponseSchema, messageResponseSchema } from './common'

/**
 * Episode schemas
 */

// Episode data schema (for manga)
export const episodeMangaDataSchema = z.object({
  images: z.array(z.string()),
})

// Episode data schema (for novel)
export const episodeNovelDataSchema = z.object({
  content: z.string(),
})

// Episode data union
export const episodeDataSchema = z.union([
  episodeMangaDataSchema,
  episodeNovelDataSchema,
])

// Base episode schema
export const episodeSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  no: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

// Episode with data
export const episodeDetailSchema = episodeSchema.extend({
  data: episodeDataSchema,
})

// Episode with content parent (for detail endpoint)
// Use lazy to avoid circular dependency
export const episodeWithContentSchema = episodeDetailSchema.extend({
  content: z.lazy(() => {
    // Import here to avoid circular dependency
    const { contentSchema } = require('./content')
    return contentSchema
  }),
})

// GET /content/:slug/:no request
export const episodeDetailRequestSchema = z.object({
  slug: z.string().min(1).max(255),
  no: z.coerce.number().positive(),
})

// GET /content/:slug/:no response
export const episodeDetailResponseSchema = apiResponseSchema(
  episodeWithContentSchema
)

// POST /content/:slug/:no/view request
export const episodeViewRequestSchema = z.object({
  slug: z.string().min(1).max(255),
  no: z.coerce.number().positive(),
})

// POST /content/:slug/:no/view response
export const episodeViewResponseSchema = messageResponseSchema

// Types
export type EpisodeMangaData = z.infer<typeof episodeMangaDataSchema>
export type EpisodeNovelData = z.infer<typeof episodeNovelDataSchema>
export type EpisodeData = z.infer<typeof episodeDataSchema>
export type Episode = z.infer<typeof episodeSchema>
export type EpisodeDetail = z.infer<typeof episodeDetailSchema>
export type EpisodeWithContent = z.infer<typeof episodeWithContentSchema>
export type EpisodeDetailRequest = z.infer<typeof episodeDetailRequestSchema>
export type EpisodeDetailResponse = z.infer<typeof episodeDetailResponseSchema>
export type EpisodeViewRequest = z.infer<typeof episodeViewRequestSchema>
export type EpisodeViewResponse = z.infer<typeof episodeViewResponseSchema>
