FROM dockerfile/nodejs

MAINTAINER Nick Payne <nick@kurai.co.uk>

ADD ./src/web/package.json /app/src/web/package.json
RUN cd /app/src/web && npm install --production
ADD ./src/web/index.js /app/src/web/index.js

ENTRYPOINT ["node", "/app/src/web"]
