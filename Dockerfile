FROM node:16.13.0

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]