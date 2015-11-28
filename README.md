# javascript-package-boilerplate
Boilerplate for developing javascript packages.

[![version](https://img.shields.io/npm/v/js-pb.svg)](https://www.npmjs.org/package/js-pb)
[![status](https://travis-ci.org/zoubin/javascript-package-boilerplate.svg?branch=master)](https://travis-ci.org/zoubin/javascript-package-boilerplate)
[![dependencies](https://david-dm.org/zoubin/javascript-package-boilerplate.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate)
[![devDependencies](https://david-dm.org/zoubin/javascript-package-boilerplate/dev-status.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate#info=devDependencies)

## Usage

```bash
npm i -g js-pb

mkdir your_project
cd your_project
npm init
js-pb
npm install

```

Execute `js-pb -h` for more information.

## Develope ES5
Develope a package written in ES5.

`package.json`:

```json
{
  "main": "index.js",
  "scripts": {
    "test": "npm run lint && tap --cov test/*.js",
    "lint": "eslint *.js lib/**/*.js test/*.js bin/*.js",
    "coveralls": "COVERALLS_REPO_TOKEN=REPO_TOKEN npm test"
  },
  "devDependencies": {
    "eslint": "^1.10.1",
    "tap": "^2.3.1"
  }
}

```

### Run tests

Command: `npm test`

Run tests with [`tap`].

### Code lint

Command: `npm run lint`

Apply [`eslint`].

### Code coverage
Command: `npm run coveralls`

Upload code coverage data to [coveralls.io](https://coveralls.io/).
Visit the site for more information.

## Develope ES6

Use [`babel`] and [`gulp`] to develope a package in ES6 code,
and publish the compiled ES5 code.

ES6 References:

* [lukehoban#es6features](https://github.com/lukehoban/es6features)
* [ecma-262 6th edition](http://www.ecma-international.org/ecma-262/6.0/)
* [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

```bash
gulp lint
gulp test
gulp coverage
gulp upload-coverage
gulp build

```

### Babel 5 runtime options

Modify `gulpfile.bable.js`:

```javascript
gulp.task('scripts', ['clean'], () => {
  let babel = require('gulp-babel')
  return gulp.src(['lib/**/*', 'bin/**/*'], { base: process.cwd() })
    .pipe(babel({ optional: ['runtime'] }))
    .pipe(gulp.dest('build'))
})

```

### Babel 6 runtime options

Install:

```bash
npm i --save-dev babel-plugin-transform-runtime

```

Modify `.babelrc`:

```json
{
  "presets": ["es2015"],
  "plugins": ["transform-runtime"]
}

```

Modify `gulpfile.bable.js`:

```javascript
gulp.task('scripts', ['clean'], () => {
  let babel = require('gulp-babel')
  return gulp.src(['lib/**/*', 'bin/**/*'], { base: process.cwd() })
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-runtime'],
    }))
    .pipe(gulp.dest('build'))
})

```

## Related

* [my-badges](https://github.com/zoubin/my-badges)
* [ezchangelog](https://github.com/zoubin/ezchangelog)
* [changen](https://github.com/th507/changen)
* [2 spaces or 4 spaces](https://github.com/zoubin/vim-tabstop)


[`tap`]: https://github.com/isaacs/node-tap
[`tape`]: https://github.com/substack/tape
[`task-tape`]: https://github.com/zoubin/task-tape
[`tap-summary`]: https://github.com/zoubin/tap-summary
[`eslint`]: https://github.com/eslint/eslint
[`babel-eslint`]: https://github.com/babel/babel-eslint
[`istanbul`]: https://github.com/SBoudrias/gulp-istanbul
[`isparta`]: https://github.com/douglasduteil/isparta
[`gulp`]: https://github.com/gulpjs/gulp
[`babel`]: https://babeljs.io/

