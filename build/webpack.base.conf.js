/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 * @copyright Naree Co.
 * @license MIT
 */
const path = require('path')
// const utils = require('./utils')
const config = require('../config')
// const webpack = require('webpack')
// const packageJson = require('../package.json')
const configUtils = require('../config/utils')

function babel() {
  return configUtils.babel(config)
}

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  node: {
    console: false,
    global: true,
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: babel(),
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        options: babel(),
      },
    ],
  },
}
