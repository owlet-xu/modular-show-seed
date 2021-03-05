## elementui按需加载

## 环境

vuecli3版本

```json
"devDependencies": {
    "@babel/preset-env": "^7.13.9",
    "@vue/cli-plugin-babel": "^3.12.1",
    "@vue/cli-plugin-typescript": "^3.12.1",
    "@vue/cli-plugin-unit-mocha": "^3.12.1",
    "@vue/cli-service": "^3.12.1",
    "babel-plugin-component": "^1.1.1",
    "typescript": "^3.9.5"
  }
```



## 1、安装必要插件

npm i 是npm install缩写

@1.1.1 是携带版本号，避免不同版本带来的bug

-D 是--save-dev的缩写

```typescript
npm i babel-plugin-component@1.1.1 -D
npm i @babel/preset-env@7.13.9 -D
```



## 2、根目录配置babel.config.js

1、根目录指与package.json同样的目录，没有babel.config.js就新建

2、babel.config.js是babel的配置文件，至于babel是什么，@babel/preset-env是什么，为什么配置文件这样写可以参考：https://juejin.cn/post/6844903858632654856，https://juejin.cn/post/6844903810482044936，https://blog.csdn.net/qq_39953537/article/details/102759821

3、@vue/app会使用cli3的编译配置，useBuiltIns: 'usage'其功能更为强大，它会扫描你的代码，只有你的代码用到了哪个新的api，它才会引入相应的polyfill。

```javascript
module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', { 'modules': false, useBuiltIns: 'usage' }]
  ],
  plugins: [        // element官方教程
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}

```



## 3、main.ts中按需加载

```typescript
import { Button, Input, Message } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.prototype.$message = Message;
```



## 4、效果与坑

+ 效果是elementui打包大小从900k缩小到40k

+ 期间遇到不起作用的坑，是elementui使用不对导致的。

  ```typescript
  // 在页面中如此使用elementui会导致按需加载失效，并报错
  // 建议从vue实例中获取并使用
  import { Message as ElMessage } from 'element-ui';
  
  ElMessage.error(i18n.t('Error.Net').toString());
  ```

+ main.ts中引入也算是全局引入，暂未做到单个页面需要哪个就引入哪个
+ css的按需引入暂未实现
+ babel.config.js网上有很多配置都是有问题的，最总找到合适的配置