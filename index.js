module.exports = function pack(sizes, layout) {
  if (!layout) layout = { size: [ 0, 0 ], boxes: [] }
  if (!sizes.length) return layout
  var positions = scan(layout)
  var best = { score: Infinity, layout: null }
  for (var i = 0; i < sizes.length; i++) {
    var unique = true
    for (var j = 0; j < i; j++) {
      if (sizes[i][0] === sizes[j][0] && sizes[i][1] === sizes[j][1]) {
        unique = false
        break
      }
    }
    if (!unique) continue
    var size = sizes[i]
    var remaining = new Array(sizes.length - 1)
    for (var j = 0; j < sizes.length - 1; j++) {
      if (j < i) remaining[j] = sizes[j]
      else remaining[j] = sizes[j + 1]
    }
    for (var j = 0; j < positions.length; j++) {
      var position = positions[j]
      var box = { size: size, position: position }
      var next = append(layout, box)
      if (validate(next)) {
        var last = pack(remaining, next)
        var score = rate(last)
        if (score < best.score) {
          best.score = score
          best.layout = last
        }
      }
    }
  }
  return best.layout
}

function rate(layout) {
  var area = layout.size[0] * layout.size[1]
  for (var i = 0; i < layout.boxes.length; i++) {
    var box = layout.boxes[i]
    area -= box.size[0] * box.size[1]
  }
  return area
}

function scan(layout) {
  var positions = [ [ 0, 0 ] ]
  for (var i = 0; i < layout.boxes.length; i++) {
    var box = layout.boxes[i]
    positions.push(
      [ box.position[0] + box.size[0], 0 ],
      [ 0, box.position[1] + box.size[1] ],
    )
    if (box.position[0]) positions.push([ box.position[0], box.position[1] + box.size[1] ])
    if (box.position[1]) positions.push([ box.position[0] + box.size[0], box.position[1] ])
  }
  return positions
}

function append(layout, box) {
  var size = layout.size.slice()
  var boxes = layout.boxes.slice()
  if (box.position[0] + box.size[0] > size[0]) {
    size[0] = box.position[0] + box.size[0]
  }
  if (box.position[1] + box.size[1] > size[1]) {
    size[1] = box.position[1] + box.size[1]
  }
  boxes.push(box)
  return { size: size, boxes: boxes }
}

function validate(layout) {
  for (var i = 0; i < layout.boxes.length - 1; i++) {
    var a = layout.boxes[i]
    for (var j = i + 1; j < layout.boxes.length; j++) {
      var b = layout.boxes[j]
      if (intersects(a, b)) {
        return false
      }
    }
  }
  return true
}

function intersects(a, b) {
  return a.position[0] < b.position[0] + b.size[0] && a.position[0] + a.size[0] > b.position[0]
      && a.position[1] < b.position[1] + b.size[1] && a.position[1] + a.size[1] > b.position[1]
}
