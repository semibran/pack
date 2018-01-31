var scale = 16
var colors = [ "red", "lime", "yellow", "blue", "fuchsia", "aqua" ]
var darker = { red: "maroon", lime: "green", yellow: "olive", blue: "navy", fuchsia: "purple", aqua: "teal" }

module.exports = function render(state, canvas) {
  if (!canvas) canvas = document.createElement("canvas")
  var context = canvas.getContext("2d")
  var cursor = state.cursor
  var layout = state.layout
  canvas.width = layout.size[0] * scale + 1
  canvas.height = layout.size[1] * scale + 1
  context.fillStyle = "white"
  context.fillRect(0, 0, canvas.width, canvas.height)
  for (var y = 0; y < layout.size[1]; y++) {
    for (var x = 0; x < layout.size[0]; x++) {
      context.beginPath()
      context.strokeStyle = "silver"
      context.lineWidth = 1
      context.strokeRect(x * scale + 0.5, y * scale + 0.5, scale, scale)
    }
  }
  for (var i = 0; i < layout.boxes.length; i++) {
    var box = layout.boxes[i]
    var color = darker[colors[i % colors.length]]
    var x = box.position[0]
    var y = box.position[1]
    var width = box.size[0]
    var height = box.size[1]
    context.beginPath()
    context.rect(x * scale + 2, y * scale + 2, width * scale - 3, height * scale - 3)
    context.strokeStyle = color
    context.lineWidth = 2
    context.stroke()
    context.fillStyle = color
    context.globalAlpha = 0.5
    context.fill()
    context.globalAlpha = 1
  }
  if (cursor.selection) {
    if (cursor.selection[0] === layout.size[0] && cursor.selection[1] === layout.size[1]) {
      context.beginPath()
      context.arc(layout.size[0] * scale, layout.size[1] * scale, 8, 0, 2 * Math.PI)
      context.strokeStyle = "silver"
      context.lineWidth = 1
      context.stroke()
    } else {
      var color = colors[layout.boxes.length % colors.length]
      var x = cursor.selection[0]
      var y = cursor.selection[1]
      var width = cursor.position[0] - x
      var height = cursor.position[1] - y
      if (width < 0) {
        x += width
        width = -width
      }
      if (height < 0) {
        y += height
        height = -height
      }
      context.beginPath()
      context.rect(x * scale + 2, y * scale + 2, width * scale - 3, height * scale - 3)
      context.strokeStyle = color
      context.lineWidth = 2
      context.stroke()
      context.fillStyle = color
      context.globalAlpha = 0.25
      context.fill()
      context.globalAlpha = 1
  }
  }
  return canvas
}
