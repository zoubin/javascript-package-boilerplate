
// bugfix: (2.385).toFixed(2) === '2.38'
exports.toFixed = toFixed
function toFixed(num, digits) {
  digits = ~~digits
  if (!digits) {
    return '' + Math.round(num)
  }
  var str = num + 'e' + digits
  num = Math.round(str)
  str = num + 'e' + -digits
  return '' + +str
}

// bugfix: 0.34 + 0.01 === 0.35000000000000003
exports.add = add
function add(a, b) {
  var p = Math.max(precision(a), precision(b))
  if (!p) {
    return +a + +b
  }
  var as = a + 'e' + p
  var bs = b + 'e' + p
  var sum = +as + +bs
  return +(sum + 'e-' + p)
}

exports.precision = precision
function precision(num) {
  num = +num
  if (~~num === num) {
    return 0
  }
  var str = '' + num
  return str.length - 1 - str.indexOf('.')
}

