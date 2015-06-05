var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('inject-index-js', function () {
    var sources = gulp.src(['app/js/app/**/*.js'], {read: false});
    var target = gulp.src('app/index.html');

    return target.pipe($.inject(sources))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
    gulp.watch('app/js/app/**/*.js', ['inject-index-js']);
});

gulp.task('build', ['inject-index-js']);
gulp.task('default', ['watch']);
