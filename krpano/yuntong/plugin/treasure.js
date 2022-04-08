define('plugin/treasure', ['jquery', 'vue', 'layer', 'template', 'proxy', 'iscroll', 'config'], function ($, Vue, layer, template, proxy, IScroll, config) {
  var hotspotArr = []
  var hotComment
  var hotspot
  var flag = false
  var currentHotspot
  var shopTextScroll
  var isMb
  var layerIndex = {}
  var porxy
  var panoId
  var i
  var elementTo = undefined
  var TEMPLATE = '<div class="treasure click move"><img src="<%=avatar%>"></div>'

  var cowryHtml = '<div id="goods2">\
						<div class="shopText1">\
							<div>\
								<div class="body1">\
									<img :src="shopText.thumb">\
					                <h5>{{shopText.name}}</h5>\
					                <p v-if="!shopText.isNegotiabled">¥{{shopText.price}}</p>\
					                <p v-else>面议</p>\
					                <a href="{{shopText.url}}" target="_blank" v-show="shopText.url">去购买</a>\
								</div>\
								<div class="body2">\
									<li v-for="lists in shopText.unitList"><img v-show="lists.type==1" :src="lists.image"><p v-show="lists.type==2" class="p2" :class="{center:lists.align==2,right:lists.align==3}">{{lists.text}}</p></li>\
								</div>\
							</div>\
						</div>\
					</div>'

  var DEFAULT_OPTION = {
    align: 'center',
    isMove: true,
    x: 0,
    y: 0,
    style: null,
    isEdit: false,
    element: function (data) {
      data.avatar = config.codePath + 'skin/720/images/treasure.png'
      var html = $(template(TEMPLATE, data))
      return html
    },

    callback: {
      onClick: function (data) {
        var treasureId = data.data.treasureId
        if (isMb) {
          height = '100%'
          width = '100%'
        } else {
          height = '696px'
          width = '640px'
        }
        layerIndex.cowryIndex = layerMsg({
          title: '<p class="header">宝贝<i class="iconfont icon-quxiao"></i></p>',
          area: [width, height],
          content: $('#goods2'),
          closeBtn: 0,
          success: function (dom, index) {
            proxy.treasureDetail({
              treasureId: treasureId
            }, function (data) {
              if (data.success) {
                yp.plugin.treasure.vue.shopText = data.data
                yp.plugin.treasure.vue.$nextTick(function () {
                  shopTextScroll.iscroll.refresh()
                  $('#goods2').find('img').load(function () {
                    shopTextScroll.iscroll.refresh()
                  })
                })
              } else {
                layer.msg(data.errMsg)
              }
            })
            $('.header i').click(function () {
              layer.close(layerIndex.cowryIndex)
            })
          }
        })
      },
      onLoaded: function (data) {
        console.log('11111')
        hotspotArr.push(this)
      },
      onAddHotspot: function () {
        currentHotspot = this
      }
    },

    url: config.codePath + '/krpano/skin/img/background.png',

    formElement: $('body')
  }

  function treasure (option) {
    var _this = this
    var height,width
    this.option = $.extend(true, {}, DEFAULT_OPTION, option)
    this.data = {}
  }

  var funs = treasure.prototype

  funs.deps = ['plugin/groups', 'plugin/toolbar', 'method/hotspot', 'method/login', 'method/util']

  funs.init = function (data) {
    var yp = this.yp
    var _this = this
    isMb = yp.method.util.browser().mobile
    if (data) {
      this.option.data = this.method.hotspot.finishDataList(data)
    }
    panoId = this.yp.option.panoId
    yp.element.append(cowryHtml)
    proxy.relSelect({}, function (data) {
      if (data.success) {
        if (data.data[3].treasure_hotspot) {
          if (data.data[3].treasure_hotspot.isOpen == '1') {
            hotComment = _this.treasure = _this.method.hotspot.register('treasure', _this.option)
          }
        }
      } else {
        layer.msg(data.errMsg)
      }
    })

    shopTextScroll = $('.shopText1')
    shopTextScroll.iscroll = new IScroll('.shopText1', {scrollX: false,scrollY: true,click: true,mouseWheel: true})

    this.vue = new Vue({
      el: '#goods2',
      data: {
        shopText: {}
      },
      ready: function () {}
    })
  }

  funs.addComment = function (opt) {
    var _this = this
    var form = this.option.elementTo ? $(this.option.elementTo) : $('body')
    hotspot = this.treasure.addHotspot({
      data: {
        'avatar': '//code.aoliliya.com/vr/skin/720/images/treasure.png',
        'content': '拖动到想要打标签的地方',
        'isnew': true
      }
    })

    return hotspot
  }

  funs.onnewpanodata = funs.onNewSceneData = function (data) {
    for (var i in data) {
      data[i].avatar = config.codePath + 'skin/720/images/treasure.png'

      hotspot = this.treasure.addHotspot(this.method.hotspot.finishData(data[i]))
      hotspot.hotspot.visible = !this.option.isEdit
    }

    if (typeof this.yp.plugin.toolbar.commentsRefresh === 'function') {
      this.yp.plugin.toolbar.commentsRefresh(data)
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

  funs.getComment = function (name) {
    return this.treasure.getHotspot(name)
  }

  function layerMsg (options) {
    var area
    if ($(window).width() > 1000) {
      area = ['1000px', 'auto']
    } else {
      area = ['92%', 'auto']
    }
    return layer.open(
      $.extend({
        zIndex: 33333333,
        type: 1,
        title: false,
        closeBtn: 1,
        shadeClose: true,
        shade: .7,
        skin: 'myclass',
        content: '自定义HTML内容',
        area: area,
        move: false

      }, options)
    )
  }

  return treasure
})
