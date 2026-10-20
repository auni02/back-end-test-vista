# Base image: Debian slim + Node 22 LTS
FROM node:22-slim

# Prisma's query engine needs OpenSSL, which the slim image doesn't include
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifests and the Prisma schema first so the `npm ci` layer is cached.
# The schema must be here before `npm ci`, because the postinstall script runs `prisma generate`.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Copy the source and compile TypeScript → dist/
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

EXPOSE 3000

# Apply pending migrations, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && exec node dist/index.js"]
