class Util {
  constructor (krpano) {
    this.krpano = krpano
  }
  createItem (addName, name) {
    if (typeof this.krpano[addName].createItem != 'function' || typeof this.krpano[addName].getArray != 'function') {
      return
    }
    var obj = this.krpano[addName].getItem(name)
    return obj ? obj : (obj = this.krpano[addName].createItem(name), obj.keep = true, obj)
  }
  init () {
    this.device = this.krpano.device
  }

  include (url) {
    this.files = this.files || []
    if (typeof url === 'string' && this.files.indexOf(url) < 0) {
      this.files.push(url)
      this.krpano.call('loadxml(\'<krpano><include url="' + url + '" /></krpano>\')')
    }
  }

  replaceUrl (url) {
    // return url.replace("pano/%SWFPATH%" ,"https://ypano.duc.cn/krpano")
    if (url && url.indexOf('%SWFPATH%') > -1) {
      var reg = new RegExp('^.*%SWFPATH%')
      var basePath = '/krpano'
      return basePath + url.replace(reg, '')
    } else if (url && url.indexOf('%BASEDIR%') > -1) {
      var reg = new RegExp('^.*%BASEDIR%')
      var basePath = '/'
      return basePath + url.replace(reg, '')
    } else {
      return url
    }
  }

}

export { Util }
