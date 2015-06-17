var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('inject-lib-js', function () {
    var sources = gulp.src(['app/js/libs/*.js'], {read: false});
    var target = gulp.src('app/index.html');

    return target.pipe($.inject(sources, {name: 'libs'}))
        .pipe(gulp.dest('app/'));
});

gulp.task('inject-index-js', ['inject-lib-js'], function () {
    var sources = gulp.src(['app/js/app/**/*.js'], {read: false});
    var target = gulp.src('app/index.html');

    return target.pipe($.inject(sources, {name: 'app'}))
        .pipe(gulp.dest('app/'));
});

gulp.task('useref-js', ['inject-index-js'], function () {
    var assets = $.useref.assets();

    return gulp.src('app/index.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', ['useref-js'], function () {
    return gulp.src('dist/js/*.js')
        .pipe($.uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('views', function () {
    return gulp.src('app/views/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest("dist/views"));
});

gulp.task('json', function () {
    return gulp.src('app/json/*.json')
        .pipe(gulp.dest("dist/json"));
});

gulp.task('watch', function () {
    gulp.watch('app/js/app/**/*.js', ['inject-index-js']);
});

gulp.task('build', ['compress-js', 'views', 'json']);
gulp.task('default', ['watch']);
