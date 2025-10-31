import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { prisma } from '@/core/prisma'
import { canPerformAction, recordAction } from '@/libs/rate-limiter'
import { getS3Url, getS3Urls } from '@/libs/s3'
import { type ApiKeyContext, authMiddleware } from '@/middlewares/auth'
import { applyContentFilters } from '@/middlewares/content'

export const contentEpisodeRoute = new Hono<ApiKeyContext>()

contentEpisodeRoute.use('/*', authMiddleware)

// Get episode
contentEpisodeRoute.get(
  '/:slug/:no',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
      no: z.coerce.number().positive(),
    })
  ),
  async (c) => {
    const { slug, no } = c.req.valid('param')

    const contentWhere = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const episode = await prisma.contentEpisode.findFirst({
      where: {
        content: contentWhere,
        no,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        no: true,
        data: true,
        createdAt: true,
        updatedAt: true,
        content: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            shortDescription: true,
            type: true,
            locale: true,
            countryOrigin: true,
            ageRating: true,
            thumbnailImage: true,
            coverImage: true,
            viewTotal: true,
            ratingValue: true,
            ratingTotal: true,
            likeTotal: true,
            bookmarkTotal: true,
            completionStatus: true,
            publishStatus: true,
            lastEpisodeAt: true,
            createdAt: true,
            updatedAt: true,
            genres: {
              where: {
                deletedAt: null,
                genre: {
                  deletedAt: null,
                },
              },
              select: {
                genre: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
              orderBy: {
                genre: {
                  name: 'asc',
                },
              },
            },
          },
        },
      },
    })

    if (!episode) {
      return c.json({ error: 'Episode not found' }, 404)
    }

    const { content, data, ...item } = episode

    return c.json({
      data: {
        ...item,
        data: data.images
          ? { images: getS3Urls(data.images) }
          : { content: data.content },
        content: {
          ...content,
          thumbnailImage: getS3Url(content.thumbnailImage),
          coverImage: getS3Url(content.coverImage),
          genres: content.genres.map((g) => g.genre),
        },
      },
    })
  }
)

// Record episode view
contentEpisodeRoute.post(
  '/:slug/:no/view',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
      no: z.coerce.number().positive(),
    })
  ),
  async (c) => {
    const { slug, no } = c.req.valid('param')
    const ip = c.var.realIP

    const contentWhere = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const episode = await prisma.contentEpisode.findFirst({
      where: {
        content: contentWhere,
        no,
        deletedAt: null,
      },
      select: {
        id: true,
        contentId: true,
      },
    })

    if (!episode) {
      return c.json({ error: 'Episode not found' }, 404)
    }

    // Check rate limit for episode view
    const episodeKey = `${episode.contentId}:${no}`

    if (!canPerformAction(episodeKey, ip, 'view')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }

    // Record action and update episode viewCount
    recordAction(episodeKey, ip, 'view')

    await prisma.contentEpisode.update({
      where: { id: episode.id },
      data: { viewCount: { increment: 1 } },
    })

    return c.json({ message: 'Episode view recorded' })
  }
)
