import { z } from 'zod'

/**
 * Configuration schemas
 */

// S3 configuration
export const s3ConfigSchema = z.object({
  accessKeyId: z.string().optional(),
  bucketName: z.string().optional(),
  endPoint: z.string().optional(),
  region: z.string().optional(),
  publicURL: z.array(z.string()).optional(),
  secretAccessKey: z.string().optional(),
})

// Gemini configuration
export const geminiConfigSchema = z.object({
  apiKey: z.string().optional(),
})

// Full configuration schema
export const configSchema = z.object({
  s3: s3ConfigSchema.optional(),
  gemini: geminiConfigSchema.optional(),
})

// GET /config response
export const configResponseSchema = z.object({
  success: z.boolean(),
  data: configSchema,
})

// GET /config/refresh response
export const configRefreshResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

// Error response for config
export const configErrorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
})

// Types
export type S3Config = z.infer<typeof s3ConfigSchema>
export type GeminiConfig = z.infer<typeof geminiConfigSchema>
export type Config = z.infer<typeof configSchema>
export type ConfigResponse = z.infer<typeof configResponseSchema>
export type ConfigRefreshResponse = z.infer<typeof configRefreshResponseSchema>
export type ConfigErrorResponse = z.infer<typeof configErrorResponseSchema>
