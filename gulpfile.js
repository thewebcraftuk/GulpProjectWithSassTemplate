const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');

// complie scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./assets/sass/**/*.scss')
        // 2. pass that file through sass compiler
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // 3. where do I save the compiled CSS?
        .pipe(gulp.dest('./dist/css'))
        // 4. stram changes to all browser
        .pipe(browserSync.stream());
}

function script(){
    return gulp.src('./assets/js/jquery.js' , './assets/js/script.js')
        .pipe(concat('all.js' /*, {newLine: ';'}*/)) // adding new line
        .pipe(uglify({
            //exclude: ['script'],
            // ext:{
            //     src:'-debug.js',
            //     min:'.js'
            // },
            // exclude: ['tasks'],
            // ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
}

function images(){
    return gulp.src('./assets/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
        ]))
        .pipe(gulp.dest('./dist/images'))
}

function watch() {
    style();
    script();
    images();
    //gulp.series(style, script)
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./assets/sass/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/*.js', script).on('change', browserSync.reload);
    gulp.watch('./assets/images/*', images).on('change', browserSync.reload);
}

exports.style  = style;
exports.script = script;
exports.images = images;
exports.watch  = watch;