# Building

## 1. Building a base image

`<env variables> npx react-inject-env build <your build script>`

Sample

```
REACT_APP_COLOR= REACT_APP_LOGO_URL= REACT_APP_MAIN_TEXT= REACT_APP_LINK_URL= npx react-inject-env build npm run build

# Formatted
REACT_APP_COLOR= \
REACT_APP_LOGO_URL= \
REACT_APP_MAIN_TEXT= \
REACT_APP_LINK_URL= \
npx react-inject-env build \
npm run build
```

## 2. Injecting env variables into your image

`<env variables> npx react-inject-env inject -d <build folder> -o <output folder>`

```
REACT_APP_COLOR=black REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png REACT_APP_MAIN_TEXT=react-inject-env REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env npx react-inject-env inject -d ./build -o ./build-black

# Formatted
REACT_APP_COLOR=black \
REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png \
REACT_APP_MAIN_TEXT=react-inject-env \
REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env \
npx react-inject-env inject -d ./build -o ./build-black
```

# Demo

You may run the following commands to test out this project:

```
# Build
REACT_APP_COLOR= REACT_APP_LOGO_URL= REACT_APP_MAIN_TEXT= REACT_APP_LINK_URL= npx react-inject-env build npm run build

# Inject
REACT_APP_COLOR=black REACT_APP_LOGO_URL=https://i.imgur.com/RAylUAO.png REACT_APP_MAIN_TEXT=react-inject-env REACT_APP_LINK_URL=https://www.npmjs.com/package/react-inject-env npx react-inject-env inject -d ./build -o ./build-black

# Serve
npx http-server build-black 
```

## Substituting variables

You may also substitute different environment variables during the `inject` step

```
REACT_APP_COLOR=blue REACT_APP_MAIN_TEXT='this has a blue background' npx react-inject-env inject -d ./build -o ./build-blue
```
