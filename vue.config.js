/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  productionSourceMap: false,
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
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false
        }
      }
      config.output.filename = 'js/NxFolio.js'
      config.output.chunkFilename = 'js/NxFolio-[name].js'
    }
  }
}
