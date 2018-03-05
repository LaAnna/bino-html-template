'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');


const config = {
 stylesPath: 'assets/styles',
 jsPath: 'assets/scripts',
 nodeDir: 'node_modules',
 outputDir: 'build',
};

/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: 'build',
    },
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function() {
 return gulp.src('source/styles/main.scss')
   .pipe(sass({
     outputStyle: 'compressed',
     sourceMap: true,
   }).on('error', sass.logError))
   .pipe(sourcemaps.write('.'))
   .pipe(rename('main.min.css'))
   .pipe(gulp.dest('build/css'));
});

/* --------  js -------- */
gulp.task('js', function() {
  return gulp.src([
    'source/js/main.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

/* ------------ Copy html ------------- */
gulp.task('copy:html', function() {
  return gulp.src('./source/*.html').pipe(gulp.dest('build'));
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./source/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./source/img/**/*.*').pipe(gulp.dest('build/img'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel(
  'copy:html',
  'copy:fonts',
  'copy:images',
));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('source/*.html', gulp.series('copy:html'));
  gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('source/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('js','copy'),
  gulp.parallel('watch', 'server'),
  ),
);

