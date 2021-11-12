# STAGE 1: Build
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn
RUN yarn run build

# STAGE 2: Run
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dma-front /usr/share/nginx/html