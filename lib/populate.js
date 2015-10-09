import path from 'path'
import vfs from 'vinyl-fs'
import { run } from 'callback-sequence'
import fs from 'fs'
import unpick from 'util-mix/unpick'
import mix from 'util-mix'
import editor from 'gulp-json-editor'
import rename from 'gulp-rename'

export default function (opts, cb) {
  opts = opts || {}
  let root = opts.root
  let tmplDir = opts.template
  run(
    [
      [checkTemplate, tmplDir],
      [checkPackage, root],
      [edit, root, tmplDir],
      [copy, root, tmplDir, opts.overwrite],
    ],
    cb
  )
}

function checkTemplate(dir, cb) {
  fs.stat(dir, (err, stats) => {
    if (err) {
      return cb(err)
    }
    if (!stats.isDirectory()) {
      return cb(dir + ' is not a directory.')
    }
    cb()
  })
}

function checkPackage(root, cb) {
  fs.access(path.join(root, 'package.json'), cb)
}

function edit(root, dir) {
  return vfs.src('package.json', { cwd: root })
  .pipe(editor((p) => {
    p.scripts = p.scripts || {}
    p.scripts.test = 'gulp'

    let tmplPkg = require(path.join(dir, 'package.json'))
    p.dependencies = sort(mix(
      {},
      tmplPkg.dependencies,
      p.dependencies
    ))
    p.devDependencies = sort(unpick(
      Object.keys(p.dependencies),
      tmplPkg.devDependencies,
      p.devDependencies
    ))
    return p
  }))
  .pipe(vfs.dest(root))
}

function copy(root, tmplDir, overwrite) {
  var dotfiles = ['eslintrc', 'gitignore', 'npmignore', 'travis']
  return vfs.src('**/*', {
    cwd: tmplDir,
    base: tmplDir,
  })
  .pipe(rename(function (p) {
    if (dotfiles.indexOf(p.basename) !== -1) {
      p.basename = '.' + p.basename
    }
    return p
  }))
  .pipe(vfs.dest(root, { overwrite: overwrite }))
}

function sort(o) {
  return Object.keys(o)
  .sort()
  .reduce((ret, k) => {
    ret[k] = o[k]
    return ret
  }, {})
}
