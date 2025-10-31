import { z } from 'zod'

/**
 * Genre schemas
 */

// Genre data schema
export const genreSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})

// GET /genre response (no pagination)
export const genreListResponseSchema = z.object({
  data: z.array(genreSchema),
})

// Types
export type Genre = z.infer<typeof genreSchema>
export type GenreListResponse = z.infer<typeof genreListResponseSchema>
