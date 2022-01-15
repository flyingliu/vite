define(['proxy', 'vue', 'config', 'iscroll', 'layer'], function (proxy, Vue, config, IScroll, layer) {
  var krpano
  var yp
  var currentHotspot
  var option
  var hotspotArr = []
  var icon
  var myDropzone
  var options
  var vm, firstIconId
  var id = config.id
  var loading = false
  var linksList = ''

  var DEFAULT_OPTION = {
    element: "<div class='linkWrap'><a class='linkTitle click'></a></div>",
    isMove: false,
    isEdit: false
  }

  function ringMaterial (option) {
    var _this = this
    this.defaultOption = option
    this.option = $.extend(true, {}, DEFAULT_OPTION, option, {
      callback: {
        onLoaded: function (data) {
          $(this.element).find('.linkTitle').html(data.data.name)
          hotspotArr.push(this)
          this.hotspotSpot = true
          _this.callwith('onLoaded', this, arguments)
        },
        onClick: function () {
          if (loading) return
          loading = true
          proxy.ringMaterialSelect({
            id: this.data.ringMaterialId
          }, function (data) {
            loading = false
            if (data.success) {
              var item = data.data
              var imageList = []
              var musicAudio
              for (var i = 0; i < item.list.length; i++) {
                imageList.push(config.filePath + item.list[i])
              }
              layer.open({
                type: 1,
                title: false,
                shift: 2,
                zIndex: 199989899,
                skin: 'ally3DeyeBox',
                shadeClose: true,
                area: ['80vw', '80vh'],
                content: '<div class="myviews"><i class="iconaudio active"></i></div>',
                success: function (elem) {
                  if (item.musicUrl) {
                    musicAudio = new Audio(config.filePath + item.musicUrl)
                    musicAudio.play()
                    $(elem).find('.iconaudio').click(function () {
                      if (musicAudio.paused) {
                        musicAudio.play()
                        $(this).addClass('active')
                      } else {
                        musicAudio.pause()
                        $(this).removeClass('active')
                      }
                    })
                  } else {
                    $(elem).find('.iconaudio').hide()
                  }

                  $(elem).find('.myviews').css({
                    'background': item.color,
                    'width': '100%',
                    'height': '100%'
                  }).ally3dEye({
                    rotateTime: 30 * item.speed,
                    render: 'canvas',
                    imageList: imageList,
                    rotate: item.rotate
                  })
                },
                end: function () {
                  if (musicAudio) {
                    musicAudio.pause()
                    musicAudio = null
                  }
                }
              })
            }
          })
        // data && data.data && data.data.linkedScene && _this.yp.method.scene.loadScene(data.data.linkedScene)
        },
        onMoveUpdate: function (data) {
          currentHotspot = this
          _this.yp.plugin.links.onmoveupdate(data, currentHotspot)
        }
      }
    })
  }

  var funs = ringMaterial.prototype
  funs.deps = ['method/icon']

  funs.callwith = function (type, _this, data) {
    if (this.defaultOption.callback && typeof this.defaultOption.callback[type] === 'function') {
      this.defaultOption.callback[type].call(_this, data)
    }
  }

  funs.init = function (data) {
    var _this = this
    var yp = this.yp
    firstIconId = parseInt(_this.yp.method.icon.getIconPackage()[0].styleList[0].iconid)
    id = config.id
    this.option.data = this.method.hotspot.finishDataList(data)
    this.links = this.method.hotspot.register('ringMaterial', this.option)
    this.yp.element.append(linksList)
    var url = config.basePath + '/pano/upload'
  }

  funs.addLink = function (data) {
    var hotspot = this.links.addHotspot({
      iconId: firstIconId,
      hotspotSpot: true,
      x: parseInt(($(window).width() - 700) * 0.5),
      y: parseInt(($(window).height() - 400) * 0.5),
      data: {}
    })
    hotspot.option.callback.onClick.apply(hotspot)
    return hotspot
  }

  funs.removeLink = function (hotspot) {}

  funs.getLink = function (name) {
    return this.links.getHotspot(name)
  }

  funs.saveHotspot = function (data, currentHotspot) {}

  funs.updataHotspot = function (name, hotspot) {}

  funs.onmoveupdate = function (data, currentHotspot) {}

  funs.onNewSceneData = function (data) {
    for (var i in data) {
      this.links.addHotspot(this.method.hotspot.finishData(data[i]))
    }
  }

  funs.onNewSceneCacheData = function () {
    this.cacheData = []
    for (var i in hotspotArr) {
      var spotObj = hotspotArr[i].getOldData()
      this.cacheData.push(spotObj)
    }
    hotspotArr = []
    return this.cacheData
  }

  return ringMaterial
})
