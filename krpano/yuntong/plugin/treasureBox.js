define('plugin/treasureBox', ['jquery', 'vue', 'template', 'proxy', 'iscroll', 'config'], function ($, Vue, template, proxy, IScroll, config) {
  var hotspotArr = []
  var hotComment
  var hotspot
  var flag = false
  var currentHotspot
  var shopTextScroll
  var layerIndex = {}
  var porxy
  var panoId
  var i
  var elementTo = undefined
  var TEMPLATE = '<div class="comment move click">\
						<div class="comment_bg movetitle">\
							<img src="<%=avatar%>">\
						</div>\
					</div>'

  var cowryHtml = '<div id="goods1" :class="{nodata:shopList.length<1}">\
						<div class="shopText2">\
							<div>\
								<div class="body1">\
									<img :src="shopText.thumb">\
					                <h5>{{shopText.name}}</h5>\
					                <p>¥{{shopText.price}}</p>\
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
      var html = $(template(TEMPLATE, data))
      return html
    },
    url: config.codePath + '/krpano/skin/img/background.png',

    formElement: $('body')
  }

  function treasureBox (option) {
    var _this = this
    this.option = $.extend(true, {}, DEFAULT_OPTION, option, {
      callback: {
        onClick: function (data) {
          var treasureId = data.data.hotspotId
          layerIndex.cowryIndex = layerMsg({
            title: '<p class="header">宝贝<i class="iconfont icon-quxiao"></i></p>',
            area: ['640px', '696px'],
            content: $('#goods1'),
            closeBtn: 0,
            success: function (dom, index) {
              proxy.treasureDetail({
                treasureId: treasureId
              }, function (data) {
                if (data.success) {
                  yp.plugin.treasure.vue.shopText = data.data
                  setTimeout(function () {
                    shopTextScroll.iscroll.refresh()
                  }, 100)
                } else {
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
      }
    })
    this.data = {}
  }

  var funs = treasureBox.prototype

  funs.deps = ['plugin/groups', 'plugin/toolbar', 'method/hotspot', 'method/login', 'method/util']

  funs.init = function (data) {
    var yp = this.yp
    var _this = this
    for (var i in data) {
      data[i].data = {}
      data[i].data.avatar = '//code.aoliliya.com/vr/skin/720/images/heart.png'
    }
    if (data) {
      this.option.data = data
    }
    panoId = this.yp.option.panoId
    yp.element.append(cowryHtml)
    hotComment = this.treasureBox = this.method.hotspot.register('treasureBox', this.option)

    shopTextScroll = $('.shopTex21')
    shopTextScroll.iscroll = new IScroll('.shopText2', {scrollX: false,scrollY: true,click: true,mouseWheel: true})

    this.vue = new Vue({
      el: '#goods1',
      data: {
        shopText: {}
      },
      ready: function () {}
    })
  }

  funs.addComment = function (opt) {
    var _this = this
    var form = this.option.elementTo ? $(this.option.elementTo) : $('body')
    hotspot = this.treasureBox.addHotspot({
      data: {
        'avatar': '//code.aoliliya.com/vr/skin/720/images/heart.png',
        'content': '拖动到想要打标签的地方',
        'isnew': true
      }
    })

    return hotspot
  }


  funs.onnewpanodata = funs.onNewSceneData = function (data) {
    for (var i in data) {
      var hotspot = this.treasureBox.addHotspot({
        data: data[i]
      })
      
      hotspot.hotspot.visible = !this.option.isEdit
    }

    if (typeof this.yp.plugin.toolbar.commentsRefresh === 'function') {
      this.yp.plugin.toolbar.commentsRefresh(data)
    }
  }

  funs.getComment = function (name) {
    return this.treasureBox.getHotspot(name)
  }

  funs.onNewSceneCacheData = function () {
    this.cacheData = []
    for (var i in hotspotArr) {
      var spotObj = hotspotArr[i].getData()
      this.cacheData.push(spotObj)
    }
    hotspotArr = []
    return this.cacheData
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

  return treasureBox
})
