Epicalls frontend
============================

Install dependencies

`npm install`

Build production version

`npm run build`

Setup development server

`npm start`

By default dev server stars on 8001 port and proxies /api/v1 requests to 3000 port, you can change this according your setup, but then your should check list of allowed rails actioncable addresses listed at `config.action_cable.allowed_request_origins` rails app config variable.
