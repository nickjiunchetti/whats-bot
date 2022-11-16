# syntax=docker/dockerfile:1

FROM node:16-alpine

COPY ["package.json", "yarn.lock", "./"]

RUN yarn --prod

COPY . .

CMD ["node", "index.js" ]