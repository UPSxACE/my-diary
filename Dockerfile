#You usually start with a base image
#Bullseye is a tag for lts
#Slim is a tag for images that have only the things needed for node and nothing more
FROM node:bullseye-slim

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

#ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]