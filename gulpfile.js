let gulp        =   require('gulp');
let browserSync =   require('browser-sync').create();
let sass        =   require('gulp-sass');
let uglifycss   =   require('gulp-uglifycss');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
    .pipe(sass({errLogToConsole: true}))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());

});

gulp.task('css', function() {
    gulp.src('./src/css/*.css')
    .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/css/'));
});

// Move the javascript files into our /js folder
gulp.task('js', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest("./dist/js/"))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/scripts.js')
    .pipe(uglifycss({
        "uglyComments": true
    }))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(browserSync.stream());
});

gulp.task('run', ['css','js','scripts']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(['./scss/*.scss'], ['sass']);
    gulp.watch(['./src/js/*.js'], ['scripts']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['run','serve']);