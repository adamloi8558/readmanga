# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments
ARG API_KEY
ARG BACKEND_API_URL
ARG SITE_URL
ARG NEXT_PUBLIC_CDN_URL

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV API_KEY=${API_KEY}
ENV BACKEND_API_URL=${BACKEND_API_URL}
ENV SITE_URL=${SITE_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}

# Build Next.js app
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Accept runtime arguments
ARG API_KEY
ARG BACKEND_API_URL
ARG SITE_URL
ARG NEXT_PUBLIC_CDN_URL

# Set runtime environment variables
ENV API_KEY=${API_KEY}
ENV BACKEND_API_URL=${BACKEND_API_URL}
ENV SITE_URL=${SITE_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app with standalone server
CMD ["node", "server.js"]

