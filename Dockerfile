FROM node:23-alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install


EXPOSE 5173
EXPOSE 3000
EXPOSE 24678

CMD [ "npm", "run", "dev" ]
