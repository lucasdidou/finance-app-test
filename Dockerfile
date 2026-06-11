# ---- Stage 1: Builder ----
FROM node:22-bookworm-slim AS builder

# Build tools required by better-sqlite3's node-gyp compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Standalone output does not include public/ or static assets automatically
RUN cp -r public .next/standalone/ \
 && cp -r .next/static .next/standalone/.next/

# ---- Stage 2: Runner ----
FROM node:22-bookworm-slim AS runner

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

WORKDIR /app

# Create data dir with correct ownership before switching to non-root user
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

COPY --from=builder --chown=nextjs:nodejs /build/.next/standalone ./

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
