FROM node:22-alpine

WORKDIR /usr/src/app

# Copy over the source
COPY . .
RUN npm install && \
    npx prisma generate && \
    npm run build

# Expore the default port
EXPOSE 3001

CMD ["npm", "run", "start:prod"]
