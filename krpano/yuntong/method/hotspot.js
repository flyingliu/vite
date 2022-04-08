define('method/hotspot', ['jquery'], function ($) {
  var funs = {
      name: 'hotspot'
    },
    yp,
    defaultOptions = {
      align: 'center',
      isMove: true,
      x: 0,
      y: 0,
      iconId: '',
      data: [],
      callback: {
        // onLoaded:function(a,b){ht = hotspotTypes;},
        // onDown:function(){alert("onDown")},
        // onUp:function() {alert("onUp")},
        // onClick:function() {alert("onClick")},
        // onOver:function(){alert("onOver")},
        // onOut:function(){alert("onOut")},
        // onHover:function(){alert("onHover")},
        // onMoveUpdate:function(){alert("onMoveUpdate")},
        // onUpdatestyle:function(){alert("onUpdatestyle")},
        // onRemove:function(){alert("onRemove")},
        // 添加热点事件
        // onAddHotspot:function(){alert("onAddHotspot")},
        // 上传热点事件
        // onSaveHotspot:function(){alert("onSaveHotspot")}
      },
      element: undefined
  }
  var register = {}
  var hotspotList

  // 注册热点，必须传入名称(hotspotType)
  funs.register = function (hotspotType, opt) {
    if (register[hotspotType]) {
      return register[hotspotType]
    }

    opt = opt || {}
    opt.krpano = this.krpano
    opt.yp = this.yp

    register[hotspotType] = new RegisterHotspot(hotspotType, opt)

    return register[hotspotType]
  }

  funs.switch = function (flag) {
    var hotspotArr = this.krpano.get('hotspot').getArray(),
      i
    for (i in hotspotArr) {
      if (hotspotArr[i].hotspot_type) {
        hotspotArr[i].visible = flag
      }
    }
  }

  funs.getHotspots = function () {
    return this.krpano.get('hotspot').getArray()
  }

  funs.onremovepano = function () {
    for (var i in register) {
      register[i].hotspotList.splice(0)
    }
  }

  /**
   * 热点注册对象
   * @param hotspotType   将要注册的热点类型
   * @param opt           热点的属性，如果含有opt.data，则根据data的属性直接生成热点，
   * @constructor
   */
  function RegisterHotspot (hotspotType, opt) {
    if (!hotspotType) return this.yp('必须输入hotspotType')
    opt = opt || {}
    this.hotspotList = []
    this.hotspotType = hotspotType
    // 如果注册的数据存在data，则先根据data内的数据初始化相应热点
    this.option = opt
    opt.data && this.init(opt)
  }

  var foo = RegisterHotspot.prototype

  /**
   * 根据data数组生成热点
   * @param opt  初始化的热点数据
   */
  foo.init = function (opt) {
    var dataArr = opt.data
    opt.data = undefined
    for (var i in dataArr) {
      // 初始化的热点不调用onAddHotspot事件,将onAddHotspot置为空方法
      this.addHotspot($.extend(true, {
        data: {}
      }, opt, dataArr[i], {
        callback: {
          onAddHotspot: function () {}
        }
      }))
    }
  }

  /**
   * 添加热点
   * @param opt   热点的属性
   * @returns {Hotspot}   热点对象
   */
  foo.addHotspot = function (opt) {
    var hotspot
    opt = opt || {}
    opt.hotspotType = this.hotspotType
    opt = $.extend(true, {}, defaultOptions, this.option, opt)
    // 生成一个热点

    hotspot = new Hotspot(opt)
    this.hotspotList.push(hotspot)
    return hotspot
  }

  /**
   * 获取热点
   * @param name  当name为null时,返回当前热点类型的所有热点，
   *              当name有值时,返回当前热点类型下名字为name的hotspot对象
   * @returns {Array|hotspot}
   */
  foo.getHotspot = function (name) {
    var hsArr = this.hotspotList,
      i
    if (name) {
      for (i in hsArr) {
        if (name == hsArr[i].name) {
          return hsArr[i]
        }
      }
      return this.yp('未找到热点，name=', name)
    }
    return hsArr
  }

  /**
   * 设置热点样式
   * @param _this Hotspot对象
   * @param name  style的名字，如果为object必须带有name属性
   */
  function setSytle (_this, name) {
    if (typeof name === 'object') {
      name = name.name
    }
    if (typeof name === 'string' && funs.yp.method.icon.getIcon(name)) {
      _this.hotspot.loadstyle(name)
    } else if (typeof name === 'number') {
      name = funs.yp.method.icon.getStyle(name)
      _this.hotspot.loadstyle(name.name)
    } else {
      this.yp('未找到style=', name)
    }
  }

  // 绑定事件
  function bindHotspotEvent (type, _this) {
    var fn = _this.option.callback[type]
    if (fn && typeof fn === 'function') {
      return fn.bind(_this, _this.getData())
    }
  }

  // 调用事件
  function onHotspotEvent (type, _this) {
    var fn = _this.option.callback[type]
    if (fn && typeof fn === 'function') {
      fn.call(_this, _this.getData())
    }
  }

  // 热点对象
  function Hotspot (opt) {
    var _this = this,
      krpano = opt.krpano,
      ath = opt.ath,
      atv = opt.atv,
      h
    this.yp = opt.yp
    this.option = opt
    if (!opt.name) {
      do {
        // 创建随机名字
        this.name = YP.random(10)
      } while (krpano.get('hotspot[' + this.name + ']'))
    }

    // 根据偏移量计算最终位置
    if ((!ath && ath !== 0) && (!ath && ath !== 0)) {
      // 此时ath与atv同时未设置
      krpano.call('adjusthlookat(view.hlookat)')
      ath = krpano.view.hlookat
      atv = krpano.view.vlookat
      var view_now = krpano.spheretoscreen(krpano.view.hlookat, krpano.view.vlookat),
        common_x = opt.x || 0,
        common_y = opt.y || 0

      if (common_x || common_y) {
        var view_new = krpano.screentosphere(common_x, common_y)

        ath = view_new.x
        atv = view_new.y
      }
    } else {
      // 此时ath与atv其中某一个设置了值另一个为undifend,将undifend设置为0
      ath = ath || 0
      atv = atv || 0
    }

    if (typeof opt.element === 'function') {
      this.element = $(opt.element(opt.data))
    } else {
      this.element = $(opt.element).clone(true)
    }
    this.data = opt.data || {}
    var h = this.hotspot = krpano.addhotspot(this.name)
    h.align = opt.align
    h.ath = ath
    h.atv = atv
    h.hotspot_type = opt.hotspotType
    h.scale = 0.5
    if (opt.iconId) {
      setSytle(this, opt.iconId)
    } else {
      h.url = opt.url
    }

    if (this.element) {
      var layerName = 'layer' + this.name
      var layer = _this.layer = krpano.addlayer(layerName)
      layer.type = 'container'
      // layer.keep = true
      layer.align = 'right'
      layer.edge = 'left'
      $(layer.sprite).append(this.element)

      $(layer.sprite).delegate(':text, textarea', 'click mousedown mousedown focus', function (e) {
        e.stopPropagation()
      })

      $(layer.sprite).delegate('.move', 'mousedown touchstart', function (e) {
        h.ondown()
        $(document).on('mouseup touchend', function (e) {
          h.onup()
          $(document).off('mouseup touchend')
        })
      })

      $(layer.sprite).delegate('.click', 'click', function (e) {
        e.preventDefault()
        h.onclick()
        return false
      })

      $(layer.sprite).delegate('.click', {
        touchstart: function (e) {
          h.isClick = true
        },
        touchmove: function (e) {
          h.isClick = false
        },
        touchend: function () {
          if (h.isClick) {
            h.onclick()
          }
        }
      })

      layer.bgcapture = true
      layer.parent = 'hotspot[' + this.name + ']'
    }

    if (!this.option.isMove) {
      h.capture = false
    }

    // 调用loaded事件
    onHotspotEvent('onLoaded', _this)
    // 调用热点添加事件
    onHotspotEvent('onAddHotspot', _this)
    h.onclick = bindHotspotEvent('onClick', this)
    h.onover = bindHotspotEvent('onOver', this)
    h.onout = bindHotspotEvent('onOut', this)
    h.onhover = bindHotspotEvent('onHover', this)
    h.ondown = function () {
      h.zorder++
      onHotspotEvent('onDown', _this)
      if (this.option.isMove) {
        // if (!_this.pressed) {
        // 记录第一次按下时鼠标坐标位置
        h.dragx = krpano.mouse.stagex
        h.dragy = krpano.mouse.stagey
        h.pressed = true
        // }
        krpano.call('callwith(hotspot[' + h.name + '], skin_hotspot_drag());')
      }
    }.bind(this)

    h.onup = function () {
      h.zorder--
      onHotspotEvent('onUp', this)

      // 判定当前鼠标位置与第一次按下时的位置
      if (this.option.isMove && (h.dragx != krpano.mouse.stagex || h.dragy != krpano.mouse.stagey)) {
        onHotspotEvent('onMoveUpdate', this)
      }

      h.pressed = false
      h.dragx = h.dragy = 0
    }.bind(this)
  }

  var fn = Hotspot.prototype
  /**
   * 设置热点是否移动
   * @param flag  boolean，当有值时设置值,没有时切换状态
   */
  fn.setMove = function (flag) {
    this.option.isMove = !!flag || !this.option.isMove
  }

  fn.setKeep = function (flag) {
    this.hotspot.keep = !!flag
    this.layer.keep = !!flag
  }

  /**
   * 更新热点
   * @param opt object
   */
  fn.update = function (opt) {
    opt = opt || {}
    if (opt.style !== undefined) {
      setSytle(this, opt.style)
    }
    if (opt.url) {
      // 先清除热点原有样式
      this.hotspot.onloaded = undefined
      this.hotspot.crop = undefined
      this.hotspot.style = ''
      this.hotspot.url = opt.url
    }
    if (opt.data) {
      this.data = $.extend(true, {}, this.data, opt.data)
    }

    onHotspotEvent('onUpdatestyle', this)
  }

  /**
   * 删除当前热点
   */
  fn.remove = function () {
    console.log('remove this')
    this.option.krpano.removelayer(this.layer.name)
    this.option.krpano.removehotspot(this.name)
    onHotspotEvent('onRemove', this)
    for (var i in register) {
      var currhotspotList = register[i].hotspotList
      for (var j in currhotspotList) {
        if (currhotspotList[j] === this) {
          currhotspotList.splice(j, 1)
          break
        }
      }
    }
  }

  /**
   * 设置层级
   */
  fn.zorder = function (flag) {
    if (flag) {
      this.hotspot.zorder = 101 + 100
    } else {
      this.hotspot.zorder = 101
    }
  }

  // 上传热点，调用onSaveHotspot事件
  fn.save = function (data) {
    onHotspotEvent('onSaveHotspot', this)
  }


  fn.getData = function () {
    var dataList = $.extend(true, {}, {data: this.data})
    dataList.ath = this.hotspot.ath
    dataList.atv = this.hotspot.atv
    dataList.iconId = parseInt(this.hotspot.iconid)
    dataList.url = this.hotspot.url

    return dataList
  }

  fn.getOldData = function () {
    var dataList = $.extend(true, {}, this.data)
    dataList.ath = this.hotspot.ath
    dataList.atv = this.hotspot.atv
    dataList.iconId = parseInt(this.hotspot.iconid)
    dataList.url = this.hotspot.url

    return dataList
  }

  function finish (data) {
    return {
      data: data,
      atv: data.atv,
      ath: data.ath,
      iconId: data.iconId
    }
  }

  funs.finishData = function (data) {
    return finish(data)
  }

  funs.finishDataList = function (data) {
    for (var i in data) {
      data[i] = finish(data[i])
    }
    return data
  }

  return funs
})
