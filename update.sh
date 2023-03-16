#!/bin/sh

git pull
npm install
npm run build
cp -r dist/* /var/www/html

echo "done"
exit 0
