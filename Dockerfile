# syntax=docker/dockerfile:1

FROM node:lts-alpine3.10 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install yarn && yarn

COPY . .

RUN yarn run build

EXPOSE 3000
CMD ["npm", "run", "start"]

FROM golang:1.16.4-alpine3.13 As sgi

WORKDIR /usr/src/servegla2h

COPY . .

RUN go get -u

EXPOSE 3300
CMD ["go", "run", "servegla2h.go"]