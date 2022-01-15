define('plugin/heres', ['jquery', 'template', 'proxy', 'config', 'vue'], function ($, template, proxy, config, Vue) {
  var hotspotArr = []
  var hotspot
  var flag = false
  var currentHotspot
  var porxy
  var panoId
  var i
  var elementTo = undefined
  var TEMPLATE = '<div class="heres heretypes move click" :data-id="hotspotId">\
        <div class="heart" :class="{empty:!picFileThumb}"><i  v-if="type == 1 && picFileCount > 1" class="number">{{picFileCount}}</i><i v-if="type == 1 && hasFile > 0 " class="icon sound"></i><i v-if="type == 2" class="icon video"></i>\
        <img v-if="picFileThumb" :src="filePath + picFileThumb"></div>\
        <i class="avatar"><img class="img" v-if="avatar" :src="filePath + avatar"></i></div>'
  var DEFAULT_OPTION = {
    align: 'center',
    isMove: true,
    url: config.codePath + 'krpano/skin/img/background.png',
    iconId: false,
    element: TEMPLATE,
    callback: {
      onClick: function () {
        currentHotspot = this
        for (var i = 0; i < hotspotArr.length; i++) {
          hotspotArr[i].element.find('.linker').hide()
          hotspotArr[i].zorder()
        }
        currentHotspot.zorder(true)
        console.log(this.data)
        var appData = {
          hotspotId: +this.data.hotspotId,
          id: +this.data.id,
          flag: 1
        }
        if (typeof this.yp.plugin.toolbar.browser == 'function') {
          this.yp.plugin.toolbar.browser()
        }
        if (appData.id) {
          console.log(appData)
          proxy.postMessage('clickHere', appData)
        }
      },
      onLoaded: function () {
        hotspotArr.push(this)
        var element = this.element[0]
        this.vm = new Vue({
          el: element,
          data: {
            filePath: config.filePath,
            avatar: this.data.avatar,
            type: this.data.type,
            hotspotId: this.data.hotspotId,
            hasFile: this.data.hasFile,
            picFileThumb: this.data.picFileThumb,
            picFileCount: this.data.picFileCount
          }
        })
      },
      onAddHotspot: function () {
        currentHotspot = this
      }
    }
  }

  function Heres (option) {
    this.option = $.extend(true, {}, DEFAULT_OPTION, option)
  }

  var funs = Heres.prototype

  funs.deps = ['plugin/groups',
    'method/hotspot',
    'method/login',
    'method/util'
  ]

  funs.init = function (data) {
    this.option.data = this.method.hotspot.finishDataList(data)
    this.here = this.method.hotspot.register('here', this.option)
  }

  funs.addHere = function (opt) {
    opt = opt || {
      url: config.codePath + 'krpano/skin/img/background.png',
      iconId: false,
      data: {}
    }
    var hotspot = this.here.addHotspot(opt)
    return hotspot
  }

  function positionHotsopt (hotspotId) {
    var heres = yp.plugin.heres.getHeres()
    for (var i in heres) {
      if (heres[i].hotspotId == hotspotId) {
        console.log(heres[i])
      }
    }
  }

  config.hotspotId && positionHotsopt(config.hotspotId)

  funs.onnewscene = function () {
    var _this = this
    var heres = this.yp.plugin.heres.getHeres()
    proxy.hereListForSpace({
      spaceId: this.yp.method.scene.getCurrScene().id,
      hotspotId: config.hotspotId ? config.hotspotId : undefined
    }, function (data) {
      if (data.success) {
        var hereData = data.data
        for (var i in hereData) {
          var hereObj = {
            ath: hereData[i].ath,
            atv: hereData[i].atv,
            data: hereData[i]
          }
          var ishave = false
          for (var h in heres) {
            if (heres[h].data.hotspotId == hereData[i].hotspotId) {
              ishave = true
              break
            }
          }
          if (!ishave) {_this.addHere(hereObj) }
        }
        heres = _this.yp.plugin.heres.getHeres()
        if (config.hotspotId) {
          for (var k in heres) {
            if (heres[k].data.hotspotId == config.hotspotId) {
              config.hotspotId == undefined
              _this.krpano.call('moveto(' + heres[k].hotspot.ath + ',' + heres[k].hotspot.atv + ',' + ',smooth(100,50,20))')
              var hotspotData = {
                hotspotId: +heres[k].data.hotspotId,
                id: +heres[k].data.id,
                flag: 1
              }
              proxy.postMessage('clickHere', hotspotData)
              break
            }
          }
        }
      }
    }, function (err) {
      console.log(err)
    })
  }

  funs.removeHere = function (hotspot) {
    var hotspot = hotspot || currentHotspot
    for (var i in hotspotArr) {
      if (hotspotArr[i] === hotspot) {
        hotspotArr.splice(i, 1)
      }
    }
    hotspot && hotspot.remove()
  }

  funs.getPosition = function (hotspot) {
    var hotspot = hotspot || currentHotspot
    if (hotspot) {
      var posi = {
        ath: hotspot.hotspot.ath,
        atv: hotspot.hotspot.atv,
        sceneId: config.id,
        spaceId: +yp.method.scene.getCurrScene().id
      }
      proxy.postMessage('getPosition', posi)
      console.log(posi)
      return posi
    }
  }

  funs.removeAll = function () {
    var list = this.heres.getHere()

    for (var i in list) {
      list[i].remove()
    }

    this.here.getHotspot().splice(0)
    hotspotArr = []
  }

  funs.onmoveupdate = function (data, hotspot) {}

  funs.getHeres = function (name) {
    return this.here.getHotspot(name)
  }

  funs.switch = function (flag) {
    for (var i in hotspotArr) {
      flag == undefined && (flag = !this.yp.settings.switch_comment)
      hotspotArr[i].hotspot.visible = flag == true
    }
  }

  // funs.onNewSceneData = function(data) {
  //     for (var i in data) {
  //         var hotspot = {
  //             ath: data[i].ath,
  //             atv: data[i].atv,
  //             data: data[i]
  //         }
  //         this.here.addHotspot(hotspot)
  //     }
  // }

  // funs.onNewSceneCacheData = function() {
  //     this.cacheData = []
  //     for (var i in hotspotArr) {
  //         var spotObj = hotspotArr[i].data
  //         this.cacheData.push(spotObj)
  //     }
  //     hotspotArr = []
  //     return this.cacheData
  // }

  return Heres
})
