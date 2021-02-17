import pack from '../../lib/pack'

const TILE_SIZE = 16
const MIN_RECT_SIZE = 2
const MAX_RECT_SIZE = 8
const colors = ['maroon', 'navy', 'green', 'olive', 'purple', 'teal']

const getSize = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

const genRect = (min, max) => ({
  width: getSize(min, max),
  height: getSize(min, max)
})

const sizes = new Array(16).fill()
  .map(() => genRect(MIN_RECT_SIZE, MAX_RECT_SIZE))

const layout = pack(sizes)
layout.rects.sort((a, b) => a.x - b.x)

console.log(layout)

const canvas = render(layout)
document.body.appendChild(canvas)

function render(layout, canvas) {
  if (!canvas) canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = layout.width * TILE_SIZE
  canvas.height = layout.height * TILE_SIZE
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let y = 0; y < layout.height; y++) {
    for (let x = 0; x < layout.width; x++) {
      context.beginPath()
      context.rect(x * TILE_SIZE - 0.5, y * TILE_SIZE - 0.5, TILE_SIZE, TILE_SIZE)
      context.strokeStyle = 'silver'
      context.stroke()
    }
  }

  for (let i = 0; i < layout.rects.length; i++) {
    const { x, y, width, height } = layout.rects[i]
    const color = colors[i % colors.length]

    context.beginPath()
    context.rect(x * TILE_SIZE + 1,
                 y * TILE_SIZE + 1,
                 width * TILE_SIZE - 3,
                 height * TILE_SIZE - 3)

    context.globalAlpha = 0.5
    context.fillStyle = color
    context.fill()

    context.globalAlpha = 1
    context.lineWidth = 2
    context.strokeStyle = color
    context.stroke()
  }

  return canvas
}
