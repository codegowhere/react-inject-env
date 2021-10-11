FROM node:16.10-slim
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT npx react-inject-env set && npx http-server build
