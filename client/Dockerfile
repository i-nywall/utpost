FROM node:22.22.2-alpine AS build

WORKDIR /app

RUN npm install --global npm@11.11.0

COPY package.json package-lock.json ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
COPY client/package.json ./client/package.json
COPY shared/package.json ./shared/package.json

RUN npm ci

COPY . .

RUN npm run build --workspace=client

FROM build AS preview

EXPOSE 4173

CMD ["npm", "run", "preview", "--workspace=client", "--", "--host", "0.0.0.0", "--port", "4173", "--strictPort"]