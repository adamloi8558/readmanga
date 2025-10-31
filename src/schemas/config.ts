import { z } from 'zod'

/**
 * Configuration schemas
 */

// S3 configuration
export const s3ConfigSchema = z.object({
  publicURL: z.array(z.string()).optional(),
})

// Full configuration schema
export const configSchema = z.object({
  s3: s3ConfigSchema,
})

// GET /config response
export const configResponseSchema = z.object({
  success: z.boolean(),
  data: configSchema,
})

// Error response for config
export const configErrorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
})

// Types
export type S3Config = z.infer<typeof s3ConfigSchema>
export type Config = z.infer<typeof configSchema>
export type ConfigResponse = z.infer<typeof configResponseSchema>
export type ConfigErrorResponse = z.infer<typeof configErrorResponseSchema>
