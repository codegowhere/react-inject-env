# Demo

You may run the following commands to test out this project:

## 1. Build
```
npx react-inject-env build npm run build
```

## 2. Inject

```
npx react-inject-env inject -d ./build -o ./build-black
```

## 3. Serve

```
npx http-server build-black 
```

## 4. Change variables and re-serve

Try editing the `.env` file in the root folder and steps #2 and steps #3


_.env_
```
REACT_APP_COLOR = purple
REACT_APP_LOGO_URL =./logo512.png
REACT_APP_MAIN_TEXT = Insert Text here
REACT_APP_LINK_URL = https://my.link
```

```
npx react-inject-env inject -d ./build -o ./build-purple
```

## 5. Overwriting variables from command line

If an env variable is passed through the command line, it will overwrite variables in the `.env` file.

```
REACT_APP_COLOR=pink npx react-inject-env inject -d ./build -o ./build-pink

// the app will now have a pink background
npx http-server build-pink
```
