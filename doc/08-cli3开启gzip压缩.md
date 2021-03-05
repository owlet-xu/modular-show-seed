## cli3开启gzip压缩

1、安装工具，注意最新版本可能会报错

```typescript
npm i compression-webpack-plugin@5.0.1
```



2、vue.config.js中配置

```typescript
const CompressionPlugin = require("compression-webpack-plugin");

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
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          })
        ]
      }
    }
  }
};

```



3、nginx中配置gzip

```
        listen       9001;
        server_name  localhost;
        charset utf-8;
        location / {
            root   D:/nginx-1.15.8/html/;
            index  index.html index.htm test.html;
			gzip_static on; #静态压缩
        }    
```

