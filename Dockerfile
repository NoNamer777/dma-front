# STAGE 1: Build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package.lock ./
COPY . .
RUN npm ci
RUN npm run build

# STAGE 2: Run
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dma-front /usr/share/nginx/html
