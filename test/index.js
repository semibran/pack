const pack = require("../")
const render = require("./render")
const sizes = new Array(6)
for (let i = sizes.length; i--;) {
  sizes[i] = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ]
}

let layouts = pack(sizes)
for (let layout of layouts) {
  let canvas = render(layout)
  canvas.style.margin = "8px"
  document.body.appendChild(canvas)
}

console.log(sizes)
console.log(layouts)
