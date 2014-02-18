FROM dockerfile/nodejs

MAINTAINER Nick Payne <nick@kurai.co.uk>

ADD ./src/api/package.json /app/src/api/package.json
RUN cd /app/src/api && npm install --production
ADD ./src/api/index.js /app/src/api/index.js

EXPOSE 7777

ENTRYPOINT ["node", "/app/src/api"]
