var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

var config = {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    styles: {
      extensions: ['css', 'scss'],
      filter: function (module, regex, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
          : regex.test(module.name)
      },
      path: function (module, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
          : module.name
      },
      parser: function (module, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
          : module.source
      }
    }
  }
}

module.exports = exports = config
