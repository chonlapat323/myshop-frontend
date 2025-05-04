# 1. Base image for dependency install
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only what's needed for deps install
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# 2. Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build project (includes .next folder)
RUN npm run build

# 3. Final image for runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
# Optional: if you have env file for prod
# COPY --from=builder /app/.env.production .env

EXPOSE 3000
CMD ["npm", "start"]
