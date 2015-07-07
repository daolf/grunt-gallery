#!/bin/bash
branch="develop"
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