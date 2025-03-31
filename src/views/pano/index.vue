<template>
  <div>
    <div id="pano"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { H, Hotspots, Heres } from '../../method'

console.log('Heres', Heres)

const init = () => {
  return new Promise((resolve, reject) => {
    embedpano({
      xml: '/krpano/krpano.xml',
      target: 'pano',
      html5: 'only',
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
    isMove: false,
    element: '<div>haha</div>',
  })
  console.log(here)

  // 加载pano
  krpano.actions.loadpano(
    '/test/animated-hotspots/anihotspots.xml',
    null,
    'MERGE',
    'BLEND(0.5)'
  )

  // textfield_template(krpano)
  // 加载logo
  var logo = krpano.addlayer()
  logo.name = 'logo'
  logo.url = '/images/cat.png'
  logo.align = 'lefttop'
  logo.keep = true
  logo.scale = 0.2
  logo.x = 10
  logo.y = 300
  logo.onclick = "openurl('http://www.360cities.net', _blank);"

  // 加载热点
  var hs = krpano.addhotspot()
  hs.name = 'haha'
  hs.url = '/images/cat.png'
  hs.keep = true
  hs.ath = 0
  hs.atv = 0
  hs.width = 50
  hs.height = 50
  hs.ondown = 'draghotspot();'
  hs.layer = logo
  hs.onclick = function () {
    krpano.actions.loadscene('scene2')
  }
  hs.onout = function () {
    console.log(hs)
  }

  // 加载场景
  const event = krpano.events.createItem('skin_plugin_vr')
  event.keep = true
  event.onnewscene = () => {
    console.log('newnew!!')
  }



})
</script>

<style lang="scss" scoped>
#pano {
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
</style>
