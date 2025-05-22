FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy over the source
COPY . .
RUN npm install && \
    npx prisma generate && \
    npm run build

FROM node:22-alpine AS prod

WORKDIR /usr/src/app

# Copy over build code
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json

# Copy over prisma client
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

# Copy over prisma migration information
COPY --from=builder /usr/src/app/prisma ./prisma

# Install production requirements
RUN npm install

# Expore the default port
EXPOSE 3001

CMD ["npm", "run", "start:prod"]
