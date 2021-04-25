const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { renderer } = require('./lib')

module.exports = ({ NODE_ENV = 'development' } = {}) => {
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
      filename: isDev ? 'bundle.js' : '[name].[contenthash:8].js',
      publicPath: '/'
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
