module.exports = function pack(sizes) {
	var layout = { size: [ 0, 0 ], boxes: [] }
	var order = new Array(sizes.length)
	for (var i = 0; i < sizes.length; i++) {
		order[i] = i
	}

	order.sort(function (a, b) {
		return sizes[b][0] * sizes[b][1]
		    - sizes[a][0] * sizes[a][1]
	})

	for (var i = 0; i < sizes.length; i++) {
		var size = sizes[order[i]]
		var positions = [ [ 0, 0 ] ]
		for (var j = 0; j < layout.boxes.length; j++) {
			var box = layout.boxes[j]
			positions.push(
				[ box.position[0], box.position[1] + box.size[1] ],
				[ box.position[0] + box.size[0], box.position[1] ]
			)
		}

		var best = { score: Infinity, position: positions[0] }
		if (positions.length > 1) {
			for (var j = 0; j < positions.length; j++) {
				var position = positions[j]
				var box = { size: size, position: position }
				if (validate(layout.boxes, box)) {
					var boxes = layout.boxes.slice()
					boxes.push(box)

					var score = rate({
						size: bounds(boxes),
						boxes: boxes
					})

					if (score < best.score) {
						best.score = score
						best.position = position
					}
				}
			}
		}

		var box = { size: size, position: best.position }
		layout.boxes.push(box)
		layout.size = bounds(layout.boxes)
	}

	var boxes = layout.boxes.slice()
	for (var i = 0; i < boxes.length; i++) {
		layout.boxes[order[i]] = boxes[i]
	}

	return layout
}

function rate(layout) {
	// return whitespace(layout)
	return Math.max(layout.size[0], layout.size[1])
}

// determines the amount of whitespace area remaining in `layout`
function whitespace(layout) {
	var whitespace = layout.size[0] * layout.size[1]
	for (var i = 0; i < layout.boxes.length; i++) {
		var box = layout.boxes[i]
		whitespace -= box.size[0] * box.size[1]
	}
	return whitespace
}

// finds the smallest `[ width, height ]` vector that contains all `boxes`
function bounds(boxes) {
	var width = 0
	var height = 0
	for (var i = 0; i < boxes.length; i++) {
		var box = boxes[i]
		var right = box.position[0] + box.size[0]
		var bottom = box.position[1] + box.size[1]
		if (right > width) {
			width = right
		}
		if (bottom > height) {
			height = bottom
		}
	}
	return [ width, height ]
}

// determines if the region specified by `box` is clear of all other `boxes`
function validate(boxes, box) {
	var a = box
	for (var i = 0; i < boxes.length; i++) {
		var b = boxes[i]
		if (intersects(a, b)) {
			return false
		}
	}
	return true
}

// determines if box `a` and box `b` intersect
function intersects(a, b) {
	return a.position[0] < b.position[0] + b.size[0] && a.position[0] + a.size[0] > b.position[0]
	    && a.position[1] < b.position[1] + b.size[1] && a.position[1] + a.size[1] > b.position[1]
}
