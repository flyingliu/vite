function addLayer (krpano, option = {
  name: 'layer',
  url: '/pano/logo1.png',
  align: 'lefttop',
  keep: true,
  scale: 1,
  x: 20,
  y: 20,
  onclick: "openurl('/', _blank);"
}) {
  let layer = krpano.addlayer()
  Object.keys(option).forEach(key => {
    layer[key] = option[key]
  })
  return layer
}

export {
  addLayer
}