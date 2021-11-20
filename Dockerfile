FROM node:16.13.0

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]