
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3001
CMD [ "node", "dist/main.js" ]
