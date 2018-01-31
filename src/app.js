const pack = require("../lib")
const render = require("./render")
const app = {
  state: {
    cursor: {
      position: null,
      selection: null
    },
    layout: {
      size: [ 16, 16 ],
      boxes: []
    }
  },
  actions: {
    cursor: {
      move: (state, position) => {
        let { cursor, layout } = state
        if (cursor.selection && cursor.selection[0] === layout.size[0] && cursor.selection[1] === layout.size[1]) {
          layout.size[0] = cursor.position[0]
          layout.size[1] = cursor.position[1]
          cursor.selection[0] = cursor.position[0]
          cursor.selection[1] = cursor.position[1]
        } else {
          if (position[0] < 0) position[0] = 0
          if (position[1] < 0) position[1] = 0
          if (position[0] > layout.size[0]) position[0] = layout.size[0]
          if (position[1] > layout.size[1]) position[1] = layout.size[1]
        }
        cursor.position = position
      },
      select: (state) => {
        state.cursor.selection = state.cursor.position.slice()
      },
      deselect: (state) => {
        let { cursor, layout } = state
        let origin = cursor.selection.slice()
        let target = cursor.position
        let width = target[0] - origin[0]
        let height = target[1] - origin[1]
        if (width && height) {
          if (width < 0) {
            width = -width
            origin[0] -= width
          }
          if (height < 0) {
            height = -height
            origin[1] -= height
          }
          layout.boxes.push({
            size: [ width, height ],
            position: origin
          })
        }
        cursor.selection = null
      }
    },
    layout: {
      pack: (state) => {
        let sizes = state.layout.boxes.map(box => box.size)
        let time = performance.now()
        state.layout = pack(sizes)
        console.log(performance.now() - time)
      }
    }
  }
}

let canvas = render(app.state)
document.body.style.background = "black"
document.body.appendChild(canvas)

let rect = canvas.getBoundingClientRect()
window.addEventListener("mousemove", event => {
  app.actions.cursor.move(app.state, [
    Math.floor((event.pageX - rect.left) / 16 + 0.5),
    Math.floor((event.pageY - rect.top) / 16 + 0.5)
  ])
  render(app.state, canvas)
})

window.addEventListener("mousedown", event => {
  app.actions.cursor.select(app.state)
  render(app.state, canvas)
})

window.addEventListener("mouseup", event => {
  app.actions.cursor.deselect(app.state)
  render(app.state, canvas)
})

window.addEventListener("keyup", event => {
  if (event.code === "Space") {
    app.actions.layout.pack(app.state)
    render(app.state, canvas)
  }
})
