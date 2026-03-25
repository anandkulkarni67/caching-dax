#!/bin/bash

application_name=$(npm --loglevel silent run name)
region="us-east-1" 

echo "Starting AWS CloudFormation stack deletion for $application_name..."

aws cloudformation delete-stack \
    --stack-name "$application_name-application" \
    --region "$region"

if [ $? -ne 0 ]; then
    echo "Failed to initiate stack creation. Exiting."
    exit 1
fi

echo "Deletion initiated. Waiting for stack to reach DELETE_COMPLETE status..."

aws cloudformation wait stack-delete-complete \
    --stack-name "$application_name-application" \
    --region "$region"

if [ $? -eq 0 ]; then
    echo "Stack $application_name is DELETE_COMPLETE. Proceeding to the next script."
else
    echo "Stack $application_name failed to delete or the wait command timed out."
    echo "Check the AWS CloudFormation console or use 'aws cloudformation describe-stack-events' for details."
    exit 1
fi