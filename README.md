# react-inject-env

`react-inject-env` is a tool that allows you to inject your environment variables after building the static files, allowing you to deploy the same build to multiple environments quickly.

## Usage

[Sample project](./sample/commandline/README.md)

### 1. Update Code

Create a new file called `env.js`, and place all your `process.env` variables here.

```js
export const env = {
    REACT_APP_COLOR: process.env.REACT_APP_COLOR,
    REACT_APP_LOGO_URL: process.env.REACT_APP_LOGO_URL,
    REACT_APP_MAIN_TEXT: process.env.REACT_APP_MAIN_TEXT,
    REACT_APP_LINK_URL: process.env.REACT_APP_LINK_URL
}
```

When referencing environment variables, import `env` and reference it from there instead. **Do not** access `process.env` directly from now on.

```jsx
import { env } from './env'

export const App = () => {
    return (
      <div style={{backgroundColor: env.REACT_APP_COLOR}}>
        <span>{env.REACT_APP_MAIN_TEXT}</span>
      </div>
    )
}
```

### 2. Build static files with placeholders

```
[env variable names] npx react-inject-env build [your build script]
```

Pass in all your environment variable names (the value does not matter), then run `npx react-inject-env build`, followed by your build script.

```shell
# if your build script is 'npm run build'
REACT_APP_COLOR= REACT_APP_TEXT= npx react-inject-env build npm run build

# if your build script is 'react-scripts build'
REACT_APP_COLOR= REACT_APP_TEXT= npx react-inject-env build react-scripts-build 
```

### 3. Inject environment variables

```
[env variables] react-inject-env inject -d [path to build folder] -o [new output path]
```

Pass in all your environment variables, followed by the path to your build folder in `Step #2`, and the new output path for the static files that will contain the injected environment variables.

```shell
# with a black background
REACT_APP_COLOR=black REACT_APP_TEXT="Black Background" npx react-inject-env inject -d build -o build-black

# with a blue background
REACT_APP_COLOR=blue REACT_APP_TEXT="Blue Background" npx react-inject-env inject -d build -o build-blue
```

## .env / dotenv

[Sample usage with .env](./sample/dotenv/README.md)

`.env` files are supported. `react-inject-env` will automatically detect environment variables in your `.env` file located in your root folder.

Note: Environment variables passed in through the command line will take precedence over `.env` variables.

## Docker / CICD

[Sample usage with Docker]()

```dockerfile
FROM node:16.10-slim
COPY . /app
WORKDIR /app

RUN npm install

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
```

Note: There is no need to use the `-o` parameter in Docker.

## Sample Projects

1. [Sample project](./sample/commandline/README.md)
2. [.env sample](./sample/dotenv/README.md)
3. [Docker sample](./sample/docker/README.md)

# How it works

`react-inject-env` works in two stages.

First, it detects environment variables and builds the static files with placeholders. For example, a variable name with the name `REACT_APP_COLOR` gets replaced with `ReactInjectEnv_REACT_APP_COLOR`.

In the second stage, `react-inject-env` searches for all placeholder occurances, then does a direct replacement with the new environment variable provided.

## Why do I need this?

A typical CI/CD process usually involves building a base image, followed by injecting variables and deploying it. 

Unfortunately React applications does not allow for this workflow as it requires environment variables to be present before building it. 

There have been a few workarounds, with the most common solution being to load environment variables from an external source. However this now causes the additional problem that environment variables can only be accessed asynchronously.

## Goals

`react-inject-env` attempts to solve this problem in the simplest and most straightforward way with the following in mind:

1. Does not require a rebuild
2. Minimal code change involved
3. Allows sync access of environment variables
4. Supports a wide amount of tools and scripts
5. Works with command line environment variables

## Compatibility

`react-inject-env` was built with support for both `create-react-app` and `dotenv`. 

However due to the simplicity of it, it should work with almost all scripts and tools.
