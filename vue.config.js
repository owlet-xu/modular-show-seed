const chunkVendorSplit = require('./scripts/chunk-vendor-split');

module.exports = {
  publicPath: './',
  productionSourceMap: false, // false 打包的时候没有map文件
  devServer: {
    port: 8080
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/index.scss";`
      }
    }
  },
  configureWebpack: config => {
    config.target = 'web';
    if (process.env.NODE_ENV === 'production') {
      // chunkVendorSplit.split(config);
    }
  }
};
