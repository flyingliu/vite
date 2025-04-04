function addLayer (krpano, option = {}) {
  var logo = krpano.addlayer()
  logo.name = 'logo'
  logo.url = '/pano/logo1.png'
  logo.align = 'lefttop'
  logo.keep = true
  logo.scale = .3
  logo.x = 20
  logo.y = 20
  logo.onclick = "openurl('/', _blank);"
}

export {
  addLayer
}