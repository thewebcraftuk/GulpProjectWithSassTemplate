const gulp = require('gulp');
const sass = require('gulp-sass');

var uglifycss = require('gulp-uglifycss');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', function () {
  gulp.src('./css/*.css')
    .pipe(uglifycss({
      //"maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('run', gulp.series('sass', 'css'));

gulp.task('watch', function(){
    gulp.watch('./sass/*.sass', ['sass']);
    gulp.watch('./css/*.css', ['css']);
});

gulp.task('default', gulp.series('run', 'watch'));