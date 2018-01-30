var colors = [ "maroon", "green", "olive", "navy", "purple", "teal" ]
var scale = 16

module.exports = function render(layout, canvas) {
  if (!canvas) canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  canvas.width = layout.size[0] * 16
  canvas.height = layout.size[1] * 16
  for (var i = 0; i < layout.boxes.length; i++) {
    var box = layout.boxes[i]
    var color = colors[i]
    context.beginPath()
    context.rect(
      box.position[0] * scale + 2,
      box.position[1] * scale + 2,
      box.size[0] * scale - 4,
      box.size[1] * scale - 4
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
