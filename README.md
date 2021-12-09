# react-inject-env

`react-inject-env` is a tool that allows you to inject your environment variables after building the static files, allowing you to deploy the same build to multiple environments quickly.

## Usage

[Sample project](./sample/v2/README.md)

### 1. Install react-inject-env

```
npm install react-inject-env --save-dev
yarn add react-inject-env --dev
```

### 2. Update Code

- Add the following to `index.html`

```html
<script src='/env.js'></script>
```

- Create a new file called `env.js` and copy the following code:

```js
export const env = { ...process.env, ...window['env'] }
```

- Replace all instances of `process.env` with the newly created `env` variable

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

### 3. Build your static files

If you are using `create-react-app`, the command should be `npm run build` or `react-scripts build`.

### 4. Inject environment variables

```
[env variables] npx react-inject-env set
```

Pass in all your environment variables.

```shell
# with a black background
REACT_APP_COLOR=black REACT_APP_MAIN_TEXT="Black Background" npx react-inject-env set

# with a blue background
REACT_APP_COLOR=blue REACT_APP_MAIN_TEXT="Blue Background" npx react-inject-env set

# for windows
set REACT_APP_COLOR=navy&& set REACT_APP_MAIN_TEXT=Navy Background&& npx react-inject-env set
```

### Additional options

`-d / --dir`: The location of your static build folder. Defaults to `./build`

`-n / --name`: The name of the env file that is outputted. Defaults to `env.js`

`-v / --var`: The variable name in `window` object that stores the environment variables. The default is `env` (window.**env**). However if you already have a variable called `window.env`, you may rename it to avoid conflicts.

## .env / dotenv

`.env` files are supported. `react-inject-env` will automatically detect environment variables in your `.env` file located in your root folder.

Note: Environment variables passed in through the command line will take precedence over `.env` variables.

## Typescript

In step #2, create a file called `env.ts` instead of `env.js`

```ts
declare global {
  interface Window {
    env: any
  }
}

// change with your own variables
type EnvType = {
  REACT_APP_COLOR: string,
  REACT_APP_MAIN_TEXT: string,
  REACT_APP_LINK_URL: string,
  REACT_APP_LOGO_URL: string
}
export const env: EnvType = { ...process.env, ...window.env }
```

## Docker / CICD

`npx-react-env` works well with both Docker and CI/CD. 

[Sample usage with Docker](./sample/v2/README.md#Docker)

```dockerfile
FROM node:16.10-slim
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT npx react-inject-env set && npx http-server build
```

```shell
docker build . -t react-inject-env-sample-v2

docker run -p 8080:8080 \                   
-e REACT_APP_COLOR=yellow \
-e REACT_APP_LOGO_URL=./logo512.png \
-e REACT_APP_MAIN_TEXT="docker text" \
-e REACT_APP_LINK_URL=https://docker.link \
react-inject-env-sample-v2
```

## Previous Version v1.0

For instructions on the previous version, you may follow the [v1.0 guide here](./docs/v1.md).

## Information

### Why do I need this?

A typical CI/CD process usually involves building a base image, followed by injecting variables and deploying it. 

Unfortunately React applications does not allow for this workflow as it requires environment variables to be present before building it. 

There have been a few workarounds, with the most common solution being to load environment variables from an external source. However this now causes the additional problem that environment variables can only be accessed asynchronously.

### Goals

`react-inject-env` attempts to solve this problem in the simplest, and most straightforward way with the following goals in mind:

1. Does not require a rebuild
2. Minimal code change required
3. Allows synchronous access of environment variables
4. Supports a wide amount of tools and scripts
5. Works with command line environment variables
6. Simple and straightforward

### Compatibility

`react-inject-env` was built with support for both `create-react-app` and `dotenv`. 

However due to the simplicity of it, it should work with almost all scripts and tools.
