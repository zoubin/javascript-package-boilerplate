var path = require('path')
var vfs = require('vinyl-fs')
var fs = require('fs')
var unpick = require('util-mix/unpick')
var mix = require('util-mix')
var editor = require('gulp-json-editor')
var rename = require('gulp-rename')
var fixtures = path.resolve.bind(path, __dirname, 'template')
var promisify = require('node-promisify')
var fsStat = promisify(fs.stat)
var run = promisify(require('run-callback'))

module.exports = function (opts) {
  opts = opts || {}
  var root = opts.root
  var tmplDir = fixtures(opts.template)
  var copyPkg = false
  return fsStat(path.join(root, 'package.json'))
    .then(function () {
      return run([edit, root, tmplDir])
    }, function () {
      copyPkg = true
    })
    .then(function () {
      return run([copy, root, tmplDir, opts.overwrite, copyPkg])
    })
}

function edit(root, dir) {
  return vfs.src('package.json', { cwd: root })
    .pipe(editor(function (p) {
      var tmplPkg = require(path.join(dir, 'package.json'))
      Object.keys(tmplPkg).forEach(function (k) {
        if (typeof tmplPkg[k] !== 'object') {
          p[k] = tmplPkg[k]
        } else if (k === 'dependencies') {
          p[k] = sort(mix(
            {},
            tmplPkg.dependencies,
            p.dependencies
          ))
        } else if (k === 'devDependencies') {
          p[k] = sort(unpick(
            Object.keys(p.dependencies),
            tmplPkg[k],
            p[k]
          ))
        } else {
          mix(p[k], tmplPkg[k])
        }
      })
      return p
    }))
    .pipe(vfs.dest(root))
}

function copy(root, tmplDir, overwrite, pkg) {
  var dotfiles = ['gitignore', 'npmignore', 'eslintrc', 'babelrc', 'travis']
  var pat = ['**/*']
  if (!pkg) {
    pat.push('!package.json')
  }
  return vfs.src(pat, { cwd: tmplDir, base: tmplDir })
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
    .reduce(function (ret, k) {
      ret[k] = o[k]
      return ret
    }, {})
}
