#### 1. 新建变量文件
```js
gulp createThemes --env XXX  // xxx: 表示为你的创建的皮肤文件夹
```
- 里面会自动生成变量文件`variables.scss`

- 全局范围内的变量文件为 `themes.scss`,需要自己手动创建
- 自定义的字体图标文件为`angolaico.scss`,需要自己手动创建
- 其字体文件放入`icons`文件夹中,文件夹命名不可更改
#### 2. 打包
```js
// 需要在gulpfile.js buildSkin 中 array 添加{path: xxx}字段
  const array = [
    {path: 'white'},
    {path: 'black'},
  ]


gulp buildSkin
```
打包完成后，会自动编译到public文件目录中，themes文件夹中。