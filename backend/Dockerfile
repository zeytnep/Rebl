FROM node:16-slim

ARG PORT=8080

ENV PORT $PORT

RUN npm i npm@latest -g

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm","start"]