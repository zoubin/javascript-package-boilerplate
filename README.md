# javascript-package-boilerplate
Boilerplate for developing javascript packages

[![npm](https://nodei.co/npm/js-pb.png?downloads=true)](https://www.npmjs.org/package/js-pb)

[![version](https://img.shields.io/npm/v/js-pb.svg)](https://www.npmjs.org/package/js-pb)
[![status](https://travis-ci.org/zoubin/javascript-package-boilerplate.svg?branch=master)](https://travis-ci.org/zoubin/javascript-package-boilerplate)
[![dependencies](https://david-dm.org/zoubin/javascript-package-boilerplate.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate)
[![devDependencies](https://david-dm.org/zoubin/javascript-package-boilerplate/dev-status.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate#info=devDependencies)

## Usage

```bash
npm i -g js-pb

mkdir your_project

cd your_project

# create `package.json`
npm init

# create files
# for developing es5
js-pb
# for developing es6
js-pb -t es6

npm install

# test the sample code
gulp

# coding

# check coverage
npm test

# commit your code and bump version

gulp build

cd build

npm publish

```

## All in one

### Gulp

* [gulp](https://github.com/gulpjs/gulp)

### Lint

* [eslint](https://github.com/eslint/eslint)

### Test

* [tape](https://github.com/substack/tape)
* [task-tape](https://github.com/zoubin/task-tape)

### Coverage

* [istanbul](https://github.com/SBoudrias/gulp-istanbul)
* [isparta](https://github.com/douglasduteil/isparta).

### es6

* [babel](https://babeljs.io/)
* [lukehoban#es6features](https://github.com/lukehoban/es6features)
* [ecma-262 6th edition](http://www.ecma-international.org/ecma-262/6.0/)
* [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Related

* [my-badges](https://github.com/zoubin/my-badges)

