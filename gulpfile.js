'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var DIST = 'dist';

var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

gulp.task('default', ['minify'], function() {
  return del([dist() + '/elements/cbl-app.js']);
});

gulp.task('clean', function() {
  return del([dist()]);
});

gulp.task('babel', ['clean'], function() {
  return gulp.src('public/elements/cbl-app.html')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.vulcanize())
    .pipe($.crisper({
      scriptInHead: false,
      onlySplit: false
    }))
    .pipe($.if('*.js', $.babel({
      presets: ['es2015'],
      compact: false
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(dist() + '/elements'));
});

gulp.task('minify', ['babel'], function() {
  return gulp.src('dist/elements/cbl-app.html')
    .pipe($.plumber())
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe($.minifyInline())
    .pipe(gulp.dest(dist() + '/elements'));
});

gulp.task('watch', function() {
  gulp.watch('public/elements/**/*.html', ['default']);
});