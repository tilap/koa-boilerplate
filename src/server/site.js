'use strict';

const config = require('./../config.js');

let koa = require('koa');
let koastatic = require('koa-static');
let ejsRender = require('koa-ejs');
let koaSanitizeUri = require('koa-sanitize-uri');
let Router = require('koa-router');


let app = koa();

// On error
app.on('error', function(err, ctx){
  console.error('server error', err, ctx);
});

// x-response-time
app.use(function *(next){
  let start = new Date();
  yield next;
  let ms = new Date() - start;
  this.set('X-Response-Time', ms + 'ms');
});

// request logger
app.use(function *(next){
  let ext = this.url.replace(/^(.*)(\?.*)$/, '$1').split('.').pop();
  if(['js', 'ico', 'css', 'woff'].indexOf(ext) > -1) {
    yield next;
  }
  else {
    let start = new Date();
    yield next;
    let ms = new Date() - start;
    console.log('%s %s - %sms', this.method, this.url, ms);
  }
});

// Clean uri
app.use(koaSanitizeUri({
  sanitize: {
    simpleChars : true,
    endingslash : true,
    doubleshash : true,
    lowercase : true,
  },
  code: 301,
  ignore: [/assets\/.*/, /.*\.(css|js|jpg|png|png|woff)$/i]
}));

// statics
app.use(koastatic(config.paths.public, {}));

// Views
ejsRender(app, {
  root: config.paths.views.src,
  layout: 'layouts/default',
  viewExt: 'html',
  cache: false,
  debug: true
});

// Routes
let router = new Router({
  prefix: ''
});

let staticController = require('./controllers/pages');
router.get('home', '/', staticController.home);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.server.port);
console.log('App listening on port ' + config.server.port);
