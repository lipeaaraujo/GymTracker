FROM node:20.18.0-alpine

WORKDIR /
COPY src/ /src
COPY package.json /package.json

RUN npm install

CMD ["npm", "start"]
EXPOSE 4000