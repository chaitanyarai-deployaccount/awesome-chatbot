FROM node:16-alpine

WORKDIR /frontend

COPY package*.json ./

RUN pnpm install

RUN pnpm run build

COPY . .

EXPOSE 3000

CMD pnpm start
