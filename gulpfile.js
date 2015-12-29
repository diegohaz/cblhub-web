'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

// watch
gulp.task('watch', function() {
  gulp.watch('public/elements/**/*.html', ['babel']);
});

// clean
gulp.task('clean', function() {
  return del(['dist']);
});

// babel
gulp.task('babel', ['clean'], function() {
  return gulp.src('public/elements/**/*.html')
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe($.crisper({
      scriptInHead: false,
      onlySplit: false
    }))
    .pipe($.if('*.js', $.babel({
      presets: ['es2015'],
      compact: false
    })))
    .pipe($.plumber.stop())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/elements'));
});

// minify
gulp.task('minify', ['babel'], function () {
  var DEST_DIR = 'dist/elements';

  return gulp.src('dist/elements/cbl-app.html')
    .pipe($.vulcanize({
      dest: DEST_DIR,
      strip: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe($.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    }))
    .pipe($.minifyInline({
      js: {
        compress: {
          drop_console: true,
          dead_code: true,
          drop_debugger: true,
          join_vars: true,
        },
      },
      jsSelector: 'script',
      css: false
    }))
    .pipe($.cheerio(function ($, file) {
      $('style').each(function () {
        var style = $(this);
        style.text(style.text()
          .replace(/^[ \t]+/mg, '')
          .replace(/[ \t]*\/\*(.|[\n\r])*?\*\//g, '')
          .replace(/[\n\r]+/g, '\n')
          .replace(/;[\n\r\t ]+/g, ';')
          .replace(/,[\n\r\t ]+/g, ',')
          .replace(/[ \t\n\r]+{/g, '{')
          .replace(/{[ \t\n\r]+/g, '{')
          .replace(/[ \t\n\r;]+}/g, '}')
          .replace(/}[ \t\n\r]+/g, '}')
          .replace(/:[ \t\n\r]+/g, ':')
        );
      });
    }))
    .pipe($.if('*.html', $.replace(/;<\/script><script>/ig, ';')))
    .pipe(gulp.dest(DEST_DIR))
    .pipe($.size({title: 'vulcanize'}));
});

// default
gulp.task('default', ['minify']);