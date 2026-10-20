FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY api/package.json ./api/package.json
COPY shared/package.json ./shared/package.json

RUN npm ci --workspace=api --omit=dev

COPY shared/ ./shared/
COPY api/ ./api/

WORKDIR /app/api

EXPOSE 4000

CMD ["node", "src/index.js"]