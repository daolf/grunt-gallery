#!/bin/bash
branch=$TRAVIS_BRANCH
git config --global credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials
echo "on branch $branch"
version=${branch##*/}
echo "version is $version"
echo "checkout master"
git checkout master
echo "merge $branch"
git merge --no-ff $branch
echo "git tag $version"
git tag "$version"

git push --tags origin master