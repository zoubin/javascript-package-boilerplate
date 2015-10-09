#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import populate from '../lib/populate'
import minimist from 'minimist'
import { run } from 'callback-sequence'
import tree from 'tree-directory'

var argv = minimist(process.argv.slice(2), {
  boolean: ['peek', 'force', 'help'],
  string: ['template'],
  alias: {
    t: 'template',
    p: 'peek',
    f: 'force',
    h: 'help',
  },
  'default': {
    t: 'es5',
  },
})

argv.template = argv.template || 'es5'

var paths = [argv.template]
if (argv.template.indexOf(path.sep) === -1 && argv.template[0] !== '.') {
  paths.unshift(path.resolve(__dirname, '..', 'template', argv.template))
}

;(function NEXT() {
  if (argv.help) {
    return fs.createReadStream(path.join(__dirname, 'help.txt'))
      .pipe(process.stdout)
      .on('close', () => {
        process.exit(1)
      })
  }
  let tplPath = paths.shift()
  if (!tplPath) {
    return console.log('No templates found')
  }
  fs.access(tplPath, (err) => {
    if (err) {
      return NEXT()
    }
    if (argv.peek) {
      let tplInfo = tree.sync(tplPath)
      console.log(tplInfo.basedir)
      return console.log(tplInfo.str)
    }
    populate({
      root: path.resolve(argv._[0] || '.'),
      template: tplPath,
      overwrite: argv.force,
    }, (err) => {
      if (err) {
        console.log(err)
        process.exit(-1)
      }
      console.log(
        'DONE.',
        'Refer to',
        //'\033[4;32m',
        '\u001B[4;32m',
        'https://github.com/zoubin/javascript-package-boilerplate',
        //'\033[0m',
        '\u001B[0m',
        'for more information'
      )
    })
  })
})()

