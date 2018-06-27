var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var cssdeclsort = require('css-declaration-sorter');

var paths = {
  "scssSrc" : "./src/scss/**/*.scss",
  "cssDir" : "./dist/css"
}

gulp.task('sass', function() {
  return gulp.src(paths.scssSrc)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe(postcss([cssdeclsort({order: 'smacss'})]))
    .pipe($.sourcemaps.write())
    //.pipe(sass().on('error', sass.logError)) // errorが出た方が私は良いので...
    .pipe(gulp.dest(paths.cssDir));
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.scssSrc, ['sass']);
});
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
  
  gulp.watch([
    './**/*.html',
    paths.cssDir + '/*.css'
   ], function() {
    browserSync.reload();
  });
});
