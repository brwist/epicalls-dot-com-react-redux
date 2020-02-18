const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
    ],
  })
}
