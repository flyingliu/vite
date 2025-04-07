<template>
  <div>
    <div id="pano"></div>
  </div>
</template>

<script setup>
import { onMounted, createApp, h } from 'vue'
import { H, Hotspots, Heres } from '../../method'
import LogoMenu from '../../components/LogoMenu.vue'

import { addLayer,loadxmlstring } from '../../utils/index.js'
console.log('Heres', addLayer)

const init = () => {
  return new Promise((resolve, reject) => {
    embedpano({
      xml: '/krpano/krpano.xml',
      target: 'pano',
      html5: 'only',
      passQueryParameters: true,
      onerror: function (err) {
        console.log('embedpano error', err)
        reject(err)
      },
      onready: function (krpano) {
        krpano = krpano.get('global')
        window.krpano = krpano
        resolve(krpano)
      },
    })
  })
}

onMounted(async () => {
  // console.log('000', embedpano)
  const krpano = await init()
  console.log('krpano', krpano)
  // krpano.method = {
  //   hotspot: new Hotspots(krpano),
  // }
  // krpano.my = {
  //   here: new Heres(krpano),
  // }
  // krpano.view.hlookat = 123.4
  // krpano.view.vlookat = 12.3
  // krpano.view.fov = 50

  const here = new Heres(krpano, {})
  here.addHere({
    ath: 20,
    atv: 20,
    url: '/images/cat.png',
    isMove: true,
    element: '<div>haha</div>',
    callback: {
      onClick: () => {
        console.log('onClick')
        // function loadpano(xmlname) {
        //   if (krpano) {
        //     krpano.call('loadpano(' + xmlname + ', null, MERGE, BLEND(0.5));')
        //   }
        // }
        // loadpano('/test/fly.xml')

        // 加载loadxmlstring
        function loadxmlstring() {
          if (krpano) {
            var xmlstring = `<krpano>
              <preview type="grid(cube,64,64,512,0xCCCCCC,0xF6F6F6,0x999999);" />
              <image><sphere url="/pano/2.jpeg" /></image>
              <view hlookat="0" vlookat="0" fov="100" distortion="0.0" />
              </krpano>`
            krpano.call(
              'loadxml(' + escape(xmlstring) + ', null, MERGE, BLEND(0.5));'
            )
          }
        }
        loadxmlstring()
      },
    },
  })
  console.log(here)

  // 加载pano
  krpano.actions.loadpano(
    '/test/animated-hotspots/anihotspots.xml',
    null,
    'MERGE',
    'BLEND(0.5)'
  )
  // 加载logo
  let logo = addLayer(krpano, {
    name: 'logo',
    url: '/pano/t.png',
    scale: 1,
    onclick: '',
  })

  createApp({
    render: () =>
      h(LogoMenu, {
        menu: [
          { name: '海天一色', key: 'haitian', url: '/pano/g-cmpr.jpg' },
          { name: '海底揽胜', key: 'haidi', url: '/pano/2-cmpr.jpeg' },
          { name: '闲庭信步', key: 'xianting', url: '/pano/e-cmpr.jpg' },
        ],
      }),
  }).mount(logo.sprite)
  // 加载热点
  var hs = krpano.addhotspot()
  hs.name = 'haha11'
  hs.url = '/images/cat.png'
  hs.keep = true
  hs.ath = 0
  hs.atv = 0
  hs.width = 50
  hs.height = 50
  hs.ondown = 'draghotspot();'

  hs.onclick = function () {
    // 加载loadxmlstring
    const name = loadxmlstring(krpano)
    krpano.actions.loadscene(name)
  }
  hs.onout = function () {
    // console.log(hs)
  }

  // 加载场景
  const event = krpano.events.createItem('skin_plugin_vr')
  event.keep = true
  event.onnewscene = () => {
    console.log('newnew!!')
  }
})
</script>

<style>


@media screen and (max-width: 500px) {
  html {
    font-size: 10px;
  }
}
</style>

<style lang="scss" scoped>
#pano {
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
</style>
