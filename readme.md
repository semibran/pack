# pack
> lightweight rectangle packer

[View the demo!](https://semibran.github.io/pack)

![boxes](img/boxes.png)

`pack` is a [box packing algorithm](https://en.wikipedia.org/wiki/Bin_packing_problem) which attempts to determine the most compact configuration for a set of rectangles. To this end, it employs the first-fit decreasing (FFD) algorithm to place the boxes, using the length of the layout's shortest side length as a heuristic.

Unlike traditional bin packing algorithms, the boxes here are placed in a single container that grows appropriately as they are packed inside. This property makes it ideal for assembling spritesheets given a list of images.

## usage
[![npm](https://nodei.co/npm/pack.png?mini)](https://www.npmjs.com/package/pack "View npm package")

### `pack(sizes) -> layout`
Arranges a list of `[ width, height ]` pairs into the most compact `layout` possible. The result will be reminiscent of the following data structure:
```js
var layout = {
  size: [ 13, 8 ],
  boxes: [
    { size: [ 5, 3 ], position: [ 0, 0 ] },
    { size: [ 6, 5 ], position: [ 0, 3 ] }
    { size: [ 5, 4 ], position: [ 6, 0 ] },
    { size: [ 2, 4 ], position: [ 11, 0 ] },
    { size: [ 7, 4 ], position: [ 6, 4 ] },
    { size: [ 1, 3 ], position: [ 5, 0 ] },
  ]
}
```

## kudos
* [leo](https://github.com/leo) - for donating the package name

## license
[MIT](https://opensource.org/licenses/MIT) © [Brandon Semilla](https://git.io/semibran)
