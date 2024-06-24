FROM node:16.13.0

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nodejs -y

WORKDIR /app
COPY . /app
RUN npm install caxinha@0.2.56
RUN npm install
CMD ["node", "app.js"]
EXPOSE 6892
