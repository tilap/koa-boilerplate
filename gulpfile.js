var gulp = require('gulp');
var $ = require('gulp-load-plugins')({camelize: true});
var del = require('del');

var currentPath = __dirname;
var config = require('./config.js');

// =============================================================================
// Main tasks
// =============================================================================
gulp.task('watch', ['front:watch', 'server:watch', 'server:nodemon']);

gulp.task('assets:build', ['assets:images-build', 'assets:fonts-build', 'assets:vendorlocal-build']);
gulp.task('assets:clean', ['assets:images-clean', 'assets:fonts-clean', 'assets:vendorlocal-clean']);

gulp.task('front:build', ['front:css-build', 'front:js-build']);
gulp.task('front:watch', ['front:css-watch', 'front:js-watch']);
gulp.task('front:clean', ['front:css-clean', 'front:js-clean']);

gulp.task('server:build', ['server:es6']);
gulp.task('server:watch', ['server:es6-watch']);
gulp.task('server:clean', ['server:es6-clean']);


// =============================================================================
// Style teasks
// =============================================================================
gulp.task('front:css-build', function() {
  var src = config.paths.style.src;
  var dist = config.paths.style.dist;
  return gulp.src(src + '/*.less', { base : src })
    .pipe($.less(config.compilation.style))
    .pipe($.autoprefixer(config.compilation.autoprefixer))
    .pipe(gulp.dest(dist));
});
gulp.task('front:css-watch', function() {
  var src = config.paths.style.src;
  gulp.watch(src + '/**/*.less', ['front:css-build']);
});
gulp.task('front:css-clean', function(cb) {
  var dist = config.paths.style.dist;
  del(dist + '/**/*', cb);
});


// =============================================================================
// Js tasks
// =============================================================================
gulp.task('front:js-build', function() {
  var src= config.paths.js.src;
  var dist= config.paths.js.dist;
  return gulp.src(src + '/*.js', { base : src })
    .pipe($.babel(config.compilation.babel))
    .pipe(
      $.browserify(config.compilation.browserify)
      .on('error', function(err) {
          console.error('js browserify error: ' + err.message);
          this.emit('end');
      })
    )
    .pipe($.uglify(config.compilation.uglify))
    .pipe(gulp.dest(dist));
});
gulp.task('front:js-watch', function() {
  var src= config.paths.js.src;
  gulp.watch(src + '/**/*.js', ['front:js-build']);
});

gulp.task('front:js-clean', function(cb) {
  var dist= config.paths.js.dist;
  del(dist + '/**/*', cb);
});


// =============================================================================
// Browsersync
// =============================================================================
gulp.task('browsersync', function() {
  setTimeout( function() {
    var browserSync = require('browser-sync');
    browserSync.create();
    browserSync.init(config.dev.browsersync);

    gulp.watch([
      config.paths.js.dist + '/**/*.js',
      config.paths.style.dist + '/**/*.css',
      config.paths.views.src + '/**/*.html'
    ]).on('change', browserSync.reload);
  }, 2000);
});


// =============================================================================
// Assets
// =============================================================================
gulp.task('assets:images-build', function() {
  var src= config.paths.assets.src;
  var dist= config.paths.assets.dist;
  return gulp.src(src + '/**/*', { base : src })
    .pipe($.imagemin(config.compilation.images))
    .pipe(gulp.dest(dist));
});
gulp.task('assets:images-clean', function(cb) {
  var dist= config.paths.assets.dist;
  del(dist + '/**/*', cb);
});

gulp.task('assets:vendorlocal-build', function() {
  var src= config.paths.vendorlocal.src;
  var dist= config.paths.vendorlocal.dist;
  return gulp.src(src + '/**/*', { base : src })
    .pipe(gulp.dest(dist));
});
gulp.task('assets:vendorlocal-clean', function(cb) {
  var dist= config.paths.vendorlocal.dist;
  del(dist + '/**/*', cb);
});



// =============================================================================
// Fonts
// =============================================================================
gulp.task('assets:fonts-build', function() {
  var src= config.paths.fonts.src;
  var dist= config.paths.fonts.dist;
  return gulp.src(src + '/**/*')
    .pipe(gulp.dest(dist));
});
gulp.task('assets:fonts-clean', function(cb) {
  var dist= config.paths.fonts.dist;
  del(dist + '/**/*', cb);
});


// =============================================================================
// Server
// =============================================================================
gulp.task('server:es6', function() {
  var src= config.paths.server.src;
  var dist= config.paths.server.dist;
  return gulp.src(src + '/**/*.js')
    .pipe($.babel(config.compilation.server.babel))
    .pipe(gulp.dest(dist));

});
gulp.task('server:es6-watch', function(fileStatus) {
  var src= config.paths.server.src;
  var dist= config.paths.server.dist;

  return gulp.watch(src + '/**/*.js', function(fileStatus) {
    console.log('[ES6 watcher] ' + fileStatus.path.replace(currentPath, '') + ' (' + fileStatus.type + ') ' + ' => transpile it into ' + dist.replace(currentPath, ''));
    return gulp.src(fileStatus.path, { base : src })
      .pipe($.babel(config.compilation.server.babel))
      .pipe(gulp.dest(dist));
  });
});
gulp.task('server:es6-clean', function(cb) {
  var dist= config.paths.server.dist;
  del(dist + '/**/*', cb);
});


gulp.task('server:nodemon', function() {
  var dist= config.paths.server.dist;
  $.nodemon({
    script: dist + 'site.js',
    ext: 'js html',
    verbose: false,
    watch: [
      dist + '**/*.js'
    ],
    delay: 150,
  })
  .on('restart', function (files) {
    var filesStr = files ? 'Files changed: ' + files.join(', ') : 'user request';
    filesStr = filesStr.replace(currentPath, '');
    console.log('[Server restarted]', filesStr);
  });
});
