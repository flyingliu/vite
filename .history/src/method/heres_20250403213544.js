import { createApp, h, resolveComponent } from 'vue'
import HereSpot from '../components/Here.js'
import { Hotspots } from './hotspot.js'
var hotspotArr = []
var IMG = '/images/love.png'
var TEMPLATE = '<div class="herewrap">bababa</div>'
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
      function loadxmlstring () {
        // load a xml as string
        var xmlstring =
          `<krpano>
				<image>
					<preview url="/pano/2.jpeg" />
					<cubestrip url="/pano/2.jpeg" />
				</image>
				<view hlookat="0" vlookat="0" fov="100" />
			</krpano>`;

        krpano.actions.loadxml(xmlstring, null, "RESET", "BLEND(0.35)");
      }

      loadxmlstring()
    },
    onUp: function name (params) {
      console.log('this onUp', this)
    },
    onLoaded: function () {
      hotspotArr.push(this)
      console.log('this onLoaded', this)
      // 加载完成后挂在vue组件
      // var element = this.element[0]
      // createApp(HereSpot).mount(element)
    },
    onAddHotspot: function () {
      currentHotspot = this
      console.log('this currentHotspot', currentHotspot)
    }
  }
}

class Heres {
  constructor (krpano, option = {}) {
    this.option = { ...DEFAULT_OPTION, ...option }
    this.krpano = krpano
    this.init()
  }

  init (data) {
    const hotspot = new Hotspots(this.krpano, this.option)
    this.option.data = hotspot.finishDataList(data)
    this.here = hotspot.register('here', this.option)
  }

  addHere (opt = {}) {
    this.here.addHotspot(opt)
  }

  onnewscene () {
    console.log('this is on new scene')
  }
}


export { Heres }