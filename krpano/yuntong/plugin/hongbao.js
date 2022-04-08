define(['jquery', 'vue', 'layer', 'template', 'proxy', 'iscroll', 'config',
'css!skin/720/css/hongbao'], function ($, Vue, layer, template, proxy, IScroll, config) {
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

    var cowryHtml = '<div id="hongbao">\
        <div class="hongbao" v-if="status">\
    <div class="redtop">\
        <i class="redclose" @click="close"></i>\
    </div>\
    <div v-if="status == 1" class="guize">\
        <p><input class="input" type="text" maxlength="30" @keyup="clearError" v-model="hongbao.alipayId" placeholder="输入支付宝账号领取红包" /></p>\
        <p><input class="input" type="text" maxlength="20" @keyup="clearError" v-model="hongbao.name" placeholder="姓名" /></p>\
        <p><input class="input" type="text" maxlength="11" @keyup="clearError" v-model="hongbao.mobile" placeholder="手机号" /></p>\
        <div class="btn"  @click="bindAlipay">领取红包</div>\
        <div class="error" v-if="errorMsg">{{errorMsg}}</div>\
        <h5>活动规则</h5>\
        <div class="con">1.领取的现金直接发放在支付宝账户，请注意查收<br>\
        2.支付宝账户必须实名认证，否则红包领取失败！</div>\
    </div>\
    <div v-if="status == 2">\
        <div class="redstart">\
            <div class="waiting">\
                <h2>红包已被抢光</h2>\
                <i class="redtime"></i><p>下次早点过来吧</p>\
            </div>\
        </div>\
    </div>\
    <div v-if="status == 3">\
      <div class="redend">\
          <div class="money">\
              <span>{{hongbao.orderPrice}}</span>\
          </div>\
      </div>\
    </div>\
</div><div>'

    var DEFAULT_OPTION = {
        align: 'center',
        isMove: false,
        x: 0,
        y: 0,
        style: null,
        isEdit: false,
        formElement: $('body')
    }

    function hongbao(option) {
        var _this = this
        this.option = $.extend(true, {}, DEFAULT_OPTION, option, {
            callback: {
                onClick: function (data) {
                    var content = data.data.content
                    currentHotspot = this
                    proxy.getLoginInfo({}, function (data) {
                        if (data.success) {
                            _this.vue.hongbao.mobile = data.data.mobile
                            _this.vue.hongbao.name = data.data.nickname
                            proxy.couponOrderCheck({
                                couponOrderId: content
                            }, function (data) {
                                if (data.success) {
                                    if (data.data == 0) {
                                        _this.vue.status = 1
                                        _this.vue.couponOrderGetAlipay()
                                        _this.vue.hongbao.couponOrderId = content
                                    } else {
                                        layer.msg("该红包您已领取!")
                                    }
                                } else {
                                    layer.msg(data.errMsg)
                                }
                            })
                        } else {
                            window.location.href = "https://login.aoliliya.com/?redirectURL=" + encodeURIComponent(location.href)
                            return false;
                        }
                    })
                    

                },
                onLoaded: function (data) {
                    // this.hotspot.edge = "lefttop"
                    hotspotArr.push(this)
                },
                onAddHotspot: function () {
                    currentHotspot = this
                }
            }
        })
        this.data = {}
    }

    var funs = hongbao.prototype

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
            this.option.data[i].iconId = null
            this.option.data[i].url = "//code.aoliliya.com/vr/skin/addHot/images/hongbao.png"
        }
        proxy.relSelect({}, function (data) {
            if (data.success) {
                if (data.data[3].hongbao_hotspot) {
                    if (data.data[3].hongbao_hotspot.isOpen == '1') {
                        hotComment = _this.hongbao = _this.method.hotspot.register('hongbao', _this.option)
                    }
                }
            } else {
                layer.msg(data.errMsg)
            }
        })



        this.vue = new Vue({
            el: '#hongbao',
            data: function () {
                return {
                    status: 0,
                    couponOrderId: '',
                    errorMsg:'',
                    hongbao: {
                        name: '',
                        mobile: '',
                        cardId: getQueryString('cardId'),
                        couponOrderId: '',
                        alipayId: '',
                        orderPrice:''
                    },
                    cardId: getQueryString('cardId')
                }
            },
            methods: {
                clearError: function() {
                    this.errorMsg = ''
                },
                couponOrderGetAmout: function (params) {
                    var _this = this

                    if (!this.hongbao.name.length) {
                        this.errorMsg = "请输入姓名"
                        return false
                    }
                    if (!this.hongbao.alipayId.length) {
                        this.errorMsg = "请输入支付宝"
                        return false
                    }
                    if (this.hongbao.mobile.length!==11) {
                        this.errorMsg = "请输入有效的手机号"
                        return false
                    }
                    
                    proxy.couponOrderGetAmout(this.hongbao, function (data) {
                        if (data.success) {
                            _this.status = 3
                            _this.hongbao.orderPrice = data.data.orderPrice
                        }
                    })
                },
                changePay: function (params) {
                    this.status = 1
                },
                bindAlipay: function(data){
                    var _this = this
                    proxy.couponOrderBindAlipay({alipayId:this.hongbao.alipayId},function(data){
                        if(data.success) {
                            _this.couponOrderGetAmout()
                        } else {
                            layer.msg(data.errMsg)
                        }
                    })
                },
                close: function () {
                    this.status = 0;
                },
                couponOrderGetAlipay: function() {
                    var _this = this
                    proxy.couponOrderGetAlipay({},function(data){
                        if(data.success){
                            _this.hongbao.alipayId = data.data
                        } else {
                            layer.msg(data.errMsg)
                        }
                    })
                }
            },
            ready: function () {
            }
        })
    }

 
    funs.onnewpanodata = funs.onNewSceneData = function (data) {
        for (var i in data) {
            data[i] = this.method.hotspot.finishData(data[i])
            data[i].iconId = null
            data[i].url = '//code.aoliliya.com/vr/skin/addHot/images/hongbao.png'
            hotspot = this.hongbao.addHotspot(data[i])
            hotspot.hotspot.visible = !this.option.isEdit
        }
    }

    funs.onNewSceneCacheData = function () {
        this.cacheData = []
        for (var i in hotspotArr) {
            this.cacheData.push(hotspotArr[i].data)
        }
        hotspotArr = []
        return this.cacheData
    }


    return hongbao
})