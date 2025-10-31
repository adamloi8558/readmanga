import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

import { prisma } from '@/core/prisma'
import { canPerformAction, recordAction } from '@/libs/rate-limiter'
import { getS3Url, getS3Urls } from '@/libs/s3'
import {
  getSearchSuggestions,
  type SearchOptions,
  type SearchResult,
  searchContent,
} from '@/libs/search'
import { type ApiKeyContext, authMiddleware } from '@/middlewares/auth'
import { applyContentFilters } from '@/middlewares/content'
import type { StatsOrderBy, StatsWhereClause } from '@/types/stats'

export const contentRoute = new Hono<ApiKeyContext>()

contentRoute.use('/*', authMiddleware)

// List/search content
contentRoute.get(
  '/',
  zValidator(
    'query',
    z.object({
      q: z.string().min(1).optional(),
      genre: z.string().optional(),
      sort: z
        .enum(['relevance', 'popularity', 'rating', 'recent', 'alphabetical'])
        .default('relevance'),
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().max(100).default(20),
    })
  ),
  async (c) => {
    const { q, genre, sort, page, limit } = c.req.valid('query')
    const apiKey = c.get('apiKey')

    // ใช้ search utility ใหม่ - type ต้องอิงตาม apiKey เท่านั้น
    const searchOptions: SearchOptions = {
      query: q,
      type: apiKey.type || undefined, // type มาจาก apiKey เท่านั้น
      genre,
      locale: apiKey.locale || undefined,
      includeGenres: apiKey.includeGenres,
      excludeGenres: apiKey.excludeGenres,
      page,
      limit,
      sort,
    }

    const result = await searchContent(searchOptions)

    return c.json({
      data: result.data.map((row: SearchResult) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        shortDescription: row.shortDescription,
        type: row.type,
        locale: row.locale,
        countryOrigin: row.countryOrigin,
        ageRating: row.ageRating,
        thumbnailImage: getS3Url(row.thumbnailImage),
        coverImage: getS3Url(row.coverImage),
        viewTotal: row.viewTotal,
        ratingValue: row.ratingValue,
        ratingTotal: row.ratingTotal,
        likeTotal: row.likeTotal,
        bookmarkTotal: row.bookmarkTotal,
        completionStatus: row.completionStatus,
        publishStatus: row.publishStatus,
        lastEpisodeAt: row.lastEpisodeAt,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        // เพิ่ม highlighted fields ถ้ามีการค้นหา
        ...(q && {
          highlightedName: row.highlightedName,
          highlightedShortDescription: row.highlightedShortDescription,
          highlightedDescription: row.highlightedDescription,
        }),
        episodes:
          row.episodes?.map((episode) => ({
            id: episode.id,
            name: episode.name,
            no: episode.no,
            createdAt: episode.createdAt,
            updatedAt: episode.updatedAt,
          })) || [],
        genres:
          row.genres?.map((genre) => ({
            id: genre.id,
            name: genre.name,
            slug: genre.slug,
          })) || [],
      })),
      pagination: result.pagination,
      // เพิ่มข้อมูลการค้นหา
      ...(result.search && {
        search: result.search,
      }),
    })
  }
)

// Search suggestions endpoint
contentRoute.get(
  '/search/suggestions',
  zValidator(
    'query',
    z.object({
      q: z.string().min(2).max(100),
      limit: z.coerce.number().int().positive().max(20).default(10),
    })
  ),
  async (c) => {
    const { q, limit } = c.req.valid('query')

    const suggestions = await getSearchSuggestions(q, limit)

    return c.json({
      data: suggestions,
      query: q,
    })
  }
)

// Content stats endpoint
contentRoute.get(
  '/stats',
  zValidator(
    'query',
    z.object({
      sort: z
        .enum(['rating', 'like', 'dislike', 'bookmark', 'view'])
        .default('view'),
      genre: z.string().optional(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().positive().max(100).default(20),
    })
  ),
  async (c) => {
    const { sort, genre, startDate, endDate, page, limit } =
      c.req.valid('query')

    const skip = (page - 1) * limit
    const apiKey = c.get('apiKey')

    // Build base where clause
    const whereClause: StatsWhereClause = {
      deletedAt: null,
      publishStatus: 'PUBLISHED',
    }

    // Apply API Key filters
    if (apiKey.type) whereClause.type = apiKey.type
    if (apiKey.locale) whereClause.locale = apiKey.locale

    // Apply genre filter if specified
    if (genre) {
      whereClause.genres = {
        some: {
          genre: {
            slug: genre,
            deletedAt: null,
          },
          deletedAt: null,
        },
      }
    }

    // Apply API Key genre filters
    if (apiKey.includeGenres.length > 0) {
      whereClause.genres = {
        ...whereClause.genres,
        some: {
          genreId: { in: apiKey.includeGenres },
          deletedAt: null,
        },
      }
    }

    if (apiKey.excludeGenres.length > 0) {
      whereClause.genres = {
        ...whereClause.genres,
        none: {
          genreId: { in: apiKey.excludeGenres },
          deletedAt: null,
        },
      }
    }

    // Build order by clause
    let orderBy: StatsOrderBy = {}
    switch (sort) {
      case 'rating':
        orderBy = { ratingValue: 'desc' }
        break
      case 'like':
        orderBy = { likeTotal: 'desc' }
        break
      case 'dislike':
        orderBy = { dislikeTotal: 'desc' }
        break
      case 'bookmark':
        orderBy = { bookmarkTotal: 'desc' }
        break
      default:
        orderBy = { viewTotal: 'desc' }
        break
    }

    // Execute queries
    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where: whereClause,
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
          dislikeTotal: true,
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
        orderBy,
        skip,
        take: limit,
      }),
      prisma.content.count({
        where: whereClause,
      }),
    ])

    return c.json({
      data: content.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        shortDescription: item.shortDescription,
        type: item.type,
        locale: item.locale,
        countryOrigin: item.countryOrigin,
        ageRating: item.ageRating,
        thumbnailImage: getS3Url(item.thumbnailImage),
        coverImage: getS3Url(item.coverImage),
        viewTotal: item.viewTotal,
        ratingValue: item.ratingValue,
        ratingTotal: item.ratingTotal,
        likeTotal: item.likeTotal,
        dislikeTotal: item.dislikeTotal,
        bookmarkTotal: item.bookmarkTotal,
        completionStatus: item.completionStatus,
        publishStatus: item.publishStatus,
        lastEpisodeAt: item.lastEpisodeAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        genres: item.genres.map((g) => g.genre),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        sortBy: sort,
        genre: genre,
        dateRange: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    })
  }
)

// Get content by slug
contentRoute.get(
  '/:slug',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { slug } = c.req.valid('param')

    const whereClause = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const content = await prisma.content.findFirst({
      where: whereClause,
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
        episodes: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            name: true,
            no: true,
            data: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            no: 'asc',
          },
        },
      },
    })

    if (!content) {
      return c.json({ error: 'Content not found' }, 404)
    }

    const { genres, thumbnailImage, coverImage, episodes, ...item } = content

    return c.json({
      data: {
        ...item,
        thumbnailImage: getS3Url(thumbnailImage),
        coverImage: getS3Url(coverImage),
        episodes: episodes.map(({ data, ...e }) => ({
          ...e,
          data: data.images
            ? { images: getS3Urls(data.images) }
            : { content: data.content },
        })),
        genres: genres.map((g) => g.genre),
      },
    })
  }
)

// Record view
contentRoute.post(
  '/:slug/view',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { slug } = c.req.valid('param')
    const ip = c.var.realIP

    const whereClause = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const content = await prisma.content.findFirst({
      where: whereClause,
      select: { id: true },
    })

    if (!content) {
      return c.json({ error: 'Content not found' }, 404)
    }

    // Check rate limit
    if (!canPerformAction(content.id, ip, 'view')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }

    // Record action
    recordAction(content.id, ip, 'view')

    return c.json({ message: 'View recorded' })
  }
)

// Record star
contentRoute.post(
  '/:slug/star',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { slug } = c.req.valid('param')
    const ip = c.var.realIP

    const whereClause = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const content = await prisma.content.findFirst({
      where: whereClause,
      select: { id: true },
    })

    if (!content) {
      return c.json({ error: 'Content not found' }, 404)
    }

    // Check rate limit
    if (!canPerformAction(content.id, ip, 'star')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }

    // Record action
    recordAction(content.id, ip, 'star')

    return c.json({ message: 'Star recorded' })
  }
)

// Record bookmark
contentRoute.post(
  '/:slug/bookmark',
  zValidator(
    'param',
    z.object({
      slug: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { slug } = c.req.valid('param')
    const ip = c.var.realIP

    const whereClause = applyContentFilters(c, {
      slug,
      publishStatus: 'PUBLISHED',
      deletedAt: null,
    })

    const content = await prisma.content.findFirst({
      where: whereClause,
      select: { id: true },
    })

    if (!content) {
      return c.json({ error: 'Content not found' }, 404)
    }

    // Check rate limit
    if (!canPerformAction(content.id, ip, 'bookmark')) {
      return c.json({ error: 'Rate limit exceeded' }, 429)
    }

    // Record action
    recordAction(content.id, ip, 'bookmark')

    return c.json({ message: 'Bookmark recorded' })
  }
)
