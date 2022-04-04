FROM node:14

WORKDIR /app
ADD . /app/

RUN yarn cache clean
RUN yarn

CMD ["yarn", "serve"]
