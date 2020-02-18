#!/bin/sh
npm run build:production
rsync -azv ./build/* ubuntu@app.epicalls.com:/home/ubuntu/Sites/epicalls/epicalls_build/
