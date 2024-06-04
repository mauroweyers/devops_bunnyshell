FROM node:21-bookworm

WORKDIR /modules
COPY package.json .
RUN npm install --production=false
RUN npm install -g nodemon
ENV NODE_PATH=/modules/node_modules

WORKDIR /app
COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
