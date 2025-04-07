function addLayer (krpano, option = {}) {
  const layer = krpano.addlayer()
  const defaultOption = {
    name: 'layer',
    url: '/pano/logo1.png',
    align: 'lefttop',
    keep: true,
    scale: 1,
    x: 20,
    y: 20,
    capture: false,
    bgcapture: false,

    onclick: "openurl('/', _blank);"
  }
  option = { ...defaultOption, ...option }
  Object.keys(option).forEach(key => {
    layer[key] = option[key]
  })
  return layer
}
function setupMobileClick (element) {
  element.addEventListener('touchstart', function (e) {
    e.stopPropagation() // 阻止事件冒泡到krpano
    // 可以在这里添加点击效果
  })

  element.addEventListener('touchend', function (e) {
    e.stopPropagation()
    // 执行点击操作
    this.click() // 触发标准的click事件
  })
}

function loadxmlstring (kerpano, {key,url} =  {
  key: 'sceneTemp',
  url: '/pano/3.jpeg'
}) {
  if (krpano) {
    let xmlstring = `<krpano>
          <scene name="${key}" onstart="" autoload="false" >
            <preview type="grid(sphere,16,16,512,0x666666,0x333333,0x999999);" />
            <image><sphere url="${url}" /></image>
            <view hlookat="0" vlookat="0" fov="100" distortion="0.0" />
          </scene>
        </krpano>`
    krpano.call(
      'loadxml(' + escape(xmlstring) + ', null, MERGE, BLEND(0.5));'
    )
    return key
  }
}

export {
  addLayer,
  setupMobileClick,
  loadxmlstring
}