FROM node:16-alpine

WORKDIR /

COPY package.json /

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start" ]
