FROM node:18-alpine

WORKDIR /

COPY package.json /

RUN npm install

RUN npm rebuild

RUN npm uninstall bcrypt

RUN npm i bcrypt

COPY . .

EXPOSE 3008

CMD [ "npm", "run", "start" ]