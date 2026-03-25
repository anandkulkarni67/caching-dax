#!/bin/bash

github_username=$1
application_name=$(npm --loglevel silent run name)
template_file="./aws-resources/github-oidc/resources.yaml"
region="us-east-1"

echo "Starting AWS CloudFormation stack creation/ updation for $application_name..."

aws cloudformation deploy \
    --stack-name "$application_name-github-oidc" \
    --template-file $template_file \
    --region $region \
    --parameter-overrides "ApplicationName=$application_name" "GithubRepositoryName=$application_name" "GithubUserName=$github_username" \
    --capabilities CAPABILITY_NAMED_IAM

if [ $? -ne 0 ]; then
    echo "Failed to create/ update stack. Exiting."
    exit 1
fi