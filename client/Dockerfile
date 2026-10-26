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


FROM nginx:alpine AS runtime

COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]