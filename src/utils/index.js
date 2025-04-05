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

export {
  addLayer
}