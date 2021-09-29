# Building

## 1. Building a base image

Ensure your have a base `.env` file in the root folder. `react-inject-env` will use this file to create placeholders variables.

```
npx react-inject-env build <your build script>

# Sample
npx react-inject-env build npm run build
```

## 2. Injecting env variables into your image

Ensure you have the correct `.env` file in the root folder. `react-inject-env` will use the variables from this file to inject them later on. 

```
npx react-inject-env inject -d <build folder> -o <output folder>`

# Sample
npx react-inject-env inject -d ./build -o ./build-black
```


## 3. Overriding .env variables from the command line

If an env variable is passed through the command line, it will overwrite variables in the `.env` file.

```
REACT_APP_COLOR=pink npx react-inject-env inject -d ./build -o ./build-black

// the app will now have a pink background
```

# Demo

You may run the following commands to test out this project:

```
# Build
npx react-inject-env build npm run build

# Inject
npx react-inject-env inject -d ./build -o ./build-black

# Serve
npx http-server build-black

# Inject & serve with pink background
REACT_APP_COLOR=pink npx react-inject-env inject -d ./build -o ./build-pink
npx http-server build-pink
```
