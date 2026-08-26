# Multi-stage: compile TypeScript, then ship only production dependencies.
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN npx prisma generate && npx tsc

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001

# Apply pending migrations before serving, so a fresh database works on first boot.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
