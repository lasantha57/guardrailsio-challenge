FROM node:latest

WORKDIR /dashboard

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
