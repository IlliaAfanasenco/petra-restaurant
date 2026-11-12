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
# Public origin used for metadataBase / canonical / Open Graph. Pages are prerendered during `next build`,
# so it must be available here (Render passes service env vars to Docker builds as build args).
# Empty / missing values are ignored by lib/site.ts. Not a secret.
ARG NEXT_PUBLIC_SITE_URL
ARG SITE_URL
ARG RENDER_EXTERNAL_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    SITE_URL=${SITE_URL} \
    RENDER_EXTERNAL_URL=${RENDER_EXTERNAL_URL}
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
