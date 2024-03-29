require('babel-core/register')

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
var webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development(process.env.NODE_ENV !== 'production')
  .server('./', function () {
    require('./server')
  })
