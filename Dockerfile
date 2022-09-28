FROM node:fermium-slim

WORKDIR /go/src/github.com/cnosdb/docs
COPY . /go/src/github.com/cnosdb/docs

RUN  npm install

EXPOSE 8080

VOLUME /go/src/github.com/cnosdb/docs/docs

CMD npm run docs:dev
