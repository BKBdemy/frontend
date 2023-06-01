FROM node:20 AS builder

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM trafex/php-nginx:latest AS server

COPY --chown=nginx --from=builder . /var/www/html
COPY nginx.conf /etc/nginx/conf.d/server.conf
