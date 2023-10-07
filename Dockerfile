FROM node:20-slim AS builder

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080
