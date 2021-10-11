# Demo

You may run the following commands to test out this project:

## 1. Build Docker image

```
docker build . -t react-inject-env-sample
```

## 2. Run Docker container

```
docker run -p 8080:8080 -e REACT_APP_COLOR=black -e REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png -e REACT_APP_MAIN_TEXT="react-inject-env (docker)" -e REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env react-inject-env-sample

# Formatted
docker run -p 8080:8080 \
-e REACT_APP_COLOR=black \
-e REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png \
-e REACT_APP_MAIN_TEXT="react-inject-env (docker)" \
-e REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env react-inject-env-sample
```

## 3. Try changing environment variables and re-running

```
docker run -p 8080:8080 -e REACT_APP_COLOR=purple -e REACT_APP_LOGO_URL=./logo512.png -e REACT_APP_MAIN_TEXT="My own text" -e REACT_APP_LINK_URL=https://my.link react-inject-env-sample

# Formatted
docker run -p 8080:8080 \
-e REACT_APP_COLOR=purple \
-e REACT_APP_LOGO_URL=./logo512.png \
-e REACT_APP_MAIN_TEXT="My own text" \
-e REACT_APP_LINK_URL=https://my.link react-inject-env-sample
```
