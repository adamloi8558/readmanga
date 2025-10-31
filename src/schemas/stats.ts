import { z } from 'zod'

import { paginatedResponseSchema, paginationRequestSchema } from './common'
import { contentSchema } from './content'
import { episodeSchema } from './episode'

/**
 * Content statistics schemas
 */

// GET /content/stats request
export const contentStatsRequestSchema = paginationRequestSchema.extend({
  sort: z
    .enum(['rating', 'like', 'dislike', 'bookmark', 'view'])
    .default('view'),
  genre: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

// Content with dislike total and episodes (stats specific)
export const contentStatsSchema = contentSchema.extend({
  dislikeTotal: z.number(),
  episodes: z.array(
    episodeSchema.pick({
      no: true,
      name: true,
      createdAt: true,
    })
  ),
})

// GET /content/stats response
export const contentStatsResponseSchema = paginatedResponseSchema(
  contentStatsSchema
).extend({
  stats: z.object({
    sortBy: z.enum(['rating', 'like', 'dislike', 'bookmark', 'view']),
    genre: z.string().optional(),
    dateRange: z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    }),
  }),
})

// Types
export type ContentStatsRequest = z.infer<typeof contentStatsRequestSchema>
export type ContentStats = z.infer<typeof contentStatsSchema>
export type ContentStatsResponse = z.infer<typeof contentStatsResponseSchema>
