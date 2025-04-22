# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build
RUN pnpm build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy only the necessary files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/packages/*/dist ./packages/*/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set production environment
ENV NODE_ENV=production
EXPOSE 3008

CMD ["node", "dist/index.js"] 