FROM node:20.18.0-alpine
WORKDIR /

COPY public/ /public
COPY src/ /src
COPY package.json /package.json
COPY tailwind.config.js /tailwind.config.js

RUN npm install

CMD ["npm", "start"]
EXPOSE 3000