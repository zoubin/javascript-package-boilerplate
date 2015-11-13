import gulp from 'gulp'

gulp.task('clean', () => {
  let del = require('del')
  return del('build')
})

gulp.task('scripts', ['clean'], () => {
  let babel = require('gulp-babel')
  return gulp.src(['lib/**/*', 'bin/**/*'], { base: process.cwd() })
    .pipe(babel())
    .pipe(gulp.dest('build'))
})

gulp.task('docs', ['clean'], () => {
  return gulp.src(['README.md', 'LICENSE'])
    .pipe(gulp.dest('build'))
})

gulp.task('package', ['clean'], () => {
  let editor = require('gulp-json-editor')
  return gulp.src('./package.json')
    .pipe(editor( (p) => {
      p.main = 'lib/main'
      return p
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('build', ['scripts', 'package', 'docs'])

gulp.task('lint', () => {
  let eslint = require('gulp-eslint')
  return gulp.src(['*.js', 'bin/**/*.js', 'lib/**/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('test', ['lint'], test)
gulp.task('coverage',
  require('callback-sequence')(instrument, test, report)
)
gulp.task('default', ['lint', 'coverage'])
gulp.task('upload-coverage', ['coverage'], (cb) => {
  let handleReport = require('coveralls/lib/handleInput')
  let fs = require('fs')
  fs.readFile('./coverage/lcov.info', 'utf8', (err, data) => {
    if (err) {
      return cb(err)
    }
    handleReport(data, cb)
  })
})

function instrument() {
  let istanbul = require('gulp-istanbul')
  let isparta = require('isparta')
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
}

function test() {
  require('task-tape')
  let tape = require('gulp-tape')
  let reporter = require('tap-spec')
  return gulp.src('test/*.js')
    .pipe(tape({
      reporter: reporter(),
    }))
}

function report() {
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
}

