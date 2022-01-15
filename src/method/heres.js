import {createApp,h,resolveComponent} from 'vue'
import HereSpot from '../components/Here.js'
var hotspotArr = []
var IMG = '/images/love.png'
var TEMPLATE = '<div class="hotspotwrap"></div>'
var currentHotspot = {}
const DEFAULT_OPTION = {
  align: 'center',
  isMove: true,
  url: IMG,
  iconId: false,
  element: TEMPLATE,
  callback: {
    onClick: function () {
      console.log('this onClick', this)
    },
    onUp: function name(params) {
      console.log('this onUp', this)
    },
    onLoaded: function () {
      hotspotArr.push(this)
      console.log('this onLoaded', this)

      var element = this.element[0]
      createApp(HereSpot).mount(element)
      // this.vm = new Vue({
      //   el: element,
      //   data: {
      //     filePath: config.filePath,
      //     avatar: this.data.avatar,
      //     type: this.data.type,
      //     hotspotId: this.data.hotspotId,
      //     hasFile: this.data.hasFile,
      //     picFileThumb: this.data.picFileThumb,
      //     picFileCount: this.data.picFileCount
      //   }
      // })
    },
    onAddHotspot: function () {
      currentHotspot = this
      console.log('this currentHotspot', currentHotspot)
    }
  }
}

class Heres {
  constructor(krpano,option = {}) {
    this.option = {...DEFAULT_OPTION, ...option}
    this.krpano = krpano
    this.init()
  }

  init (data) {
    this.option.data = this.krpano.method.hotspot.finishDataList(data)
    this.here = this.krpano.method.hotspot.register('here', this.option)

    console.log('this.here',this.here)
  }

  addHere(opt = {}) {
    this.here.addHotspot(opt)
  }

  onnewscene() {
    console.log('this is on new scene')
  }

}

export {Heres}