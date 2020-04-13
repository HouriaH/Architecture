FROM node:lts-slim

RUN mkdir -p /webProject/backEnd
WORKDIR /webProject/backEnd

COPY package*.json /webProject/backEnd/

RUN npm install

COPY . /webProject/backEnd/

EXPOSE 3000

CMD ["npm", "start"]
