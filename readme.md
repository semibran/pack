# pack
> Two-dimensional rectangle packer

![boxes](boxes.png)

## usage

### `pack(sizes[, layout]) -> layout`
Arranges a list of `[ width, height ]` pairs into the most compact `layout` possible. The result will be reminiscent of the following data structure:
```js
var layout = {
  size: [ 3, 3 ],
  boxes: [
    { size: [ 2, 1 ], position: [ 0, 0 ] },
    { size: [ 1, 2 ], position: [ 2, 0 ] },
    { size: [ 1, 2 ], position: [ 0, 1 ] },
    { size: [ 1, 1 ], position: [ 1, 1 ] },
    { size: [ 2, 1 ], position: [ 1, 2 ] }
  ]
}
```
The resulting layout will be built around `layout` if one is provided, otherwise an empty one will be created.

## license
[MIT](https://opensource.org/licenses/MIT) © [Brandon Semilla](https://git.io/semibran)
