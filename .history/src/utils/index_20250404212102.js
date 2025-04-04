function addLayer (krpano, option = {
  name: 'layer',
  url: '/pano/logo1.png',
  align: 'lefttop',
  keep: true,
  scale: 1,
  x: 20,
  y: 20,
}) {
  var logo = krpano.addlayer()
  logo.name = 'logo'
  logo.url = '/pano/logo1.png'
  logo.align = 'lefttop'
  logo.keep = true
  logo.scale = .3
  logo.x = 20
  logo.y = 20
  logo.onclick = "openurl('/', _blank);"
  return layer
}

export {
  addLayer
}