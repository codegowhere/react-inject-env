# react-inject-env

`react-inject-env` is a tool that allows you to inject your environment variables after building the static files, allowing you to deploy the same build to multiple environments quickly.

## Usage

[Sample project](./sample/commandline/README.md)


### 1. Add the following script to index.html

```html
<script src='/env.js'></script>
```

### 2. Update Code

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
REACT_APP_COLOR=black REACT_APP_TEXT="Black Background" npx react-inject-env set

# with a blue background
REACT_APP_COLOR=blue REACT_APP_TEXT="Blue Background" npx react-inject-env set
```

### Additional options

`-d / --dir`: The location of your static build folder. Defaults to `./build`

`-n / --name`: The name of the env file that is outputted. Defaults to `env.js`

`-v / --var`: The variable name in `window` object that stores the environment variables. The default is `env` (window.**env**). However if you already have a variable called `window.env`, you may rename it to avoid conflicts.

## .env / dotenv

[Sample usage with .env](./sample/dotenv/README.md)

`.env` files are supported. `react-inject-env` will automatically detect environment variables in your `.env` file located in your root folder.

Note: Environment variables passed in through the command line will take precedence over `.env` variables.

## Docker / CICD

[Sample usage with Docker]()


## Sample Projects

1. [Sample project](./sample/v2/README.md)

# Information

## Why do I need this?

A typical CI/CD process usually involves building a base image, followed by injecting variables and deploying it. 

Unfortunately React applications does not allow for this workflow as it requires environment variables to be present before building it. 

There have been a few workarounds, with the most common solution being to load environment variables from an external source. However this now causes the additional problem that environment variables can only be accessed asynchronously.

## Goals

`react-inject-env` attempts to solve this problem in the simplest and most straightforward way with the following goals in mind:

1. Does not require a rebuild
2. Minimal code change required
3. Allows synchronous access of environment variables
4. Supports a wide amount of tools and scripts
5. Works with command line environment variables
6. Simple and straightforward

## Compatibility

`react-inject-env` was built with support for both `create-react-app` and `dotenv`. 

However due to the simplicity of it, it should work with almost all scripts and tools.
