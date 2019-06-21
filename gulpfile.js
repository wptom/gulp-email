const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const del = require('del');
const inlineCss = require('gulp-inline-css');

gulp.task('clean-html', function () {
    return del([
        'output/*.html'
    ]);
});

gulp.task('build-pug', function() {
    return gulp.src('app/*.pug')
        .pipe(pug())
        .pipe(inlineCss())
        .pipe(gulp.dest('output/'));
});

gulp.task('build-html', function() {
    return gulp.src('app/*.html')
        .pipe(inlineCss({
            removeStyleTags: false,
            applyStyleTags: true
        }))
        .pipe(gulp.dest('output/'));
});

gulp.task('images', done => {
    gulp.src('app/**/*.{gif,jpg,png,svg}')
        .pipe(gulp.dest('output'))

        done()
});

gulp.task('watch',function() {
    browserSync.init({
        server: 'output'
    });

    gulp.watch('app/**/*.{gif,jpg,png,svg}', gulp.series('images'));
    // gulp.watch('app/*.pug', gulp.series(['clean-html', 'build-pug']));
    gulp.watch('app/*.html', gulp.series(['clean-html', 'build-html']));
    gulp.watch('./output').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel(
    'images',
    'clean-html',
    'build-html'
));