// vue.config.js
/*
@doc for gzip
1 install plugin
$ vue add compression

2 add config in module.exports
  pluginOptions: {
    compression: {
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js)(\?.*)?$/i,
        minRatio: 0.8
      }
    }
  }
*/
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  chainWebpack: (config) => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('nexus/**')
      return [options]
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.output.filename = 'js/[name].[hash].min.js'
      config.output.chunkFilename = 'js/[name].[hash].min.js'
    } else {
      config.optimization.splitChunks = false
      config.output.filename = 'js/NxFolio.js'
      config.output.chunkFilename = 'js/NxFolio-[name].js'
    }
  }
}
