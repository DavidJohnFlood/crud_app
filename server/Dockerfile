FROM node:latest
RUN mkdir -p /server
WORKDIR /server
COPY  . /server
EXPOSE 8080
RUN npm install
RUN npx knex migrate:rollback
RUN npx knex migrate:latest
RUN npx knex seed:run
CMD npm start