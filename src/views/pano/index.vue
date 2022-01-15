<template>
  <div>
    <div id="pano"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { H, Hotspots, Heres } from '../../method'

// console.log('Heres', Heres)

const init = () => {
  return new Promise((resolve, reject) => {
    embedpano({
      xml: '/test/animated-hotspots/anihotspots.xml',
      target: 'pano',
      html5: 'only',
      onready: function(krpano) {
        krpano = krpano.get('global')
        window.krpano = krpano
        resolve(krpano)
      },
    })
  })
}

onMounted(() => {
  // console.log('000', embedpano)
  setTimeout(() => {
    init().then((krpano) => {
      krpano.method = {
        hotspot: new Hotspots(krpano),
      }

      krpano.my = {
        here: new Heres(krpano),
      }
      krpano.view.hlookat = 123.4
      krpano.view.vlookat = 12.3
      krpano.view.fov = 120
      krpano.actions.loadpano(
        '/test/animated-hotspots/anihotspots.xml',
        null,
        'MERGE',
        'BLEND(0.5)'
      )
      var logo = krpano.addlayer()
      logo.name = 'flyingishere'
      // logo.url = '/images/love.png'
      logo.type = 'container'
      // logo.sprite = '<div>123</div>'
      logo.align = 'right'
      logo.edge = 'left'
      logo.width = 100
      logo.height = 100

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

      hs.onclick = function() {
        krpano.actions.loadscene('scene2')
        // krpano/krpano.xml /krpano/plugineg/test.xml
        // krpano.actions.loadpano('/krpano/plugineg/test.xml')
      }
      hs.onout = function() {
        console.log(hs)
      }

      const event = krpano.events.createItem('skin_plugin_vr')
      event.keep = true
      event.onnewscene = () => {
        console.log('newnew!!')

        
      }
    })
  }, 0)
})
</script>

<style lang="scss" scoped>
#pano {
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
</style>
