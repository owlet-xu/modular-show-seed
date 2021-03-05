const CompressionPlugin = require("compression-webpack-plugin");
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
      // 不分开的时候更有利于整体加载
      // chunkVendorSplit.split(config);
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: true // 是否删除原文件
          })
        ]
      }
    }
  }
};
