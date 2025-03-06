FROM node:20-alpine as builder 

ENV NODE_ENV build 

WORKDIR /app 

COPY package.json package-lock.json ./

RUN npm install 

COPY ./ ./ /app/

RUN npm install -g prisma@5.17.0 
RUN prisma generate 

FROM node:20-alpine 
ENV NODE_ENV production 

WORKDIR /app 

