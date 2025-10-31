import { Hono } from 'hono'

import { logger } from '@/core/logger'
import configuration from '@/libs/configuration'
import type {
  ConfigErrorResponse,
  ConfigRefreshResponse,
  ConfigResponse,
} from '@/schemas'

export const configRoute = new Hono()

/**
 * GET /config
 * แสดง configuration ที่เป็น public เท่านั้น
 */
configRoute.get('/', async (c) => {
  try {
    const publicConfig = await configuration.get(true)

    const response: ConfigResponse = {
      success: true,
      data: publicConfig,
    }

    return c.json(response)
  } catch (error) {
    logger.error({ error }, 'Error getting public configuration')

    const errorResponse: ConfigErrorResponse = {
      success: false,
      error: 'Failed to get configuration',
    }

    return c.json(errorResponse, 500)
  }
})

/**
 * GET /config/refresh
 * Refresh configuration cache (admin only)
 */
configRoute.get('/refresh', async (c) => {
  try {
    await configuration.bootstrap()

    const response: ConfigRefreshResponse = {
      success: true,
      message: 'Configuration refreshed successfully',
    }

    return c.json(response)
  } catch (error) {
    logger.error({ error }, 'Error refreshing configuration')

    const errorResponse: ConfigErrorResponse = {
      success: false,
      error: 'Failed to refresh configuration',
    }

    return c.json(errorResponse, 500)
  }
})
