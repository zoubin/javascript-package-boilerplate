import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('clean', function () {
  let del = require('del')
  return del('build')
})
gulp.task('scripts', ['clean'], function () {
  let babel = require('gulp-babel')
  return gulp.src(['lib/**/*', 'bin/**/*'], { base: process.cwd() })
    .pipe(babel())
    .pipe(gulp.dest('build'))
})
gulp.task('docs', ['clean'], function () {
  return gulp.src(['README.md', 'LICENSE'])
    .pipe(gulp.dest('build'))
})
gulp.task('package', ['clean'], function () {
  let editor = require('gulp-json-editor')
  return gulp.src('./package.json')
    .pipe(editor( (p) => {
      p.main = 'lib/main'
      return p
    }))
    .pipe(gulp.dest('build'))
})
gulp.task('build', ['scripts', 'package', 'docs'])

gulp.task('lint', function () {
  let eslint = require('gulp-eslint')
  return gulp.src(['*.js', 'bin/**/*.js', 'lib/**/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
gulp.task('test', function (resolve) {
  require('task-tape')
  let tape = require('gulp-tape')
  let reporter = require('tap-summary')()
  gulp.src('test/*.js')
    .pipe(tape({
      reporter: reporter.on('end', resolve),
    }))
})
gulp.task('instrument', function () {
  let istanbul = require('gulp-istanbul')
  let isparta = require('isparta')
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
})
gulp.task('report', function () {
  let istanbul = require('gulp-istanbul')
  return gulp.src('test/*.js', { read: false })
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({
      thresholds: {
        global: {
          statements: 90,
          functions: 90,
          branches: 80,
          lines: 90,
        },
      },
    }))
})
gulp.task('coverage', gulpSequence('instrument', 'test', 'report'))
gulp.task('upload-coverage', ['coverage'], function (cb) {
  let handleReport = require('coveralls/lib/handleInput')
  let fs = require('fs')
  fs.readFile('./coverage/lcov.info', 'utf8', (err, data) => {
    if (err) {
      return cb(err)
    }
    handleReport(data, cb)
  })
})

gulp.task('default', gulpSequence('lint', 'coverage'))
