'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

// clean
gulp.task('clean', function() {
  return del(['dist']);
});

// minify
gulp.task('minify', ['clean'], function () {
  var DEST_DIR = 'dist/elements';

  return gulp.src('public/elements/cbl-app.html')
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