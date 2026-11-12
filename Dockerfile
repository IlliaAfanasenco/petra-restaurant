# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

# ---- deps: install with the lockfile only (cached unless package.json / lockfile change)
FROM node:${NODE_VERSION}-alpine AS deps
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- builder: next build -> .next/standalone
FROM node:${NODE_VERSION}-alpine AS builder
RUN corepack enable
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Public origin used for metadataBase / Open Graph; pass with --build-arg
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- runner: minimal production image
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=10000
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
# standalone server + traced node_modules, then the assets it does not copy itself
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 10000
# server.js binds to HOSTNAME:PORT from the environment (Render injects PORT)
CMD ["node", "server.js"]
