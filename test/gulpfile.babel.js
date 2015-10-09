import gulp from 'gulp'
import sequence from 'callback-sequence'
import { exec } from 'child_process'
import del from 'del'
import path from 'path'
import gutil from 'gulp-util'

var fixture = path.resolve.bind(path, 'tmp')
var es5 = sequence(
  () => {
    return del(fixture('es5'))
  },
  () => {
    return gulp.src('package.json')
    .pipe(gulp.dest(fixture('es5')))
  },
  (cb) => {
    exec(
      'node ../build/bin/cmd.js ' + fixture('es5') +
      ' && cd ' + fixture('es5') +
      ' && gulp',
      (err, stdout, stderr) => {
        gutil.log(stdout, stderr)
        cb(err)
      }
    )
  }
)
var es6 = sequence(
  () => {
    return del(fixture('es6'))
  },
  () => {
    return gulp.src('package.json')
    .pipe(gulp.dest(fixture('es6')))
  },
  (cb) => {
    exec(
      'node ../build/bin/cmd.js -t es6 ' + fixture('es6') +
      ' && cd ' + fixture('es6') +
      ' && gulp',
      (err, stdout, stderr) => {
        gutil.log(stdout, stderr)
        cb(err)
      }
    )
  }
)


gulp.task('clean', () => {
  return del(fixture())
})

gulp.task('es5', ['clean'], es5)
gulp.task('es6', ['clean'], es6)
gulp.task('default', ['clean'], sequence(es5, es6))

