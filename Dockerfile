FROM node:20.5.0-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /frontend

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
