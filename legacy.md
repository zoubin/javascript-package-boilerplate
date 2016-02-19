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

[`gulp`]: https://github.com/gulpjs/gulp
[`babel`]: https://babeljs.io/
