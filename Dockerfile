FROM node:20.13-alpine
WORKDIR /app
ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY ./public/books public/books/
COPY ./index.js ./
COPY ./src src/

CMD ["npm", "start"]