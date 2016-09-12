// Gulp file for Web Optimization project
// Source folder contains project files provided by Udacity.  In future, this file can be modified to treat Source folder as location for pre-processed files, i.e. Sass, Compass, Coffee
// Development folder contains my working files (for editing), including optimized images - input.
// Production folder contains compressed version of site - output.


'use strict';

//  Gulp Workflow
var gulp = require('gulp'),
	 watch = require('gulp-watch'),  //monitors source files for changes
	 connect = require('gulp-connect'),  //launches browser
	 uglify = require('gulp-uglify'),  //compresses javascript
	 gulpif = require('gulp-if'),  //enables use of conditional statements within gulp task
	 htmlmin = require('gulp-htmlmin'),  //compresses html
	 cssmin = require('gulp-csso'),  //compresses css
    concat = require('gulp-concat');  //combines content of multiple files into a single file

var jsSources = [
	'builds/development/**/js/*.js'
];

var cssSources = [
	'builds/development/**/*.css'
];

var htmlSources = [
	'builds/development/**/*.html'
];


var imgSources = [
	'builds/development/**/img/*.*'
];

// Minify html and save in production folder - then reload page in browser
gulp.task('html', function () {
  gulp.src(htmlSources)
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('builds/production/'))
  .pipe(connect.reload());
});

// Minify css and save in production folder - then reload page in browser
gulp.task('css', function () {
  gulp.src(cssSources)
  .pipe(cssmin())
  .pipe(gulp.dest('builds/production/'))
  .pipe(connect.reload());
});

// Minify javascript and save in production folder - then reload page in browser
gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(uglify('*.js'))
	.pipe(gulp.dest('builds/production/'))
	.pipe(connect.reload())
});

// Copy image files to production folder - assumes pre-compression
gulp.task('images', function() {
  gulp.src(imgSources)
  .pipe(gulp.dest('builds/production/'))
  .pipe(connect.reload());
});

//// Copy All Files At The Root Level (Development) --- untested
//gulp.task('copy', function() {
//  return gulp.src([
//    'development/*',
//    '!development/*.html',
//    'node_modules/apache-server-configs/builds/production/.htaccess'
//  ], {
//    dot: true
//  }).pipe(gulp.dest('builds/production/'))
//    .pipe($.size({title: 'copy'}));
//});

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(cssSources, ['css']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(imgSources, ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/production/',
	 host: '127.0.0.1',
	 port: '8081',
    livereload: true
  });
});


gulp.task('default', ['html', 'css', 'js', 'images', 'connect', 'watch']);