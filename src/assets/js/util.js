export const getFontName = (url) => url.split('/').reverse()[0].split('.')[0]

export const familyList = [
  '/fonts/卢中南.woff',
  '/fonts/徐冰.woff'
]

export const sortBy = (attr, rev) => {
  if (rev == undefined) {
    rev = 1
  } else {
    rev = rev ? 1 : -1
  }
  return function (a, b) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return rev * -1
    }
    if (a > b) {
      return rev * 1
    }
    return 0
  }
}
