# Step 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# Step 2: Build the project
FROM node:20-alpine AS builder
WORKDIR /app

# ✅ Copy all files INCLUDING next.config.js
COPY . .

# ✅ Ensure deps are in
COPY --from=deps /app/node_modules ./node_modules

# ✅ Build
RUN npm run build

# Step 3: Final image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# ✅ Copy only what's needed
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "start"]
