#!/usr/bin/env node

var populate = require('../lib/populate')
var format = require('ansi-escape')
var Command = require('commander').Command
var program = new Command('js-pb')

program
  .version(require('../package.json').version)
  .usage('[options] [directory]')
  .option('-t, --template <directory>', '`es5` | `es6` | `es6-babel6`. Default: `es5`.', 'es5')
  .option('-f, --force', 'overwrite existing files')
  .parse(process.argv)

populate({
  root: program.args[0],
  template: program.template,
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

