var serverPort = 3000;
var liveReloadPorts= {
  proxy: 3013,
  ui: 4242,
  weinre: 4243
};

module.exports = {
  paths: {
      root: __dirname,
      public: __dirname + '/public/',
      src: __dirname + '/src/',
      js: {
        src: __dirname + '/src/browser/js/',
        dist: __dirname + '/public/js/',
      },
      style: {
        src: __dirname + '/src/browser/style/',
        dist: __dirname + '/public/style/',
      },
      assets: {
        src: __dirname + '/src/browser/assets/',
        dist: __dirname + '/public/assets/',
      },
      fonts: {
        src: __dirname + '/src/browser/fonts/',
        dist: __dirname + '/public/fonts/',
      },
      views: {
        src: __dirname + '/src/browser/views/',
      },
      vendorlocal: {
        src: __dirname + '/src/browser/vendor-local/',
        dist: __dirname + '/public/vendor-local/',
      },
      server: {
        src: __dirname + '/src/server/',
        dist: __dirname + '/lib/',
      }
  },
  compilation: {
    less: {

    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions'],
      cascade: true,
      remove: false
    },
    browserify: {

    },
    uglify: {

    },
    images: {
      progressive: false,
      optimizationLevel: 1,
      interlaced: false,
      multipass: false
    },
    server: {
      babel: {
        compact: false,
        comments: true,
        presets: ['babel-preset-es2015'],
        plugins: ['transform-runtime'],
      },
    }
  },
  dev: {
    browsersync: { // @see http://www.browsersync.io/docs/options/
      baseDir: './',
      ui: {
        port: liveReloadPorts.ui,
        weinre: {
          port: liveReloadPorts.weinre
        },
      },
      port: liveReloadPorts.proxy,
      proxy: {
        target: 'localhost:' + serverPort
      },
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      },
      logLevel: 'info',
      logPrefix: 'BrowserSync Enabled',
      logConnections: false,
      logFileChanges: true,
      reloadOnRestart: true,
      notify: true,
      scrollProportionally: true,
      injectChanges: true,
      codeSync: true
    },
  },
  server: {
    port: serverPort,
    liveReloadPorts: liveReloadPorts
  }
};
