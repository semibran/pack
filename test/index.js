const pack = require("../")
const render = require("./render")
const sizes = new Array(6)
for (let i = sizes.length; i--;) {
  sizes[i] = [
    Math.floor(Math.random() * 5) + 1,
    Math.floor(Math.random() * 5) + 1
  ]
}

console.log(sizes)

let layout = pack(sizes)
let canvas = render(layout)
document.body.appendChild(canvas)

console.log(layout)
