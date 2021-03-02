# 快速体验种子工程  

## 1. 获取种子工程
``` shell  
git clone http://xgychina  
```  

## 2. 安装依赖环境  
```  
cd violet-seed
npm install  
```    

## 3. 开发环境运行
```
npm run serve
```

## 4. 生产环境build
```
npm run build
```    

## 5. 创建一个新的页面  
### 5.1 创建vue - table.vue   
主要有以下几个部分
* template区块 - html   
注意多语言的绑定写法，下面会介绍词条文件的添加
* script区块 - typescript    
采用es6-class语法
* style区域   
scss语法，如果样式代码比较多，建议在当前目录内新增一个table.scss文件，然后引入进来(参见dashboard组件) 

```  html  
<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" :element-loading-text="$t('table.listLoading')" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="$t('table.date')" width="180">
      </el-table-column>
      <el-table-column prop="name" :label="$t('table.username')" width="180">
      </el-table-column>
      <el-table-column prop="address" :label="$t('table.address')">
      </el-table-column>
    </el-table>
    <div class="test-box"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import tableService from '@/api/table-service';
@Component
export default class Index extends Vue {
  list = null;
  listLoading = true;
  created() {
    this.fetchData();
  }
  public async fetchData() {
    this.listLoading = true;
    const response: any = await tableService.getList();

    this.list = response.data;
    this.listLoading = false;
  }
}
</script>

<style lang="scss" scoped>
.test-box {
  width: 160px;
  height: 160px;
}
</style>

```  

### 5.2 新增词条文件  
在`table.vue`文件的当前目录下，新增`table.zh-CN.json`文件    
``` json  
{
  "table": {
    "listLoading": "拼命加载中",
    "date": "日期",
    "username": "姓名",
    "address": "地址"
  }
}

```  

### 5.3 路由配置  
在`router/index.ts`文件内引入`vue`文件,并配置到路由： 
```  js
import Table from '../views/table/table.vue';   
......  
......      
export const constantRouterMap = [
  ......
  ......
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    name: 'TableMain',
    icon: 'el-icon-tickets',
    noDropdown: true,
    children: [{ path: 'index', component: Table, name: 'Table'}]
  },
];
export default new Router({
  routes: constantRouterMap
});


```
重新启动客户端即可看到新增的界面。
