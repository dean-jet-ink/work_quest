FROM node:16.13.2-alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm i
RUN ls
COPY . .
ENV CHOKIDAR_USEPOLLING=1
CMD sh -c "npm run start"
EXPOSE 4000