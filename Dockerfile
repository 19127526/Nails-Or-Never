FROM bitnami/node:18.16.0-debian-11-r15

WORKDIR /

COPY package.json /

RUN npm install

RUN npm rebuild

RUN npm uninstall bcrypt

RUN npm i bcrypt

COPY . .

EXPOSE 3008

CMD [ "npm", "run", "start" ]