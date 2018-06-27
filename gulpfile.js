var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var cssdeclsort = require('css-declaration-sorter');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([cssdeclsort({order: 'smacss'})]))
    .pipe(sourcemaps.write())
    //.pipe(sass().on('error', sass.logError)) // errorが出た方が私は良いので...
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
  
  gulp.watch([
    './**/*.html',
    './**/*.css'
   ], function() {
    browserSync.reload();
  });
});
