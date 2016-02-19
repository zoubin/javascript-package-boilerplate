# javascript-package-boilerplate
[![version](https://img.shields.io/npm/v/js-pb.svg)](https://www.npmjs.org/package/js-pb)
[![status](https://travis-ci.org/zoubin/javascript-package-boilerplate.svg?branch=master)](https://travis-ci.org/zoubin/javascript-package-boilerplate)
[![dependencies](https://david-dm.org/zoubin/javascript-package-boilerplate.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate)
[![devDependencies](https://david-dm.org/zoubin/javascript-package-boilerplate/dev-status.svg)](https://david-dm.org/zoubin/javascript-package-boilerplate#info=devDependencies)

Boilerplate for developing javascript packages.

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

## Develope with stable Node.js version
Develope a package for the latest Node.js.

`package.json`:

```json
{
  "main": "index.js",
  "scripts": {
    "test": "npm run lint && tap test/*.js",
    "cov": "tap --cov test/*.js",
    "lint": "eslint *.js 'lib/**/*.js' test/*.js bin/*.js",
    "coveralls": "COVERALLS_REPO_TOKEN=REPO_TOKEN npm run cov"
  },
  "devDependencies": {
    "eslint": "^2.1.0",
    "tap": "^5.0.0"
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


## Related

* [my-badges](https://github.com/zoubin/my-badges)
* [ezchangelog](https://github.com/zoubin/ezchangelog)
* [changen](https://github.com/th507/changen)
* [2 spaces or 4 spaces](https://github.com/zoubin/vim-tabstop)


[`tap`]: https://github.com/isaacs/node-tap
[`eslint`]: https://github.com/eslint/eslint

