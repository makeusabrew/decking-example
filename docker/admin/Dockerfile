FROM dockerfile/nodejs

MAINTAINER Nick Payne <nick@kurai.co.uk>

ADD ./src/admin/package.json /app/src/admin/package.json
RUN cd /app/src/admin && npm install --production
ADD ./src/admin/index.js /app/src/admin/index.js

ENTRYPOINT ["node", "/app/src/admin"]
