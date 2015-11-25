var test = require('tape')
var promisify = require('node-promisify')
var exec = promisify(require('child_process').exec)
var del = require('del')
var cmd = require.resolve('../bin/cmd')
var path = require('path')
var DEST = path.join(__dirname, 'build')
var fs = require('fs')
var fsMkdir = promisify(fs.mkdir)
var compare = require('compare-directory')

test('ES5', function (t) {
  return del(DEST)
    .then(function () {
      return fsMkdir(DEST)
    })
    .then(function () {
      return exec(cmd + ' ' + DEST)
    })
    .then(function () {
      compare(
        t,
        ['**/*', '!test', '.*'],
        DEST,
        path.resolve(__dirname, '..', 'template', 'es5'),
        function (file) {
          return file.indexOf('.') === 0 ? file.slice(1) : file
        }
      )
    })
})

test('ES6', function (t) {
  return del(DEST)
    .then(function () {
      return fsMkdir(DEST)
    })
    .then(function () {
      return exec(cmd + ' --es6 ' + DEST)
    })
    .then(function () {
      compare(
        t,
        ['**/*', '!test', '!lib', '.*'],
        DEST,
        path.resolve(__dirname, '..', 'template', 'es6'),
        function (file) {
          return file.indexOf('.') === 0 ? file.slice(1) : file
        }
      )
    })
})

test('Babel6', function (t) {
  return del(DEST)
    .then(function () {
      return fsMkdir(DEST)
    })
    .then(function () {
      return exec(cmd + ' --babel6 ' + DEST)
    })
    .then(function () {
      compare(
        t,
        ['**/*', '!test', '!lib', '.*'],
        DEST,
        path.resolve(__dirname, '..', 'template', 'es6-babel6'),
        function (file) {
          return file.indexOf('.') === 0 ? file.slice(1) : file
        }
      )
    })
})

