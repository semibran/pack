const pack = require("../")
const render = require("./render")
// const sizes = new Array(5)
// for (let i = sizes.length; i--;) {
//   sizes[i] = [
//     Math.floor(Math.random() * 6) + 1,
//     Math.floor(Math.random() * 6) + 1
//   ]
// }

const sizes = [
  [ 4, 2 ],
  [ 4, 2 ],
  [ 2, 4 ],
  [ 2, 4 ],
  [ 2, 2 ],
]

let layout = pack(sizes)
let canvas = render(layout)
document.body.appendChild(canvas)

console.log(sizes)
console.log(layout)
