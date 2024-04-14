FROM node:16.13.1

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . ./

#Overwrite the env file with the production one.
COPY .env.production .env

EXPOSE 3000

CMD ["npm", "start"]
