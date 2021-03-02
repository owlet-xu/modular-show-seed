const gulp = require('gulp');
const plumber = require("gulp-plumber"); //异常处理
const merge = require("gulp-merge-json"); //合并json
const jsonEditor = require('gulp-json-editor');
const async = require('async');

// 国际化词条目录
const i18nPath = "./src/lang/";
//组件词条目录
const comPath = "./src/";
// 组件中的词条合并并排序
const nodePath = './node_modules/@xgychina/';
const dependenciesI18nPath = './src/lang/dependencies/'
const i18nCodes = ['zh-CN', 'es-DO', 'ru-RU', 'en-US'];
const sortJSON = ( json ) => {
  if ( typeof json === 'object' ) {
    const keys = Object.keys(json).sort();
    const  newJSON = {};
    for( let i=0; i< keys.length; i++ ) {
      newJSON[keys[i]] = sortJSON(json[keys[i]]);
    }
    return newJSON;
  }
  return json;
}

// 合并词条
gulp.task("merge-i18n",  ['merge-i18n-dependencies'], function () {
  gulp
    .src([comPath + '**/*zh-CN.json', `!${i18nPath}/**/*.json`])
    .pipe(plumber())
    .pipe(merge({ "fileName": "zh-CN.json" }))
    .pipe( jsonEditor(  (json) => {
      return sortJSON(json);
    } ) )
    .pipe(gulp.dest(i18nPath))
    .on('end', () => {
      console.log('merge-i18n end');
    });
});

gulp.task('merge-i18n-dependencies', function() {
  const functionArray = [];
  for (let i = 0; i < i18nCodes.length; i++) {
    functionArray.push(function (cb) {
      gulp
      .src([nodePath + `**/*${i18nCodes[i]}*.json`])
      .pipe(plumber())
      .pipe(merge({ "fileName": `dependencies-${i18nCodes[i]}.json`}))
      .pipe( jsonEditor(  (json) => {
        return sortJSON(json);
      } ) )
      .pipe(gulp.dest(dependenciesI18nPath))
      .on('end', () => {
        console.log(`dependencies-${i18nCodes[i]}.json created end`);
        cb(null, i)
      })
    });
  }
  async.series([
    ...functionArray
  ], (err, values) => {
    console.log('error', err);
    console.log('merge-i18n-dependencies build end')
  })
});