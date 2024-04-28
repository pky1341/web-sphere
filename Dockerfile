FROM node:20
WORKDIR /app

RUN apk update && apk add --no-cache build-base

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "-p", "3000"]