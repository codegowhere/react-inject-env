# react-inject-env

`react-inject-env` is a tool that allows you to build your static webpage files first, then inject in the variables later on. This allows you to build the static webpage files once, but deploy it to multiple environments with different variables.

## Usage

`react-inject-env` requires 2 stages

1. Building with placeholder variables
2. Injecting the variables in

### build

```
react-inject-env build <your build script>
```

The first stage is building the static files with placeholder variables. `react-inject-env` will automatically detect variables from both the command line and from your `.env` file.

Upon successful building, you may open your files to check. You should see a placeholder variable with the prefix `ReactInjectEnv_` in place of your environment variables.


**Examples**

```shell
# if your build script is 'npm run build'
react-inject-env build npm run build

# if your build script is `react-scripts build`
react-inject-env build react-scripts-build

# if you wish to inject environment variables through the command line
REACT_APP_ENVVAR1=A REACT_APP_ENVVAR2=B react-inject-env build npm run build 
```

### inject

```
react-inject-env inject -d <path to /build folder> -o <output path>`
```

The second stage is injecting your environment variables into the static file. **react-inject-env** will automatically detect variables from both the command line and from your `.env` file.

Upon successful injection, the placeholder variables will be replaced with your environment variables.

**Example**

```shell
react-inject-env inject -d build -o build-dev

# if you wish to inject environment variables through the command line
REACT_APP_ENVVAR1=A REACT_APP_ENVVAR2=B react-inject-env inject -d build -o build-dev

# if you wish to overwrite the original files instead of outputting to a new folder, you may omit the -o command
react-inject-env inject -d build
```
