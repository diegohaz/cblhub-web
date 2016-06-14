var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools')

var ip = process.env.IP || '0.0.0.0'
var port = (+process.env.PORT + 1) || 3001
var DEBUG = process.env.NODE_ENV !== 'production'

var style = 'style!css?camelCase&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'

var config = {
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: {
    app: ['./app/client']
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'app.js',
    publicPath: DEBUG ? 'http://' + ip + ':' + port + '/' : '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV: process.env.NODE_ENV })
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.s?css$/, loader: style},
      {test: /\.png$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/png'},
      {test: /\.jpg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg'},
      {test: /\.svg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/svg+xml'},
      {test: /\.woff$/, loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff'},
      {test: /\.ttf$/, loader: 'file?prefix=fonts/'},
      {test: /\.eot$/, loader: 'file?prefix=fonts/'}
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
}

if (DEBUG) {
  config.entry.app.unshift(
    'webpack-dev-server/client?http://' + ip + ':' + port + '/',
    'webpack/hot/dev-server',
    'react-hot-loader/patch'
  )

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig).development()
  ])
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
  ])
}

module.exports = config
