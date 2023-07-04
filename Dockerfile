FROM bitnami/node:18.16.0-debian-11-r15

WORKDIR /

COPY package.json /

RUN npm install

COPY . .

EXPOSE 3008

RUN npm install

CMD [ "npm", "run", "start" ]