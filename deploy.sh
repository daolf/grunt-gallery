#!/bin/bash
branch=$TRAVIS_BRANCH
echo "on branch $branch"
version=${branch##*/}
echo "version is $version"
echo "git tag $version"
git tag "$version"