FROM node:alpine
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn prisma generate
RUN yarn prisma migrate dev --name init
CMD ["yarn", "start"]
