FROM node:latest
RUN mkdir -p /server
WORKDIR /server
COPY  . /server
EXPOSE 8080
RUN npm install
CMD npm run seedStart