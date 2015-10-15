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

## Command line

`js-pb -h`:

```

js-pb [-htfpv] [project_directory]

  Create files and directories for developing packages in es5 or es6.
  Build: gulp
  Lint: eslint.
  Test: tape
  Coverage: istanbul
  ES6: babel

  -h, --help
    show this help text

  -t, --template
    followed by a directory path, which contains sources for a template.
    Builtins: es5, es6. `es5` is the default template

  -f, --force
    overwrite existing files

  -p, --peek
    display the structure of the active template directory

  -v, --version
    show the version


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

### Difference between es6 and babelified code

#### export default
In [es6features](https://github.com/lukehoban/es6features#modules), you can do:
```javascript
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
  return Math.log(x);
}
```

But, when using babel, **do NOT** export other things when you have export default.
The code babelified from the above one won't work.
Acutually, the export default will fail.

## Related

* [my-badges](https://github.com/zoubin/my-badges)
* [changelog generator](https://github.com/th507/changen)
* [when 2 spaces or 4 spaces matter](https://github.com/zoubin/vim-tabstop)

