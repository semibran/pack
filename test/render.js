var colors = [ "maroon", "green", "olive", "navy", "purple", "teal" ]
var scale = 16

module.exports = function render(layout, canvas) {
  if (!canvas) canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  canvas.width = layout.size[0] * 16
  canvas.height = layout.size[1] * 16
  for (var i = 0; i < layout.rects.length; i++) {
    var rect = layout.rects[i]
    var color = colors[i]
    context.beginPath()
    context.rect(
      rect.position[0] * scale + 2,
      rect.position[1] * scale + 2,
      rect.size[0] * scale - 4,
      rect.size[1] * scale - 4
    )
    context.fillStyle = color
    context.globalAlpha = 0.25
    context.fill()
    context.globalAlpha = 1
    context.strokeStyle = color
    context.lineWidth = 2
    context.stroke()
  }
  return canvas
}
