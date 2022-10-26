FROM node:fermium-slim

WORKDIR /docs
COPY . /docs

RUN  npm install

EXPOSE 8080

VOLUME /docs/docs

CMD npm config set registry https://registry.npmmirror.com/ && npm run docs:clean-dev
