# Caching techniques using in-memory cache, dynamodb with generics and event emitters in Typescript.

## Run the api locally
```
cd api
npm install
npm run build

NPM:
npm run serve
sample http request: http://localhost:3000/api-docs
```

## AWS Resource creation and deletion on local machine
```
From the root directory,

Run following command to create aws resources.
./setup-local-environment.sh

Run following command to tead down aws resources.
./tear-down-local-environment.sh
```

# Note
```
Before starting the server, update CACHING_TECHNIQUE environment variable from the
.env file under api project to select the Caching Technique to be used when the application is running.
The selected caching technique should be displayed when follwoing http request is made:
http://localhost:3000/v1/healthcheck/app

Possible values for the CACHING_TECHNIQUE environment variable are:
CACHE_ASIDE
WRITE_THROUGH
READ_THROUGH
WRITE_BEHIND
```
