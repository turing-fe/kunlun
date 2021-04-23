const path = require('path')
const test = require('ava')
const webpack = require('webpack')
// const { renderer } = require('..')
const { renderer } = require('../dist')

function createBundle(markdownFile, bundleName) {
  return new Promise((resolve, reject) => {
    webpack(
      {
        mode: 'development',
        entry: path.resolve(__dirname, markdownFile),
        output: {
          path: path.resolve(__dirname, 'output'),
          filename: bundleName,
          libraryTarget: 'commonjs2'
        },
        module: {
          rules: [
            {
              test: /\.md$/,
              use: [
                {
                  loader: 'html-loader'
                },
                {
                  loader: require.resolve('markdown-loader'),
                  options: {
                    // https://marked.js.org/using_advanced#options
                    renderer: renderer()
                  }
                }
              ]
            }
          ]
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
        resolve(require(`./output/${bundleName}`))
      }
    )
  })
}

test('markdown-loader enhance', async t => {
  t.plan(1)
  const bundle = await createBundle('./assets/index.md', 'md.js')
  t.snapshot(bundle)
})
