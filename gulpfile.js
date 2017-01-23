var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('templates', function() {
  gulp.src('src/templates/pages/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
    }).on('error', gutil.log))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  gulp.src('src/scripts/**/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
  gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('copy', function() {
  gulp.src('src/assets/img/**/*')
    .pipe(gulp.dest('dist/assets/img'));
  gulp.src('src/assets/fonts/*')
    .pipe(gulp.dest('src/assets/fonts/'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: 'dist'
  });
});

gulp.task('dev', ['templates', 'styles', 'scripts', 'copy', 'browser-sync'], function() {
  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/assets/img/**/*', ['copy']);
  gulp.watch('src/assets/fonts/*', ['copy']);
});

gulp.task('default', ['dev']);
