var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify')

// converts jsx to js
var b = browserify({
    entries: ['./src/main.jsx'],
    transform: [reactify],
    extensions: ['.js','.jsx'],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: false
});

function build() {
    return b
    .plugin('minifyify', {
        map: false
    })
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(gulp.dest('./content/assets/js/'));
}

gulp.task('build', function() {
    build();
});

gulp.task('default', ['build']);
