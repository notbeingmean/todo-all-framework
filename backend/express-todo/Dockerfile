FROM node:20.6-alpine
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn prisma generate
CMD ["yarn", "start"]
