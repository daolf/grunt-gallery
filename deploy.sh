#!/bin/bash
echo "Running deployment script..."
 
CURRENT_COMMIT=`git rev-parse HEAD`
branch=$TRAVIS_BRANCH
version=${branch##*/}

# Change the branch used if applicable (e.g. gh-pages)
echo "Cloning master branch..."
 
# Hide output since we use an access token here
git clone "https://${GH_TOKEN}@github.com/daolf/grunt-gallery.git" ../goodDepot > /dev/null 2>&1 || exit 1
cd ../goodDepot
echo "Committing and pushing to GH"
git config user.name "daolf"
git config user.email "pierredewulf31@gmail.com"
echo "git checkout $branch"
git checkout $branch
echo "git checkout master"
git checkout master
echo "git merge --no-ff $branch"
git merge --no-ff --no-edit $branch
echo "git tag $version"
git tag $version
# Commit changes, allowing empty changes (when unchanged)
git add -A .
git commit --allow-empty -m "Travis $TRAVIS_BUILD_NUMBER" || exit 1
 
 echo 'show repo'
 git remote show origin
# Push to branch
git push --tags origin master > /dev/null 
 
echo "Pushed deployment successfully"
exit 0