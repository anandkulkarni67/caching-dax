#!/bin/bash

application_name=$(npm --loglevel silent run name)

artifact_version=$2

echo 'deploy-script'

cd api

aws lambda update-function-code --function-name "$application_name-api-lambda" --zip-file fileb://$artifact_version.zip

rm -rf $artifact_version.zip