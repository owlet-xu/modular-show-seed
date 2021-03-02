## 种子工程打包
#### 工程打包
* 在系统根目录下新建vue.config.js文件，它会被@vue/cli-service 自动加载

``` js

module.exports = {
  baseUrl:  './' ,                                                         -- 应用运行路径
  productionSourceMap: false,                                              -- 打包时是否需要map文件
  devServer: {
    port: 8080                                                             -- 运行端口
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/helpers/mixin.scss";`              -- 将样式编译时webpack导入到全局vue文件中
      }
    }
  },
  configureWebpack: config =>{

    // 浏览器：web, electron : electron-renderer
    config.target = 'web'                                                  -- 配置工程运行环境，影响require对象加载问题。
  }
};


```


## vue工程集成软电话组件（sp）
### 一、背景：cad系统需要利用软电话组件来实现电话拨打、接听等功能。
### 二、技术路线：使用进程间通讯的方式将cad进程和sp进程分开的模式来确保软电话组件如异常不会影响业务的继续运行，利用electron的ipc能力实现两个独立进程的相互消息通知实现业务需求。
### 三、工程结构（目前情况，可能变化）：vue业务工程中引用electron组件和sp组件。
### 四、遇到问题：require('electron') 找不到require对象
解决方法：  
方式1：
``` js
将require('electron')修改为：window.require('electron')
```

方式2：在工程vue.config.js 中添加webpack配置
``` js
module.exports = {
  
  configureWebpack: config =>{
    config.target = 'electron-renderer'
  }
};

```
背后原因：require electron 在运行时从运行时提供的node.js环境而不是webpack编译期间使用的node.js环境，默认情况下，全局变量绑定window，webpack编译忽略window全局，因此window.require有效。


## electron种子工程和vue种子工程解耦通信
具体使用示例参考：src/views/electron/electron-view.vue
* 引用
``` js
import { IpcRenderer } from '../../utils/ipc/ipc-renderer';
import { EventType } from '../../utils/ipc/ipc-event-type';
```

* 发送消息到electron
``` js
// 发送
    IpcRenderer.send(EventType.TEST, this.count++);
```
* 接收来自electron的消息
``` js
// 订阅electron主进程事件
    IpcRenderer.on(EventType.ONTEST).subscribe((r: any) => {
      if (r.args[0]) {
        this.fromElectronValue = r.args[0];
      }
    });
```

## 将build后的工程以npm的方式发布到服务器内网
* 1、打开npm配置文件
``` cmd
npm config edit
``` 
* 2、配置仓库地址
``` 
registry=http://172.18.24.36:7001/
SASS_BINARY_SITE=http://172.18.24.51:8081/nexus/content/sites/gs-assets/node/sass/
//172.18.24.36:7001/:username=devappuser
//172.18.24.36:7001/:_password=ZGV2YXBw
//172.18.24.36:7001/:email=devappuser@xgychina.com
//172.18.24.36:7001/:always-auth=false
ELECTRON_MIRROR=http://172.18.24.51:8081/nexus/content/sites/gs-assets/electron/
```
* 3、打包内容确认,执行以下脚本后会在工程根目录下生成.tgz文件，解压后确认文件内容
```
npm pack
```

* 3、推送包仓库
```
npm publish
```
* 4、删除已经推送特点版本的包
```
npm unpublish 包名@版本号
```

