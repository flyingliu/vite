define('yp', [
  'require',
  'jquery',
  'template',
  'embedpanojs',
  'iscroll',
  'layer',
  'config',
  'proxy',
  'logger',
  'method/autorotate',
  'method/gyro',
  'method/hotspot',
  'method/icon',
  'method/login',
  'method/reload',
  'method/scene',
  'method/effect',
  'method/util',
  'method/webvr',
  'method/music',
  'plugin/effect',
  'plugin/groups',
  'plugin/hotspot',
  'plugin/links',
  'plugin/keepsakes',
  'plugin/appointments',
  'plugin/heres',
  'plugin/login',
  'plugin/scale',
  'plugin/share',
  'plugin/qqShare',
  'plugin/focus',
  'plugin/urlLink',
  'plugin/layer',
  'plugin/switcher',
  'plugin/music',
  'css!https://code.aoliliya.com/vr/static/css/plugin.all.css',
  'view-port'
], function (require, $, template, embedpano, IScroll, layer, config, proxy, logger) {
  window.YP = window.YP || {}
  var yp = function (option) {
    this.init()
    this.createPano(option)
  }
  document.domain = "aoliliya.com";
  yp._methods = {}
  yp._plugins = {}
  yp._skins = {}
  yp._loadXml = []

  yp.extend = yp.prototype

  function _initMethod (funs) {
    if (typeof funs.xml === 'string') {
      yp._loadXml.push(funs.xml)
    } else if (typeof funs.xml === 'array') {
      yp._loadXml.concat(funs.xml)
    }
  }

  function loadJS (id, url) {
    var xmlHttp = null
    if (window.ActiveXObject) {
      try {
        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
    } else if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest()
    }
    var link = url.indexOf('?') > 0 ? '&' : '?'
    url = url + link + 'v=' + (+new Date())
    xmlHttp.open('GET', url, false)
    xmlHttp.send(null)
    if (xmlHttp.readyState == 4) {
      if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 0 || xmlHttp.status == 304) {
        var myHead = document.getElementsByTagName('HEAD').item(0)
        var myScript = document.createElement('script')
        myScript.type = 'text/javascript'
        myScript.id = id
        try {
          myScript.appendChild(document.createTextNode(xmlHttp.responseText))
        } catch (ex) {
          myScript.text = xmlHttp.responseText
        }
        myHead.appendChild(myScript)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  yp.addMethod = function (name, funs) {
    _initMethod(funs)
    yp._methods[name] = funs
  }

  yp.addPlugin = function (name, funs) {
    // _initMethod(funs)
    yp._plugins[name] = funs
  }

  yp.addSkin = function (name, obj, fn) {
    yp._skins[name] = obj
    fn && fn()
  }

  yp.callback = function (funs) {
    if (typeof funs.xml === 'string') {
      yp._loadXml.push(funs.xml)
    } else if (typeof funs.xml === 'array') {
      yp._loadXml.concat(funs.xml)
    }

    return function () {
      var yp = this
      // funs.getKrpano = function() {
      //     return this.krpano
      // }.bind(this)
      // funs.option = this.option
      // funs.getYp = function(){
      //    return this
      // }.bind(this)
      // funs.settings = this.krpano.get("skin_settings")

      Object.defineProperty(this[i], 'krpano', (function () {
        return {
          get: function () {
            return yp.krpano
          },
          enumerable: true
        }
      }()))

      Object.defineProperty(this[i], 'yp', (function () {
        return {
          get: function () {
            return yp
          },
          enumerable: true
        }
      }()))

      Object.defineProperty(this[i], 'settings', (function () {
        return {
          get: function () {
            return yp.settings
          },
          enumerable: true
        }
      }()))

      var name = arguments[0]
      var slice = [].slice
      var args = slice.call(arguments, 1)

      if (name && funs[name]) {
        return funs[name].apply(funs, args)
      } else if (name) {
        logger.error('未找到方法:' + name)
      }

      return funs
    }
  }

  yp.extend.callback = function (name, data) {
    typeof this.option.callback[name] === 'function' && this.option.callback[name].call(this, data)
  }

  yp.extend.init = function () {
    this.js = {}
    this.method = {}
    this.plugin = {}
  }

  // 创建全景
  yp.extend.createPano = function (option) {
    this.option = $.extend(true, {}, yp.DEFAULT_OPTION, option)
    var skin = this.option.skin.name
    this.skin = this.option.skin
    this.option = $.extend(true, {}, yp.DEFAULT_OPTION, this.skin, option)
    // if (typeof skin === "string") {
    //     this.skin = yp._skins[skin]
    // }

    this._setData(this.option.data)
    var kOption = {},
      self = this

    config.id = this.option.panoId
    if (typeof this.option.xml === 'function') {
      this.option.xml = this.option.xml.call(this)
    } else if (this.option.xml) {
    } else if (this.option.panoId && this.option.spaceId) {
      this.option.xml = this.option.path + '/xml?sceneId=' + this.option.panoId + '&spaceId=' + this.option.spaceId + '&' + Date.parse(new Date())
    } else if (this.option.panoId) {
      this.option.xml = this.option.path + '/xml?sceneId=' + this.option.panoId + '&' + Date.parse(new Date())
    } else {
      logger.error('创建失败,无可用xml')
      return
    }

    kOption.passQueryParameters = this.option.passQueryParameters
    // kOption.id = this.option.id
    kOption.target = this.option.target
    kOption.vars = this.option.vars
    kOption.starview = this.option.starview
    kOption.swf = this.option.swf
    kOption.xml = this.option.xml
    kOption.initvars = this.option.initvars
    kOption.onerror = this.option.callback.onError
    kOption.html5 = 'only'
    kOption.id = 'krpanoSWFObject'
    kOption.basepath = config.krpanoPath
    kOption.mobilescale = 1
    kOption.mwheel = this.option.mwheel
    if (!(typeof kOption.starview == 'undefined')) {
      kOption.vars['skin_settings.switch_starview'] = kOption.starview
    }
    // kOption.basepath = "https://pano.yuntongvr.com/krpano/"

    kOption.onready = function (krpano) {
      krpano.set('yt_pano', self)

      yp._loadXml.push(config.codePath + '/krpano/krpano.xml')

      for (var i in yp._loadXml) {
        krpano.call('loadxml(\'<krpano><include url="' + yp._loadXml[i] + '" /></krpano>\')')
      }

      for (var i in self.data.loadName) {
        var loadName = self.data.loadName[i]
        if (yp._plugins[loadName] && yp._plugins[loadName].xml) {
          krpano.call('loadxml(\'<krpano><include url="' + yp._plugins[loadName].xml + '" /></krpano>\')')
        }
      }
    }

    $(function () {
      self.element = $('#' + kOption.target)
      // 防止无改div
      if (!self.element[0]) {
        self.element = $('<div/>').appendTo('body').attr('id', kOption.target)
      }
      embedpano(kOption)
      // 安卓手机微信加载不完成的bug
      if (typeof self.option.callback['timerWxAndroidFn'] === 'function') {
        self.option.callback.timerWxAndroidFn.call(self)
      }
    })
  }

  yp.extend._setData = function (data) {
    this.data = {
      loadName: [],
      relevance: {}
    }

    var pushLoadName = function (name) {
      for (var i in this.data.loadName) {
        if (this.data.loadName == name) {
          return
        }
      }

      this.data.loadName.push(name)
    }.bind(this)

    for (var i in data) {
      var obj = {
        option: {}
      }

      if (this.skin && this.skin.plugin && this.skin.plugin[i]) {
        obj.option = $.extend(true, {}, this.skin.plugin[i])
      }

      if (typeof data[i] === 'boolean') {
        if (data[i] == true) {
          pushLoadName(i)
          obj.loadName = i
        }
      } else if (typeof data[i] === 'object') {
        if (typeof data[i].isDefaultData === 'undefined' || data[i].isDefaultData != false) {
          pushLoadName(i)

          obj.loadName = data[i].loadName || i
        } else {
          obj.customData = true
        }

        obj.option = $.extend(true, {}, obj.option, data[i].option)
        obj.isPlugin = data[i].isPlugin === false ? false : true
        obj.data = data[i].data
      } else if (typeof data[i] === 'string') {
        pushLoadName(data[i])
        obj.loadName = data[i]
      }

      if (obj.loadName != '_') {
        this.data.relevance[i] = obj
      }
    }
  }

  yp.extend.initEvent = function (name) {
    var event = [
      'onenterfullscreen',
      'onexitfullscreen',
      'onxmlcomplete',
      'onpreviewcomplete',
      'onloadcomplete',
      'onnewpano',
      'onremovepano',
      'onnewscene',
      'onloaderror',
      'onkeydown',
      'onkeyup',
      'onclick',
      'onmousedown',
      'onmouseup',
      'onmousewheel',
      'onidle',
      'onviewchange',
      'onviewchanged',
      'onresize',
      'onautorotatestart',
      'onautorotatestop',
      'onautorotateoneround',
      'onautorotatechange',
      'onaddscene',
      'onremovescene'
    ]

    var windowEvent = [
      'line',
      'offline'
    ]

    this.events = this.method.util.createItem('events', 'skin_chuanti_events')

    var callbackFn = function (eventName) {
      var slice = [].slice
      var args = slice.call(arguments, 1)

      if (eventName == 'onautorotateoneround') {
        console.log(eventName)
      }

      for (var j in this.plugin) {
        var fn = this.plugin[j][eventName]

        if (fn && typeof fn === 'function') {
          fn.apply(this.plugin[j], args)
        }
      }

      for (var j in this.method) {
        var fn = this.method[j][eventName]

        if (fn && typeof fn === 'function') {
          fn.apply(this.method[j], args)
        }
      }

      var fn = this.option.callback[eventName]

      if (typeof fn === 'function') {
        fn.apply(this, args)
      }
    }.bind(this)

    if (name) {
      callbackFn(name)
    }

    for (var i in windowEvent) {
      $(window).on()
      this.events[event[i]] = callbackFn.bind(this, event[i])
    }

    for (var i in event) {
      this.events[event[i]] = callbackFn.bind(this, event[i])
    }

    // 横竖屏切换
    var ua = navigator.userAgent
    var supportsOrientationChange = ua.indexOf('Android') < 0 && 'onorientationchange' in window,
      orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize'
    var onorientationchange = function () {
      var mql = window.matchMedia('(orientation: portrait)')

      var flag = true
      if (typeof window.orientation !== 'undefined') {
        if (Math.abs(window.orientation) == 90) {
          flag = false
        }
      } else {
        flag = mql.matches
      }

      callbackFn('onorientationchange', flag)
    }.bind(this)
    // 监听事件
    $(window).on(orientationEvent, onorientationchange)

    $(window).resize(function () {
      setTimeout(function () {
        $('#krpanoSWFObject').width('100%')
        $('#krpanoSWFObject').height('100%')
      }, 700)
    })

    onorientationchange()
  }

  yp.extend.callwith = function (type) {
    var name = arguments[0]
    var slice = [].slice
    var args = slice.call(arguments, 1)

    if (this.option.callback && typeof this.option.callback[type] === 'function') {
      this.option.callback[type].apply(this, args)
    }
  }

  yp.DEFAULT_OPTION = {
    panoId: undefined,
    sceneId: undefined,
    passQueryParameters: false,
    // id: "krpanoSWFObject",
    target: 'pano' + new Date().getTime(),
    starview: undefined,
    vars: {},
    skin: 'default',
    swf: config.codePath + '/krpano/krpano.swf',
    xml: undefined,
    mwheel: true,
    initvars: {
      STATIC: config.codePath + '/static/',
      CODEURL: config.codePath,
      URL: config.basePath
    },
    path: config.basePath,
    width: '100%',
    height: '100%',
    something: 'getSomething',
    callback: {
      onReady: undefined,
      onError: undefined,
      onnewpanodata: undefined,
      onResize: function (width, height) {
        return false
      },
      unLoadPlugin: function () {
        return
      },
      onLoadData: function (something, fn) {
        var data = {
          something: something
        }

        if (config.siteId) {
          data.siteId = config.siteId
          data.sceneId = this.panoId || this.option.panoId || this.sceneId || this.option.sceneId
          data.spaceId = this.option.spaceId || this.method.scene.getCurrScene().id
        } else if (this.method.scene && this.method.scene.getCurrScene().id) {
          data.spaceId = this.option.spaceId || this.method.scene.getCurrScene().id
          data.sceneId = this.panoId || this.option.panoId || this.sceneId || this.option.sceneId
        } else {
          data.sceneId = this.panoId || this.option.panoId || this.sceneId || this.option.sceneId
        }

        proxy[this.option.something](data, function (data) {
          if (data.success) {
            fn(data.data)
          } else {
            YP.error(data.errMsg)
          }
        }, function (data) {
          console.log(data)
        })
      },
      onorientationchange: function (flag) {
        var clientWidth = document.documentElement.clientWidth

        if (flag) {
          document.documentElement.style.fontSize = 100 * (clientWidth / 375) + 'px'
        } else {
          document.documentElement.style.fontSize = 100 * (clientWidth / 667) + 'px'
        }
      },
      timerWxAndroidFn: function () {
        var u = navigator.userAgent
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        if (isAndroid) {
          var timerWxAndroid = setTimeout(function () {
            location.href = '#'
            clearTimeout(timerWxAndroid)
          }, 5000)
        }
      }
    },
    data: undefined
  }

  function js (i, plugin, relevance) {
    var plugins = this.js || (this.js = {})

    if (js[i]) return js[i]

    // 当为function时,创建对象
    if (typeof plugin === 'function') {
      plugins[i] = new plugin()
    } else {
      plugins[i] = plugin()
    }

    plugins[i].krpano = this.krpano
    plugins[i].yp = this
    plugins[i].settings = this.settings
    plugins[i].method = this.method
    plugins[i].plugin = this.plugin
    plugins[i].js = this.js

    final.call(this, plugins[i])

    return plugins[i]
  }

  function plugin (i, plugin, relevance) {
    var plugins = this.plugin || (this.plugin = {})
    relevance = relevance || {
      option: {}
    }

    if (plugins[i]) return plugins[i]

    if (!relevance.loadName) {
      relevance.loadName = i
    }

    // 当为function时,创建对象
    if (typeof plugin === 'function') {
      plugins[i] = new plugin(relevance.option)
    } else {
      plugins[i] = plugin(relevance.option)
    }

    plugins[i].krpano = this.krpano
    plugins[i].yp = this
    plugins[i].settings = this.settings
    plugins[i].method = this.method
    plugins[i].plugin = this.plugin
    plugins[i].js = this.js

    final.call(this, plugins[i])

    return plugins[i]
  }

  function method (i, method) {
    this.method || (this.method = {})
    var methods = this.method
    if (methods[i]) return methods[i]

    // 当为function时,创建对象
    if (typeof method === 'function') {
      methods[i] = new method()
    } else {
      methods[i] = method
    }

    methods[i].krpano = this.krpano
    methods[i].yp = this
    methods[i].settings = this.settings
    methods[i].method = this.method

    final.call(this, methods[i])

    return methods[i]
  }

  function final (fn, relevance) {
    if (fn && fn.deps) {
      if (typeof fn.deps === 'string') {
        this.require(fn.deps, this.data.relevance)
      } else if (typeof fn.deps === 'object') {
        for (var j in fn.deps) {
          var loadName = fn.deps[j]

          if (typeof loadName === 'string') {
            this.require(loadName, this.data.relevance)
          }
        }
      }
    }
  }

  yp.extend.require = function (name, relevance) {
    try {
      var fn
      var loadName

      relevance = relevance || []

      if (name.indexOf('method/') > -1) {
        loadName = name.split('method/')[1]
        fn = method.call(this, loadName, require(name), relevance[loadName])
      } else if (name.indexOf('plugin/') > -1) {
        loadName = name.split('plugin/')[1]

        if (loadName == 'toolbar') {
          if (this.plugin['toolbar']) {
            fn = this.plugin['toolbar']
          } else {
            logger.error('未加载toolbar插件')
            return
          }
        } else if (this.plugin && this.plugin[loadName]) {
          fn = this.plugin[loadName]
        } else {
          fn = plugin.call(this, loadName, require(name), relevance[loadName])
        }
      } else if (name.indexOf('skin/') > -1) {
        loadName = name.split('skin/')[1]

        if (name.indexOf('method/') > -1) {
          loadName = name.split('method/')[1]
          fn = method.call(this.method, loadName, require(name), relevance[loadName])
        } else if (name.indexOf('plugin/') > -1) {
          loadName = name.split('plugin/')[1]
          fn = plugin.call(this, loadName, require(name), relevance[loadName])
        } else if (name.indexOf('js/') > -1) {
          loadName = name.split('js/')[1]
          fn = js.call(this, loadName, require(name), relevance[loadName])
        } else if (loadName.indexOf('/') > -1) {
          loadName = name.split('/')[2]
          fn = plugin.call(this, loadName, require(name), relevance[loadName])
        } else {
          logger.error('不支持改插件:' + name)
          return
        }
      } else {
        logger.error('不支持改插件:' + name)
        return
      }
    } catch (e) {
      logger.error(e)
    }
  }

  yp.extend.initPano = function (fn) {
    var yp = this

    var option = yp.option.data

    for (var i in yp.skin.deps) {
      this.require(yp.skin.deps[i], yp.data.relevance)
    }

    for (var i in yp.data.relevance) {
      var loadName = 'plugin/' + i
      yp.data.relevance[i].isPlugin && this.require(loadName, yp.data.relevance)
    }

    yp.callwith('onLoadData', yp.data.loadName.join(','), function (data) {
      yp.defaultData = data
      yp.callback('onDataLoader', data)

      // 缓存
      this._cacheData = []
      this._currScene = this.krpano.xml.scene
      
      var event = yp.method.util.createItem('events', 'skin_plugin_vr')
      
      fn && typeof fn === 'function' && fn(data, yp.data.relevance)
    }.bind(this))
  }

  YP.error = function (msg) {
    logger.error(msg)
  }

  return yp
})
