FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf src

EXPOSE 3030

CMD ["npm", "start"]
