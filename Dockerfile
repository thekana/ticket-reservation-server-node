FROM node:14.14.0-alpine3.12

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 9092

CMD ["npm", "start"]
