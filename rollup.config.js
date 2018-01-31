import commonjs from "rollup-plugin-commonjs"
export default {
  output: { name: "app" },
  plugins: [ commonjs() ]
}
