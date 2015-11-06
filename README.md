# KOAJS Boilerplate

Simple stack boilerplate to start new NodeJS project quickly. It is based on [Koa](http://koajs.com/), comes with gulp tasks for dev and Makefile for quick use.

Quick usage:

```
cd myproject
git clone https://github.com/tilap/koa-boilerplate.git .
make init NAME="my-wonderfull-project" VERSION="1.0.0"
make install
make build
make watch
```

- Name and version are setup in package.json, bower.json and config-app.js
- All dependancies are installed (node modules and front if any is added)
- Build the dist src, assets, front stuff.
- Start the server, available by default on http://localhost:3000/

If you work on front, you can use browsersync by launching ```make sync``` in another terminal while the first one is watching.

## Stack

- Serverside:
  - KoaJS (koa, router, view render, sanitizeUri, x-response-time, request console logger)
  - Gulp (clean, build, watch everything)
  - ES6 (babel)
  - EJS with layout
- Frontend:
  - Style (less, autoprefixer)
  - JS (babel + browserify/uglify)
  - Icons (fontello import/export)
  - Assets (imagemin)
- Dev tools:
  - Browsersync
  - Nodemon
  - full Makefile

## Configuration

Project configuration (all main paths, compilation options, ...) are available in the `config.js` file. The application configuration is separated in another file, `config-app.js`.

## Makefile entries

See Makefile.help or run ```make``` for more informations

- help
- init NAME=PROJECT_NAME VERSION=1.0.0
- install
- assets
- build
- serve
- watch
- sync
- clean
- fontopen
- fontopenmac
- fontsave

## Authors

See [AUTHORS](AUTHORS).

## LICENSE

[MIT](LICENSE).
