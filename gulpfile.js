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
	 inline = require('gulp-inline-css'),  //inlines css - works best if small
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

var htmlOutput = [
	'builds/production/**/*.html'
];

var imgSources = [
	'builds/development/**/img/*.*'
];

// Minify css and save in production folder - then reload page in browser
gulp.task('css', function () {
  gulp.src(cssSources)
  .pipe(cssmin())
  .pipe(gulp.dest('builds/production/'))
  .pipe(connect.reload());
});


// Inline css and save in production folder 
gulp.task('inline', function () {
	gulp.src('builds/development/index.html')
   .pipe(inline())
   .pipe(gulp.dest('builds/production/'))
//  .pipe(connect.reload());
});

// Minify html and save in production folder - then reload page in browser
// Runs after css inline is complete
gulp.task('html', ['inline'], function () {
  gulp.src(htmlOutput)
  .pipe(htmlmin({collapseWhitespace: true}))
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

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(cssSources, ['inline', 'html']);
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


gulp.task('default', ['inline','html', 'js', 'images','connect', 'watch']);