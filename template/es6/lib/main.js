// This is copied from [math-hacker](https://github.com/zoubin/math-hacker/blob/master/index.js)

// bugfix: (2.385).toFixed(2) === '2.38'
export function toFixed(num, digits) {
  digits = ~~digits
  if (!digits) {
    return '' + Math.round(num)
  }
  let str = num + 'e' + digits
  num = Math.round(str)
  str = num + 'e' + -digits
  num = +str + ''
  let p = precision(num)
  if (p === 0) {
    num += '.'
  }
  while (p++ < digits) {
    num += '0'
  }
  return num
}

// bugfix: 0.34 + 0.01 === 0.35000000000000003
export function add(a, b) {
  let p = Math.max(precision(a), precision(b))
  if (!p) {
    return +a + +b
  }
  let as = a + 'e' + p
  let bs = b + 'e' + p
  let sum = +as + +bs
  return +(sum + 'e-' + p)
}

export function precision(num) {
  num = +num
  if (~~num === num) {
    return 0
  }
  let str = '' + num
  return str.length - 1 - str.indexOf('.')
}
