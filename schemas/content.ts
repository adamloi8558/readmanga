import { z } from 'zod'

import {
  apiResponseSchema,
  messageResponseSchema,
  paginatedResponseSchema,
  paginationRequestSchema,
} from './common'
import { episodeDetailSchema, episodeSchema } from './episode'
import { genreSchema } from './genre'

/**
 * Content schemas
 */

// Base content schema
export const contentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  shortDescription: z.string().nullable(),
  type: z.enum(['MANGA', 'NOVEL']),
  locale: z.string(),
  countryOrigin: z.string().nullable(),
  ageRating: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
  coverImage: z.string().nullable(),
  viewTotal: z.number(),
  ratingValue: z.coerce.number(),
  ratingTotal: z.number(),
  likeTotal: z.number(),
  bookmarkTotal: z.number(),
  completionStatus: z.enum(['ONGOING', 'COMPLETED', 'HIATUS', 'CANCELLED']),
  publishStatus: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  lastEpisodeAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  genres: z.array(genreSchema),
})

// Content with episodes (for detail endpoint)
export const contentDetailSchema = contentSchema.extend({
  episodes: z.array(episodeDetailSchema),
})

// Content with highlighted fields (for search)
export const contentSearchSchema = contentSchema.extend({
  highlightedName: z.string().optional(),
  highlightedShortDescription: z.string().optional(),
  highlightedDescription: z.string().optional(),
})

// GET /content request
export const contentListRequestSchema = paginationRequestSchema.extend({
  q: z.string().min(1).optional(),
  genre: z.string().optional(),
  sort: z
    .enum(['relevance', 'popularity', 'rating', 'recent', 'alphabetical'])
    .default('relevance'),
})

// GET /content response
export const contentListResponseSchema = paginatedResponseSchema(
  contentSearchSchema.extend({
    episodes: z.array(
      episodeSchema.pick({
        id: true,
        name: true,
        no: true,
        createdAt: true,
        updatedAt: true,
      })
    ),
  })
).extend({
  search: z
    .object({
      query: z.string(),
      totalResults: z.number(),
      searchTime: z.number(),
    })
    .optional(),
})

// GET /content/:slug response
export const contentDetailResponseSchema =
  apiResponseSchema(contentDetailSchema)

// GET /content/search/suggestions request
export const searchSuggestionsRequestSchema = z.object({
  q: z.string().min(2).max(100),
  limit: z.coerce.number().int().positive().max(20).default(10),
})

// GET /content/search/suggestions response
export const searchSuggestionsResponseSchema = z.object({
  data: z.array(z.string()),
  query: z.string(),
})

// POST /content/:slug/view request
export const contentViewRequestSchema = z.object({
  slug: z.string().min(1).max(255),
})

// POST /content/:slug/view response
export const contentViewResponseSchema = messageResponseSchema

// POST /content/:slug/star request
export const contentStarRequestSchema = z.object({
  slug: z.string().min(1).max(255),
})

// POST /content/:slug/star response
export const contentStarResponseSchema = messageResponseSchema

// POST /content/:slug/bookmark request
export const contentBookmarkRequestSchema = z.object({
  slug: z.string().min(1).max(255),
})

// POST /content/:slug/bookmark response
export const contentBookmarkResponseSchema = messageResponseSchema

// Types
export type Content = z.infer<typeof contentSchema>
export type ContentDetail = z.infer<typeof contentDetailSchema>
export type ContentSearch = z.infer<typeof contentSearchSchema>
export type ContentListRequest = z.infer<typeof contentListRequestSchema>
export type ContentListResponse = z.infer<typeof contentListResponseSchema>
export type ContentDetailResponse = z.infer<typeof contentDetailResponseSchema>
export type SearchSuggestionsRequest = z.infer<
  typeof searchSuggestionsRequestSchema
>
export type SearchSuggestionsResponse = z.infer<
  typeof searchSuggestionsResponseSchema
>
export type ContentViewRequest = z.infer<typeof contentViewRequestSchema>
export type ContentViewResponse = z.infer<typeof contentViewResponseSchema>
export type ContentStarRequest = z.infer<typeof contentStarRequestSchema>
export type ContentStarResponse = z.infer<typeof contentStarResponseSchema>
export type ContentBookmarkRequest = z.infer<
  typeof contentBookmarkRequestSchema
>
export type ContentBookmarkResponse = z.infer<
  typeof contentBookmarkResponseSchema
>
