let register = {}
const defaultOptions = {
  align: 'center',
  isMove: true,
  x: 0,
  y: 0,
  iconId: '',
  url: '/images/love.png',
  data: [],
  callback: {},
  element: undefined
}

class Hotspots {

  constructor (krpano, opt = {}) {
    this.krpano = krpano
    this.option = opt
  }

  register (hotspotType, opt = {}) {
    this.option = {...this.option, ...opt}
    const type =  register[hotspotType] ? register[hotspotType] : new RegisterHotspot(hotspotType, this.option, this.krpano)
    return type
  }

  switch (flag) {
    this.krpano.hotspot.getArray().forEach(item => {
      if (item.hotspot_type) {
        item.visible = flag
      }
    })
  }

  getHotspots () {
    return this.krpano.hotspot.getArray()
  }

  onremovepano () {
    for (var i in register) {
      register[i].hotspotList = []
    }
  }

  finishData (data) {
    return finish(data)
  }

  finishDataList (data) {
    for (var i in data) {
      data[i] = finish(data[i])
    }
    return data
  }

}

class RegisterHotspot {
  constructor (hotspotType, opt = {} , krpano) {
    this.hotspotType = hotspotType
    this.option = opt
    this.krpano = krpano
    this.hotspotList = []
    console.log('RegisterHotspot',this.krpano)
    if (!hotspotType) return console.error('必须输入hotspotType')
    opt.data && this.init(opt)
  }

  init (opt) {
    const dataArr = opt.data
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

  addHotspot (opt = {}) {
    let hotspot
    opt.hotspotType = this.hotspotType
    opt = $.extend(true, {}, defaultOptions, this.option, opt)
    // 生成一个热
    hotspot = new Hotspot(this.krpano, opt)
    this.hotspotList.push(hotspot)
    return hotspot
  }

  getHotspot (name) {
    var hsArr = this.hotspotList,
      i
    if (name) {
      for (i in hsArr) {
        if (name == hsArr[i].name) {
          return hsArr[i]
        }
      }
      return console.error('未找到热点，name=', name)
    }
    return hsArr
  }

}

class Hotspot {
  constructor (krpano, opt = {}) {
    this.option = opt
    this.krpano = krpano
    this.init()
  }

  init () {
    var _this = this
    var  opt = this.option || {}

    console.log('opt',opt)
    var krpano = this.krpano
    var ath = opt.ath || 0
    var atv = opt.atv || 0
    var h
    // this.yp = opt.yp
    if (!opt.name) {
      do {
        // 创建随机名字
        this.name = 'flying_' + Math.random().toString(36).substring(2)
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
    h.keep = true
    h.align = opt.align
    h.ath = ath
    h.atv = atv
    h.hotspot_type = opt.hotspotType
    h.capture = true
    h.scale = 0.5
    if (opt.iconId) {
      setSytle(this, opt.iconId)
    } else {
      h.url = opt.url
    }
 
    if (this.element) {
      var layerName = 'layer_' + this.name
      var layer = _this.layer = krpano.addlayer(layerName)
      layer.type = 'container'
      layer.keep = true
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
    h.ondown= "draghotspot();" 

    // h.ondown = function () {
    //   h.zorder++
    //   onHotspotEvent('onDown', _this)
    //   if (this.option.isMove) {
    //     // if (!_this.pressed) {
    //     // 记录第一次按下时鼠标坐标位置
    //     h.dragx = krpano.mouse.stagex
    //     h.dragy = krpano.mouse.stagey
    //     h.pressed = true
    //     // }
    //     krpano.call('callwith(hotspot[' + h.name + '], skin_hotspot_drag());')
    //   }
    // }.bind(this)

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

  setMove (flag) {
    this.option.isMove = !!flag || !this.option.isMove
  }

  setKeep (flag) {
    this.hotspot.keep = !!flag
    this.layer.keep = !!flag
  }

  update (opt) {
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

  remove () {
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
  zorder (flag) {
    this.hotspot.zorder = flag ? 101 + 100 : 101
  }

  // 上传热点，调用onSaveHotspot事件
  save (data) {
    onHotspotEvent('onSaveHotspot', this)
  }

  getData () {
    var dataList = $.extend(true, {}, {data: this.data})
    dataList.ath = this.hotspot.ath
    dataList.atv = this.hotspot.atv
    dataList.iconId = parseInt(this.hotspot.iconid)
    dataList.url = this.hotspot.url

    return dataList
  }

  getOldData () {
    var dataList = $.extend(true, {}, this.data)
    dataList.ath = this.hotspot.ath
    dataList.atv = this.hotspot.atv
    dataList.iconId = parseInt(this.hotspot.iconid)
    dataList.url = this.hotspot.url
    return dataList
  }

}

function setSytle (_this, name) {
  if (typeof name === 'object') {
    name = name.name
  }
  if (typeof name === 'string') {
    _this.hotspot.loadstyle(name)
  } else if (typeof name === 'number') {
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

function finish (data) {
  return {
    data: data,
    atv: data.atv,
    ath: data.ath,
    iconId: data.iconId
  }
}

export { Hotspots }
