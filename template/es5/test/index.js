var test = require('tape')
var math = require('..')

test('use `t.end` to mark the end of test synchronously', function(t) {
  t.equal(
    math.precision(0),
    0
  )
  t.equal(
    math.precision(0.1),
    1
  )

  t.end()
})

test('use `t.plan` to make sure enough assertions checked', function(t) {
  t.plan(2)

  t.equal(
    math.precision(0),
    0
  )
  process.nextTick(function () {
    t.equal(
      math.precision(0.1),
      1
    )
  })
})

test('return a promise to mark the end of the test', function(t) {
  t.equal(
    math.toFixed(2.385, 2),
    '2.39'
  )
  t.equal(
    math.toFixed(2.384, 2),
    '2.38'
  )
  // the test will end when the returned promise resolves
  return new Promise(function (rs) {
    process.nextTick(function () {
      t.equal(
        math.toFixed(2.38),
        '2'
      )
      rs()
    })
  })
})

test('call the second argument to mark the end of the test', function(t, cb) {
  process.nextTick(function () {
    t.equal(
      math.add(0.34, 0.01) + '',
      '0.35'
    )
    cb()
  })
})

test('check `https://github.com/zoubin/task-tape` for more information', function(t) {
  t.task(function (cb) {
    process.nextTick(function () {
      t.equal(
        math.precision(0.1),
        1
      )
      cb()
    })
  })
})

