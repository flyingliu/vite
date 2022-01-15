define('plugin/treasureBoxes', ['jquery', 'vue', 'layer', 'template', 'proxy', 'iscroll', 'config'], function ($, Vue, layer, template, proxy, IScroll, config) {
  var hotspotArr = []
  var hotComment
  var hotspot
  var flag = false
  var currentHotspot
  var shopTextScroll
  var layerIndex = {}
  var porxy
  var panoId
  var isMb
  var i
  var elementTo = undefined
  // var TEMPLATE = '<div class="treasureBoxes click"><img src="<%=avatar%>"></div>'

  var cowryHtml = '<div id="goods1">\
						<div class="shopText2" v-show="isclick">\
							<div>\
								<p class="p1" v-show="isShow">有机会开出以下奖品:</p>\
								<img :src="shopText.thumb" v-if="shopText.thumb">\
								<h5>{{shopText.prizeName}}</h5>\
								<p class="p2">{{shopText.prizeInfo}}</p>\
								<input v-show="isShow" type="text" :value="tel" v-model="tel" placeholder="输入手机号开启宝箱"/>\
								<p class="p3" v-show="!isShow">兑换码码已发送到你的手机上，请查看短信，凭短信到商家处兑换奖品~</p>\
								<p class="button" v-show="isShow" @click="treasureBoxs()">立即开箱</p>\
							</div>\
						</div>\
						<div class="treasureInsert" :class="mystatus" v-show="!isclick"><img :src="recover">\
							<p class="content">"{{content1}}"<br>{{content2}}{{prizeName}}</p><p class="button" @click="over()">{{button}}</p>\
						</div>\
					</div>'

  var DEFAULT_OPTION = {
    align: 'center',
    isMove: false,
    x: 0,
    y: 0,
    style: null,
    isEdit: false,

    formElement: $('body')
  }

  function treasureBoxes(option) {
    var _this = this
    var height, width
    this.option = $.extend(true, {}, DEFAULT_OPTION, option, {
      callback: {
        onClick: function (data) {
          currentHotspot = this
          proxy.getLoginInfo({}, function (data) {
            if (data.success) {
              _this.vue.tel = data.data.mobile
            }
          })
          if (isMb) {
            height = '100%'
            width = '100%'
          } else {
            height = ''
            width = '320px'
          }
          // if (!(currentHotspot.data.avatar.indexOf('isOver') > -0)) {
          // // if (1) {

          // }
          var treasureBoxId = data.data.treasureBoxId
          proxy.boxCheck({
            id: treasureBoxId
          }, function (data) {
            if (data.success) {
              if (data.data == 0) {
                $('.layui-layer-title').show()
                _this.vue.isclick = true
                proxy.treasureBoxDetail({
                  id: treasureBoxId
                }, function (data) {
                  if (data.success) {
                    _this.vue.shopText = data.data[0]
                    if (_this.vue.shopText.thumb) {
                      _this.vue.shopText.thumb = _this.vue.shopText.baseUrl + _this.vue.shopText.thumb
                    }
                    setTimeout(function () {
                      layerIndex.treasureIndex = layerMsg({
                        title: '<p class="header treasureBox">发现新宝箱，开宝箱有惊喜~<i class="iconfont icon-quxiao icon-guanbi"></i></p>',
                        area: [width, height],
                        content: $('#goods1'),
                        closeBtn: 0,
                        success: function (dom, index) {
                          _this.vue.$nextTick(function () {
                            shopTextScroll = new IScroll('.shopText2', {
                              scrollX: false,
                              scrollY: true,
                              click: true,
                              mouseWheel: true
                            })
                        
                            shopTextScroll.refresh()
                            setTimeout(function () {
                              shopTextScroll.refresh()
                              $('#goods1').find('img').on("load", function () {
                                shopTextScroll.refresh()
                              })
                            }, 500)
                            $('.header i').on('click', function () {
                              layer.close(layerIndex.treasureIndex)
                            })
                          })
                        },
                        end: function () {
                          _this.vue.isShow = true
                        }
                      })
                    }, 100)
                  } else {
                    layer.msg(data.errMsg)
                  }
                })
              } else {
                layer.msg("该宝箱您已打开!")
              }
            } else {
              layer.msg(data.errMsg)
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

  var funs = treasureBoxes.prototype

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
    for (var i in this.option.data) {
      if (!this.option.data[i].iconId || this.option.data[i].iconId == 36) {
        this.option.data[i].iconId = null
        this.option.data[i].url = "//code.aoliliya.com/vr/skin/addHot/images/treasureBoxes.png"
      }
    }
    proxy.relSelect({}, function (data) {
      if (data.success) {
        if (data.data[3].treasureBoxes_hotspot) {
          if (data.data[3].treasureBoxes_hotspot.isOpen == '1') {
            hotComment = _this.treasureBoxes = _this.method.hotspot.register('treasureBoxes', _this.option)
          }
        }
      } else {
        layer.msg(data.errMsg)
      }
    })

 
    this.vue = new Vue({
      el: '#goods1',
      data: {
        isclick: false,
        isShow: true,
        shopText: {},
        mystatus: '',
        status: {
          isOver: config.codePath + 'skin/720/images/isOver.png',
          treasureNo1: config.codePath + 'skin/720/images/treasureNo1.png',
          treasureNo2: config.codePath + 'skin/720/images/treasureNo2.png',
          treasureOK: config.codePath + 'skin/720/images/treasureOK.png'
        },
        recover: '',
        content1: '',
        content2: '',
        prizeName: '',
        button: '',
        tel: ''
      },
      methods: {
        treasureBoxs: function (treasure) {
          var _this = this
          if (/^[1][3,4,5,7,8][0-9]{9}$/.test(_this.tel)) {
            currentHotspot.data.avatar = config.codePath + 'skin/720/images/isOver.png'
            $(currentHotspot.element.find('img')).attr('src', config.codePath + 'skin/720/images/isOver.png')
            $('.layui-layer-title').hide()
            $('.myclass').css('background-color', 'rgba(0,0,0,0)')
            _this.isclick = false
            if (!(yp.method.util.browser().mobile)) {
              $('.myclass').height('400px')
            } else {
              $('.layui-layer-content').height('100%')
            }
            proxy.treasureBoxInsert({
              treasureBoxId: _this.shopText.id || 1,
              mobile: _this.tel
            }, function (data) {
              // data = {'success': true,'data': {'prizeName': '小码'},'code': 0}
              if (data.success) {
                _this.mystatus = 'have'
                _this.recover = _this.status.treasureOK
                _this.content1 = '哇 ! 开出宝物啦~'
                _this.content2 = '恭喜你获得宝物  '
                _this.prizeName = data.data.prizeName
                _this.button = '去查看'
              } else {
                _this.mystatus = 'none'
                _this.recover = _this.status.treasureNo1
                _this.content1 = '哎呀~你来晚了一步,啥也没开出~'
                _this.content2 = '快去寻找其他的宝箱吧~'
                _this.button = '知道了'
              }
            })
          } else {
            layer.msg("请填写正确的手机号！")
          }

        },
        over: function () {
          if (this.button == '知道了') {
            layer.close(layerIndex.treasureIndex)
          } else {
            $('.myclass').css('background-color', 'rgba(255,255,255,1)')
            $('.myclass').height('auto')
            this.isShow = false
            this.isclick = true
            // shopTextScroll.destroy() 
            debugger
            this.$nextTick(function () {
              shopTextScroll.refresh();
              $('.layui-layer-title').show().html('<p class="header treasureBox"><i class="iconfont icon-quxiao  icon-guanbi"></i></p>')
              $('.header i').on('click', function () {
                layer.close(layerIndex.treasureIndex)
              })
            })
          }
        }
      },
      ready: function () {}
    })
  }

  funs.addComment = function (opt) {
    var _this = this
    var form = this.option.elementTo ? $(this.option.elementTo) : $('body')
    hotspot = this.treasureBoxes.addHotspot({
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
      data[i] = this.method.hotspot.finishData(data[i])
      if (data[i].iconId == 36) {
        console.log("-------36")
        data[i].iconId = null
        data[i].url = config.codePath + 'skin/720/images/treasureBoxes.png'
        data[i].avatar = config.codePath + 'skin/720/images/treasureBoxes.png'
      }
      hotspot = this.treasureBoxes.addHotspot(data[i])
      hotspot.hotspot.visible = !this.option.isEdit
    }

    if (typeof this.yp.plugin.toolbar.commentsRefresh === 'function') {
      this.yp.plugin.toolbar.commentsRefresh(data)
    }
  }

  funs.getComment = function (name) {
    return this.treasureBoxes.getHotspot(name)
  }

  funs.onNewSceneCacheData = function () {
    this.cacheData = []
    for (var i in hotspotArr) {
      this.cacheData.push(hotspotArr[i].data)
    }
    hotspotArr = []
    return this.cacheData
  }

  function layerMsg(options) {
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

  return treasureBoxes
})