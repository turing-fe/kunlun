import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'

const extensions = ['.ts', '.tsx', '.js', '.jsx']

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true
    }),
    babel({
      babelHelpers: 'bundled',
      extensions
    })
  ]
}
