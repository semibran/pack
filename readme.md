# pack
![boxes](boxes.png "A surprisingly unintuitive box configuration to arrive at without utilizing lookaheads")

This module contains a [box packing algorithm](https://en.wikipedia.org/wiki/Bin_packing_problem) which determines the most compact configuration for a set of rectangles, as modeled via `[ width, height ]` pairs. To this end, it calculates all possible [permutations](https://en.wikipedia.org/wiki/Permutation) and rates them by area of whitespace remaining.

Unlike traditional bin packing algorithms, the boxes here are placed in a single container that grows appropriately as they are packed inside. This property makes it ideal for assembling spritesheets given a list of images.

## usage

### `pack(sizes[, layout]) -> layout`
Arranges a list of `[ width, height ]` pairs into the most compact `layout` possible. The result will be reminiscent of the following data structure:
```js
var layout = {
  size: [ 3, 3 ],
  boxes: [
    { size: [ 2, 1 ], position: [ 0, 0 ] },
    { size: [ 2, 1 ], position: [ 1, 2 ] }
    { size: [ 1, 2 ], position: [ 0, 1 ] },
    { size: [ 1, 2 ], position: [ 2, 0 ] },
    { size: [ 1, 1 ], position: [ 1, 1 ] },
  ]
}
```
The boxes will be placed around the provided `layout` if given (this is used internally for recursion), otherwise an empty one will be created.

## license
[MIT](https://opensource.org/licenses/MIT) © [Brandon Semilla](https://git.io/semibran)
