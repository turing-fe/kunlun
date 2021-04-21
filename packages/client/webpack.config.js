const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const svgToMiniDataURI = require('mini-svg-data-uri')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { renderer: markdownRenderer } = require('../markdown-loader')

console.log(markdownRenderer)

const SRC = path.resolve(__dirname, 'src')
const DIST = path.join(__dirname, 'dist')

module.exports = ({ NODE_ENV = 'none' }) => {
  const isDev = NODE_ENV === 'development'
  return {
    mode: NODE_ENV,
    entry: path.resolve(SRC, './index.tsx'),
    devtool: 'source-map',
    output: {
      path: DIST,
      // publicPath: 'js/',
      filename: '[name].bundle.js',
      // chunkFilename: '[name].chunk.js',
      assetModuleFilename: 'images/[hash][ext]'
    },
    module: {
      rules: [
        // {
        //   test: /\.(j|t)sx?$/,
        //   // include: [SRC],
        //   // exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //       options: {}
        //     }
        //   ]
        // },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(bmp|png|jpg|jpeg|gif)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          }
        },
        {
          test: /\.svg$/,
          type: 'asset',
          generator: {
            dataUrl: content => {
              if (typeof content !== 'string') {
                content = content.toString()
              }

              return svgToMiniDataURI(content)
            }
          }
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
                // pedantic: true,
                renderer: markdownRenderer()
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new WebpackBar(),
      new CleanWebpackPlugin(),
      isDev && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: '前端一站式基础能力平台',
        // Optional
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin(),
      new ForkTsCheckerWebpackPlugin({ async: NODE_ENV === 'production' })
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    infrastructureLogging: {
      // Optional: print more verbose logging about caching
      // level: 'verbose'
    },
    cache: {
      type: 'filesystem',
      // changing the cacheDirectory is optional,
      // by default it will be in `node_modules/.cache`
      // cacheDirectory: path.resolve(__dirname, './node_modules/.cache/webpack'),

      // Add additional dependencies to the build
      // buildDependencies: {
      //   // recommended to invalidate cache on config changes
      //   // This also makes all dependencies of this file build dependencies
      //   config: [__filename]
      //   // By default webpack and loaders are build dependencies
      // },
      idleTimeout: 5000
    },
    experiments: {
      // lazyCompilation: {
      //   entries: false
      // }
    },
    devServer: {
      historyApiFallback: true,
      contentBase: DIST,
      compress: true,
      hot: true,
      // open: true,
      // publicPath: '/dist/',
      writeToDisk: true
    },
    optimization: {
      // 开启优化（Tree Shaking 但保留代码）
      // usedExports: true,
      // 开启压缩（删除未使用代码）
      // minimize: true
      // chunkIds: 'deterministic' // To keep filename consistent between different modes (for example building only)
    }
  }
}
