// Gulp file for Web Optimization project
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
	 runseq = require('run-sequence'),  //runs tasks in specified order
	 del = require('del'),  //removes files and directories
    concat = require('gulp-concat');  //combines content of multiple files into a single file

var jsSources = [
	'builds/development/**/js/*.js'
];

var cssSources = [
	'builds/development/views/**/*.css'  //views directory only
];

var htmlSources = [
	'builds/development/*.html'  //does not include views directory
];


var htmlViews = [
	'builds/development/views/*.html'  //html in views directory minified but not inlined (css)
];

var htmlOutput = [
	'builds/production/**/*.html'  //includes views directory
];

var imgSources = [
	'builds/development/**/img/*.*'
];

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'builds/production/*', '!builds/production/.git'], {dryrun: true}));

// Minify css and save in production folder - then reload page in browser
gulp.task('css', function () {
  gulp.src(cssSources)
//  .pipe(cssmin())
  .pipe(gulp.dest('builds/production/views/'))
  .pipe(connect.reload());
});

gulp.task('inline', function() {
   return gulp.src(htmlSources).on('error', errorHandler)
//   .pipe(inline()).on('error', errorHandler)
   .pipe(gulp.dest('builds/production/')).on('error', errorHandler);
});

function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}

// Minify html in top-level directory and save in production folder - then reload page in browser
// Runs after css inline is complete
gulp.task('html', ['inline'], function () {
  gulp.src(htmlOutput)
//  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('builds/production/'))
  .pipe(connect.reload());
});

// Minify html in Views folder and save in production folder - then reload page in browser
gulp.task('htmlViews', function () {
  gulp.src(htmlViews)
//  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('builds/production/views/'))
  .pipe(connect.reload());
});

// Minify javascript and save in production folder - then reload page in browser
gulp.task('js', function() {
	gulp.src(jsSources)
//	.pipe(uglify('*.js'))
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
	gulp.watch(htmlViews, ['htmlViews']);
	gulp.watch(cssSources, ['inline', 'html']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(imgSources, ['images']);
	gulp.watch(cssSources, ['css']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/production/',
	 host: '127.0.0.1',
	 port: '8081',
    livereload: true
  });
});


gulp.task('default', ['clean'], function(cb) {
  runseq(['inline', 'css'],['html', 'htmlViews', 'js', 'images'],'connect', 'watch', cb);
});