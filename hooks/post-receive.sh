#!/bin/bash
TARGET="/home/www/trip-frontend"
GIT_DIR="/home/gitrepo/trip-frontend.git"
APP_NAME="trip-frontend"
BRANCH="master"

echo "post-receive: Triggered."
if [ ! -d "$TARGET" ]; then
  echo "mkdir $TARGET"
  mkdir -p $TARGET
fi
cd $TARGET

echo "post-receive: git check out..."
git --git-dir=$GIT_DIR  --work-tree=$TARGET checkout -f

echo "yarn install" \
&& yarn install \
&& echo "post-receive: building..." \
&& react-scripts build \
&& echo "post-receive: server start" \
&& (pm2 delete $APP_NAME || true ) \
&& pm2 start nginx --name $APP_NAME \
&& echo "post-receive: done."