# markdown-reader

基于 [markdown-loader](https://github.com/peerigon/markdown-loader) 增强代码块语法高亮

```bash
# 安装依赖
pnpm i
# 构建输出至 lib 目录
pnpm build
# 直接使用 webpack 测试，然后打开 http://localhost:8080 查看 markdown 中代码块已高亮（使用 README.md）
pnpm dev
# 使用 ava 测试，生成 test.dist.js（commonjs2 格式）和 snapshots 文件
pnpm test
```

JavaScript 代码块

```js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { renderer } = require('./lib')

module.exports = ({ NODE_ENV = 'development' }) => {
  const isDev = NODE_ENV === 'development'
  const isProd = NODE_ENV === 'production'
  const entry = isDev
    ? path.resolve(__dirname, 'docs/index.tsx')
    : path.resolve(__dirname, 'src/index.ts')
  const outputPath = isProd
    ? path.resolve(__dirname, 'lib')
    : path.resolve(__dirname, 'docs/output')

  const config = {
    mode: isDev ? 'development' : 'production',
    context: __dirname,
    entry,
    output: {
      path: outputPath,
      filename: isDev ? 'bundle.js' : 'index.js' // '[name].[contenthash:8].js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: () => ({
                  before: isDev ? [ReactRefreshTypeScript()] : []
                })
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader',
              options: {
                // https://marked.js.org/using_advanced#options
                renderer: renderer()
              }
            }
          ]
        }
      ]
    },
    plugins: [
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
      new webpack.BannerPlugin({
        banner: `Last update: ${new Date().toString()}`
      }),
      new MiniCssExtractPlugin(),
      isDev &&
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'docs/index.html')
        }),
      isProd && new CompressionPlugin()
    ].filter(Boolean)
  }

  if (isDev) {
    config.devServer = {
      hot: true,
      writeToDisk: filePath => {
        return !/hot-update.js(on)?$/.test(filePath)
      }
    }
  }

  return config
}
```