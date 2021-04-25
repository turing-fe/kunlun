const path = require('path')
const test = require('ava')
const webpack = require('webpack')
const config = require('../webpack.config')

function createBundle(markdownFile, bundleName) {
  return new Promise((resolve, reject) => {
    webpack(
      {
        ...config(),
        entry: path.resolve(__dirname, markdownFile),
        output: {
          path: path.resolve(__dirname),
          filename: bundleName,
          libraryTarget: 'commonjs2'
        }
      },
      function onCompilationFinished(err, stats) {
        if (err) {
          return reject(err)
        }
        if (stats.hasErrors()) {
          return reject(stats.compilation.errors[0])
        }
        if (stats.hasWarnings()) {
          return reject(stats.compilation.warnings[0])
        }
        resolve(path.resolve(__dirname, `./${bundleName}`))
      }
    )
  })
}

test('markdown-reader', async t => {
  t.plan(1)
  const bundle1 = await createBundle('./example.md', 'test.dist.js')
  t.snapshot(bundle1)
})
