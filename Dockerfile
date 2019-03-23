FROM node:10

EXPOSE 3000

WORKDIR /app

ADD ./package.json /app/package.json

RUN npm install --unsafe-perm=true

ADD . /app

CMD npm start