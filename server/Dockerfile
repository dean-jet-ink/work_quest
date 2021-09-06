FROM node:alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm i
COPY . .
ENV CHOKIDAR_USEPOLLING=1
CMD ["./node_modules/.bin/nodemon", "app"]
EXPOSE 4000