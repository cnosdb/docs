FROM node:fermium-slim

WORKDIR /docs
COPY . /docs

RUN  npm config set registry https://registry.npmmirror.com/ &&  npm install

EXPOSE 8080

VOLUME /docs/docs

CMD npm run docs:clean-dev
