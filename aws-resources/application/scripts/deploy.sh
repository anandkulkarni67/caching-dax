#!/bin/bash

application_name=$(npm --loglevel silent run name)
template_file="./aws-resources/application/resources.yaml"
region="us-east-1" 

echo "Starting AWS CloudFormation stack creation/ updation for $application_name..."

aws cloudformation deploy \
    --stack-name "$application_name-application" \
    --template-file $template_file \
    --region "$region" \
    --parameter-overrides "ApplicationName=$application_name" \
    --capabilities CAPABILITY_AUTO_EXPAND

if [ $? -ne 0 ]; then
    echo "Failed to create/ update stack. Exiting."
    exit 1
fi