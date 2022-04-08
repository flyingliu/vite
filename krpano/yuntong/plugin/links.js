define('plugin/links', ['jquery', 'template', 'proxy', 'config'], function ($, template, proxy, config) {
  var krpano
  var yp
  var currentHotspot
  var option
  var hotspotArr = []
  var listmyscroll
  var temp = "<div class='linkWrap'>\
        <dl class='linker'><dd class='select'><i class='selectList'></i></dd>\
        <dd class='change'><i></i></dd>\
        <dd class='remove'><i></i><div class='link-deleat'>\
                        <p>你确定要删除该热点吗？</p>\
                        <div>\
                            <a class='layui-layer-btn0'>确定</a>\
                            <a class='layui-layer-btn1'>取消</a>\
                        </div>\
                    </div></dd></dl></div>"

  var tempScene = '<div class="scene"><h5>选择连接场景</h5><i></i><div class="sceneList"><ul>\
            <%for (var i = 0; i < data.length; i++) {%>\
                <li id="<%=data[i].name%>"><%=data[i].title%></li>\
            <%}%>\
        </ul></div></div>'

  var tempStyle = '<div class="style"><h5>选择图标样式</h5><i></i>\
            <div class="iconStyle clearfix stylemyscroll">\
                <div class="iconList">\
                <%for(var i in package){%>\
                        <ul class="ul <%=package[i].name%>">\
                    <%for(var j in package[i].styleList){%>\
                        <li id="<%=package[i].styleList[j].name%>"><a href="javascript:void(0);"><img src="<%=package[i].styleList[j].thumb%>" /></a></li>\
                    <%}%>\
                    </ul>\
                <%}%>\
                </div>\
            </div>\
            <div class="apply">\
                <div class="img_l"><img src="<%=package.codePath%>/skin/edit/images/left.png"></div>\
                <div class="apply_nav">\
                    <ul class="packageList" style="width: 400px;">\
                    <%for(var i in package){%>\
                        <li class="<%=package[i].name%>"><a href="javascript:void(0);"></a></li>\
                    <%}%>\
                    </ul>\
                </div>\
                <div class="img_r"><img src="<%=package.codePath%>/skin/edit/images/right.png"></div>\
            </div>\
        </div>'

  var DEFAULT_OPTION = {
    element: $(temp),
    isMove: true,
    isEdit: true
  }

  function Links (option) {
    var _this = this
    this.option = option
    this.options = $.extend(true, {}, DEFAULT_OPTION, option, {
      callback: {
        onClick: function (data) {
          if (currentHotspot == this) return
          currentHotspot = this
          for (var i = 0; i < hotspotArr.length; i++) {
            hotspotArr[i].element.find('.linker').hide()
            hotspotArr[i].zorder()
          }

          if (_this.options.isEdit) {
            this.element.find('.linker').show()
          } else {
            data && data.data && data.data.linkedScene && _this.yp.method.scene.loadScene(data.data.linkedScene)
          }

          currentHotspot.zorder(true)
          _this.callwith('onClick', this, arguments)
        },
        onMoveUpdate: function (data) {
          this.yp.plugin.links.onmoveupdate(data)
        },
        onLoaded: function (data) {
          hotspotArr.push(this)
          var aspot = new spot(this.data, this)
          _this.callwith('onLoaded', this, arguments)
          if (!_this.options.isEdit) {
            var title = data.data.title
            $(this.element).find('.linkTitle').append(title)
          }
        }
      }
    })
  }

  var funs = Links.prototype
  funs.deps = ['plugin/groups', 'method/icon', 'method/hotspot', 'method/util', 'method/scene']

  funs.callwith = function (type, _this, data) {
    if (this.option.callback && typeof this.option.callback[type] === 'function') {
      this.option.callback[type].call(_this, data)
    }
  }

  funs.init = function (data) {
    if (data) {
      this.options.data = this.method.hotspot.finishDataList(data)
    }
    krpano = this.krpano
    yp = this.yp
    option = this.options
    this.links = this.method.hotspot.register('2', this.options)
  }

  funs.addLink = function (data) {
    var hotspot = this.links.addHotspot({
      style: 101,
      data: {}
    })
    hotspot.option.callback.onClick.apply(hotspot)
    return hotspot
  }

  funs.removeLink = function (hotspot) {
    hotspot = hotspot || currentHotspot
    // console.log(hotspot)
    for (var i in hotspotArr) {
      if (hotspotArr[i] === hotspot) {
        hotspotArr.splice(i, 1)
      }
    }
    var data = {
      id: hotspot.data.hotspotId,
      belongPanoId: getQueryString('id')
    }
    if (data.id) {
      proxy.removeLink(data, function (data) {
        if (data.success) {
          hotspot.remove()
        }
      })
    } else {
      hotspot.remove()
    }
  }

  funs.getLink = function (name) {
    return this.links.getHotspot(name)
  }

  funs.toggleLink = function (flag) {
    var links = this.getLink()
    for (var i = 0; i < links.length; i++) {
      links[i].hotspot.visible = flag
    }
  }

  funs.gotoCenter = function (flag) {
    var h = currentHotspot.hotspot
    h.ath = krpano.view.hlookat
    h.atv = krpano.view.vlookat
  }

  funs.saveHotspot = function (scenename) {
    var h = currentHotspot.hotspot
    var postData = {
      atv: h.atv,
      ath: h.ath,
      mainPanoId: getQueryString('id'),
      panoId: this.yp.plugin.groups.getCurrScene().id,
      linkedId: yp.method.scene.getScene(scenename).id,
      linkedScene: scenename,
      type: currentHotspot.option.hotspotType,
      iconId: parseInt(yp.method.icon.getIcon(h.style).iconid),
      hotspotType: currentHotspot.option.hotspotType,
      id: currentHotspot.data.hotspotId
    }

    // console.log(scenename)
    proxy.addLink(postData, function (data) {
      if (data.success) {
        layer.msg('保存成功')
        currentHotspot.data.hotspotId = data.id
        addLinksFlag = true
      }
    })
  }

  funs.onmoveupdate = function (data) {
    // console.log(data.data.hotspotId)
    if (data.data.hotspotId) {
      proxy.addLink({
        atv: data.atv,
        ath: data.ath,
        id: data.data.hotspotId,
        mainPanoId: getQueryString('id')
      }, function (data) {
        if (!data.success) {
          // console.log(data.errMsg)
          return
        } else {
          // msg("修改成功")
        }
      })
    }
  }

  funs.onnewpanodata = funs.onNewSceneData = function (data) {
    for (var i in data) {
      this.links.addHotspot(this.method.hotspot.finishData(data[i])
      )
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

  // funs.onnewpanodata = function(data) {
  //     this.cacheData = []
  //     hotspotArr = []
  //     this.init(data)
  // }

  var spot = function (data, hotspot) {
    var dom = $(hotspot.sprite)
    this.initLink(data, hotspot)
    this.initLabel(data, hotspot)
    this.bindEvent(data, hotspot)
  }

  var fn = spot.prototype

  fn.initLabel = function (data, hotspot) {
    var dom = $(hotspot.hotspot.sprite)
    var icon = yp.method.icon.getIconPackage()
    icon.codePath = config.codePath
    var html = $(template(tempStyle, { package: icon }))
    dom.find('.change').append(html)
    lableDom = dom.find('.change')
    lableDom.on('click', 'li', function () {
      var name = this.id
      var curPackage = this.className
      if (!!curPackage) {
        $(this).addClass('action').siblings().removeClass('action')
        $(this).parents('.apply').siblings('.iconStyle ').find('.' + curPackage).addClass('action').siblings().removeClass('action')
      }!!name && currentHotspot.update({ style: name })
    })
  }

  fn.initLink = function (data, hotspot) {
    var dom = $(hotspot.hotspot.sprite)
    var scenes = yp.method.scene.getScene()
    var html = $(template(tempScene, { data: scenes }))
    var selectDom = dom.find('.select')
    var changeDom = dom.find('.change')
    data.sceneName = data && data.sceneName && data.sceneName.toLowerCase()
    var currScenes = yp.method.scene.getScene(data.sceneName)
    // console.log(currScenes)
    // console.log(data.sceneName)
    var linkDom = dom.find('.linkTitle')
    var isEdit = option.isEdit
    var ul = dom.find('.ul')
    if (currScenes) {
      selectDom.append(html)
      selectDom.find('#' + data.sceneName).addClass('curr')
      selectDom.on('click', 'li', function () {
        linkDom.text($(this).text())
        $(this).addClass('action').siblings().removeClass('action')
        data.sceneName = this.id
        yp.plugin.links.saveHotspot(data.sceneName)
      })

      if (data.sceneName) {
        changeDom.on('click', '.ul li', function () {
          linkDom.text($(this).text())
          yp.plugin.links.saveHotspot(data.sceneName)
        })
      }

      // 点击标题跳转场景
      linkDom.text(currScenes.title)
      // linkDom.on("click",function(){
      //     sceneName && yp.method.scene.loadScene(sceneName)
      // }) 

    } else {
      hotspot.remove()
    }
  }

  fn.bindEvent = function (data, hotspot) {
    var dom = $(hotspot.hotspot.sprite)
    var styleMyscroll
    dom.delegate('.remove i', 'click', function () {
      $(this).parents('.remove').addClass('action').siblings().removeClass('action')
    })
    dom.delegate('.change i', 'click', function () {
      $(this).parents('.change').addClass('action').siblings().removeClass('action')

      var stylemyscrolldom = $(this).parents('.change').find('.stylemyscroll')[0]
      requirejs(['iscroll'], function (IScroll) {
        stylemyscroll = new IScroll(stylemyscrolldom, { mouseWheel: false, click: true })
        document.addEventListener('touchmove', function (e) {
          e.preventDefault()
        }, false)
        $(stylemyscrolldom).on('mousedown', function () {
          return false
        })
      })
    })

    dom.delegate('.layui-layer-btn0', 'click', function () {
      yp.plugin.links.removeLink()
      $(this).parents('.linkWrap').parent('div').remove()
      addLinksFlag = true
    })
    dom.delegate('.layui-layer-btn1', 'click', function () {
      $(this).parents('.remove').removeClass('action')
    })
    dom.delegate('.iconStyle li,.style i', 'click', function () {
      $(this).parents('.change').removeClass('action')
    })
    dom.delegate('.scene i,.scene li', 'click', function () {
      $(this).parents('.select').removeClass('action')
    })

    dom.delegate('.selectList', 'click', function () {
      $(this).parents('.select').addClass('action').siblings().removeClass('action')
      var sceneList = $(template(tempScene, { data: yp.method.scene.getScene() }))
      $(this).siblings('.scene').remove()
      $(this).parent('.select').append(sceneList)
      $(this).parents('.select').find('#' + data.sceneName).addClass('curr')
      var listmyscrolldom = $(this).parent('.select').find('.sceneList')[0]
      requirejs(['iscroll'], function (IScroll) {
        listmyscroll = new IScroll(listmyscrolldom, { mouseWheel: false, click: true })
        document.addEventListener('touchmove', function (e) {
          e.preventDefault()
        }, false)
        $(listmyscrolldom).on('mousedown', function () {
          return false
        })
      })
    })

    dom.delegate('.scene li', 'click', function () {
      $(this).addClass('curr').siblings().removeClass('curr')
    })

    dom.find('.packageList li:first-child,.iconList ul:first-child').addClass('action')

    dom.delegate('.packageList li', 'click', function () {
      stylemyscroll.refresh()
    })

    var length = $('.packageList li').length - 1
    var stop = 0
    // console.log(length)
    dom.delegate('.img_r', 'click', function () {
      if (stop > 3) {
        return
      }
      stop++
      $(this).siblings('.apply_nav').find('.packageList').animate({ left: '-=50px' }, 500)
    })

    dom.delegate('.img_l', 'click', function () {
      if (stop < 1) {
        return
      }
      stop--
      $(this).siblings('.apply_nav').find('.packageList').animate({ left: '+=50px' }, 500)
    })
  }

  return Links
})
