FROM node:22.22.2-alpine AS build

WORKDIR /app

RUN npm install --global npm@11.11.0

COPY package.json package-lock.json ./
COPY client/package.json ./client/package.json
COPY shared/package.json ./shared/package.json

RUN npm ci --workspace=client

COPY shared/ shared/
COPY client/ client/

RUN npm run build --workspace=client


EXPOSE 3001

CMD ["npm", "run", "preview", "--workspace=client", "--", "--host", "0.0.0.0", "--port", "3001", "--strictPort"]