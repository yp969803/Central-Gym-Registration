FROM node:alpine 

WORKDIR /usr/src/app

COPY package*.json ./      


RUN npm ci --omit=dev 

COPY . .   

CMD ["node", "index.js"]