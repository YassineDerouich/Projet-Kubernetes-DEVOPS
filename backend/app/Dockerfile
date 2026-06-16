FROM node:24-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM gcr.io/distroless/nodejs24-debian13


ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder --chown=nonroot:nonroot /usr/src/app /usr/src/app

EXPOSE 3000

CMD ["server.js"]
