FROM node:18.16-alpine as development
WORKDIR /usr/src/fight_master_app
COPY package*.json ./
ENV NODE_ENV=development
RUN npm install glob rimraf
RUN npm install
COPY ./ ./
RUN npm run build
CMD ["node", "dist/main"]
