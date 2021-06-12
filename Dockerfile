FROM node:latest

MAINTAINER Sneha Latha 

RUN echo "SE Project-Profile Builder"

COPY . /var/www

WORKDIR /var/www/Database

RUN npm install

EXPOSE 3001

ENTRYPOINT ["npm","start"]