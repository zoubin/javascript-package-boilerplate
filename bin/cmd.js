#!/usr/bin/env node

var populate = require('../lib/populate')
var format = require('ansi-escape')
var Command = require('commander').Command
var program = new Command('js-pb')

program
  .version(require('../package.json').version)
  .usage('[options] [directory]')
  .option('--es6', 'Develope es6')
  .option('--babel6', 'Use babel 6')
  .option('-f, --force', 'overwrite existing files')
  .parse(process.argv)

var template = 'es5'
if (program.es6) {
  template = 'es6'
  if (program.babel6) {
    template = 'es6-babel6'
  }
}
populate({
  root: program.args[0],
  template: template,
  overwrite: program.force,
})
.then(function () {
  console.log(
    'DONE.',
    'Refer to',
    format.green.underline.escape('https://github.com/zoubin/javascript-package-boilerplate'),
    'for more information'
  )
})
.catch(function (err) {
  console.log(err)
  process.exit(-1)
})

