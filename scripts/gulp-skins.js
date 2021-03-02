const gulp = require('gulp');
const sass = require('gulp-sass');
const concat= require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const path = require('path');
const fs = require('fs');
const async = require('async');

// 皮肤打包路径
const skinUrl = './themes/**/*.scss';
// 皮肤打包
gulp.task('skinCss', function() {
  gulp.src(skinUrl)
      .pipe(sass({style: 'expanded'}))
      .pipe(gulp.dest('./public/themes'));
});
/* skin打包开始 */
gulp.task('buildSkin',['moveIcons'], function(){
  // 从element-theme-chalk中scss获取
  const config = {
    themePath: 'node_modules/element-theme-chalk',
    cssFiles: '*',
    varPath: './src/common/var.scss'
  }
  // 定义需要生成的文件 新增一个文件名需要在此处添加对应的文件名
  const array = [
    {path: 'white'},
    {path: 'black'},
  ]
  const functionArray = [];
  for (let i=0; i< array.length ;i++ ) {
    const fspath = array[i].path;
    // 重写var.scss
    functionArray.push(function(cb){
      const varsPath = path.resolve(config.themePath, config.varPath)
      fs.writeFileSync(varsPath, fs.readFileSync(`themes/${fspath}/variables.scss`), 'utf-8')
      console.log(`${fspath} var.scss have changed`)
      cb(null, i)
    });
    // 编译打包并合并
    functionArray.push(function(cb){
      gulp
      .src([
        path.resolve(config.themePath, './src/' + config.cssFiles + '.scss'),
        `themes/${fspath}/*.scss`,
      ])
      .pipe(sass.sync())
      .pipe(concat('themes.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest(`./public/themes/${fspath}`))
      .on('end',()=>{
        console.log(`${fspath} themes.css created end`)
        cb(null ,i)
      })
    });
    // 将fonts打包进
    functionArray.push(function(cb){
      gulp
      .src([
        path.resolve(config.themePath, './src/fonts/**/*'),
      ])
      .pipe(gulp.dest(`./public/themes/${fspath}/fonts`))
      .on('end',()=>{
        console.log(`${fspath} fonts  created end`)
        cb(null ,i)
      })
    });

  }
  async.series([
    ...functionArray
  ],(err ,values) => {
    console.log('skin build end')
  })
})
// 移动themes的icons文件
gulp.task('moveIcons', function() {
  gulp.src('./themes/icons/**/*')
      .pipe(gulp.dest('./public/themes/icons'))
      .on('end',()=>{
        console.log(`icons have moved`)
      })
});