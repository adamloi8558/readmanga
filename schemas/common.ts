import { z } from 'zod'

/**
 * Common schemas used across multiple endpoints
 */

// Pagination request schema
export const paginationRequestSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

// Pagination response schema
export const paginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
})

// Generic API response wrapper
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  })

// Generic API response with pagination
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    data: z.array(dataSchema),
    pagination: paginationResponseSchema,
  })

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string(),
})

// Message response schema
export const messageResponseSchema = z.object({
  message: z.string(),
})

// Types
export type PaginationRequest = z.infer<typeof paginationRequestSchema>
export type PaginationResponse = z.infer<typeof paginationResponseSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
export type MessageResponse = z.infer<typeof messageResponseSchema>
