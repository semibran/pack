import pack from "../../lib/pack"

const scale = 16
const colors = [ "maroon", "navy", "green", "olive", "purple", "teal" ]
const layout = pack(
	new Array(16)
	.fill()
	.map(_ => [
		Math.floor(Math.random() * 6) + 2,
		Math.floor(Math.random() * 6) + 2
	])
)

layout.boxes.sort((a, b) => a.position[0] - b.position[0])
let canvas = render(layout)
document.body.appendChild(canvas)

function render(layout, canvas) {
	if (!canvas) canvas = document.createElement("canvas")
	let context = canvas.getContext("2d")
	canvas.width = layout.size[0] * scale
	canvas.height = layout.size[1] * scale
	context.fillStyle = "white"
	context.fillRect(0, 0, canvas.width, canvas.height)

	for (let y = 0; y < layout.size[1]; y++) {
		for (let x = 0; x < layout.size[0]; x++) {
			context.beginPath()
			context.rect(x * scale - 0.5, y * scale - 0.5, scale, scale)
			context.strokeStyle = "silver"
			context.stroke()
		}
	}

	for (let i = 0; i < layout.boxes.length; i++) {
		let box = layout.boxes[i]
		let color = colors[i % colors.length]
		let [ w, h ] = box.size
		let [ x, y ] = box.position

		context.beginPath()
		context.rect(x * scale + 1, y * scale + 1, w * scale - 3, h * scale - 3)

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
