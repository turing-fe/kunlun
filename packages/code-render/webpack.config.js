const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { renderer } = require('../markdown-reader')

module.exports = ({ NODE_ENV = 'development' }) => {
  const isDev = NODE_ENV === 'development'
  const isProd = NODE_ENV === 'production'
  const mode = ['development', 'production'].includes(NODE_ENV)
    ? NODE_ENV
    : 'development'
  // 入口
  const entry = path.resolve(__dirname, './test/index.test.js') // path.resolve(__dirname, 'src/index.tsx')
  // 构建输出目录
  const outputPath = path.resolve(__dirname, 'test/output')
  const config = {
    mode,
    context: __dirname,
    entry,
    output: {
      path: outputPath,
      filename: '[name].[contenthash:8].js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
      rules: [
        // {
        //   test: /\.[jt]sx?$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //       options: {}
        //     }
        //   ]
        // },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: isDev ? [ReactRefreshTypeScript()] : []
                })
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
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
                renderer: renderer()
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf)($|\?)/,
          type: 'asset'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: '@svgr/webpack',
              options: {
                babel: false,
                icon: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.BannerPlugin({
        banner: `Last update: ${new Date().toString()}`
      }),
      new MiniCssExtractPlugin(),
      isDev &&
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'test/index.html')
        }),
      new LodashModuleReplacementPlugin(),
      isProd && new CompressionPlugin()
    ].filter(Boolean)
  }

  if (isDev) {
    config.devServer = {
      hot: true,
      // open: true,
      writeToDisk: filePath => {
        return !/(hot-update|main\.\w+).js(on)?$/.test(filePath)
      }
    }
  }
  return config
}
