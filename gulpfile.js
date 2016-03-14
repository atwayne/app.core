var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

// gulp tasks

// 1. read config and set up constants
gulp.task('config', function() {
  var env = process.env.env || 'local';
  var config = require('./data/config.json')[env];

  return ngConstant({
      constants: config,
      name: 'app.core.config',
      stream: true,
      deps: false
    })
    .pipe(gulp.dest('./dist'));
});

// 2. clean build output
gulp.task('clean', function() {
  return gulp.src('./dist', {
      read: false,
      force: true
    })
    .pipe(clean());
});

// 3. build
gulp.task('combine', ['config'], function() {
  // modules should be ordered in the first place
  return gulp.src(['./src/modules/*.js', './src/**/*.js', './dist/ngConstant.js'])
    .pipe(concat('app.core.js'))
    .pipe(gulp.dest('./dist'));
});

// 5. minify
gulp.task('minify', ['combine'], function() {
  gulp.src('./dist/app.core.js')
    .pipe(uglify())
    .pipe(rename('app.core.min.js'))
    .pipe(gulp.dest('dist'));
});

// 6. house-clean
gulp.task('house-clean', ['minify'], function() {
  return gulp.src(['./dist/*.js', '!./dist/app.core.js', '!./dist/app.core.min.js'], {
      read: false
    })
    .pipe(clean({
      read: false,
      force: true
    }));
});

// 7. all
gulp.task('build', ['clean', 'combine', 'config', 'minify', 'house-clean']);
