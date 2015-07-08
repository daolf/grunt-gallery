#!/bin/bash
echo "Running deployment script..."
 
CURRENT_COMMIT=`git rev-parse HEAD`
branch=$TRAVIS_BRANCH
version=${branch##*/}

# Change the branch used if applicable (e.g. gh-pages)
echo "Cloning master branch..."
 
# Hide output since we use an access token here
git clone -b master "https://${GH_TOKEN}@${GH_REF}" 


echo "Committing and pushing to GH"
 
git config user.name "Travis-CI"
git config user.email "travis@grunt-gallery.com"
 
git checkout master
git merge --no-ff $branch
echo "git tag $version"
# Commit changes, allowing empty changes (when unchanged)
git add -A .
git commit --allow-empty -m "Travis $TRAVIS_BUILD_NUMBER" || exit 1
 
# Push to branch
git push --tags origin master 
 
echo "Pushed deployment successfully"
exit 0