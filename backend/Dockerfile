FROM node:18-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc --skipLibCheck --noEmitOnError false || true

EXPOSE 8080

CMD ["npm", "start"]
