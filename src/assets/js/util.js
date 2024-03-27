export const getFontName = (url) => url.split('/').reverse()[0].split('.')[0]

export const familyList = [
  'https://qiniu.easywe.net/css/fonts/卢中南.woff',
  '/fonts/徐冰.woff',
  'https://qiniu.easywe.net/css/fonts/毛泽东草书.ttf',
  'https://qiniu.easywe.net/css/fonts/方正小篆.TTF'
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

export class Cache {

  constructor (vm, option = {}) {
    this.option = option

    this.cache = new Map()

    this.vm = vm
  }

  hash (para) {
    return JSON.stringify(para)
  }

  api (fetchName, para) {
    const cacheName = fetchName + this.hash(para)

    return new Promise((resole, reject) => {

      if (this.cache.has(cacheName)) {
        return resole({data: this.cache.get(cacheName)})
      }

      if (!this.option.api) {
        console.error('请传入api对象')

        return
      } else if (typeof this.option.api[fetchName] === 'function') {
        this.option.api[fetchName](para).then(res => {
          if(res.code === 200) {
            this.cache.set(cacheName, res.data)
            return resole({ data: res.data})
          } else {
            this.vm.$message(res.msg)
            return reject({ data: res})
          }
        }).catch(err => {

          console.error(err)

          return reject(err)
        })
      }
    })
  }

}
