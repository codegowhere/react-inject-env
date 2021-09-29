FROM node:16.10-slim
COPY ../commandline/src /app
COPY ../commandline/package*.json /app
WORKDIR /app

RUN npm install
RUN npm install react-inject-env
RUN npm install http-server

RUN \
REACT_APP_COLOR= \
REACT_APP_LOGO_URL= \
REACT_APP_MAIN_TEXT= \
REACT_APP_LINK_URL= \
npx react-inject-env build npm run build

EXPOSE 8080

ENTRYPOINT \
REACT_APP_COLOR=$REACT_APP_COLOR \
REACT_APP_LOGO_URL=$REACT_APP_LOGO_URL \
REACT_APP_MAIN_TEXT=$REACT_APP_MAIN_TEXT \
REACT_APP_LINK_URL=$REACT_APP_LINK_URL \
npx react-inject-env inject -d ./build \
&& npx http-server build
