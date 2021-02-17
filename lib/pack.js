
// determines if rect `a` and rect `b` intersect
function intersects (a, b) {
  return a.x < b.x + b.width
      && a.x + a.width > b.x
      && a.y < b.y + b.height
      && a.y + a.height > b.y
}

// determines if the region specified by `rect` is clear of all other `rects`
function validate (rects, rect) {
  var a = rect
  for (var i = 0; i < rects.length; i++) {
    var b = rects[i]
    if (intersects(a, b)) {
      return false
    }
  }
  return true
}

// determine the desirability of a given layout
function rate (layout) {
  return Math.max(layout.width, layout.height)
}

// finds the smallest `[ width, height ]` tuple that contains all `rects`
function findBounds (rects) {
  var width = 0
  var height = 0
  for (var i = 0; i < rects.length; i++) {
    var rect = rects[i]
    var right = rect.x + rect.width
    var bottom = rect.y + rect.height
    if (right > width) {
      width = right
    }
    if (bottom > height) {
      height = bottom
    }
  }
  return { width: width, height: height }
}

// find all rect positions given a rect list
function findPositions (rects) {
  var positions = []
  for (var i = 0; i < rects.length; i++) {
    var rect = rects[i]
    positions.push(
      { x: rect.x, y: rect.y + rect.height },
      { x: rect.x + rect.width, y: rect.y }
    )
  }
  return positions
}

// finds the best location for a { width, height } tuple within the given layout
function findBestRect (layout, size) {
  var bestRect = {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  }

  if (!layout.rects.length) {
    return bestRect
  }

  var rect = {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  }

  var sandbox = {
    width: 0,
    height: 0,
    rects: layout.rects.slice()
  }

  var bestScore = Infinity
  var positions = findPositions(layout.rects)
  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i]
    rect.x = pos.x
    rect.y = pos.y
    if (validate(layout.rects, rect)) {
      sandbox.rects[layout.rects.length] = rect

      var size = findBounds(sandbox.rects)
      sandbox.width = size.width
      sandbox.height = size.height

      var score = rate(sandbox)
      if (score < bestScore) {
        bestScore = score
        bestRect.x = rect.x
        bestRect.y = rect.y
      }
    }
  }

  return bestRect
}

// determine order of iteration (FFD)
function preorder (sizes) {
  var order = new Array(sizes.length)
  for (var i = 0; i < sizes.length; i++) {
    order[i] = i
  }

  // sort rects by area descending
  order.sort(function (a, b) {
    return sizes[b].width * sizes[b].height
         - sizes[a].width * sizes[a].height
  })

  return order
}

// rearrange rects to reflect the given iteration order
function reorder (items, order) {
  for (var i = 0; i < items.length; i++) {
    var tmp = items[order[i]]
    items[order[i]] = items[i]
    items[i] = tmp
  }
}

// packs { width, height } tuples into a layout { width, height, rects }
function pack (sizes) {
  var layout = {
    width: 0,
    height: 0,
    rects: []
  }

  if (!sizes.length) {
    return layout
  }

  var order = preorder(sizes)
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[order[i]]

    var rect = findBestRect(layout, size)
    layout.rects.push(rect)

    var bounds = findBounds(layout.rects)
    layout.width = bounds.width
    layout.height = bounds.height
  }

  reorder(layout.rects, order)
  return layout
}

module.exports = pack
