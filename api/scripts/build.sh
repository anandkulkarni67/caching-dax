#!/bin/bash

artifact_version=$1

echo "build_script"

rm -rf *.zip

npm version $artifact_version --no-git-tag-version

cd api

rm -rf node_modules

rm -rf dist

npm version $artifact_version

npm install

npm run build

application_version=$(npm --loglevel silent run version)

zip -r "$application_version.zip" ./

echo "$(ls -l)"