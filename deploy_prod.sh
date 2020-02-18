#!/bin/sh
npx rimraf build && npx webpack \
--env.NODE_ENV=production \
--env.STRIPE_API_KEY=pk_live_TwC7Gkv2Eyp1kA9yDGIzeNge \
--env.API_URL=https://api.epicalls.com \
--env.AWS_S3_BUCKET=epicalls-production-recordings \
--progress \
--profile \
--colors
aws s3 sync build s3://app.epicalls.com --profile epicalls
aws s3 cp s3://app.epicalls.com/index.html s3://app.epicalls.com/index.html --metadata-directive REPLACE --cache-control max-age=0 --profile epicalls