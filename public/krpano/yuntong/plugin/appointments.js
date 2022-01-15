define('plugin/appointments', ['jquery', 'template', 'proxy', 'config', 'vue'], function ($, template, proxy, config, Vue) {
  var hotspotArr = []
  var hotAppointment
  var hotspot
  var flag = false
  var currentHotspot
  var porxy
  var panoId
  var i
  var elementTo = undefined
  var TEMPLATE = '<div class="heres appointments move click" :data-id="hotspotId"><div class="heart yue"><img class="heartimg" :src="bg"></div><i class="avatar"><img v-if="avatar" :src="filePath + avatar" /></i></div>'
  var DEFAULT_OPTION = {
    align: 'center',
    isMove: true,
    url: config.codePath + 'krpano/skin/img/background.png',
    iconId: false,
    element: TEMPLATE,
    callback: {
      onClick: function () {
        // currentHotspot = this
        var appData = {
          hotspotId: +this.data.hotspotId,
          flag: 2,
          id: +this.data.appointmentId || +this.data.id
        }
        if (typeof this.yp.plugin.toolbar.browser == 'function') {
          this.yp.plugin.toolbar.browser()
        }

        proxy.postMessage('clickHere', appData)
        console.log(appData)
      },
      onLoaded: function () {
        hotspotArr.push(this)
        var element = this.element[0]
        this.vm = new Vue({
          el: element,
          data: {
            bg: config.codePath + 'skin/default/images/cup.png',
            filePath: config.filePath,
            avatar: this.data.avatar,
            hotspotId: this.data.hotspotId
          }
        })
      },
      onAddHotspot: function () {
        currentHotspot = this
      }
    }
  }

  function Appointments (option) {
    this.option = $.extend(true, {}, DEFAULT_OPTION, option)
  }

  var funs = Appointments.prototype

  funs.deps = ['plugin/groups',
    'method/hotspot',
    'method/login',
    'method/util'
  ]

  funs.init = function (data) {
    var newData = {}
    for (var i in data) {
      newData[i] = {
        ath: data[i].ath,
        atv: data[i].atv,
        data: data[i]
      }
    }
    this.option.data = newData
    this.appointment = this.method.hotspot.register('appointment', this.option)
  }

  funs.addAppointment = function (opt) {
    opt = opt || {
      url: config.codePath + 'krpano/skin/img/background.png',
      iconId: false,
      data: {}
    }
    var hotspot = this.appointment.addHotspot(opt)
    return hotspot
  }

  funs.removeAppointment = function (hotspot) {
    var hotspot = hotspot || currentHotspot
    for (var i in hotspotArr) {
      if (hotspotArr[i] === hotspot) {
        hotspotArr.splice(i, 1)
      }
    }
    hotspot.remove()
  }

  funs.removeAll = function () {
    var list = this.heres.getAppointment()

    for (var i in list) {
      list[i].remove()
    }

    this.appointment.getHotspot().splice(0)
    hotspotArr = []
  }

  funs.onmoveupdate = function (data, hotspot) {}

  funs.getAppointments = function (name) {
    return this.appointment.getHotspot(name)
  }

  funs.switch = function (flag) {
    for (var i in hotspotArr) {
      flag == undefined && (flag = !this.yp.settings.switch_comment)
      hotspotArr[i].hotspot.visible = flag == true
    }
  }

  funs.onNewSceneData = function (data) {
    for (var i in data) {
      this.appointment.addHotspot(this.method.hotspot.finishData(data[i]))
    }
    ally.positionHotspot(config.hotspotId, data)
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

  return Appointments
})
