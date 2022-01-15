define('method/icon', function () {
  var funs = {name: 'icon'}

  funs.deps = ['method/util']

  // 获得全部style
  funs.get = function (url) {
    var styles, i, s, temp = []
    styles = this.krpano.get('style')
    if (!styles) return

    for (i in styles.getArray()) {
      s = styles.getItem(i)
      if (url && s.url == url) {
        return s
      }
      s.packagename && temp.push(s)
    }
    if (url) {
      return this.yp('未找到style，url=', url)
    }
    return temp
  }

  funs.getIcon = function (name) {
    var style = this.krpano.get('style[' + name + ']')
    if (style && style.packagename) return style
  }

  funs.getStyle = function (iconid) {
    var styleName, s
    var styles = this.krpano.get('style')
    if (!styles) return
    for (i in styles.getArray()) {
      s = styles.getItem(i)
      if (iconid && s.iconid == iconid) {
        return s
      }
    }
  }

  funs.addStyle = function (icon) {
    var styles = this.krpano.get('style')
    if (!styles) return
    var style = styles.createItem('spoticon' + icon.iconid)
    style.edge = 'center'
    style.crop = '0|0|80|80'
    style.oy = '0'
    style.isgif = '0'
    style.distorted = 'false'
    style.status = '0'
    style.scale = '1'
    style.iconid = icon.iconid
    style.packagename = 'package3'
    style.url = icon.url
  }

  funs.getIconPackage = function () {
    var self = this

    if (this.newiconpackageList)return this.newiconpackageList

    function getHotspoturl (spot, style) {
      spot.name = style.name
      spot.url = self.method.util.replaceUrl(style.url)
      spot.iconid = style.iconid
      spot.hotspotstyle = style.hotspotstyle
      spot.packagename = style.packagename
      spot.status = style.status

      if (style.thumb) {
        spot.thumb = self.method.util.replaceUrl(style.thumb)
      } else {
        spot.thumb = spot.url
      }
      return spot
    }

    var style = this.krpano.get('style').getArray()
    var iconpackageList = this.krpano.get('package').getArray()
    var newiconpackageList = []
    var spotIconList = []
    var spotGifList = []

    for (var i = 0; i < this.krpano.get('style').count; i++) {
      var spot = {}
      if (style[i].name.indexOf('spoticon') > -1) {
        spot = getHotspoturl.call(this.krpano, spot, style[i])
        if (spot && spot.status == 1) {
          spotIconList.push(spot)
        }
      }

      if (style[i].name.indexOf('spotgif') > -1) {
        spot = getHotspoturl.call(this.krpano, spot, style[i])
        if (spot && spot.status == 1) {
          spotGifList.push(spot)
        }
      }
    }

    for (var n = 0; n < this.krpano.get('package').count; n++) {
      var newiconpackage = {}
      newiconpackage.name = iconpackageList[n].name
      newiconpackage.title = iconpackageList[n].title
      newiconpackage.id = iconpackageList[n].id
      newiconpackage.thumb = iconpackageList[n].thumb
      newiconpackage.type = iconpackageList[n].type

      var styleList = []
      for (var j = 0; j < spotIconList.length; j++) {
        if (iconpackageList[n].name == spotIconList[j].packagename) {
          styleList.push(spotIconList[j])
        }
      }
      for (var x = 0; x < spotGifList.length; x++) {
        if (iconpackageList[n].name == spotGifList[x].packagename) {
          styleList.push(spotGifList[x])
        }
      }

      newiconpackage.styleList = styleList

      newiconpackageList.push(newiconpackage)
    }

    this.newiconpackageList = newiconpackageList;
    return newiconpackageList
  }

  return funs
})
