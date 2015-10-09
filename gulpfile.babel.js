import gulp from 'gulp'
import gutil from 'gulp-util'

gulp.task('clean', () => {
  let del = require('del')
  return del('build')
})

gulp.task('scripts', ['clean'], () => {
  let babel = require('gulp-babel')
  return gulp.src(['lib/*.js', 'bin/*.js'], { base: process.cwd() })
    .pipe(babel())
    .pipe(gulp.dest('build'))
})

gulp.task('template', ['clean'], () => {
  return gulp.src('template/**/*', { base: process.cwd() })
    .pipe(gulp.dest('build'))
})

gulp.task('docs', ['clean'], () => {
  return gulp.src(['README.md', 'LICENSE', 'package.json'])
    .pipe(gulp.dest('build'))
})

gulp.task('build', ['scripts', 'docs', 'template'])

gulp.task('lint', () => {
  let eslint = require('gulp-eslint')
  return gulp.src(['*.js', 'lib/*.js', 'test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('test', ['build', 'lint'], (cb) => {
  require('child_process').exec('gulp --cwd test', (err, stdout, stderr) => {
    gutil.log(stdout, stderr)
    cb(err)
  })
})

gulp.task('default', ['test'])

