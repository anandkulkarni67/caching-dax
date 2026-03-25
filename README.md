# Optimistic locking implementation using version attribute on DynamoDB Database table.

## Change directory to API
```
cd api
```

## download and install dependencies
```
npm install
```

## Compiles the project
```
npm run build
```

## Compiles typescript project
```
npm run build
```

## Run the api locally
```
sam local start-api --template-file serverless.yaml

sample http request: http://127.0.0.1:3000/v1/greet
```

## GitHub integration
```
1. Go to the source code github repository.
2. Click on Settings.
3. Click on Environments on the side panel and create a 'production' environment.
4. Create three secret environment variables.
   AWS_REGION ( AWS region in which resources are deployed )
   AWS_ACCOUNT_ID ( ID of the AWS account where resources are deployed )
   OIDC_ROLE_NAME ( you can find this value in the output of 'security' cloudformation stack )
5. Create a standard environment variable.
   APPLICATION_NAME ( must be same as the one used when creating an 'application' stack. )
```

## AWS Resource creation
```
1. Go to github actions.
2. Click on Deploy a project.
3. Select following options:
  - Branch: main
  - Job: deploy-aws-resources
  - release: any one the available ones in the dropdown. 
```
