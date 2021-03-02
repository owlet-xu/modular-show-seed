module.exports = {
  publicPath:  './' ,
  productionSourceMap: true,
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
  configureWebpack: config =>{
    config.target = 'web'
  }
};
