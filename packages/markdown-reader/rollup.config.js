import { babel } from '@rollup/plugin-babel'
// import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'

const extensions = ['.ts', '.tsx', '.js', '.jsx']

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
    // {
    //   file: './dist/index.d.ts',
    //   format: 'es',
    //   exports: 'named',
    //   sourcemap: true
    // }
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true
    }),
    babel({
      babelHelpers: 'bundled',
      extensions
    })
    // 或
    // typescript({
    //   rollupCommonJSResolveHack: false,
    //   clean: true
    // })
  ]
}
