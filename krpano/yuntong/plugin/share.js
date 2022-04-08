define('plugin/share', ['jquery', 'template'], function ($, template) {
  function Share() {}

  var funs = Share.prototype

  var DEFAULE_OPTION = {
    url: 'https://weixin.aoliliya.com/getWeixinJsToken',
    title: '奥里里亚',
    link: location.href,
    imgUrl: 'https://code.aoliliya.com/vr/skin/720/images/down.png',
    desc: 'Hi，孤夜观天象，发现一个不错的西西，分享一下下 ;-)',
    token: 'weixin4',
    debug: false,
    success: undefined,
    cancel: undefined,
    error: undefined
  }

  funs.init = function (options) {
    var _this = this
    this.options = $.extend(DEFAULE_OPTION, options)
    if (typeof define === 'function' && define.amd) {
      // AMD
      require(['https://res.wx.qq.com/open/js/jweixin-1.3.2.js'], wxFn)
    } else {
      $.getScript('https://res.wx.qq.com/open/js/jweixin-1.3.2.js', wxFn)
    }

    function wxFn(wx) {
      if (!(typeof define === 'function' && define.amd)) {
        wx = window.wx
      }
      _this.wx = wx
      $.ajax({
        url: _this.options.url + '?token=' + _this.options.token + '&url=' + encodeURIComponent(_this.options.link),
        dataType: 'jsonp',
        success: function (data) {
          wx.config({
            debug: _this.options.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        }
      })

      wx.error(function (res) {
        logger.warn(JSON.stringify(res))

        if (typeof _this.options.error === 'function') {
          _this.options.error()
        }
      })

      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: _this.options.title,
          link: _this.options.link,
          imgUrl: _this.options.imgUrl,
          success: _this.options.success,
          cancel: _this.options.cancel
        })

        wx.onMenuShareAppMessage({
          title: _this.options.title,
          link: _this.options.link,
          imgUrl: _this.options.imgUrl,
          desc: _this.options.desc,
          success: _this.options.success,
          cancel: _this.options.cancel
        })

        wx.onMenuShareQQ({
          title: _this.options.title,
          link: _this.options.link,
          imgUrl: _this.options.imgUrl,
          desc: _this.options.desc,
          success: _this.options.success,
          cancel: _this.options.cancel
        })

        wx.onMenuShareWeibo({
          title: _this.options.title,
          link: _this.options.link,
          imgUrl: _this.options.imgUrl,
          desc: _this.options.desc,
          success: _this.options.success,
          cancel: _this.options.cancel
        })
      })
    }
  }

  funs.openLocation = function (params) {
    var _this = this;
    try {
      _this.wx.ready(function () {
        _this.wx.openLocation(params)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return Share
})