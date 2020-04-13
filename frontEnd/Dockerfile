FROM node:lts-slim

RUN npm install -g @angular/cli

RUN mkdir -p /webProject/frontEnd
WORKDIR /webProject/frontEnd

COPY package*.json /webProject/frontEnd/

RUN npm install

COPY . /webProject/frontEnd/

EXPOSE 4200

CMD ["npm", "start"]
