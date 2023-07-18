FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY  . /app
EXPOSE 8080
RUN npm install
CMD npm start