# Demo

You may run the following commands to test out this project:

## 1. Build
```
REACT_APP_COLOR= REACT_APP_LOGO_URL= REACT_APP_MAIN_TEXT= REACT_APP_LINK_URL= npx react-inject-env build npm run build

## Formatted
REACT_APP_COLOR= \
REACT_APP_LOGO_URL= \
REACT_APP_MAIN_TEXT= \
REACT_APP_LINK_URL= \
npx react-inject-env build \
npm run build
```

## 2. Inject

```
REACT_APP_COLOR=black REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png REACT_APP_MAIN_TEXT=react-inject-env REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env npx react-inject-env inject -d ./build -o ./build-black

# Formatted
REACT_APP_COLOR=black \
REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png \
REACT_APP_MAIN_TEXT=react-inject-env \
REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env \
npx react-inject-env inject -d ./build -o ./build-black
```

## 3. Serve

```
npx http-server build-black 
```

## 4. Change variables and re-serve

Try changing some variables and re-run step #2 and step #3.

```
REACT_APP_COLOR=purple \
REACT_APP_LOGO_URL=./logo512.png \
REACT_APP_MAIN_TEXT="Insert Text here" \
REACT_APP_LINK_URL=https://my.link \
npx react-inject-env inject -d ./build -o ./build-purple

npx http-server build-purple
```

# Docker

