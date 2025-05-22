FROM node:22-alpine AS builder

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

FROM registry.access.redhat.com/ubi7/nginx-120

COPY --from=builder /usr/src/app/dist .

ADD ./nginx.conf "${NGINX_CONF_PATH}"

CMD nginx -g "daemon off;"
