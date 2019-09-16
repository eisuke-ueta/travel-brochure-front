# travel-brochure-front

> Travel Brochure Front created by JINBAY

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Cloud Storage URL
- https://YOUR_BUCKET.storage.googleapis.com

## Build in docker-compose
```bash
# Build and Up docker
$ docker-compose up --build
```

## CORS configuration
- [Get and Set CORS JSON document](https://cloud.google.com/storage/docs/gsutil/commands/cors)
```bash
$ gsutil cors set cors.json gs://YOUR_BUCKET
$ gsutil cors get gs://YOUR_BUCKET
```
```bash
# sample cors.json
[
  {
    "origin": ["http://localhost:3000"],
    "responseHeader": ["Content-Type"],
    "method": ["GET"],
    "maxAgeSeconds": 10
  }
]
```

## Environment Variables for production
Environment variables for production should be set in build phase.
- [Env property fails in docker environment](https://github.com/nuxt/nuxt.js/issues/618)