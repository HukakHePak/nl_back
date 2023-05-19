FROM node:16-slim
WORKDIR /app
COPY . .
RUN npm i --production
CMD ["node", "server/server.js"]

