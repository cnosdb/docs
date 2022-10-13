FROM node:fermium-slim

WORKDIR /docs
COPY . /docs

RUN  npm install

EXPOSE 8080

VOLUME /docs/docs

CMD npm run docs:clean-dev
