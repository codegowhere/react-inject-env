# Testing

## Link module
    npm link

## Link module from another project
    npm link <package.json.name>

# npm

## Login / Logout

    npm login
    npm logout
    
## Profile
    
    npm profile get
    npm whoami

## Publishing

First Publish:

    npm publish --access public
    
Subsequent Publishes:

    npm publish

Publish only specific tag:

    npm publish --tag develop
    
## Unpublishing

    npm unpublish <package-name> -f
    npm unpublish <package-name>@<version>

## CI

https://stackoverflow.com/questions/54665511/how-do-i-publish-a-private-npm-package-with-gitlab-ci
