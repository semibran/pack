module.exports = function pack(sizes, layout) {
  if (!layout) layout = { size: [ 0, 0 ], rects: [] }
  if (!sizes.length) return layout
  var positions = scan(layout)
  var options = []
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
    var remaining = sizes.slice()
    remaining.splice(i, 1)
    for (var j = 0; j < positions.length; j++) {
      var position = positions[j]
      var option = append(layout, { size: size, position: position })
      if (validate(option)) {
        options.push(pack(remaining, option))
      }
    }
  }
  var lowest = Infinity
  var best = null
  for (var i = 0; i < options.length; i++) {
    var option = options[i]
    var score = rate(option)
    if (score < lowest) {
      best = option
      lowest = score
    }
  }
  return best
}

function rate(layout) {
  var area = layout.size[0] * layout.size[1]
  for (var i = 0; i < layout.rects.length; i++) {
    var rect = layout.rects[i]
    area -= rect.size[0] * rect.size[1]
  }
  return area
}

function scan(layout) {
  var positions = [ [ 0, 0 ] ]
  for (var i = 0; i < layout.rects.length; i++) {
    var rect = layout.rects[i]
    positions.push(
      [ rect.position[0] + rect.size[0], 0 ],
      [ 0, rect.position[1] + rect.size[1] ],
    )
    if (rect.position[0]) positions.push([ rect.position[0], rect.position[1] + rect.size[1] ])
    if (rect.position[1]) positions.push([ rect.position[0] + rect.size[0], rect.position[1] ])
  }
  return positions
}

function append(layout, rect) {
  var size = layout.size.slice()
  var rects = layout.rects.slice()
  if (rect.position[0] + rect.size[0] > size[0]) {
    size[0] = rect.position[0] + rect.size[0]
  }
  if (rect.position[1] + rect.size[1] > size[1]) {
    size[1] = rect.position[1] + rect.size[1]
  }
  rects.push(rect)
  return { size: size, rects: rects }
}

function validate(layout) {
  for (var i = 0; i < layout.rects.length - 1; i++) {
    var a = layout.rects[i]
    for (var j = i + 1; j < layout.rects.length; j++) {
      var b = layout.rects[j]
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
