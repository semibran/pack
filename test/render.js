const scale = 16
const colors = [ "maroon", "navy", "green", "olive", "purple", "teal" ]

module.exports = function render(layout, canvas) {
  if (!canvas) canvas = document.createElement("canvas")
  let context = canvas.getContext("2d")
  canvas.width = Math.round(layout.size[0] * scale)
  canvas.height = Math.round(layout.size[1] * scale)
  for (let i = 0; i < layout.rects.length; i++) {
    let rect = layout.rects[i]
    let color = colors[i % colors.length]
    context.beginPath()
    context.rect(
      Math.round(rect.position[0] * scale + 1),
      Math.round(rect.position[1] * scale + 1),
      Math.round(rect.size[0] * scale - 2),
      Math.round(rect.size[1] * scale - 2)
    )
    context.fillStyle = darken[color]
    context.fill()
  }
  return canvas
}
