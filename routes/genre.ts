import { Hono } from 'hono'

import { prisma } from '@/core/prisma'
import { type ApiKeyContext, authMiddleware } from '@/middlewares/auth'

export const genreRoute = new Hono<ApiKeyContext>()

genreRoute.use('/*', authMiddleware)

genreRoute.get('/', async (c) => {
  const data = await prisma.genre.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })

  return c.json({ data })
})
