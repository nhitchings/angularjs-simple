'use strict';

var gulp = require('gulp'),
useref = require('gulp-useref'),
gulpIf = require('gulp-if'),
uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
imagemin = require('gulp-imagemin'),
cachebust = require('gulp-cache-bust'),
clean = require('gulp-clean');
 
gulp.task('html', function () {
    return gulp.src('public/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cleanCSS()))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', () => {
    return gulp.src('public/**/*.css')
      .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
    return gulp.src('public/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
  return gulp.src('public/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin([], {}))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('favicons', function(){
  return gulp.src('public/*.+(png|jpg|gif|svg)')
  .pipe(imagemin([], {}))
  .pipe(gulp.dest('dist'))
});

gulp.task('bust', function(){
  return gulp.src('dist/**/*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean-dist', function(){
  return gulp.src('dist', {read: false})
        .pipe(clean());
});
 
// Default task that will run by type 'gulp'
gulp.task('default',['html', 'minify-css', 'compress']);
gulp.task('build',['html', 'minify-css', 'compress', 'images', 'favicons']);
