define('plugin/focus', ['jquery', 'template', 'proxy'], function ($, template, proxy) {
  var TEMPLATE = '<div class="layerfocus" id="layerfocus">\
    		<p>滚动鼠标，确定焦距后<br />点击保存即可</p>\
            <div class="index">\
                <input id="range_44" />\
            </div>\
            <div class="recent">\
                <div class="recent-descr">限制最近 <strong class="recent-num">20</strong></div>\
            </div>\
            <div class="farthest">\
                <div class="farthest-descr">限制最远 <strong class="farthest-num">100</strong></div>\
            </div>\
						<button class="save-focus">保存当前</button>\
						<button class="save-focus2">应用全部</button>\
        </div>'
  var yp
  var views = {}

  var DEFAULT_OPTION = {
    template: TEMPLATE
  }

  function Focus(option) {
    this.option = $.extend(true, {}, DEFAULT_OPTION, option)
    this.data = this.option.data
  }

  function applyall() {
    $('.applyall').off('click').on('click', function () {
      //			var postData = {
      //				mainId: config.id,
      //				effectId: this.zdy.id
      //			}
      //			proxy.snowShare(postData, function(data) {
      //				if(data.success) {
      //					msg("设置成功")
      //				} else {
      //					msg(data.errMsg)
      //				}
      //			})
    })
  }

  var funs = Focus.prototype

  funs.init = function (data) {
    yp = this.yp
    this.yp.element.append(this.option.template)
    applyall()
  }

  // 页面加载视角范围获取
  funs.setView = function (data) {
    var view = {}
    view.fov = data.centent
    view.min = data.from
    view.max = data.to
    $(document).find('.recent-num').text(view.min)
    $(document).find('.farthest-num').text(view.max)
    this.viewreset(view.fov, view.min, view.max)
    views[yp.method.scene.getCurrScene().name] = view
  }

  // 视角范围保存
  funs.save = function (data) {
    var focus = true,focus2 = true
    $('.save-focus').off('click').on('click', function () {
      if (focus) {
        focus = false
        proxy.setScene({
          spaceId: yp.method.scene.getCurrScene().id,
          fov: data.centent,
          fovMin: data.from,
          fovMax: data.to
        }, function (data) {
          if (data.success) {
            msg('保存成功')
            focus = true
          } else {
            msg(data.errMsg)
          }
        })
      }
    })
    $('.save-focus2').off('click').on('click', function () {
      if (focus2) {
        focus2 = false
        proxy.setAllScene({
          spaceId: yp.method.scene.getCurrScene().id,
          fov: data.centent,
          fovMin: data.from,
          fovMax: data.to,
          sceneId: yp.option.panoId
        }, function (data) {
          if (data.success) {
            msg('保存成功')
            focus2 = true
          } else {
            msg(data.errMsg)
          }
        })
      }
    })
  }

  funs.setAllScene = function (data) {
    var propsData = {
      spaceId: yp.method.scene.getCurrScene().id,
      fov: data.fov,
      fovMin: data.min,
      fovMax: data.max,
      hlookat: data.ath,
      vlookat: data.atv,
      sceneId: yp.option.sceneId
    }
    proxy.setAllScene(propsData, function (data) {
      if (data.success) {
        console.log("ok")
        proxy.postMessage('setAllSceneOk')
        // msg('保存成功')
      } else {
        // msg(data.errMsg)
      }
    })
  }

  // 视角范围应用全部

  funs.saveview = function (data, ok, err) {
    proxy.setScene({
      spaceId: yp.method.scene.getCurrScene().id,
      sceneId: data.sceneId,
      fov: data.fov,
      fovMin: data.min,
      fovMax: data.max,
      vlookat: data.atv,
      hlookat: data.ath
    }, function (data) {
      if (data.success) {
        ok && ok()
      } else {
        err && err()
      }
    })
  }

  funs.viewreset = function (fov, fovmin, fovmax) {
    this.krpano.call("viewreset('" + this.krpano.get('xml.scene') + "','" + fov + "','" + fovmin + "','" + fovmax + "')")
  }

  funs.getView = function (flag) {
    if (flag) return this.getDefaultView()
    var view = {}
    view.fov = this.krpano.get('view.fov')
    view.min = this.krpano.get('view.fovmin')
    view.max = this.krpano.get('view.fovmax')
    this.krpano.call('adjusthlookat(view.hlookat)')
    view.ath = this.krpano.get('view.hlookat')
    view.atv = this.krpano.get('view.vlookat')
    return view
  }

  funs.getDefaultView = function (name) {
    if (!name) name = yp.method.scene.getCurrScene().name
    return views[name]
  }

  funs.setCurrView = function(view) {
    if(view) {
      this.viewreset(view.fov, view.min, view.max)
      this.krpano.set('view.hlookat',view.ath)
      this.krpano.set('view.vlookat',view.atv)
    }
  }


  return Focus
})