# Demo

You may run the following commands to test out this project:

## 1. Build
```
npm run build
```

## 2. Set Environment Variables

```
REACT_APP_COLOR=navy REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png REACT_APP_MAIN_TEXT=react-inject-env REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env npx react-inject-env set

# Formatted
REACT_APP_COLOR=navy \
REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png \
REACT_APP_MAIN_TEXT=react-inject-env \
REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env \
npx react-inject-env set

# Windows
set REACT_APP_COLOR=navy&& set REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png&& set REACT_APP_MAIN_TEXT=react-inject-env&& set REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env&& npx react-inject-env set
```

## 3. Serve

```
npx http-server build 
```

## 4. Usage with dotenv

You may also use variables from dotenv. Create a `.env` file at `sample/v2/.env` and paste the following variables:

```
REACT_APP_COLOR = black
REACT_APP_LOGO_URL = https://c.tenor.com/tIgmDpBGuKQAAAAd/kim-petras-i-love-you.gif
REACT_APP_MAIN_TEXT = Text from .env
REACT_APP_LINK_URL = https://my.link
```

Then run the following command:

```
npx react-inject-env set && npx http-server build
```

Note: Environment variables passed from the command line will always overwrite `.env` variables

# Docker

Build the Docker image

```
docker build . -t react-inject-env-sample-v2
```

Run with environment variables

```
docker run -p 8080:8080 \                   
-e REACT_APP_COLOR=yellow \
-e REACT_APP_LOGO_URL=./logo512.png \
-e REACT_APP_MAIN_TEXT="docker text" \
-e REACT_APP_LINK_URL=https://docker.link \
react-inject-env-sample-v2
```

You may also SSH directly into the Docker container to modify the `.env` file.
