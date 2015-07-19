var browserify = require('browserify')
  , buffer = require('vinyl-buffer')
  , del = require('del')
  , derequire = require('gulp-derequire')
  , gulp = require('gulp')
  , mocha = require('gulp-mocha')
  , rename = require('gulp-rename')
  , source = require('vinyl-source-stream')
  , uglify = require('gulp-uglify')
  , webserver = require('gulp-webserver')




// Clean compiled scripts

gulp.task('clean', function (cb) {
    del([
        './dist/**'
    ], cb)
})



// Compile scripts

gulp.task('build', ['clean'], function () {
    return browserify({
            entries: ['./src/where-am-i.js']
          , standalone: 'WhereAmI'
        })
        .bundle()
        .pipe(source('where-am-i.js'))
        .pipe(buffer())
        .pipe(derequire())
        .pipe(uglify())
        .pipe(rename('where-am-i.min.js'))
        .pipe(gulp.dest('./dist'))
})



// Run the example

gulp.task('example', ['build'], function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true
          , open: '/example/'
        }));
})



// Rebuild during development

gulp.task('watch', function () {
    gulp.watch('./src/**', ['build:js'])
})



// Run tests

gulp.task('test', function () {
    return gulp.src('./test/**/*.js', {
            read: false
        })
        .pipe(mocha())
})



// Default task is build

gulp.task('default', ['build'])
