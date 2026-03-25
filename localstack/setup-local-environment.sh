#!/bin/bash

localstack start -d

application_name=$(npm --loglevel silent run name)
stack_name="$application_name-storage"

awslocal cloudformation create-stack \
    --stack-name $stack_name \
    --template-body file://aws-resources/storage/resources.yaml \
    --parameters "ParameterKey=ApplicationName,ParameterValue=$application_name" \


awslocal cloudformation wait stack-create-complete \
    --stack-name $stack_name

if [ $? -eq 0 ]; then
    echo "Stack $stack_name is CREATE_COMPLETE."
else
    echo "Stack $stack_name failed to delete or the wait command timed out."
    echo "Check the AWS CloudFormation console or use 'aws cloudformation describe-stack-events' for details."
    exit 1
fi